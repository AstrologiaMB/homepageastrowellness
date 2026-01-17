/**
 * User Validation Schemas
 *
 * Zod schemas for validating user-related input data.
 *
 * @module lib/validation/user.validation
 */

import { z } from 'zod';

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
 * Password update validation schema
 */
export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters').max(128, 'New password must not exceed 128 characters'),
});

/**
 * Email validation schema
 */
export const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

/**
 * Type exports
 */
export type UpdateProfileDataInput = z.infer<typeof updateProfileDataSchema>;
export type PasswordUpdateInput = z.infer<typeof passwordUpdateSchema>;
export type UserEmailInput = z.infer<typeof emailSchema>;
