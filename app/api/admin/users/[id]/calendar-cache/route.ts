import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: userId } = await params;
    const session = await getServerSession(authOptions);

    // 1. Verificación estricta de Admin
    if (!session || session.user?.email !== 'info@astrochat.online') {
      return NextResponse.json(
        { error: 'No autorizado. Se requieren privilegios de administrador.' },
        { status: 403 }
      );
    }

    if (!userId) {
      return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }

    // 2. Ejecutar borrado de caché
    const result = await prisma.personalCalendarCache.deleteMany({
      where: {
        userId: userId,
      },
    });

    console.log(
      `[Admin] Caché de calendario limpiada para usuario ${userId}. Registros eliminados: ${result.count}`
    );

    return NextResponse.json({
      message: 'Caché de calendario limpiada exitosamente',
      deletedCount: result.count,
    });
  } catch (error) {
    console.error('Error al limpiar caché de calendario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al limpiar la caché' },
      { status: 500 }
    );
  }
}
