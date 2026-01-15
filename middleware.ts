import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { isPremiumService, getRequiredEntitlement } from '@/lib/subscription'
import { getAuthConfig } from '@/lib/auth-utils'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authConfig = getAuthConfig()

  if (path === '/completar-datos' || path === '/auth/login') {
    return NextResponse.next()
  }

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: authConfig.useSecureCookies,
  })

  const cookies = request.cookies.getAll()
  const sessionCookie = cookies.find(c => c.name === authConfig.cookieName)

  console.log('🔍 Middleware Debug:')
  console.log('  - Path:', path)
  console.log('  - NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  console.log('  - useSecureCookies:', authConfig.useSecureCookies)
  console.log('  - Expected cookie:', authConfig.cookieName)
  console.log('  - All cookies:', cookies.map(c => c.name))
  console.log('  - Session cookie found:', !!sessionCookie)
  console.log('  - Session from getToken:', session ? '✅' : '❌')

  // Si no está autenticado y está intentando acceder a una ruta protegida
  if (!session && (path.startsWith('/calendario') || path.startsWith('/cartas') || path.startsWith('/rectificacion') || path.startsWith('/astrogematria'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Si está autenticado, verificar permisos de suscripción
  if (session?.email) {
    const requiredEntitlement = getRequiredEntitlement(path)

    if (requiredEntitlement) {
      // @ts-ignore
      const entitlements = (session.entitlements as any) || {}
      const hasAccess = entitlements[requiredEntitlement] === true

      // Si no tiene el acceso requerido, redirigir a upgrade
      if (!hasAccess) {
        const url = new URL('/upgrade', request.url)
        url.searchParams.set('callbackUrl', path)
        return NextResponse.redirect(url)
      }
    }
  }

  // Si está autenticado, verificar si necesita completar datos
  // Nota: No podemos consultar la base de datos directamente desde el middleware
  // Por ahora, usaremos una propiedad en el token para indicar si el usuario tiene datos completos
  // Esta propiedad será añadida por el callback jwt de NextAuth
  if (session?.email) {
    // @ts-ignore - hasCompletedData será añadido por el callback jwt
    const hasCompletedData = session.hasCompletedData === true

    if (!hasCompletedData && path !== '/' && path !== '/calendario/general' && path !== '/upgrade' && path !== '/rectificacion-carta' && path !== '/cartas/horaria') {
      const url = new URL('/completar-datos', request.url);
      // Añadir la URL original como parámetro de consulta para redirigir después
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next()
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
