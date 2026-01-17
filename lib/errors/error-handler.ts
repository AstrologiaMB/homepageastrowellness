/**
 * Error Handler Utility
 * 
 * Centralized error handling utility for consistent error processing
 * throughout the application.
 * 
 * @module lib/errors/error-handler
 */

import { AppError } from './AppError';
import { ValidationError } from './ValidationError';
import { AuthError } from './AuthError';
import { ApiError } from './ApiError';
import { formatErrorResponse } from './error-response';
import { logger } from '@/lib/logger';
import type { ErrorContext, ErrorResponse } from '@/types/errors.types';

/**
 * Global error handler for API routes
 * Converts any error to a standardized response
 */
export function handleApiError(error: unknown, context?: ErrorContext): ErrorResponse {
  // Log the error
  logError(error, context);

  // Convert to AppError if needed
  const appError = AppError.fromError(error);

  // Format and return error response
  return formatErrorResponse(appError, context?.requestId);
}

/**
 * Error handler for async functions
 * Wraps async functions with error handling
 */
export function withErrorHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: ErrorContext
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw handleApiError(error, context);
    }
  }) as T;
}

/**
 * Safe error handler that doesn't throw
 * Returns error response instead of throwing
 */
export function safeErrorHandler(
  error: unknown,
  context?: ErrorContext
): ErrorResponse {
  return handleApiError(error, context);
}

/**
 * Log error with context
 */
function logError(error: unknown, context?: ErrorContext): void {
  const appError = AppError.fromError(error);

  // Determine log level based on error type and status code
  const logLevel = getLogLevel(appError);

  const logData = {
    error: {
      name: appError.name,
      message: appError.message,
      code: appError.code,
      statusCode: appError.statusCode,
      stack: appError.stack,
    },
    context,
    details: appError.details,
  };

  switch (logLevel) {
    case 'error':
      logger.error('Error occurred', logData);
      break;
    case 'warn':
      logger.warn('Warning occurred', logData);
      break;
    case 'info':
      logger.info('Info message', logData);
      break;
    case 'debug':
      logger.debug('Debug message', logData);
      break;
  }
}

/**
 * Determine log level based on error
 */
function getLogLevel(error: AppError): 'error' | 'warn' | 'info' | 'debug' {
  // Operational errors with 4xx status codes are warnings
  if (error.isOperational && error.statusCode >= 400 && error.statusCode < 500) {
    return 'warn';
  }

  // Non-operational errors are always errors
  if (!error.isOperational) {
    return 'error';
  }

  // 5xx status codes are errors
  if (error.statusCode >= 500) {
    return 'error';
  }

  // Everything else is info
  return 'info';
}

/**
 * Check if error is operational (expected)
 */
export function isOperationalError(error: unknown): boolean {
  const appError = AppError.fromError(error);
  return appError.isOperational;
}

/**
 * Check if error is a specific error type
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Get error status code
 */
export function getErrorStatusCode(error: unknown): number {
  const appError = AppError.fromError(error);
  return appError.statusCode;
}

/**
 * Get error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

/**
 * Create error context from request
 */
export function createErrorContext(
  request: Request,
  userId?: string
): ErrorContext {
  return {
    userId,
    requestId: request.headers.get('X-Request-ID') || undefined,
    path: request.url,
    method: request.method,
    userAgent: request.headers.get('User-Agent') || undefined,
    ip: request.headers.get('X-Forwarded-For') || 
         request.headers.get('X-Real-IP') || 
         undefined,
    timestamp: new Date(),
  };
}
