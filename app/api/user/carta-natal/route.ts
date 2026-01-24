import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener parámetros de la URL
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get('tipo') || 'tropical';

    // Obtener datos del usuario para construir la consulta
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        birthDate: true,
        birthCity: true,
        birthCountry: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    if (!user.birthDate || !user.birthCity) {
      return NextResponse.json({ error: 'Faltan datos de nacimiento' }, { status: 400 });
    }

    // Buscar carta natal existente
    const lugarNacimiento = user.birthCountry
      ? `${user.birthCity}, ${user.birthCountry}`
      : user.birthCity;

    const cartaNatal = await prisma.cartaNatal.findFirst({
      where: {
        userId: user.id,
        tipo: tipo,
        fechaNacimiento: user.birthDate,
        lugarNacimiento: lugarNacimiento,
      },
      select: {
        dataCompleta: true,
        dataReducida: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!cartaNatal) {
      return NextResponse.json({ error: 'Carta natal no encontrada' }, { status: 404 });
    }

    return NextResponse.json(cartaNatal);
  } catch (error) {
    console.error('Error al obtener carta natal:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
