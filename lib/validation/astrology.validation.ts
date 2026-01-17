/**
 * Astrology Validation Schemas
 *
 * Zod schemas for validating astrology-related input data.
 *
 * @module lib/validation/astrology.validation
 */

import { z } from 'zod';

/**
 * Chart calculation request validation schema
 */
export const chartCalculationRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  chartType: z.enum(['tropical', 'draconica'], {
    message: 'Chart type must be either tropical or draconica',
  }),
  forceRecalculate: z.boolean().default(false),
});

/**
 * Chart interpretation request validation schema
 */
export const chartInterpretationRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  chartType: z.enum(['tropical', 'draconica'], {
    message: 'Chart type must be either tropical or draconica',
  }),
});

/**
 * Calendar request validation schema
 */
export const calendarRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  year: z.number().min(1900).max(2100, 'Year must be between 1900 and 2100'),
  forceRecalculate: z.boolean().default(false),
});

/**
 * Astrogematria calculation request validation schema
 */
export const astrogematriaRequestSchema = z.object({
  palabra: z.string().min(1, 'Word is required').max(100, 'Word must not exceed 100 characters'),
});

/**
 * Type exports
 */
export type ChartCalculationRequest = z.infer<typeof chartCalculationRequestSchema>;
export type ChartInterpretationRequest = z.infer<typeof chartInterpretationRequestSchema>;
export type CalendarRequest = z.infer<typeof calendarRequestSchema>;
export type AstrogematriaRequest = z.infer<typeof astrogematriaRequestSchema>;
