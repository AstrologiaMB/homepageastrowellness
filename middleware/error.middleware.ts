/**
 * Error Handling Middleware
 *
 * Middleware for catching and handling errors consistently.
 *
 * @module middleware/error.middleware
 */

import { errorResponse } from '@/lib/api-response';
import { HTTP_STATUS } from '@/lib/constants/api.constants';
import { AppError } from '@/lib/errors/AppError';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Error handler middleware
 *
 * @param request - Next.js request object
 * @param error - Error to handle
 * @returns NextResponse with formatted error
 */
export function handleMiddlewareError(request: NextRequest, error: unknown): NextResponse {
  const requestId = generateRequestId();

  logger.error('Middleware error', {
    requestId,
    error: error instanceof Error ? error.message : String(error),
    path: request.nextUrl.pathname,
    stack: error instanceof Error ? error.stack : undefined
  });

  // Handle AppError instances
  if (error instanceof AppError) {
    return errorResponse(
      {
        code: error.code,
        message: error.message,
        details: error.details
      },
      error.statusCode
    );
  }

  // Handle unexpected errors
  return errorResponse(
    {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      details: { originalError: error instanceof Error ? error.message : String(error) }
    },
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}

/**
 * Generate request ID for tracing
 *
 * @returns Request ID
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Async error handler wrapper
 *
 * Wraps an async function with error handling
 *
 * @param fn - Function to wrap
 * @returns Wrapped function with error handling
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<any>>(
  fn: T
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      logger.error('Async function error', { error, function: fn.name });
      throw error;
    }
  }) as T;
}
