import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for API routes and static files
  if (path.startsWith('/api') || path.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Check if ONLY_GENERAL_CALENDAR restriction is enabled
  // const onlyGeneralCalendar = process.env.ONLY_GENERAL_CALENDAR === 'true';

  // if (onlyGeneralCalendar) {
  //   // ... logic removed to rely on granular feature flags in components/lib/features.ts ...
  // }

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
