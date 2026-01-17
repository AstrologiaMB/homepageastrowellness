/**
 * Subscription Service
 *
 * Business logic for subscription management including checkout sessions,
 * customer portal, subscription updates, and entitlement management.
 *
 * @module services/subscription.service
 */

import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { ApiError } from '@/lib/errors/ApiError';
import {
  STRIPE_PRICES,
  PRICE_TYPE_MAPPING,
  ENTITLEMENT_MAPPING,
} from '@/lib/constants/stripe.constants';
import type { UserEntitlements } from '@/types/auth.types';

/**
 * Create a Stripe checkout session
 *
 * @param userId - User ID
 * @param items - Array of price IDs to purchase
 * @param mode - Checkout mode ('subscription' or 'payment')
 * @returns Promise resolving to checkout session URL
 * @throws {ApiError} If checkout session creation fails
 */
export async function createCheckoutSession(
  userId: string,
  items: string[],
  mode: 'subscription' | 'payment' = 'subscription'
): Promise<{ url: string }> {
  // Get user from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    throw new ApiError('User not found', undefined, undefined, 404, 'NOT_FOUND_ERROR', 404);
  }

  let customerId = user.stripeCustomerId;

  // Create Stripe customer if not exists
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name || undefined,
    });
    customerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });

    logger.info('Created Stripe customer for user', { userId, customerId });
  }

  // Check for existing active subscription
  if (mode === 'subscription' && user.subscription?.status === 'active') {
    // Create portal session instead for existing subscription
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXTAUTH_URL}/upgrade`,
    });
    return { url: portalSession.url };
  }

  // Prepare line items
  const lineItems = items.map((priceId) => ({
    price: priceId,
    quantity: 1,
  }));

  // Create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: mode,
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.NEXTAUTH_URL}/upgrade?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
    metadata: {
      userId: user.id,
    },
    allow_promotion_codes: true,
  });

  if (!checkoutSession.url) {
    throw new ApiError(
      'Failed to create checkout session URL',
      undefined,
      undefined,
      500,
      'SERVER_ERROR',
      500
    );
  }

  logger.info('Created checkout session', {
    userId,
    sessionId: checkoutSession.id,
    mode,
    items,
  });

  return { url: checkoutSession.url };
}

/**
 * Create a Stripe customer portal session
 *
 * @param userId - User ID
 * @returns Promise resolving to portal session URL
 * @throws {ApiError} If portal session creation fails
 */
export async function createPortalSession(userId: string): Promise<{ url: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.stripeCustomerId) {
    throw new ApiError(
      'No Stripe customer found',
      undefined,
      undefined,
      404,
      'NOT_FOUND_ERROR',
      404
    );
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXTAUTH_URL}/upgrade`,
  });

  logger.info('Created portal session', { userId, sessionId: portalSession.id });

  return { url: portalSession.url };
}

/**
 * Update subscription from Stripe webhook
 *
 * @param subscriptionId - Stripe subscription ID
 * @param status - New subscription status
 * @param priceId - Stripe price ID
 */
export async function updateSubscriptionFromWebhook(
  subscriptionId: string,
  status: string,
  priceId?: string
): Promise<void> {
  // Find subscription by Stripe ID
  const subscription = await prisma.userSubscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
    include: { user: true },
  });

  if (!subscription) {
    logger.warn('Subscription not found in webhook', { subscriptionId });
    return;
  }

  // Update subscription status
  const updateData: any = {
    status,
  };

  // Update price ID if provided
  if (priceId) {
    updateData.stripePriceId = priceId;

    // Update entitlements based on price
    const entitlementKey = ENTITLEMENT_MAPPING[priceId];
    if (entitlementKey) {
      updateData[entitlementKey] = true;
    }
  }

  await prisma.userSubscription.update({
    where: { id: subscription.id },
    data: updateData,
  });

  logger.info('Subscription updated from webhook', {
    subscriptionId,
    status,
    priceId,
    userId: subscription.userId,
  });
}

/**
 * Create subscription from Stripe checkout
 *
 * @param userId - User ID
 * @param stripeSubscriptionId - Stripe subscription ID
 * @param stripePriceId - Stripe price ID
 * @param stripeCurrentPeriodEnd - Current period end date
 */
export async function createSubscriptionFromCheckout(
  userId: string,
  stripeSubscriptionId: string,
  stripePriceId: string,
  stripeCurrentPeriodEnd: Date
): Promise<void> {
  // Check if user already has subscription
  const existingSubscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  if (existingSubscription) {
    // Update existing subscription
    const entitlementKey = ENTITLEMENT_MAPPING[stripePriceId];
    const updateData: any = {
      stripeSubscriptionId,
      stripePriceId,
      stripeCurrentPeriodEnd,
      status: 'active',
    };

    if (entitlementKey) {
      updateData[entitlementKey] = true;
    }

    await prisma.userSubscription.update({
      where: { userId },
      data: updateData,
    });

    logger.info('Updated existing subscription from checkout', {
      userId,
      stripeSubscriptionId,
      stripePriceId,
    });
  } else {
    // Create new subscription
    const entitlementKey = ENTITLEMENT_MAPPING[stripePriceId];
    const createData: any = {
      userId,
      stripeSubscriptionId,
      stripePriceId,
      stripeCurrentPeriodEnd,
      status: 'active',
      hasBaseBundle: false,
      hasLunarCalendar: false,
      hasAstrogematria: false,
      hasElectiveChart: false,
    };

    if (entitlementKey) {
      createData[entitlementKey] = true;
    }

    await prisma.userSubscription.create({
      data: createData,
    });

    logger.info('Created new subscription from checkout', {
      userId,
      stripeSubscriptionId,
      stripePriceId,
    });
  }
}

/**
 * Cancel subscription
 *
 * @param userId - User ID
 * @returns Promise resolving when subscription is cancelled
 * @throws {ApiError} If cancellation fails
 */
export async function cancelSubscription(userId: string): Promise<void> {
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!subscription) {
    throw new ApiError(
      'No active subscription found',
      undefined,
      undefined,
      404,
      'NOT_FOUND_ERROR',
      404
    );
  }

  if (subscription.stripeSubscriptionId) {
    // Cancel in Stripe
    await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
  }

  // Update in database
  await prisma.userSubscription.update({
    where: { userId },
    data: {
      status: 'cancelled',
      hasBaseBundle: false,
      hasLunarCalendar: false,
      hasAstrogematria: false,
      hasElectiveChart: false,
    },
  });

  logger.info('Subscription cancelled', { userId, subscriptionId: subscription.id });
}

/**
 * Get user entitlements
 *
 * @param userId - User ID
 * @returns Promise resolving to user entitlements
 */
export async function getUserEntitlementsByUserId(userId: string): Promise<UserEntitlements> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user) {
    return {
      hasBaseBundle: false,
      hasLunarCalendar: false,
      hasAstrogematria: false,
      hasElectiveChart: false,
      hasDraconicAccess: false,
      status: 'free',
    };
  }

  const subscription = user.subscription;
  const status = subscription?.status || 'free';

  return {
    hasBaseBundle: subscription?.hasBaseBundle || false,
    hasLunarCalendar: subscription?.hasLunarCalendar || false,
    hasAstrogematria: subscription?.hasAstrogematria || false,
    hasElectiveChart: subscription?.hasElectiveChart || false,
    hasDraconicAccess: false, // TODO: Add to schema if needed
    status: status as any,
  };
}

/**
 * Check if user has specific entitlement
 *
 * @param userId - User ID
 * @param entitlement - Entitlement to check
 * @returns Promise resolving to true if user has entitlement
 */
export async function hasEntitlement(
  userId: string,
  entitlement: keyof UserEntitlements
): Promise<boolean> {
  const entitlements = await getUserEntitlementsByUserId(userId);
  return entitlements[entitlement] === true;
}

/**
 * Get subscription details
 *
 * @param userId - User ID
 * @returns Promise resolving to subscription details
 */
export async function getSubscriptionDetails(userId: string) {
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
    include: { user: true },
  });

  if (!subscription) {
    return null;
  }

  return {
    id: subscription.id,
    status: subscription.status,
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    stripePriceId: subscription.stripePriceId,
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
    hasBaseBundle: subscription.hasBaseBundle,
    hasLunarCalendar: subscription.hasLunarCalendar,
    hasAstrogematria: subscription.hasAstrogematria,
    hasElectiveChart: subscription.hasElectiveChart,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
}

/**
 * Get price type (subscription or one-time)
 *
 * @param priceId - Stripe price ID
 * @returns Price type
 */
export function getPriceType(priceId: string): 'subscription' | 'one_time' {
  return PRICE_TYPE_MAPPING[priceId] || 'one_time';
}

/**
 * Get all available prices
 *
 * @returns Array of available price IDs
 */
export function getAvailablePrices(): string[] {
  return Object.values(STRIPE_PRICES);
}
