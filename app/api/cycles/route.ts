import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { getCycleAnalysis } from '@/lib/services/cycles-service';

export async function POST(request: NextRequest) {
  try {
    // 1. Auth Check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // 2. User Lookup
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // 3. Body Parsing
    const body = await request.json();
    const { natalData, targetDate } = body;

    if (!natalData || !targetDate) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (natalData o targetDate)' },
        { status: 400 }
      );
    }

    // Set userId in natalData if needed, but we pass it explicitly
    // natalData.userId = user.id;

    // 4. Service Call
    console.log(`invoking cycle analysis for user ${user.id} date ${targetDate}`);
    const result = await getCycleAnalysis(natalData, targetDate, user.id);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error en API cycles:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
