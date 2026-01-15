import { headers } from 'next/headers'
import { NextAuthOptions } from 'next-auth'
import { getBaseAuthOptions } from '@/lib/auth-config'

/**
 * Get the authentication URL dynamically from request headers.
 *
 * Priority order:
 * 1. x-forwarded-host header (most reliable for Fly.io custom domains)
 * 2. host header (fallback)
 * 3. NEXTAUTH_URL environment variable (Fly secret or .env)
 * 4. localhost:3000 (development default)
 *
 * This ensures OAuth callbacks work correctly for both:
 * - astrochat.online (custom domain)
 * - homepageastrowellness.fly.dev (Fly.io default domain)
 *
 * @returns The authentication URL to use for this request
 */
export async function getAuthUrl(): Promise<string> {
  try {
    const headersList = await headers()

    const host = headersList.get('x-forwarded-host') || headersList.get('host')
    const proto = headersList.get('x-forwarded-proto') || 'http'

    if (host && proto) {
      return `${proto}://${host}`
    }
  } catch (error) {
    console.error('Error reading headers for auth URL:', error)
  }

  const envUrl = process.env.NEXTAUTH_URL
  if (envUrl) {
    return envUrl
  }

  return 'http://localhost:3000'
}

/**
 * Get a synchronous version of auth URL (for use in synchronous contexts).
 * Falls back to NEXTAUTH_URL environment variable or localhost:3000.
 */
export function getAuthUrlSync(): string {
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
}

/**
 * Get auth options for use with getServerSession in API routes.
 * This uses the synchronous auth URL which falls back to NEXTAUTH_URL env var.
 *
 * @returns NextAuthOptions configuration
 */
export async function getAuthOptions(): Promise<NextAuthOptions> {
  const authUrl = await getAuthUrl()
  return getBaseAuthOptions()
}

/**
 * Get auth options synchronously (for backward compatibility with existing code).
 * Uses NEXTAUTH_URL environment variable.
 *
 * @returns NextAuthOptions configuration
 */
export function getAuthOptionsSync(): NextAuthOptions {
  return getBaseAuthOptions()
}
