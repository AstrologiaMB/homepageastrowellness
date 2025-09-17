import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const path = request.nextUrl.pathname
  
  // No hacer nada si ya estamos en /completar-datos o /auth/login
  if (path === '/completar-datos' || path === '/auth/login') {
    return NextResponse.next()
  }
  
  // Verificar si el usuario está autenticado
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  // Si no está autenticado y está intentando acceder a una ruta protegida
  if (!session && (path.startsWith('/calendario') || path.startsWith('/cartas') || path.startsWith('/rectificacion'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Si está autenticado, verificar si necesita completar datos
  // Nota: No podemos consultar la base de datos directamente desde el middleware
  // Por ahora, usaremos una propiedad en el token para indicar si el usuario tiene datos completos
  // Esta propiedad será añadida por el callback jwt de NextAuth
  if (session?.email) {
    // @ts-ignore - hasCompletedData será añadido por el callback jwt
    const hasCompletedData = session.hasCompletedData === true
    
  if (!hasCompletedData && path !== '/') {
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
