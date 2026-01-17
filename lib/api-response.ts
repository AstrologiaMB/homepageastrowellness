/**
 * API Response Utilities
 *
 * Utility functions for creating consistent API responses.
 *
 * @module lib/api-response
 */

import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/lib/constants/api.constants';
import type { ApiResponse, ApiError, PaginatedResponse } from '@/types/api.types';

/**
 * Create a successful API response
 *
 * @param data - Response data
 * @param message - Optional success message
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with formatted success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = HTTP_STATUS.OK
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a paginated API response
 *
 * @param data - Response data array
 * @param pagination - Pagination metadata
 * @param message - Optional success message
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with formatted paginated response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  },
  message?: string,
  status: number = HTTP_STATUS.OK
): NextResponse<PaginatedResponse<T>> {
  const response: PaginatedResponse<T> = {
    data,
    pagination,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create an error API response
 *
 * @param error - Error object or message
 * @param status - HTTP status code (default: 500)
 * @returns NextResponse with formatted error response
 */
export function errorResponse(
  error: ApiError | string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: typeof error === 'string' ? { code: 'INTERNAL_ERROR', message: error } : error,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a validation error response
 *
 * @param errors - Array of validation errors
 * @param status - HTTP status code (default: 400)
 * @returns NextResponse with formatted validation error response
 */
export function validationErrorResponse(
  errors: Array<{ field: string; message: string; code?: string }>,
  status: number = HTTP_STATUS.BAD_REQUEST
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: { errors },
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a not found error response
 *
 * @param resource - Resource that was not found
 * @param status - HTTP status code (default: 404)
 * @returns NextResponse with formatted not found response
 */
export function notFoundResponse(
  resource: string,
  status: number = HTTP_STATUS.NOT_FOUND
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'NOT_FOUND_ERROR',
      message: `${resource} not found`,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create an unauthorized error response
 *
 * @param message - Optional error message
 * @param status - HTTP status code (default: 401)
 * @returns NextResponse with formatted unauthorized response
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized access',
  status: number = HTTP_STATUS.UNAUTHORIZED
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'AUTHENTICATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a forbidden error response
 *
 * @param message - Optional error message
 * @param status - HTTP status code (default: 403)
 * @returns NextResponse with formatted forbidden response
 */
export function forbiddenResponse(
  message: string = 'You do not have permission to access this resource',
  status: number = HTTP_STATUS.FORBIDDEN
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'AUTHORIZATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a conflict error response
 *
 * @param message - Optional error message
 * @param status - HTTP status code (default: 409)
 * @returns NextResponse with formatted conflict response
 */
export function conflictResponse(
  message: string = 'Resource already exists',
  status: number = HTTP_STATUS.CONFLICT
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'CONFLICT_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a server error response
 *
 * @param message - Optional error message
 * @param status - HTTP status code (default: 500)
 * @returns NextResponse with formatted server error response
 */
export function serverErrorResponse(
  message: string = 'Internal server error',
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a service unavailable error response
 *
 * @param message - Optional error message
 * @param status - HTTP status code (default: 503)
 * @returns NextResponse with formatted service unavailable response
 */
export function serviceUnavailableResponse(
  message: string = 'Service temporarily unavailable',
  status: number = HTTP_STATUS.SERVICE_UNAVAILABLE
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code: 'SERVICE_UNAVAILABLE_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

/**
 * Set cache headers on response
 *
 * @param response - NextResponse object
 * @param maxAge - Maximum age in seconds
 */
export function setCacheHeaders(response: NextResponse, maxAge: number = 3600): void {
  response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
}

/**
 * Set CORS headers on response
 *
 * @param response - NextResponse object
 * @param origin - Allowed origin
 */
export function setCORSHeaders(response: NextResponse, origin: string = '*'): void {
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
}

/**
 * Set JSON content type header
 *
 * @param response - NextResponse object
 */
export function setJSONContentType(response: NextResponse): void {
  response.headers.set('Content-Type', 'application/json');
}

/**
 * Set request ID header
 *
 * @param response - NextResponse object
 * @param requestId - Request ID
 */
export function setRequestIdHeader(response: NextResponse, requestId: string): void {
  response.headers.set('X-Request-ID', requestId);
}
