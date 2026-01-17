/**
 * Authentication Validation Schemas
 * 
 * Zod schemas for validating authentication-related input data.
 * 
 * @module lib/validation/auth.validation
 */

import { z } from 'zod';
import { PASSWORD_REQUIREMENTS } from '@/lib/constants/auth.constants';

/**
 * Login credentials validation schema
 */
export const loginCredentialsSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(PASSWORD_REQUIREMENTS.MIN_LENGTH, 'Password must be at least 8 characters'),
});

/**
 * Registration data validation schema
 */
export const registerDataSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(PASSWORD_REQUIREMENTS.MIN_LENGTH, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters'),
});

/**
 * Password reset request validation schema
 */
export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email format'),
});

/**
 * Password reset data validation schema
 */
export const passwordResetDataSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(PASSWORD_REQUIREMENTS.MIN_LENGTH, 'Password must be at least 8 characters'),
});

/**
 * User profile update validation schema
 */
export const updateProfileDataSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters').optional(),
  image: z.string().url('Invalid image URL').optional(),
  birthDate: z.coerce.date().optional(),
  birthCity: z.string().min(1, 'Birth city is required').max(100, 'Birth city must not exceed 100 characters').optional(),
  birthCountry: z.string().min(1, 'Birth country is required').max(100, 'Birth country must not exceed 100 characters').optional(),
  residenceCity: z.string().min(1, 'Residence city is required').max(100, 'Residence city must not exceed 100 characters').optional(),
  gender: z.enum(['masculino', 'femenino']).optional(),
});

/**
 * Email validation schema
 */
export const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

/**
 * Password validation schema
 */
export const passwordSchema = z.object({
  password: z.string().min(PASSWORD_REQUIREMENTS.MIN_LENGTH, 'Password must be at least 8 characters'),
});

/**
 * Type exports
 */
export type LoginCredentialsInput = z.infer<typeof loginCredentialsSchema>;
export type RegisterDataInput = z.infer<typeof registerDataSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetDataInput = z.infer<typeof passwordResetDataSchema>;
export type UpdateProfileDataInput = z.infer<typeof updateProfileDataSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
