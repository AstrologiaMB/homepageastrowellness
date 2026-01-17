/**
 * Error Response Formatter
 * 
 * Formats errors into standardized API response format.
 * Ensures consistent error responses across all API endpoints.
 * 
 * @module lib/errors/error-response
 */

import { AppError } from './AppError';
import type { ErrorResponse } from '@/types/errors.types';

/**
 * Format error into standardized API response
 */
export function formatErrorResponse(
  error: AppError,
  requestId?: string
): ErrorResponse {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    success: false,
    error: {
      code: error.code,
      message: getSanitizedMessage(error),
      details: isDevelopment ? error.details : undefined,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Get sanitized error message
 * In production, hide sensitive information
 */
function getSanitizedMessage(error: AppError): string {
  // In development, return full message
  if (process.env.NODE_ENV === 'development') {
    return error.message;
  }

  // In production, use generic messages for certain error codes
  const productionMessages: Record<string, string> = {
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again later.',
    DATABASE_ERROR: 'A database error occurred. Please try again later.',
    NETWORK_ERROR: 'A network error occurred. Please check your connection.',
    TIMEOUT_ERROR: 'The request timed out. Please try again.',
    SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  };

  return productionMessages[error.code] || error.message;
}

/**
 * Format success response
 */
export function formatSuccessResponse<T>(
  data: T,
  message?: string
): { success: true; data: T; message?: string; timestamp: string } {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format validation error response
 */
export function formatValidationErrorResponse(
  errors: Array<{ field: string; message: string }>,
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: {
        errors,
      },
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Format not found error response
 */
export function formatNotFoundErrorResponse(
  resource: string,
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'NOT_FOUND_ERROR',
      message: `${resource} not found`,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Format unauthorized error response
 */
export function formatUnauthorizedErrorResponse(
  message: string = 'Unauthorized access',
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'AUTHORIZATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Format forbidden error response
 */
export function formatForbiddenErrorResponse(
  message: string = 'You do not have permission to access this resource',
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'AUTHORIZATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Format conflict error response
 */
export function formatConflictErrorResponse(
  message: string,
  details?: Record<string, unknown>,
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'CONFLICT_ERROR',
      message,
      details,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Format rate limit error response
 */
export function formatRateLimitErrorResponse(
  retryAfter: number,
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code: 'RATE_LIMIT_ERROR',
      message: 'Too many requests. Please try again later.',
      details: {
        retryAfter,
      },
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Set error response headers
 */
export function setErrorResponseHeaders(
  response: Response,
  requestId?: string
): void {
  if (requestId) {
    response.headers.set('X-Request-ID', requestId);
  }
  response.headers.set('Content-Type', 'application/json');
}

/**
 * Get HTTP status code from error
 */
export function getStatusCodeFromError(error: AppError): number {
  return error.statusCode;
}

/**
 * Check if error should be retried
 */
export function shouldRetryError(error: AppError): boolean {
  // Retry on network errors, timeouts, and 5xx server errors
  const retryableCodes = [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    'SERVER_ERROR',
  ];

  return (
    retryableCodes.includes(error.code) ||
    (error.statusCode >= 500 && error.statusCode < 600)
  );
}
