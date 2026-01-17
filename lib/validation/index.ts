/**
 * Validation Schemas Barrel File
 *
 * This file exports all validation schemas from the validation directory
 * for easy importing throughout the application.
 *
 * @module lib/validation
 */

export * from './astrology.validation';
export * from './auth.validation';
export * from './subscription.validation';
export type { PasswordUpdateInput, UserEmailInput } from './user.validation';
