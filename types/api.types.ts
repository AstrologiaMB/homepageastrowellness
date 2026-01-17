/**
 * API Types
 * 
 * Type definitions for API requests and responses.
 * Includes standard response formats, pagination, and error types.
 * 
 * @module types/api.types
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp?: string;
}

/**
 * API error details
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  timestamp?: string;
}

/**
 * API request context
 */
export interface ApiRequestContext {
  requestId?: string;
  userId?: string;
  userAgent?: string;
  ip?: string;
}

/**
 * API response headers
 */
export interface ApiResponseHeaders {
  'Content-Type': string;
  'X-Request-ID'?: string;
  'X-Rate-Limit-Remaining'?: string;
  'X-Rate-Limit-Reset'?: string;
}

/**
 * HTTP method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

/**
 * API error codes
 */
export type ApiErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * API request configuration
 */
export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

/**
 * API response status
 */
export type ApiResponseStatus = 'success' | 'error' | 'partial';

/**
 * Cache configuration for API requests
 */
export interface ApiCacheConfig {
  enabled: boolean;
  ttl?: number; // Time to live in seconds
  key?: string;
}

/**
 * Rate limit information
 */
export interface RateLimitInfo {
  remaining: number;
  reset: number; // Unix timestamp
  limit: number;
}

/**
 * Request validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Request validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * API endpoint metadata
 */
export interface ApiEndpointMetadata {
  path: string;
  method: HttpMethod;
  description?: string;
  authenticated?: boolean;
  rateLimited?: boolean;
  cached?: boolean;
}

/**
 * API service health status
 */
export interface ApiHealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  lastCheck?: string;
}
