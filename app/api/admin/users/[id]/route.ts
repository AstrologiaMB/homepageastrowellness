import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function DELETE(
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

    // Obtener el usuario que se va a eliminar
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    })

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'Usuario no encontrado.' },
        { status: 404 }
      )
    }

    // Protección: Evitar que el admin se elimine a sí mismo
    if (userToDelete.email === session.user.email) {
      return NextResponse.json(
        { error: 'No puedes eliminar tu propia cuenta de administrador.' },
        { status: 400 }
      )
    }

    // Eliminar usuario (cascade automático eliminará registros relacionados)
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Usuario eliminado exitosamente.',
      deletedEmail: userToDelete.email
    })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al eliminar el usuario.' },
      { status: 500 }
    )
  }
}
