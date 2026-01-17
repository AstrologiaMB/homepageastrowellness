/**
 * Subscription Types
 * 
 * Type definitions for subscription and payment-related functionality.
 * Includes subscription plans, entitlements, and Stripe-related types.
 * 
 * @module types/subscription.types
 */

/**
 * Subscription plan types
 */
export type SubscriptionPlanType = 'base_bundle' | 'lunar_calendar' | 'astrogematria' | 'elective_chart' | 'draconic_chart';

/**
 * Subscription interval types
 */
export type SubscriptionInterval = 'month' | 'year' | 'one_time';

/**
 * Subscription status types
 */
export type SubscriptionStatus = 'free' | 'active' | 'cancelled' | 'expired' | 'past_due' | 'incomplete' | 'trialing' | 'unpaid';

/**
 * User entitlements
 */
export interface UserEntitlements {
  /** Has access to base bundle */
  hasBaseBundle: boolean;
  /** Has access to lunar calendar */
  hasLunarCalendar: boolean;
  /** Has access to astrogematria */
  hasAstrogematria: boolean;
  /** Has access to elective chart */
  hasElectiveChart: boolean;
  /** Has access to draconic chart */
  hasDraconicAccess: boolean;
  /** Subscription status */
  status: SubscriptionStatus;
}

/**
 * Subscription plan details
 */
export interface SubscriptionPlanDetails {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: SubscriptionInterval;
  entitlements: Partial<UserEntitlements>;
  stripePriceId: string;
  isActive: boolean;
}

/**
 * User subscription
 */
export interface UserSubscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: SubscriptionStatus;
  hasBaseBundle: boolean;
  hasLunarCalendar: boolean;
  hasAstrogematria: boolean;
  hasElectiveChart: boolean;
  hasDraconicAccess: boolean;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Checkout session data
 */
export interface CheckoutSessionData {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

/**
 * Checkout session response
 */
export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Customer portal session response
 */
export interface CustomerPortalResponse {
  url: string;
}

/**
 * Subscription update data
 */
export interface SubscriptionUpdateData {
  subscriptionId: string;
  priceId?: string;
  cancelAtPeriodEnd?: boolean;
}

/**
 * Webhook event types
 */
export type WebhookEventType =
  | 'customer.subscription.created'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'
  | 'invoice.payment_succeeded'
  | 'invoice.payment_failed'
  | 'checkout.session.completed';

/**
 * Webhook event data
 */
export interface WebhookEventData {
  eventType: WebhookEventType;
  data: unknown;
  timestamp: number;
}

/**
 * Price type mapping
 */
export type PriceType = 'subscription' | 'one_time';

/**
 * Entitlement key
 */
export type EntitlementKey = 
  | 'hasBaseBundle'
  | 'hasLunarCalendar'
  | 'hasAstrogematria'
  | 'hasElectiveChart'
  | 'hasDraconicAccess';

/**
 * Subscription feature access
 */
export interface SubscriptionFeatureAccess {
  canAccessBaseBundle: boolean;
  canAccessLunarCalendar: boolean;
  canAccessAstrogematria: boolean;
  canAccessElectiveChart: boolean;
  canAccessDraconicChart: boolean;
  reason?: string;
}

/**
 * Subscription summary
 */
export interface SubscriptionSummary {
  status: SubscriptionStatus;
  plan?: string;
  nextBillingDate?: Date;
  willCancelAtPeriodEnd: boolean;
  entitlements: UserEntitlements;
}
