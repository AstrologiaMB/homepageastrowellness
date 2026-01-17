/**
 * Rate Limiting Middleware
 *
 * Provides rate limiting functionality for API routes to prevent abuse
 * and ensure fair resource allocation.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests per window
  keyGenerator?: (request: NextRequest) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
  skip?: (request: NextRequest) => boolean; // Skip rate limiting for certain requests
  message?: string; // Custom error message
  statusCode?: number; // Custom status code for rate limit exceeded
  headers?: boolean; // Add rate limit headers to response
}

/**
 * Rate limit store interface
 */
export interface RateLimitStore {
  increment(key: string): Promise<{ count: number; resetTime: number }>;
  reset(key: string): Promise<void>;
  get(key: string): Promise<{ count: number; resetTime: number } | null>;
  clear(): Promise<void>;
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

/**
 * In-memory rate limit store
 */
class MemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, { count: number; resetTime: number }>();

  async increment(key: string): Promise<{ count: number; resetTime: number }> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      const resetTime = now + this.windowMs;
      this.store.set(key, { count: 1, resetTime });
      return { count: 1, resetTime };
    }

    // Increment existing entry
    entry.count++;
    return { count: entry.count, resetTime: entry.resetTime };
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key);
  }

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now > entry.resetTime) {
      this.store.delete(key);
      return null;
    }

    return { count: entry.count, resetTime: entry.resetTime };
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  private windowMs = 60000; // Default 1 minute window
}

// Default in-memory store
const defaultStore = new MemoryRateLimitStore();

/**
 * Default rate limit configurations
 */
export const defaultRateLimits = {
  // General API rate limit: 100 requests per minute
  general: {
    windowMs: 60 * 1000,
    maxRequests: 100,
  },
  // Authentication rate limit: 5 requests per minute
  auth: {
    windowMs: 60 * 1000,
    maxRequests: 5,
  },
  // Chart calculation rate limit: 10 requests per minute
  chart: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
  // Stripe webhook rate limit: 50 requests per minute
  stripe: {
    windowMs: 60 * 1000,
    maxRequests: 50,
  },
  // Admin rate limit: 200 requests per minute
  admin: {
    windowMs: 60 * 1000,
    maxRequests: 200,
  },
} as const;

/**
 * Generate rate limit key from request
 *
 * @param request - Next.js request object
 * @returns Rate limit key
 */
export function generateRateLimitKey(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'unknown';
  const path = new URL(request.url).pathname;
  return `${ip}:${path}`;
}

/**
 * Create rate limiting middleware
 *
 * @param config - Rate limit configuration
 * @param store - Rate limit store (defaults to in-memory store)
 * @returns Middleware function
 */
export function createRateLimitMiddleware(
  config: RateLimitConfig,
  store: RateLimitStore = defaultStore
) {
  return async function rateLimitMiddleware(request: NextRequest): Promise<NextResponse | null> {
    const {
      windowMs,
      maxRequests,
      keyGenerator = generateRateLimitKey,
      skipSuccessfulRequests = false,
      skipFailedRequests = false,
      skip,
      message = 'Too many requests, please try again later.',
      statusCode = 429,
      headers = true,
    } = config;

    // Skip rate limiting if configured
    if (skip && skip(request)) {
      return null;
    }

    // Generate rate limit key
    const key = keyGenerator(request);

    // Increment request count
    const { count, resetTime } = await store.increment(key);

    // Calculate remaining requests
    const remaining = Math.max(0, maxRequests - count);

    // Check if rate limit exceeded
    if (count > maxRequests) {
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      const response = NextResponse.json(
        { error: message },
        { status: statusCode }
      );

      // Add rate limit headers
      if (headers) {
        response.headers.set('X-RateLimit-Limit', String(maxRequests));
        response.headers.set('X-RateLimit-Remaining', '0');
        response.headers.set('X-RateLimit-Reset', String(resetTime));
        response.headers.set('Retry-After', String(retryAfter));
      }

      return response;
    }

    return null; // Continue to next middleware/handler
  };
}

/**
 * Apply rate limiting to a request handler
 *
 * @param handler - Request handler function
 * @param config - Rate limit configuration
 * @returns Rate-limited request handler
 */
export function withRateLimit<T extends NextRequest>(
  handler: (request: T) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async function rateLimitedHandler(request: T): Promise<NextResponse> {
    const middleware = createRateLimitMiddleware(config);

    // Check rate limit
    const rateLimitResponse = await middleware(request as unknown as NextRequest);

    // Return rate limit response if exceeded
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Execute handler
    const response = await handler(request);

    // Add rate limit headers to successful response
    if (config.headers) {
      const key = config.keyGenerator
        ? config.keyGenerator(request as unknown as NextRequest)
        : generateRateLimitKey(request as unknown as NextRequest);

      const entry = await defaultStore.get(key);

      if (entry) {
        response.headers.set('X-RateLimit-Limit', String(config.maxRequests));
        response.headers.set('X-RateLimit-Remaining', String(Math.max(0, config.maxRequests - entry.count)));
        response.headers.set('X-RateLimit-Reset', String(entry.resetTime));
      }
    }

    return response;
  };
}

/**
 * Rate limit for authentication endpoints
 */
export const authRateLimit = createRateLimitMiddleware({
  ...defaultRateLimits.auth,
  message: 'Too many authentication attempts, please try again later.',
});

/**
 * Rate limit for chart calculation endpoints
 */
export const chartRateLimit = createRateLimitMiddleware({
  ...defaultRateLimits.chart,
  message: 'Too many chart calculation requests, please try again later.',
});

/**
 * Rate limit for Stripe webhook endpoints
 */
export const stripeRateLimit = createRateLimitMiddleware({
  ...defaultRateLimits.stripe,
  message: 'Too many webhook requests, please try again later.',
});

/**
 * Rate limit for admin endpoints
 */
export const adminRateLimit = createRateLimitMiddleware({
  ...defaultRateLimits.admin,
  message: 'Too many admin requests, please try again later.',
});

/**
 * Rate limit for general API endpoints
 */
export const generalRateLimit = createRateLimitMiddleware({
  ...defaultRateLimits.general,
  message: 'Too many requests, please try again later.',
});

/**
 * Get rate limit status for a request
 *
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns Rate limit status
 */
export async function getRateLimitStatus(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const key = config.keyGenerator
    ? config.keyGenerator(request)
    : generateRateLimitKey(request);

  const entry = await defaultStore.get(key);

  if (!entry) {
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      reset: Date.now() + config.windowMs,
    };
  }

  const remaining = Math.max(0, config.maxRequests - entry.count);
  const success = entry.count <= config.maxRequests;

  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: entry.resetTime,
    retryAfter: !success ? Math.ceil((entry.resetTime - Date.now()) / 1000) : undefined,
  };
}

/**
 * Reset rate limit for a specific key
 *
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 */
export async function resetRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<void> {
  const key = config.keyGenerator
    ? config.keyGenerator(request)
    : generateRateLimitKey(request);

  await defaultStore.reset(key);
}

/**
 * Clear all rate limits (for testing purposes)
 */
export async function clearAllRateLimits(): Promise<void> {
  await defaultStore.clear();
}

/**
 * Rate limit decorator for API routes
 *
 * @param config - Rate limit configuration
 * @returns Decorated route handler
 */
export function rateLimit(config: RateLimitConfig) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: NextRequest) {
      return withRateLimit(originalMethod.bind(this), config)(request);
    };

    return descriptor;
  };
}
