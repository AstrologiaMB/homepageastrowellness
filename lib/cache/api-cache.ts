/**
 * API Cache Utilities
 *
 * Provides caching utilities for API responses to improve performance
 * and reduce server load.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Cache entry interface
 */
interface CacheEntry {
  data: Response;
  timestamp: number;
  ttl: number;
  etag?: string;
}

/**
 * In-memory cache storage for API responses
 */
const apiCache = new Map<string, CacheEntry>();

/**
 * Default cache TTL in milliseconds (5 minutes)
 */
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

/**
 * Cache configuration options
 */
export interface ApiCacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  skipCache?: boolean; // Skip caching for this request
  varyHeaders?: string[]; // Headers to vary cache by
  revalidate?: number; // Revalidate interval in seconds
  staleWhileRevalidate?: number; // Serve stale content while revalidating
}

/**
 * Generate a cache key from request
 *
 * @param request - Next.js request object
 * @param customKey - Custom cache key prefix
 * @param varyHeaders - Headers to vary cache by
 * @returns Generated cache key
 */
export function generateApiCacheKey(
  request: NextRequest,
  customKey?: string,
  varyHeaders: string[] = []
): string {
  const url = new URL(request.url);
  const method = request.method;

  let key = `${method}:${url.pathname}${url.search}`;

  // Add custom key prefix if provided
  if (customKey) {
    key = `${customKey}:${key}`;
  }

  // Add vary headers
  for (const header of varyHeaders) {
    const value = request.headers.get(header);
    if (value) {
      key += `:${header}:${value}`;
    }
  }

  return key;
}

/**
 * Get API response from cache
 *
 * @param key - Cache key
 * @returns Cached response or null if not found or expired
 */
export function getFromApiCache(key: string): NextResponse | null {
  const entry = apiCache.get(key);

  if (!entry) {
    return null;
  }

  // Check if cache entry has expired
  const now = Date.now();
  if (now - entry.timestamp > entry.ttl) {
    apiCache.delete(key);
    return null;
  }

  // Clone the response to avoid modifying the cached version
  const response = entry.data.clone();

  // Add cache headers
  response.headers.set('X-Cache', 'HIT');
  response.headers.set('Age', String(Math.floor((now - entry.timestamp) / 1000)));

  // Return as NextResponse
  return response as NextResponse;
}

/**
 * Set API response in cache
 *
 * @param key - Cache key
 * @param response - Response to cache
 * @param options - Cache options
 */
export function setApiCache(
  key: string,
  response: NextResponse,
  options: ApiCacheOptions = {}
): void {
  const { ttl = DEFAULT_CACHE_TTL } = options;

  // Generate ETag if not present
  const etag = response.headers.get('etag') || generateETag(response);

  const entry: CacheEntry = {
    data: response.clone(),
    timestamp: Date.now(),
    ttl,
    etag,
  };

  apiCache.set(key, entry);
}

/**
 * Delete API response from cache
 *
 * @param key - Cache key
 * @returns True if key was found and deleted
 */
export function deleteApiCache(key: string): boolean {
  return apiCache.delete(key);
}

/**
 * Clear all API cache entries
 */
export function clearApiCache(): void {
  apiCache.clear();
}

/**
 * Clear API cache entries matching a pattern
 *
 * @param pattern - Pattern to match (e.g., 'user:*')
 */
export function clearApiCachePattern(pattern: string): void {
  const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');

  for (const key of apiCache.keys()) {
    if (regex.test(key)) {
      apiCache.delete(key);
    }
  }
}

/**
 * Check if request supports caching
 *
 * @param request - Next.js request object
 * @returns True if request can be cached
 */
export function isCacheableRequest(request: NextRequest): boolean {
  const method = request.method;
  const cacheControl = request.headers.get('cache-control');

  // Only cache GET and HEAD requests
  if (method !== 'GET' && method !== 'HEAD') {
    return false;
  }

  // Check for no-cache directive
  if (cacheControl?.includes('no-cache')) {
    return false;
  }

  return true;
}

/**
 * Check if response supports caching
 *
 * @param response - Next.js response object
 * @returns True if response can be cached
 */
export function isCacheableResponse(response: NextResponse): boolean {
  const status = response.status;
  const cacheControl = response.headers.get('cache-control');

  // Don't cache error responses
  if (status >= 400) {
    return false;
  }

  // Check for no-store or private directives
  if (cacheControl?.includes('no-store') || cacheControl?.includes('private')) {
    return false;
  }

  return true;
}

/**
 * Generate ETag from response
 *
 * @param response - Next.js response object
 * @returns Generated ETag
 */
export function generateETag(response: NextResponse): string {
  const body = response.body;
  const hash = body ? hashString(body.toString()) : 'empty';
  return `"${hash}"`;
}

/**
 * Simple hash function for ETag generation
 *
 * @param str - String to hash
 * @returns Hashed string
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Middleware function to handle API caching
 *
 * @param request - Next.js request object
 * @param handler - Request handler function
 * @param options - Cache options
 * @returns Next.js response
 */
export async function withApiCache(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: ApiCacheOptions = {}
): Promise<NextResponse> {
  const { key: customKey, varyHeaders = [], skipCache = false } = options;

  // Skip caching if requested or request is not cacheable
  if (skipCache || !isCacheableRequest(request)) {
    return await handler(request);
  }

  // Generate cache key
  const cacheKey = generateApiCacheKey(request, customKey, varyHeaders);

  // Check for conditional request (If-None-Match)
  const ifNoneMatch = request.headers.get('if-none-match');
  const cachedEntry = apiCache.get(cacheKey);

  if (ifNoneMatch && cachedEntry && cachedEntry.etag === ifNoneMatch) {
    return new NextResponse(null, { status: 304 });
  }

  // Try to get from cache
  const cached = getFromApiCache(cacheKey);
  if (cached) {
    return cached;
  }

  // Execute handler
  const response = await handler(request);

  // Cache the response if cacheable
  if (isCacheableResponse(response)) {
    setApiCache(cacheKey, response, options);
  }

  // Add cache headers to response
  response.headers.set('X-Cache', 'MISS');

  return response;
}

/**
 * Invalidate cache for a specific route
 *
 * @param pathname - Route pathname
 * @param searchParams - Search params to match (optional)
 */
export function invalidateRouteCache(pathname: string, searchParams?: URLSearchParams): void {
  const pattern = searchParams ? `GET:${pathname}${searchParams.toString()}*` : `GET:${pathname}*`;

  clearApiCachePattern(pattern);
}

/**
 * Get cache statistics
 *
 * @returns Cache statistics
 */
export function getApiCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: apiCache.size,
    keys: Array.from(apiCache.keys()),
  };
}

/**
 * Clean up expired cache entries
 *
 * @returns Number of entries cleaned up
 */
export function cleanupExpiredApiCache(): number {
  let cleaned = 0;
  const now = Date.now();

  for (const [key, entry] of apiCache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      apiCache.delete(key);
      cleaned++;
    }
  }

  return cleaned;
}

/**
 * Cache decorator for API routes
 *
 * @param options - Cache options
 * @returns Decorated route handler
 */
export function cacheRoute(options: ApiCacheOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: NextRequest, ...args: any[]) {
      return withApiCache(request, (req) => originalMethod.call(this, req, ...args), options);
    };

    return descriptor;
  };
}

/**
 * Create cache headers for response
 *
 * @param options - Cache options
 * @returns Headers object with cache directives
 */
export function createCacheHeaders(options: ApiCacheOptions = {}): Headers {
  const headers = new Headers();
  const { ttl = DEFAULT_CACHE_TTL, revalidate, staleWhileRevalidate } = options;

  const maxAge = Math.floor(ttl / 1000);

  if (revalidate) {
    headers.set(
      'Cache-Control',
      `max-age=${maxAge}, s-maxage=${revalidate}, stale-while-revalidate=${staleWhileRevalidate || maxAge}`
    );
  } else {
    headers.set('Cache-Control', `max-age=${maxAge}`);
  }

  return headers;
}
