/**
 * Authentication Types
 * 
 * Type definitions for authentication-related functionality.
 * Includes user types, session types, and authentication-related interfaces.
 * 
 * @module types/auth.types
 */

/**
 * User entitlements for feature access
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
  status: 'free' | 'active' | 'cancelled' | 'expired' | 'past_due' | 'error';
}

/**
 * Simplified user type for astrology app (no gym-specific fields)
 */
export interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  /** Profile completion status */
  hasCompletedData?: boolean;
  /** Astrology-specific entitlements */
  entitlements?: UserEntitlements;
  /** Legacy subscription status */
  subscriptionStatus?: 'free' | 'premium';
}

/**
 * Authentication context type
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  getAuthHeaders: () => HeadersInit;
  /** Optional: for debugging */
  authSource?: 'custom' | 'google' | null;
}

/**
 * Credentials for login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

/**
 * Password reset request data
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset data
 */
export interface PasswordResetData {
  token: string;
  password: string;
}

/**
 * Password reset token payload
 */
export interface PasswordResetTokenPayload {
  userId: string;
  email: string;
}

/**
 * User session data
 */
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  hasCompletedData?: boolean;
  entitlements?: UserEntitlements;
  subscriptionStatus?: string;
}

/**
 * User profile data
 */
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  image?: string;
  birthDate?: Date | null;
  birthCity?: string | null;
  birthCountry?: string | null;
  birthHour?: number | null;
  birthMinute?: number | null;
  knowsBirthTime?: boolean;
  gender?: string | null;
  residenceCity?: string | null;
  residenceCountry?: string | null;
  birthDataChangeCount?: number;
  hasCompletedData?: boolean;
  termsAccepted?: boolean;
  termsAcceptedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Update profile data
 */
export interface UpdateProfileData {
  name?: string;
  image?: string;
  birthDate?: Date;
  birthCity?: string;
  birthCountry?: string;
  residenceCity?: string;
  gender?: string;
}

/**
 * User role types
 */
export type UserRole = 'user' | 'admin';

/**
 * Subscription status types
 */
export type SubscriptionStatus = 'free' | 'active' | 'cancelled' | 'expired' | 'past_due';

/**
 * Authentication error types
 */
export type AuthErrorType = 
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'INVALID_TOKEN'
  | 'EMAIL_EXISTS'
  | 'PASSWORD_RESET_REQUIRED'
  | 'SESSION_EXPIRED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN';

/**
 * Authentication result
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  errorType?: AuthErrorType;
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  valid: boolean;
  userId?: string;
  email?: string;
  error?: string;
}
