/**
 * HTTP Utilities
 * 
 * Utility functions for HTTP operations.
 * 
 * @module lib/utils/http.utils
 */

import { NextRequest } from 'next/server';

/**
 * Get the base URL of the application
 * 
 * @param request - Next.js request object
 * @returns Base URL string
 */
export function getBaseUrl(request: NextRequest): string {
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const host = request.headers.get('host') || 'localhost';
  return `${protocol}://${host}`;
}

/**
 * Get the full URL of the request
 * 
 * @param request - Next.js request object
 * @returns Full URL string
 */
export function getFullUrl(request: NextRequest): string {
  const baseUrl = getBaseUrl(request);
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  return `${baseUrl}${path}${search}`;
}

/**
 * Get client IP address from request
 * 
 * @param request - Next.js request object
 * @returns IP address string or null
 */
export function getClientIp(request: NextRequest): string | null {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  if (forwarded) {
    // Get the first IP in the forwarded chain
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return null;
}

/**
 * Get user agent from request
 * 
 * @param request - Next.js request object
 * @returns User agent string or null
 */
export function getUserAgent(request: NextRequest): string | null {
  return request.headers.get('user-agent');
}

/**
 * Get referer from request
 * 
 * @param request - Next.js request object
 * @returns Referer string or null
 */
export function getReferer(request: NextRequest): string | null {
  return request.headers.get('referer');
}

/**
 * Get origin from request
 * 
 * @param request - Next.js request object
 * @returns Origin string or null
 */
export function getOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  
  // Fallback to referer
  const referer = getReferer(request);
  if (referer) {
    try {
      const url = new URL(referer);
      return url.origin;
    } catch {
      return null;
    }
  }
  
  return null;
}

/**
 * Check if request is HTTPS
 * 
 * @param request - Next.js request object
 * @returns True if request is HTTPS
 */
export function isSecure(request: NextRequest): boolean {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  return forwardedProto === 'https' || request.nextUrl.protocol === 'https:';
}

/**
 * Get content type from request
 * 
 * @param request - Next.js request object
 * @returns Content type string or null
 */
export function getContentType(request: NextRequest): string | null {
  return request.headers.get('content-type');
}

/**
 * Check if request is JSON
 * 
 * @param request - Next.js request object
 * @returns True if request content type is JSON
 */
export function isJsonRequest(request: NextRequest): boolean {
  const contentType = getContentType(request);
  return contentType?.includes('application/json') ?? false;
}

/**
 * Check if request is form data
 * 
 * @param request - Next.js request object
 * @returns True if request content type is form data
 */
export function isFormDataRequest(request: NextRequest): boolean {
  const contentType = getContentType(request);
  return contentType?.includes('multipart/form-data') ?? false;
}

/**
 * Check if request is URL encoded form
 * 
 * @param request - Next.js request object
 * @returns True if request content type is URL encoded form
 */
export function isUrlEncodedRequest(request: NextRequest): boolean {
  const contentType = getContentType(request);
  return contentType?.includes('application/x-www-form-urlencoded') ?? false;
}

/**
 * Get authorization header value
 * 
 * @param request - Next.js request object
 * @returns Authorization header value or null
 */
export function getAuthorization(request: NextRequest): string | null {
  return request.headers.get('authorization');
}

/**
 * Get bearer token from authorization header
 * 
 * @param request - Next.js request object
 * @returns Bearer token string or null
 */
export function getBearerToken(request: NextRequest): string | null {
  const auth = getAuthorization(request);
  if (!auth) return null;
  
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Get API key from headers or query params
 * 
 * @param request - Next.js request object
 * @param headerName - Name of the header containing the API key (default: 'x-api-key')
 * @returns API key string or null
 */
export function getApiKey(request: NextRequest, headerName: string = 'x-api-key'): string | null {
  // Check header first
  const headerKey = request.headers.get(headerName);
  if (headerKey) return headerKey;
  
  // Check query params
  const queryKey = request.nextUrl.searchParams.get('api_key');
  if (queryKey) return queryKey;
  
  return null;
}

/**
 * Parse query parameters from request
 * 
 * @param request - Next.js request object
 * @returns Object with parsed query parameters
 */
export function parseQueryParams<T extends Record<string, any> = Record<string, string>>(
  request: NextRequest
): T {
  const params: any = {};
  
  request.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params as T;
}

/**
 * Get specific query parameter
 * 
 * @param request - Next.js request object
 * @param key - Query parameter key
 * @returns Query parameter value or null
 */
export function getQueryParam(request: NextRequest, key: string): string | null {
  return request.nextUrl.searchParams.get(key);
}

/**
 * Get multiple query parameters with same key
 * 
 * @param request - Next.js request object
 * @param key - Query parameter key
 * @returns Array of query parameter values
 */
export function getQueryParams(request: NextRequest, key: string): string[] {
  return request.nextUrl.searchParams.getAll(key);
}

/**
 * Check if query parameter exists
 * 
 * @param request - Next.js request object
 * @param key - Query parameter key
 * @returns True if parameter exists
 */
export function hasQueryParam(request: NextRequest, key: string): boolean {
  return request.nextUrl.searchParams.has(key);
}

/**
 * Build URL with query parameters
 * 
 * @param baseUrl - Base URL
 * @param params - Query parameters object
 * @returns Full URL with query string
 */
export function buildUrl(baseUrl: string, params: Record<string, any>): string {
  const url = new URL(baseUrl);
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }
  
  return url.toString();
}

/**
 * Parse URL query string into object
 * 
 * @param queryString - Query string (with or without leading ?)
 * @returns Object with parsed query parameters
 */
export function parseQueryString<T extends Record<string, any> = Record<string, string | string[]>>(
  queryString: string
): T {
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
  const result: any = {};
  
  for (const [key, value] of (params as any).entries()) {
    if (key in result) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing, value];
      }
    } else {
      result[key] = value;
    }
  }
  
  return result as T;
}

/**
 * Get request ID from headers
 * 
 * @param request - Next.js request object
 * @param headerName - Name of the header containing the request ID (default: 'x-request-id')
 * @returns Request ID string or null
 */
export function getRequestId(request: NextRequest, headerName: string = 'x-request-id'): string | null {
  return request.headers.get(headerName);
}

/**
 * Get correlation ID from headers
 * 
 * @param request - Next.js request object
 * @param headerName - Name of the header containing the correlation ID (default: 'x-correlation-id')
 * @returns Correlation ID string or null
 */
export function getCorrelationId(request: NextRequest, headerName: string = 'x-correlation-id'): string | null {
  return request.headers.get(headerName);
}

/**
 * Get trace ID from headers
 * 
 * @param request - Next.js request object
 * @param headerName - Name of the header containing the trace ID (default: 'x-trace-id')
 * @returns Trace ID string or null
 */
export function getTraceId(request: NextRequest, headerName: string = 'x-trace-id'): string | null {
  return request.headers.get(headerName);
}

/**
 * Get all custom headers from request
 * 
 * @param request - Next.js request object
 * @param prefix - Prefix for custom headers (default: 'x-')
 * @returns Object with custom headers
 */
export function getCustomHeaders(request: NextRequest, prefix: string = 'x-'): Record<string, string> {
  const headers: Record<string, string> = {};
  const lowerPrefix = prefix.toLowerCase();
  
  request.headers.forEach((value, key) => {
    if (key.toLowerCase().startsWith(lowerPrefix)) {
      headers[key] = value;
    }
  });
  
  return headers;
}

/**
 * Check if request is from a specific origin
 * 
 * @param request - Next.js request object
 * @param allowedOrigins - Array of allowed origins
 * @returns True if request origin is allowed
 */
export function isAllowedOrigin(request: NextRequest, allowedOrigins: string[]): boolean {
  const origin = getOrigin(request);
  if (!origin) return false;
  
  return allowedOrigins.some(allowed => {
    if (allowed === '*') return true;
    try {
      const allowedUrl = new URL(allowed);
      const originUrl = new URL(origin);
      return allowedUrl.origin === originUrl.origin;
    } catch {
      return false;
    }
  });
}

/**
 * Get language from accept-language header
 * 
 * @param request - Next.js request object
 * @returns Language code (e.g., 'en', 'es') or null
 */
export function getLanguage(request: NextRequest): string | null {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return null;
  
  // Get the first language from the header
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code;
  });
  
  return languages[0] || null;
}

/**
 * Get timezone from request
 * 
 * @param request - Next.js request object
 * @returns Timezone string or null
 */
export function getTimezone(request: NextRequest): string | null {
  // Try to get timezone from various sources
  const headerTimezone = request.headers.get('x-timezone');
  if (headerTimezone) return headerTimezone;
  
  // Could also try to infer from IP geolocation in a real implementation
  return null;
}

/**
 * Parse content range header
 * 
 * @param request - Next.js request object
 * @returns Object with start, end, and total or null
 */
export function parseContentRange(request: NextRequest): { start: number; end: number; total?: number } | null {
  const range = request.headers.get('content-range');
  if (!range) return null;
  
  const match = range.match(/(\d+)-(\d+)\/(\d+)?/);
  if (!match) return null;
  
  return {
    start: parseInt(match[1], 10),
    end: parseInt(match[2], 10),
    total: match[3] ? parseInt(match[3], 10) : undefined,
  };
}

/**
 * Parse accept header
 * 
 * @param request - Next.js request object
 * @returns Array of accepted media types with quality values
 */
export function parseAcceptHeader(request: NextRequest): Array<{ type: string; subtype: string; q: number }> {
  const accept = request.headers.get('accept');
  if (!accept) return [];
  
  return accept.split(',').map(part => {
    const [mediaType, qPart] = part.trim().split(';');
    const [type, subtype] = mediaType.split('/');
    const q = qPart ? parseFloat(qPart.split('=')[1]) : 1;
    
    return {
      type: type || '*',
      subtype: subtype || '*',
      q: isNaN(q) ? 1 : q,
    };
  }).sort((a, b) => b.q - a.q);
}

/**
 * Check if request accepts JSON
 * 
 * @param request - Next.js request object
 * @returns True if request accepts JSON
 */
export function acceptsJson(request: NextRequest): boolean {
  const accept = parseAcceptHeader(request);
  return accept.some(({ type, subtype }) => type === 'application' && subtype === 'json');
}

/**
 * Check if request accepts HTML
 * 
 * @param request - Next.js request object
 * @returns True if request accepts HTML
 */
export function acceptsHtml(request: NextRequest): boolean {
  const accept = parseAcceptHeader(request);
  return accept.some(({ type, subtype }) => type === 'text' && subtype === 'html');
}

/**
 * Get request method
 * 
 * @param request - Next.js request object
 * @returns HTTP method string
 */
export function getMethod(request: NextRequest): string {
  return request.method;
}

/**
 * Check if request is GET
 * 
 * @param request - Next.js request object
 * @returns True if request is GET
 */
export function isGet(request: NextRequest): boolean {
  return request.method === 'GET';
}

/**
 * Check if request is POST
 * 
 * @param request - Next.js request object
 * @returns True if request is POST
 */
export function isPost(request: NextRequest): boolean {
  return request.method === 'POST';
}

/**
 * Check if request is PUT
 * 
 * @param request - Next.js request object
 * @returns True if request is PUT
 */
export function isPut(request: NextRequest): boolean {
  return request.method === 'PUT';
}

/**
 * Check if request is PATCH
 * 
 * @param request - Next.js request object
 * @returns True if request is PATCH
 */
export function isPatch(request: NextRequest): boolean {
  return request.method === 'PATCH';
}

/**
 * Check if request is DELETE
 * 
 * @param request - Next.js request object
 * @returns True if request is DELETE
 */
export function isDelete(request: NextRequest): boolean {
  return request.method === 'DELETE';
}

/**
 * Check if request is HEAD
 * 
 * @param request - Next.js request object
 * @returns True if request is HEAD
 */
export function isHead(request: NextRequest): boolean {
  return request.method === 'HEAD';
}

/**
 * Check if request is OPTIONS
 * 
 * @param request - Next.js request object
 * @returns True if request is OPTIONS
 */
export function isOptions(request: NextRequest): boolean {
  return request.method === 'OPTIONS';
}

/**
 * Check if request is safe (GET, HEAD, OPTIONS)
 * 
 * @param request - Next.js request object
 * @returns True if request is safe
 */
export function isSafeMethod(request: NextRequest): boolean {
  return isGet(request) || isHead(request) || isOptions(request);
}

/**
 * Check if request is idempotent (GET, HEAD, PUT, DELETE, OPTIONS)
 * 
 * @param request - Next.js request object
 * @returns True if request is idempotent
 */
export function isIdempotentMethod(request: NextRequest): boolean {
  return isSafeMethod(request) || isPut(request) || isDelete(request);
}

/**
 * Check if request is cacheable (GET, HEAD)
 * 
 * @param request - Next.js request object
 * @returns True if request is cacheable
 */
export function isCacheableMethod(request: NextRequest): boolean {
  return isGet(request) || isHead(request);
}

/**
 * Get cache control directives from request
 * 
 * @param request - Next.js request object
 * @returns Object with cache control directives
 */
export function parseCacheControl(request: NextRequest): Record<string, boolean | number> {
  const cacheControl = request.headers.get('cache-control');
  if (!cacheControl) return {};
  
  const directives: Record<string, boolean | number> = {};
  
  cacheControl.split(',').forEach(directive => {
    const [key, value] = directive.trim().split('=');
    if (value !== undefined) {
      directives[key] = parseInt(value, 10);
    } else {
      directives[key] = true;
    }
  });
  
  return directives;
}

/**
 * Check if request wants no cache
 * 
 * @param request - Next.js request object
 * @returns True if request has no-cache directive
 */
export function isNoCache(request: NextRequest): boolean {
  const cacheControl = parseCacheControl(request);
  return cacheControl['no-cache'] === true || cacheControl['max-age'] === 0;
}

/**
 * Check if request wants to revalidate
 * 
 * @param request - Next.js request object
 * @returns True if request has max-age=0 or no-cache
 */
export function mustRevalidate(request: NextRequest): boolean {
  const cacheControl = parseCacheControl(request);
  return cacheControl['max-age'] === 0 || cacheControl['no-cache'] === true;
}

/**
 * Get if-none-match header value (ETag)
 * 
 * @param request - Next.js request object
 * @returns ETag string or null
 */
export function getETag(request: NextRequest): string | null {
  return request.headers.get('if-none-match');
}

/**
 * Get if-modified-since header value
 * 
 * @param request - Next.js request object
 * @returns Date string or null
 */
export function getIfModifiedSince(request: NextRequest): string | null {
  return request.headers.get('if-modified-since');
}

/**
 * Check if request has conditional headers
 * 
 * @param request - Next.js request object
 * @returns True if request has if-none-match or if-modified-since
 */
export function hasConditionalHeaders(request: NextRequest): boolean {
  return getETag(request) !== null || getIfModifiedSince(request) !== null;
}
