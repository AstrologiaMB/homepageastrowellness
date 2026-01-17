/**
 * Authentication Constants
 * 
 * Centralized constants for authentication-related functionality.
 * Replaces hardcoded values throughout the codebase.
 * 
 * @module lib/constants/auth.constants
 */

/**
 * Admin email addresses with full system access
 * These users bypass subscription checks and have access to all features
 */
export const ADMIN_EMAILS = [
  'info@astrochat.online',
] as const;

/**
 * JWT token expiration times (in seconds)
 */
export const JWT_EXPIRATION = {
  /** 1 hour in seconds - for password reset tokens */
  PASSWORD_RESET: 60 * 60,
  /** 7 days in seconds - for refresh tokens */
  REFRESH_TOKEN: 60 * 60 * 24 * 7,
  /** 30 days in seconds - for access tokens */
  ACCESS_TOKEN: 60 * 60 * 24 * 30,
} as const;

/**
 * Password requirements
 */
export const PASSWORD_REQUIREMENTS = {
  /** Minimum password length */
  MIN_LENGTH: 8,
  /** Maximum password length */
  MAX_LENGTH: 128,
} as const;

/**
 * Session cookie configuration
 */
export const SESSION_COOKIE = {
  /** Default cookie name prefix */
  PREFIX: 'next-auth.session-token',
  /** Secure cookie name prefix for production */
  SECURE_PREFIX: '__Secure-next-auth.session-token',
  /** Cookie path */
  PATH: '/',
  /** Cookie same-site policy */
  SAME_SITE: 'lax' as const,
  /** HTTP-only flag */
  HTTP_ONLY: true,
} as const;

/**
 * Authentication pages routes
 */
export const AUTH_ROUTES = {
  /** Login page */
  LOGIN: '/auth/login',
  /** Register page */
  REGISTER: '/auth/register',
  /** Forgot password page */
  FORGOT_PASSWORD: '/auth/forgot-password',
  /** Reset password page (with token) */
  RESET_PASSWORD: '/auth/reset-password',
  /** Upgrade/subscription page */
  UPGRADE: '/upgrade',
} as const;

/**
 * User role definitions
 */
export const USER_ROLES = {
  /** Regular user */
  USER: 'user',
  /** Admin user with full access */
  ADMIN: 'admin',
} as const;

/**
 * Subscription status values
 */
export const SUBSCRIPTION_STATUS = {
  /** Free tier user */
  FREE: 'free',
  /** Active subscription */
  ACTIVE: 'active',
  /** Cancelled subscription (still active until period ends) */
  CANCELLED: 'cancelled',
  /** Expired subscription */
  EXPIRED: 'expired',
  /** Payment failed */
  PAST_DUE: 'past_due',
} as const;

/**
 * Default user entitlements (free tier)
 */
export const DEFAULT_ENTITLEMENTS = {
  /** Base bundle access */
  hasBaseBundle: false,
  /** Lunar calendar access */
  hasLunarCalendar: false,
  /** Astrogematria access */
  hasAstrogematria: false,
  /** Elective chart access */
  hasElectiveChart: false,
  /** Draconic chart access */
  hasDraconicAccess: false,
  /** Subscription status */
  status: 'free' as const,
} as const;

/**
 * Admin user entitlements (full access)
 */
export const ADMIN_ENTITLEMENTS = {
  /** Base bundle access */
  hasBaseBundle: true,
  /** Lunar calendar access */
  hasLunarCalendar: true,
  /** Astrogematria access */
  hasAstrogematria: true,
  /** Elective chart access */
  hasElectiveChart: true,
  /** Draconic chart access */
  hasDraconicAccess: true,
  /** Subscription status */
  status: 'active' as const,
} as const;

/**
 * Authentication error messages
 */
export const AUTH_ERROR_MESSAGES = {
  /** Invalid credentials */
  INVALID_CREDENTIALS: 'Invalid email or password',
  /** User not found */
  USER_NOT_FOUND: 'User not found',
  /** Invalid or expired token */
  INVALID_TOKEN: 'Invalid or expired token',
  /** Email already registered */
  EMAIL_EXISTS: 'Email already registered',
  /** Password reset required */
  PASSWORD_RESET_REQUIRED: 'Password reset required',
  /** Session expired */
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
  /** Unauthorized access */
  UNAUTHORIZED: 'Unauthorized access',
  /** Forbidden access */
  FORBIDDEN: 'You do not have permission to access this resource',
} as const;

/**
 * Authentication success messages
 */
export const AUTH_SUCCESS_MESSAGES = {
  /** Login successful */
  LOGIN_SUCCESS: 'Login successful',
  /** Registration successful */
  REGISTER_SUCCESS: 'Registration successful',
  /** Password reset email sent */
  RESET_EMAIL_SENT: 'Password reset email sent',
  /** Password updated successfully */
  PASSWORD_UPDATED: 'Password updated successfully',
  /** Logout successful */
  LOGOUT_SUCCESS: 'Logout successful',
} as const;
