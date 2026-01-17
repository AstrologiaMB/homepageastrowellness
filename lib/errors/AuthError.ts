/**
 * Authentication Error Class
 * 
 * Custom error class for authentication-related errors.
 * Extends AppError with authentication-specific properties.
 * 
 * @module lib/errors/AuthError
 */

import { AppError } from './AppError';
import type { AuthError as AuthErrorType } from '@/types/errors.types';

/**
 * Authentication error class
 * Used for login, registration, token, and session errors
 */
export class AuthError extends AppError implements AuthErrorType {
  public readonly name = 'AuthError';
  public readonly authType?: 'login' | 'register' | 'token' | 'session';

  constructor(
    message: string,
    authType?: 'login' | 'register' | 'token' | 'session',
    code: string = 'AUTHENTICATION_ERROR',
    statusCode: number = 401,
    details?: Record<string, unknown>
  ) {
    super(
      message,
      code,
      statusCode,
      true,
      details
    );

    this.authType = authType;
  }

  /**
   * Create error for invalid credentials
   */
  static invalidCredentials(): AuthError {
    return new AuthError(
      'Invalid email or password',
      'login',
      'INVALID_CREDENTIALS',
      401
    );
  }

  /**
   * Create error for user not found
   */
  static userNotFound(): AuthError {
    return new AuthError(
      'User not found',
      'login',
      'USER_NOT_FOUND',
      404
    );
  }

  /**
   * Create error for invalid or expired token
   */
  static invalidToken(): AuthError {
    return new AuthError(
      'Invalid or expired token',
      'token',
      'INVALID_TOKEN',
      401
    );
  }

  /**
   * Create error for email already registered
   */
  static emailExists(): AuthError {
    return new AuthError(
      'Email already registered',
      'register',
      'EMAIL_EXISTS',
      409
    );
  }

  /**
   * Create error for password reset required
   */
  static passwordResetRequired(): AuthError {
    return new AuthError(
      'Password reset required',
      'login',
      'PASSWORD_RESET_REQUIRED',
      403
    );
  }

  /**
   * Create error for expired session
   */
  static sessionExpired(): AuthError {
    return new AuthError(
      'Your session has expired. Please log in again',
      'session',
      'SESSION_EXPIRED',
      401
    );
  }

  /**
   * Create error for unauthorized access
   */
  static unauthorized(message: string = 'Unauthorized access'): AuthError {
    return new AuthError(
      message,
      'token',
      'UNAUTHORIZED',
      401
    );
  }

  /**
   * Create error for forbidden access
   */
  static forbidden(message: string = 'You do not have permission to access this resource'): AuthError {
    return new AuthError(
      message,
      'token',
      'FORBIDDEN',
      403
    );
  }
}
