/**
 * Subscription Validation Schemas
 *
 * Zod schemas for validating subscription-related input data.
 *
 * @module lib/validation/subscription.validation
 */

import { STRIPE_PRICES } from '@/lib/constants/stripe.constants';
import { z } from 'zod';

/**
 * Checkout session request validation schema
 */
export const checkoutSessionRequestSchema = z.object({
  items: z.array(z.string().min(1, 'At least one price ID is required')),
  mode: z.enum(['subscription', 'payment'], {
    message: 'Mode must be either subscription or payment',
  }),
});

/**
 * Subscription update validation schema
 */
export const updateSubscriptionRequestSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
});

/**
 * Price ID validation
 */
export const priceIdSchema = z.string().refine((value) => {
  return STRIPE_PRICES[value as keyof typeof STRIPE_PRICES] !== undefined;
}, {
  message: 'Invalid price ID',
});

/**
 * Checkout session request type
 */
export type CheckoutSessionRequest = z.infer<typeof checkoutSessionRequestSchema>;

/**
 * Subscription update request type
 */
export type UpdateSubscriptionRequest = z.infer<typeof updateSubscriptionRequestSchema>;
