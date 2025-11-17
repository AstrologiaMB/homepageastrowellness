// ⚠️ ARCHIVO TEMPORAL PARA DEBUG - ELIMINAR DESPUÉS DE RESOLVER EL ISSUE
// Este endpoint ayuda a diagnosticar problemas de suscripción entre middleware, JWT y DB

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    // 1. Obtener token JWT (lo que usa el middleware)
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // 2. Obtener sesión (lo que usan los componentes React)
    const session = await getServerSession(authOptions)

    // 3. Consultar DB directamente
    const dbUser = session?.user?.email 
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { 
            email: true,
            subscriptionStatus: true,
            subscriptionExpiresAt: true,
            updatedAt: true
          }
        })
      : null

    // 4. Comparar todo
    const tokenStatus = token?.subscriptionStatus || null
    const sessionStatus = (session as any)?.subscriptionStatus || null
    const dbStatus = dbUser?.subscriptionStatus || null

    const middlewareWillBlock = tokenStatus !== 'premium'

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      
      // Lo que ve el middleware
      tokenData: {
        exists: !!token,
        email: token?.email || null,
        subscriptionStatus: tokenStatus,
        name: token?.name || null,
        hasDataCompleto: token?.hasDataCompleto || null,
      },
      
      // Lo que ven los componentes
      sessionData: {
        exists: !!session,
        email: session?.user?.email || null,
        subscriptionStatus: sessionStatus,
      },
      
      // Lo que dice la base de datos
      databaseData: dbUser,
      
      // Análisis
      analysis: {
        middlewareWillBlock,
        allMatch: tokenStatus === sessionStatus && sessionStatus === dbStatus,
        tokenVsDb: tokenStatus === dbStatus ? '✅ Match' : '❌ Mismatch',
        sessionVsDb: sessionStatus === dbStatus ? '✅ Match' : '❌ Mismatch',
        recommendation: middlewareWillBlock && dbStatus === 'premium' 
          ? 'El middleware bloqueará aunque DB dice premium. Problema de sincronización de token.'
          : middlewareWillBlock 
            ? 'El middleware bloqueará correctamente (usuario no premium)'
            : 'El middleware permitirá acceso'
      },
      
      // Info del entorno
      config: {
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    }, { status: 200 })

  } catch (error) {
    console.error('[DEBUG] Error en subscription-status endpoint:', error)
    return NextResponse.json({
      error: String(error),
      message: 'Error en debug endpoint',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
