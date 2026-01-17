/**
 * Error Types
 * 
 * Type definitions for error handling throughout the application.
 * Includes custom error classes and error response structures.
 * 
 * @module types/errors.types
 */

/**
 * Base application error
 */
export interface AppError {
  name: string;
  message: string;
  code: string;
  statusCode: number;
  isOperational: boolean;
  timestamp: Date;
  details?: Record<string, unknown>;
  stack?: string;
}

/**
 * Validation error
 */
export interface ValidationError extends AppError {
  name: 'ValidationError';
  field?: string;
  validationErrors?: Array<{
    field: string;
    message: string;
    code?: string;
  }>;
}

/**
 * Authentication error
 */
export interface AuthError extends AppError {
  name: 'AuthError';
  authType?: 'login' | 'register' | 'token' | 'session';
}

/**
 * API error
 */
export interface ApiError extends AppError {
  name: 'ApiError';
  endpoint?: string;
  method?: string;
  responseStatus?: number;
}

/**
 * Not found error
 */
export interface NotFoundError extends AppError {
  name: 'NotFoundError';
  resource: string;
  resourceId?: string;
}

/**
 * Conflict error
 */
export interface ConflictError extends AppError {
  name: 'ConflictError';
  conflictType: string;
  details?: {
    field: string;
    value: unknown;
  };
}

/**
 * Rate limit error
 */
export interface RateLimitError extends AppError {
  name: 'RateLimitError';
  retryAfter?: number;
  limit?: number;
  remaining?: number;
}

/**
 * Error severity levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Error context
 */
export interface ErrorContext {
  userId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  userAgent?: string;
  ip?: string;
  timestamp: Date;
}

/**
 * Error log entry
 */
export interface ErrorLogEntry {
  error: AppError;
  context?: ErrorContext;
  severity: ErrorSeverity;
  loggedAt: Date;
}

/**
 * Error response format
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
  requestId?: string;
}

/**
 * Error codes
 */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'CONFLICT_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'SERVER_ERROR'
  | 'DATABASE_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Error handler function type
 */
export type ErrorHandler = (error: unknown, context?: ErrorContext) => ErrorResponse;

/**
 * Error reporter function type
 */
export type ErrorReporter = (error: AppError, context?: ErrorContext) => Promise<void>;

/**
 * Error recovery strategy
 */
export type ErrorRecoveryStrategy = 
  | 'retry'
  | 'fallback'
  | 'ignore'
  | 'escalate'
  | 'abort';

/**
 * Error recovery options
 */
export interface ErrorRecoveryOptions {
  strategy: ErrorRecoveryStrategy;
  maxRetries?: number;
  retryDelay?: number;
  fallbackValue?: unknown;
  onRetry?: (attempt: number, error: AppError) => void;
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * Error boundary props
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}
