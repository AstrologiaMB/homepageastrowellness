import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getAuthOptionsSync } from '@/lib/auth-url'
import prisma from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación y permisos de admin
    const session = await getServerSession(getAuthOptionsSync())

    if (!session || !["info@astrochat.online", "info@mariablaquier.com"].includes(session.user?.email || "")) {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requieren permisos de administrador.' },
        { status: 403 }
      )
    }

    const userId = params.id
    const data = await request.json()

    console.log(`Admin ${session.user?.email} updated user ${userId}`, data)

    // Preparar fecha si viene
    let birthDateFormatted = undefined;
    if (data.birthDate) {
      const dateStr = data.birthDate as string;
      const [year, month, day] = dateStr.split('-').map(Number);
      birthDateFormatted = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }

    // Actualizar usuario
    // Nota: El admin PUEDE actualizar sin incrementar el contador
    // Y también podría reiniciar el contador si enviara birthDataChangeCount: 0 -> Pero por ahora solo datos de nacimiento
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        birthDate: birthDateFormatted,
        birthCity: data.birthCity,
        birthCountry: data.birthCountry,
        birthHour: data.birthHour !== undefined ? Number(data.birthHour) : undefined,
        birthMinute: data.birthMinute !== undefined ? Number(data.birthMinute) : undefined,
        knowsBirthTime: data.knowsBirthTime !== undefined ? Boolean(data.knowsBirthTime) : undefined,
        gender: data.gender,
        residenceCity: data.residenceCity,
        residenceCountry: data.residenceCountry,
        // Opcional: Permitir al admin resetear el contador
        birthDataChangeCount: data.resetCounter ? 0 : undefined,
      }
    })

    // IMPORTANTE: Invalidar cache de cartas natales
    await prisma.cartaNatal.deleteMany({
      where: { userId: userId }
    })

    return NextResponse.json({
      success: true,
      user: updatedUser
    })

  } catch (error) {
    console.error('Error updating user as admin:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al actualizar el usuario.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación y permisos de admin
    const session = await getServerSession(getAuthOptionsSync())

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
