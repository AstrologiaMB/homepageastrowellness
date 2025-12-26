import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación y permisos de admin
    const session = await getServerSession(authOptions)

    if (!session || session.user?.email !== 'info@astrochat.online') {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requieren permisos de administrador.' },
        { status: 403 }
      )
    }

    const userId = params.id
    const { subscriptionStatus, subscriptionExpiresAt } = await request.json()

    // Validar datos de entrada
    if (!subscriptionStatus || !['free', 'premium'].includes(subscriptionStatus)) {
      return NextResponse.json(
        { error: 'Estado de suscripción inválido. Debe ser "free" o "premium".' },
        { status: 400 }
      )
    }

    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado.' },
        { status: 404 }
      )
    }

    // Actualizar usuario (upsert en UserSubscription)
    const status = subscriptionStatus === 'premium' ? 'active' : 'free';
    const hasBaseBundle = status === 'active';

    // Si es free, limpiamos las fechas. Si es active, usamos la fecha manual o +30 días por defecto
    let currentPeriodEnd = new Date();
    if (status === 'active') {
      if (subscriptionExpiresAt) {
        currentPeriodEnd = new Date(subscriptionExpiresAt);
      } else {
        // Default 30 days if not provided
        currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);
      }
    }

    // Upsert UserSubscription
    const subscription = await prisma.userSubscription.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
        stripeSubscriptionId: `manual_${Date.now()}`, // Fake ID for manual override
        stripeCurrentPeriodEnd: currentPeriodEnd,
        status: status,
        hasBaseBundle: hasBaseBundle,
        // Reset entitlements for manual overrides (or keep them?) 
        // For simplicity, manual premium = Base Bundle access.
        hasLunarCalendar: false,
        hasAstrogematria: false,
        hasElectiveChart: false
      },
      update: {
        stripeCurrentPeriodEnd: currentPeriodEnd,
        status: status,
        hasBaseBundle: hasBaseBundle,
        // If switching to free, revoke all. If active, grant Base.
        hasLunarCalendar: status === 'active' ? undefined : false,
        hasAstrogematria: status === 'active' ? undefined : false,
        hasElectiveChart: status === 'active' ? undefined : false,
      }
    });

    return NextResponse.json({
      success: true,
      message: `Suscripción manual actualizada para ${existingUser.email}`
    })

  } catch (error) {
    console.error('Error updating user subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
