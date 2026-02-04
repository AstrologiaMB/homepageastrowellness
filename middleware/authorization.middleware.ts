/**
 * Authorization Middleware
 *
 * Middleware for checking if a user has the required entitlements
 * to access a specific resource.
 *
 * @module middleware/authorization.middleware
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { AuthError } from '@/lib/errors/AuthError';
import { logger } from '@/lib/logger';
import { isAdmin } from '@/services/auth.service';
import type { UserEntitlements } from '@/types/auth.types';

/**
 * Check if user has specific entitlement
 *
 * @param entitlements - User entitlements
 * @param entitlement - Entitlement to check
 * @returns True if user has the entitlement
 */
function hasEntitlement(
  entitlements: UserEntitlements | null | undefined,
  entitlement: keyof UserEntitlements
): boolean {
  if (!entitlements) {
    return false;
  }
  return entitlements[entitlement] === true;
}

/**
 * Helper to safely cast entitlements from session
 */
function castEntitlements(entitlements: any): UserEntitlements | null {
  if (!entitlements) return null;
  return entitlements as UserEntitlements;
}

/**
 * Require base bundle entitlement
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireBaseBundle(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated base bundle access attempt', { path: request.nextUrl.pathname });
    throw AuthError.unauthorized('Authentication required');
  }

  const entitlements = castEntitlements(session.user.entitlements);

  // Admin users always have access
  if (isAdmin(session.user.email)) {
    return session;
  }

  if (!hasEntitlement(entitlements, 'hasBaseBundle')) {
    logger.warn('Unauthorized base bundle access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Base bundle subscription required');
  }

  return session;
}

/**
 * Require lunar calendar entitlement
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireLunarCalendar(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated lunar calendar access attempt', {
      path: request.nextUrl.pathname,
    });
    throw AuthError.unauthorized('Authentication required');
  }

  const entitlements = castEntitlements(session.user.entitlements);

  // Admin users always have access
  if (isAdmin(session.user.email)) {
    return session;
  }

  if (!hasEntitlement(entitlements, 'hasLunarCalendar')) {
    logger.warn('Unauthorized lunar calendar access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Lunar calendar add-on required');
  }

  return session;
}

/**
 * Require astrogematria entitlement
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireAstrogematria(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated astrogematria access attempt', { path: request.nextUrl.pathname });
    throw AuthError.unauthorized('Authentication required');
  }

  const entitlements = castEntitlements(session.user.entitlements);

  // Admin users always have access
  if (isAdmin(session.user.email)) {
    return session;
  }

  if (!hasEntitlement(entitlements, 'hasAstrogematria')) {
    logger.warn('Unauthorized astrogematria access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Astrogematria add-on required');
  }

  return session;
}

/**
 * Require elective chart entitlement
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireElectiveChart(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated elective chart access attempt', {
      path: request.nextUrl.pathname,
    });
    throw AuthError.unauthorized('Authentication required');
  }

  const entitlements = castEntitlements(session.user.entitlements);

  // Admin users always have access
  if (isAdmin(session.user.email)) {
    return session;
  }

  if (!hasEntitlement(entitlements, 'hasElectiveChart')) {
    logger.warn('Unauthorized elective chart access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Elective chart add-on required');
  }

  return session;
}

/**
 * Require draconic chart entitlement
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireDraconicAccess(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated draconic chart access attempt', {
      path: request.nextUrl.pathname,
    });
    throw AuthError.unauthorized('Authentication required');
  }

  const entitlements = castEntitlements(session.user.entitlements);

  // Admin users always have access
  if (isAdmin(session.user.email)) {
    return session;
  }

  if (!hasEntitlement(entitlements, 'hasDraconicAccess')) {
    logger.warn('Unauthorized draconic chart access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Draconic chart access required');
  }

  return session;
}

/**
 * Require admin role
 *
 * @param request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireAdmin(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated admin access attempt', { path: request.nextUrl.pathname });
    throw AuthError.unauthorized('Authentication required');
  }

  if (!isAdmin(session.user.email)) {
    logger.warn('Unauthorized admin access attempt', {
      email: session.user.email,
      path: request.nextUrl.pathname,
    });
    throw AuthError.forbidden('Admin access required');
  }

  return session;
}
