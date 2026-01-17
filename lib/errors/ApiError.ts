/**
 * API Error Class
 * 
 * Custom error class for API-related errors.
 * Extends AppError with API-specific properties.
 * 
 * @module lib/errors/ApiError
 */

import { AppError } from './AppError';
import type { ApiError as ApiErrorType } from '@/types/errors.types';

/**
 * API error class
 * Used for external API request failures
 */
export class ApiError extends AppError implements ApiErrorType {
  public readonly name = 'ApiError';
  public readonly endpoint?: string;
  public readonly method?: string;
  public readonly responseStatus?: number;

  constructor(
    message: string,
    endpoint?: string,
    method?: string,
    responseStatus?: number,
    code: string = 'API_ERROR',
    statusCode: number = 502,
    details?: Record<string, unknown>
  ) {
    super(
      message,
      code,
      statusCode,
      true,
      details
    );

    this.endpoint = endpoint;
    this.method = method;
    this.responseStatus = responseStatus;
  }

  /**
   * Create error for network failure
   */
  static networkError(endpoint: string, method: string): ApiError {
    return new ApiError(
      `Network error while calling ${method} ${endpoint}`,
      endpoint,
      method,
      undefined,
      'NETWORK_ERROR',
      502,
      { endpoint, method }
    );
  }

  /**
   * Create error for timeout
   */
  static timeoutError(endpoint: string, method: string, timeout: number): ApiError {
    return new ApiError(
      `Request to ${method} ${endpoint} timed out after ${timeout}ms`,
      endpoint,
      method,
      undefined,
      'TIMEOUT_ERROR',
      504,
      { endpoint, method, timeout }
    );
  }

  /**
   * Create error for not found
   */
  static notFound(endpoint: string, method: string, resource: string): ApiError {
    return new ApiError(
      `${resource} not found at ${endpoint}`,
      endpoint,
      method,
      404,
      'NOT_FOUND_ERROR',
      404,
      { endpoint, method, resource }
    );
  }

  /**
   * Create error for server error
   */
  static serverError(endpoint: string, method: string, responseStatus: number): ApiError {
    return new ApiError(
      `Server error (${responseStatus}) from ${method} ${endpoint}`,
      endpoint,
      method,
      responseStatus,
      'SERVER_ERROR',
      502,
      { endpoint, method, responseStatus }
    );
  }

  /**
   * Create error from fetch response
   */
  static fromResponse(endpoint: string, method: string, response: Response): ApiError {
    const statusCode = response.status;
    
    // Map HTTP status codes to appropriate error types
    if (statusCode === 404) {
      return ApiError.notFound(endpoint, method, 'Resource');
    }
    
    if (statusCode >= 500) {
      return ApiError.serverError(endpoint, method, statusCode);
    }
    
    if (statusCode >= 400) {
      return new ApiError(
        `Client error (${statusCode}) from ${method} ${endpoint}`,
        endpoint,
        method,
        statusCode,
        'API_ERROR',
        statusCode,
        { endpoint, method, statusCode }
      );
    }

    return new ApiError(
      `Unexpected response (${statusCode}) from ${method} ${endpoint}`,
      endpoint,
      method,
      statusCode,
      'API_ERROR',
      502,
      { endpoint, method, statusCode }
    );
  }

  /**
   * Get error summary
   */
  getSummary(): string {
    const parts = [this.name];
    if (this.method && this.endpoint) {
      parts.push(`[${this.method} ${this.endpoint}]`);
    }
    if (this.responseStatus) {
      parts.push(`(${this.responseStatus})`);
    }
    return parts.join(' ');
  }
}
