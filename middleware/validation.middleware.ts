/**
 * Validation Middleware
 * 
 * Middleware for validating request input data.
 * 
 * @module middleware/validation.middleware
 */

import { NextRequest, NextResponse } from 'next/server';
import { ValidationError } from '@/lib/errors/ValidationError';
import { logger } from '@/lib/logger';
import { z } from 'zod';

/**
 * Validate request body using Zod schema
 * 
 * @param request - Next.js request object
 * @param schema - Zod schema for validation
 * @returns Promise resolving to validated data or throws error
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    logger.warn('Request validation failed', { error, path: request.nextUrl.pathname });
    throw ValidationError.fromZodError(error);
  }
}

/**
 * Validate query parameters using Zod schema
 *
 * @param request - Next.js request object
 * @param schema - Zod schema for validation
 * @returns Promise resolving to validated data or throws error
 */
export async function validateQueryParams<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries((searchParams as any).entries());

  try {
    return schema.parse(params);
  } catch (error) {
    logger.warn('Query validation failed', { error, path: request.nextUrl.pathname });
    throw ValidationError.fromZodError(error);
  }
}

/**
 * Validate email format
 * 
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * 
 * @param password - Password to validate
 * @returns Object with validation result
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const minLength = 8;
  const maxLength = 128;

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (password.length > maxLength) {
    errors.push(`Password must not exceed ${maxLength} characters`);
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate date string
 * 
 * @param dateString - Date string to validate
 * @returns True if date is valid
 */
export function isValidDateString(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}

/**
 * Sanitize user input
 * 
 * @param input - User input to sanitize
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
