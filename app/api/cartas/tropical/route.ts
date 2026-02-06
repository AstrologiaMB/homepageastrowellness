import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { getNatalChartClient } from '@/lib/api-clients/natal-chart-client';
import { getApiUrl } from '@/lib/api-config';

export async function POST() {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // [SECURITY] Enforce Base Bundle
    const entitlements = (session.user as any).entitlements || {};
    if (!entitlements.hasBaseBundle) {
      return NextResponse.json({ error: 'Requiere Sscripción Base' }, { status: 403 });
    }

    // Obtener datos del usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        birthDate: true,
        birthCity: true,
        birthCountry: true,
        birthHour: true,
        birthMinute: true,
        knowsBirthTime: true,
      },
    });

    if (!user || !user.birthDate || !user.birthCity || !user.birthCountry) {
      return NextResponse.json(
        {
          error: 'Datos de nacimiento incompletos. Por favor completa tu perfil.',
        },
        { status: 400 }
      );
    }

    // Preparar datos para FastAPI - usar métodos UTC para fecha correcta
    const fechaNacimiento = `${user.birthDate.getUTCFullYear()}-${(user.birthDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${user.birthDate.getUTCDate().toString().padStart(2, '0')}`;
    const horaNacimiento =
      user.knowsBirthTime && user.birthHour !== null
        ? `${user.birthHour.toString().padStart(2, '0')}:${user.birthMinute?.toString().padStart(2, '0') || '00'}`
        : '12:00';

    const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;

    // Verificar caché
    const cartaExistente = await prisma.cartaNatal.findUnique({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'tropical',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
    });

    if (cartaExistente) {
      return NextResponse.json({
        success: true,
        data: JSON.parse(cartaExistente.dataCompleta),
        data_reducido: JSON.parse(cartaExistente.dataReducida),
        cached: true,
        timestamp: cartaExistente.createdAt,
      });
    }

    // Llamar a FastAPI usando el cliente generado
    console.log('Llamando a FastAPI para calcular carta natal (v2)...');

    const client = getNatalChartClient();
    const resultado = await client.default.calcularCartaTropicalCartaNatalTropicalPost({
      nombre: user.name || 'Usuario',
      fecha_nacimiento: fechaNacimiento,
      hora_nacimiento: horaNacimiento,
      ciudad_nacimiento: user.birthCity,
      pais_nacimiento: user.birthCountry,
    });

    /* Response is already parsed by client */

    if (!resultado.success) {
      throw new Error(resultado.error || 'Error calculando carta natal');
    }

    // Guardar en caché
    // Guardar en caché (Upsert para evitar colisiones)
    // Guardar en caché (Upsert para evitar colisiones)
    try {
      await prisma.cartaNatal.upsert({
        where: {
          userId_tipo_fechaNacimiento_lugarNacimiento: {
            userId: user.id,
            tipo: 'tropical',
            fechaNacimiento: user.birthDate,
            lugarNacimiento,
          },
        },
        update: {
          dataCompleta: JSON.stringify(resultado.data),
          dataReducida: JSON.stringify(resultado.data_reducido),
          // No actualizamos fecha/lugar porque son parte de la clave
        },
        create: {
          userId: user.id,
          tipo: 'tropical',
          dataCompleta: JSON.stringify(resultado.data),
          dataReducida: JSON.stringify(resultado.data_reducido),
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      });
    } catch (e: any) {
      if (e.code !== 'P2002') {
        console.error('Error guardando carta tropical:', e);
      } else {
        console.log('Race condition (P2002) ignorada: La carta ya existe.');
      }
    }

    console.log('Carta natal calculada y guardada en caché');

    return NextResponse.json({
      success: true,
      data: resultado.data,
      data_reducido: resultado.data_reducido,
      cached: false,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error en API Gateway:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
