import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener datos natales del usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        birthDate: true,
        birthCity: true,
        birthCountry: true,
        birthHour: true,
        birthMinute: true,
        knowsBirthTime: true,
        gender: true,
        residenceCity: true,
        residenceCountry: true,
        timezone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al obtener datos natales:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
