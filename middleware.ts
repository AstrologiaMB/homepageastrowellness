import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRequiredEntitlement } from '@/lib/subscription'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and authentication pages
  if (path.startsWith('/api') || path.startsWith('/_next') || path.startsWith('/auth')) {
    return NextResponse.next()
  }

  // Skip middleware for public routes
  if (path === '/' || path.startsWith('/legal')) {
    return NextResponse.next()
  }

  // All authentication and authorization are now handled client-side
  // via ProtectedPage and PremiumGate components using useAuth() and useSession()
  // Middleware now only serves as a pass-through layer

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
