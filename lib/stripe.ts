/**
 * Stripe Client Configuration
 * 
 * This module initializes the Stripe client with environment variables
 * and exports Stripe-related constants from the centralized constants module.
 * 
 * @module lib/stripe
 */

import Stripe from 'stripe';
import { env } from './env';
import { STRIPE_PRICES, STRIPE_API_CONFIG } from './constants/stripe.constants';

/**
 * Stripe client instance
 * Initialized with validated environment variables
 */
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_CONFIG.VERSION,
  typescript: STRIPE_API_CONFIG.TYPESCRIPT,
});

// Re-export Stripe price IDs from constants
export { STRIPE_PRICES };
