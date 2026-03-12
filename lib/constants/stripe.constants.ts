/**
 * Stripe Payment Constants
 * 
 * Centralized constants for Stripe payment processing.
 * Replaces hardcoded Stripe price IDs and configuration.
 * 
 * @module lib/constants/stripe.constants
 */

/**
 * Stripe Product IDs
 * These are stable identifiers that don't change across currencies.
 * Configure prices per currency in the Stripe Dashboard.
 */
/**
 * Stripe Product IDs vary between test and live mode.
 * Set STRIPE_SECRET_KEY to sk_test_* or sk_live_* accordingly.
 */
const isLiveMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_');

export const STRIPE_PRODUCTS = {
  /** Base Bundle - Monthly subscription (Combo Carta Trópica + Calendario Personal) */
  BASE_BUNDLE: isLiveMode ? 'prod_U0HH9GdkxPBYQ2' : 'prod_TeZffWuCsqUpig',
  /** Add-on: Lunar Calendar (Adicional Fases Lunares) */
  ADD_ON_LUNAR: isLiveMode ? 'prod_U0HsqF3MZJhn3W' : 'prod_TeZgBpKPLJucI8',
  /** Add-on: Astrogematria (Adicional Astrogematria) */
  ADD_ON_ASTROGEMATRIA: isLiveMode ? 'prod_U0Hty2QrUAZDTu' : 'prod_TeZgHqJmebqqdc',
  /** Add-on: Elective Chart (Adicional Buenos Momentos) */
  ADD_ON_ELECTIVE: isLiveMode ? 'prod_U0Hu3cZ8Eg9rlj' : 'prod_TeZhbLggR1OduB',
  /** One-time: Draconic Chart (Carta Dracónica) */
  ONE_TIME_DRACONIC: isLiveMode ? 'prod_U0HveyFXiGTUPW' : 'prod_TeZhy8nECIcM8V',
} as const;

/**
 * Stripe Price IDs (USD defaults / legacy)
 * These IDs correspond to products and prices configured in Stripe Dashboard.
 * For multi-currency, use the /api/stripe/prices endpoint to fetch the correct price.
 */
export const STRIPE_PRICES = {
  /** Base Bundle - Monthly subscription */
  BASE_BUNDLE: isLiveMode ? 'price_1T2GiVAOH46vlTg9HybM5B3g' : 'price_1ShGWULOQsTENXFlKx62Lxlx',
  /** Add-on: Lunar Calendar */
  ADD_ON_LUNAR: isLiveMode ? 'price_1T2HJ7AOH46vlTg9y6ijhNeo' : 'price_1ShGX9LOQsTENXFlz3FXikyg',
  /** Add-on: Astrogematria */
  ADD_ON_ASTROGEMATRIA: isLiveMode ? 'price_1T2HJxAOH46vlTg9LpE4TCNl' : 'price_1ShGXVLOQsTENXFlygB8zOK0',
  /** Add-on: Elective Chart */
  ADD_ON_ELECTIVE: isLiveMode ? 'price_1T2HKbAOH46vlTg9TIdlPjO4' : 'price_1ShGY7LOQsTENXFlvmAt6Nk2',
  /** One-time: Draconic Chart */
  ONE_TIME_DRACONIC: isLiveMode ? 'price_1T2HLKAOH46vlTg9DtgeP8kR' : 'price_1ShGYSLOQsTENXFlGVyzY7t4',
} as const;

/**
 * Stripe subscription intervals
 */
export const STRIPE_INTERVALS = {
  /** Monthly subscription */
  MONTHLY: 'month',
  /** Yearly subscription */
  YEARLY: 'year',
  /** One-time payment */
  ONE_TIME: 'one_time',
} as const;

/**
 * Stripe subscription statuses
 */
export const STRIPE_SUBSCRIPTION_STATUS = {
  /** Active subscription */
  ACTIVE: 'active',
  /** Subscription is past due (payment failed) */
  PAST_DUE: 'past_due',
  /** Subscription is cancelled (will end at period end) */
  CANCELLED: 'canceled',
  /** Subscription has ended */
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  /** Subscription is incomplete */
  INCOMPLETE: 'incomplete',
  /** Subscription is trialing */
  TRIALING: 'trialing',
  /** Subscription is unpaid */
  UNPAID: 'unpaid',
} as const;

/**
 * Stripe webhook events
 */
export const STRIPE_WEBHOOK_EVENTS = {
  /** Customer subscription created */
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
  /** Customer subscription updated */
  CUSTOMER_SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  /** Customer subscription deleted */
  CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  /** Invoice payment succeeded */
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  /** Invoice payment failed */
  INVOICE_PAYMENT_FAILED: 'invoice.payment.failed',
  /** Checkout session completed */
  CHECKOUT_SESSION_COMPLETED: 'checkout.session.completed',
} as const;

/**
 * Stripe metadata keys
 * Used to store additional information with Stripe objects
 */
export const STRIPE_METADATA = {
  /** User ID */
  USER_ID: 'userId',
  /** User email */
  USER_EMAIL: 'userEmail',
  /** Price type */
  PRICE_TYPE: 'priceType',
  /** Price ID */
  PRICE_ID: 'priceId',
} as const;

/**
 * Stripe checkout session modes
 */
export const STRIPE_CHECKOUT_MODES = {
  /** Payment mode */
  PAYMENT: 'payment',
  /** Subscription mode */
  SUBSCRIPTION: 'subscription',
  /** Setup mode */
  SETUP: 'setup',
} as const;

/**
 * Stripe currency configuration
 */
export const STRIPE_CURRENCY = {
  /** Default currency code */
  DEFAULT: 'usd',
} as const;

/**
 * Stripe API configuration
 */
export const STRIPE_API_CONFIG = {
  /** API version */
  VERSION: '2025-12-15.clover',
  /** Enable TypeScript types */
  TYPESCRIPT: true,
} as const;

/**
 * Stripe customer portal configuration
 */
export const STRIPE_PORTAL_CONFIG = {
  /** Allow updating subscription */
  ALLOW_UPDATE_SUBSCRIPTION: true,
  /** Allow cancelling subscription */
  ALLOW_CANCEL_SUBSCRIPTION: true,
  /** Default return URL */
  DEFAULT_RETURN_URL: '/upgrade',
} as const;

/**
 * Stripe payment method types
 */
export const STRIPE_PAYMENT_METHOD_TYPES = {
  /** Card payment */
  CARD: 'card',
} as const;

/**
 * Price type mappings (by Price ID - legacy)
 * Maps price IDs to their type (subscription or one-time)
 */
export const PRICE_TYPE_MAPPING: Record<string, 'subscription' | 'one_time'> = {
  [STRIPE_PRICES.BASE_BUNDLE]: 'subscription',
  [STRIPE_PRICES.ADD_ON_LUNAR]: 'subscription',
  [STRIPE_PRICES.ADD_ON_ASTROGEMATRIA]: 'subscription',
  [STRIPE_PRICES.ADD_ON_ELECTIVE]: 'subscription',
  [STRIPE_PRICES.ONE_TIME_DRACONIC]: 'one_time',
} as const;

/**
 * Entitlement mappings (by Price ID - legacy)
 * Maps price IDs to their corresponding entitlement flags
 */
export const ENTITLEMENT_MAPPING: Record<string, 'hasBaseBundle' | 'hasLunarCalendar' | 'hasAstrogematria' | 'hasElectiveChart' | 'hasDraconicAccess'> = {
  [STRIPE_PRICES.BASE_BUNDLE]: 'hasBaseBundle',
  [STRIPE_PRICES.ADD_ON_LUNAR]: 'hasLunarCalendar',
  [STRIPE_PRICES.ADD_ON_ASTROGEMATRIA]: 'hasAstrogematria',
  [STRIPE_PRICES.ADD_ON_ELECTIVE]: 'hasElectiveChart',
  [STRIPE_PRICES.ONE_TIME_DRACONIC]: 'hasDraconicAccess',
} as const;

export type EntitlementKey = 'hasBaseBundle' | 'hasLunarCalendar' | 'hasAstrogematria' | 'hasElectiveChart' | 'hasDraconicAccess';

/**
 * Product-based entitlement mappings (multi-currency safe)
 * Maps Product IDs to their corresponding entitlement flags.
 * Use this instead of ENTITLEMENT_MAPPING when processing subscriptions
 * that may have prices in different currencies.
 */
export const PRODUCT_ENTITLEMENT_MAPPING: Record<string, EntitlementKey> = {
  [STRIPE_PRODUCTS.BASE_BUNDLE]: 'hasBaseBundle',
  [STRIPE_PRODUCTS.ADD_ON_LUNAR]: 'hasLunarCalendar',
  [STRIPE_PRODUCTS.ADD_ON_ASTROGEMATRIA]: 'hasAstrogematria',
  [STRIPE_PRODUCTS.ADD_ON_ELECTIVE]: 'hasElectiveChart',
  [STRIPE_PRODUCTS.ONE_TIME_DRACONIC]: 'hasDraconicAccess',
} as const;
