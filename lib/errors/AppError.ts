/**
 * Base Application Error Class
 *
 * Custom error class that extends the built-in Error class
 * with additional properties for consistent error handling.
 *
 * @module lib/errors/AppError
 */

import type { AppError as AppErrorType } from '@/types/errors.types';

/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error implements AppErrorType {
  public readonly name: string;
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: Record<string, unknown>
  ) {
    super(message);

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    this.details = details;
  }

  /**
   * Convert error to JSON-serializable object
   */
  toJSON(): AppErrorType {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      timestamp: this.timestamp,
      details: this.details,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }

  /**
   * Check if error is operational (expected vs unexpected)
   */
  isOperationalError(): boolean {
    return this.isOperational;
  }

  /**
   * Create error from unknown error type
   */
  static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message, 'UNKNOWN_ERROR', 500, true, { originalError: error.name });
    }

    if (typeof error === 'string') {
      return new AppError(error, 'UNKNOWN_ERROR', 500, true);
    }

    return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 500, true);
  }
}
