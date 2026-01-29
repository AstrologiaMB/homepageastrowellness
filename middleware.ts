import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRequiredEntitlement } from '@/lib/subscription';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (path.startsWith('/api') || path.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Check if ONLY_GENERAL_CALENDAR restriction is enabled
  const onlyGeneralCalendar = process.env.ONLY_GENERAL_CALENDAR === 'true';

  if (onlyGeneralCalendar) {
    // Define allowed paths when restriction is active
    const allowedPaths = [
      '/', // Homepage
      '/auth', // Auth routes (matches /auth/*)
      '/calendario/general', // General calendar page
      '/proximamente', // Coming soon page
    ];

    // Check if current path is allowed
    const isAllowed =
      path === '/' ||
      path === '/calendario/general' ||
      path === '/proximamente' ||
      path.startsWith('/auth');

    if (!isAllowed) {
      // Redirect to coming soon page if not allowed
      return NextResponse.redirect(new URL('/proximamente', request.url));
    }
  }

  // Skip middleware for authentication pages
  if (path.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Skip middleware for public routes
  if (path === '/' || path.startsWith('/legal')) {
    return NextResponse.next();
  }

  // All authentication and authorization are now handled client-side
  // via ProtectedPage and PremiumGate components using useAuth() and useSession()
  // Middleware now only serves as a pass-through layer

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
