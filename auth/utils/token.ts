/**
 * Token Utilities
 *
 * Utilities for managing authentication tokens in localStorage.
 */

import { simpleStorage } from './storage';

// Token storage keys
export const TOKEN_KEYS = {
  user: 'auth_user_token',
} as const;

export type AuthRole = keyof typeof TOKEN_KEYS;

/**
 * Save authentication token
 */
export function saveToken(role: AuthRole, token: string): void {
  simpleStorage.set(TOKEN_KEYS[role], token);
}

/**
 * Load authentication token
 */
export function loadToken(role: AuthRole): string | null {
  return simpleStorage.get(TOKEN_KEYS[role]);
}

/**
 * Clear authentication token
 */
export function clearToken(role: AuthRole): void {
  simpleStorage.remove(TOKEN_KEYS[role]);
}

/**
 * Clear all authentication tokens
 */
export function clearAllTokens(): void {
  Object.values(TOKEN_KEYS).forEach((key) => {
    simpleStorage.remove(key);
  });
}

/**
 * Get the active token (checks all roles)
 */
export function getActiveToken(): string | null {
  // Check in order: admin, user, trainer
  return (
    loadToken('user')
  );
}

/**
 * Get the role of the active token
 */
export function getActiveRole(): AuthRole | null {
  if (loadToken('user')) return 'user';
  return null;
}

/**
 * Check if any authentication token exists
 */
export function hasAnyToken(): boolean {
  return getActiveToken() !== null;
}

/**
 * Parse JWT token to get payload (without verification)
 */
export function parseJwtPayload<T = Record<string, unknown>>(token: string): T | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = parseJwtPayload<{ exp?: number }>(token);
  if (!payload?.exp) return true;

  const expirationDate = new Date(payload.exp * 1000);
  return new Date() > expirationDate;
}

/**
 * Get token expiration date
 */
export function getTokenExpiration(token: string): Date | null {
  const payload = parseJwtPayload<{ exp?: number }>(token);
  if (!payload?.exp) return null;

  return new Date(payload.exp * 1000);
}

/**
 * Create authorization headers
 */
export function createAuthHeaders(token?: string | null): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const authToken = token || getActiveToken();
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
}
