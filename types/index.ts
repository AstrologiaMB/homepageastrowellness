/**
 * Type Definitions Barrel File
 *
 * This file exports all type definitions from the types directory
 * for easy importing throughout the application.
 *
 * @module types
 */

// Export from auth.types (excluding types that conflict with other files)
export type { AuthContextType, User } from './auth.types';

// Export from api.types (excluding types that conflict with other files)
export type { ApiResponse, PaginatedResponse, PaginationParams } from './api.types';

// Export from subscription.types (excluding types that conflict with other files)
export type {
  CheckoutSessionData,
  CheckoutSessionResponse,
  CustomerPortalResponse, EntitlementKey, PriceType, SubscriptionFeatureAccess, SubscriptionInterval,
  SubscriptionPlanDetails, SubscriptionPlanType, SubscriptionSummary, SubscriptionUpdateData, UserSubscription, WebhookEventData, WebhookEventType
} from './subscription.types';

// Export from astrology.types
export * from './astrology.types';

// Export from errors.types (excluding types that conflict with other files)
export type {
  AppError, ConflictError, ErrorBoundaryProps, ErrorBoundaryState, ErrorCode, ErrorContext, ErrorHandler, ErrorLogEntry, ErrorRecoveryOptions, ErrorRecoveryStrategy, ErrorReporter, ErrorResponse, ErrorSeverity, NotFoundError, RateLimitError
} from './errors.types';

// Re-export commonly used types that may have conflicts
export type { ApiError, ValidationError } from './errors.types';
export type { SubscriptionStatus, UserEntitlements } from './subscription.types';
