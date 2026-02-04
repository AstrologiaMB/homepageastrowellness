/**
 * Authentication Middleware
 *
 * Middleware for checking if a user is authenticated and has valid session.
 *
 * @module middleware/auth.middleware
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { AuthError } from '@/lib/errors/AuthError';
import { logger } from '@/lib/logger';
import { isAdmin } from '@/services/auth.service';
import prisma from '@/lib/prisma';

/**
 * Check if user is authenticated
 *
 * @param _request - Next.js request object
 * @returns Promise resolving to session or throws error
 */
export async function requireAuth(_request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    logger.warn('Unauthenticated access attempt', { path: _request.nextUrl.pathname });
    throw AuthError.unauthorized('Authentication required');
  }

  return session;
}

/**
 * Check if user is admin
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

/**
 * Get user ID from session
 *
 * @param _request - Next.js request object
 * @returns Promise resolving to user ID or null
 */
export async function getUserIdFromSession(_request: NextRequest): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user?.id ?? null;
}
