import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function DELETE() {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Eliminar todas las cartas natales en caché para este usuario
    const deletedRecords = await prisma.cartaNatal.deleteMany({
      where: { userId: user.id },
    });

    console.log(
      `Caché limpiado para usuario ${user.email}: ${deletedRecords.count} registros eliminados`
    );

    return NextResponse.json({
      success: true,
      message: `Caché limpiado exitosamente. ${deletedRecords.count} registros eliminados.`,
      userId: user.id,
      userEmail: user.email,
      deletedCount: deletedRecords.count,
    });
  } catch (error) {
    console.error('Error limpiando caché:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
