/**
 * Validation Error Class
 * 
 * Custom error class for validation-related errors.
 * Extends AppError with validation-specific properties.
 * 
 * @module lib/errors/ValidationError
 */

import { AppError } from './AppError';
import type { ValidationError as ValidationErrorType } from '@/types/errors.types';

/**
 * Validation error class
 * Used when input validation fails
 */
export class ValidationError extends AppError implements ValidationErrorType {
  public readonly name = 'ValidationError';
  public readonly field?: string;
  public readonly validationErrors?: Array<{
    field: string;
    message: string;
    code?: string;
  }>;

  constructor(
    message: string,
    field?: string,
    validationErrors?: Array<{
      field: string;
      message: string;
      code?: string;
    }>,
    details?: Record<string, unknown>
  ) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      true,
      details
    );

    this.field = field;
    this.validationErrors = validationErrors;
  }

  /**
   * Create validation error from Zod error
   */
  static fromZodError(zodError: unknown): ValidationError {
    const validationErrors: Array<{
      field: string;
      message: string;
      code?: string;
    }> = [];

    if (zodError && typeof zodError === 'object' && 'issues' in zodError) {
      const issues = (zodError as { issues: Array<{ path: (string | number)[]; message: string }> }).issues;
      
      for (const issue of issues) {
        validationErrors.push({
          field: issue.path.join('.'),
          message: issue.message,
          code: 'ZOD_VALIDATION',
        });
      }
    }

    return new ValidationError(
      'Validation failed',
      undefined,
      validationErrors,
      { zodError }
    );
  }

  /**
   * Create validation error for a specific field
   */
  static forField(field: string, message: string): ValidationError {
    return new ValidationError(
      message,
      field,
      [{ field, message, code: 'FIELD_VALIDATION' }],
      { field }
    );
  }

  /**
   * Create validation error for multiple fields
   */
  static forMultipleFields(errors: Array<{ field: string; message: string }>): ValidationError {
    const validationErrors = errors.map(e => ({
      field: e.field,
      message: e.message,
      code: 'FIELD_VALIDATION' as const,
    }));

    return new ValidationError(
      'Multiple validation errors occurred',
      undefined,
      validationErrors,
      { errorCount: errors.length }
    );
  }

  /**
   * Get all error messages as a single string
   */
  getErrorMessage(): string {
    if (this.validationErrors && this.validationErrors.length > 0) {
      return this.validationErrors
        .map(e => `${e.field}: ${e.message}`)
        .join(', ');
    }
    return this.message;
  }
}
