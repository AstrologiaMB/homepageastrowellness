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

    // Preparar datos de actualización
    const updateData: any = {
      subscriptionStatus,
      updatedAt: new Date()
    }

    // Si es premium, manejar fecha de expiración
    if (subscriptionStatus === 'premium') {
      if (subscriptionExpiresAt) {
        updateData.subscriptionExpiresAt = new Date(subscriptionExpiresAt)
      } else {
        // Si no se proporciona fecha de expiración, mantener la existente o no establecer
        // Esto permite suscripciones premium sin fecha de expiración (control manual)
      }
    } else {
      // Si cambia a free, limpiar fecha de expiración
      updateData.subscriptionExpiresAt = null
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionStatus: true,
        subscriptionExpiresAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Suscripción de ${updatedUser.email} actualizada a ${subscriptionStatus}`
    })

  } catch (error) {
    console.error('Error updating user subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
