import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

const FASTAPI_URL = 'http://localhost:8001';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
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
        knowsBirthTime: true
      }
    });

    if (!user || !user.birthDate || !user.birthCity) {
      return NextResponse.json({ 
        error: 'Datos de nacimiento incompletos. Por favor completa tu perfil.' 
      }, { status: 400 });
    }

    // Preparar datos para FastAPI - usar métodos UTC para fecha correcta
    const fechaNacimiento = `${user.birthDate.getUTCFullYear()}-${(user.birthDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${user.birthDate.getUTCDate().toString().padStart(2, '0')}`;
    const horaNacimiento = user.knowsBirthTime && user.birthHour !== null
      ? `${user.birthHour.toString().padStart(2, '0')}:${user.birthMinute?.toString().padStart(2, '0') || '00'}`
      : '12:00';

    const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;

    // Verificar caché
    const cartaExistente = await prisma.cartaNatal.findUnique({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'draconica',
          fechaNacimiento: user.birthDate,
          lugarNacimiento
        }
      }
    });

    if (cartaExistente) {
      return NextResponse.json({
        success: true,
        data: JSON.parse(cartaExistente.dataCompleta),
        data_reducido: JSON.parse(cartaExistente.dataReducida),
        cached: true,
        timestamp: cartaExistente.createdAt
      });
    }

    // Llamar a FastAPI
    console.log('Llamando a FastAPI para calcular carta dracónica...');
    const fastApiResponse = await fetch(`${FASTAPI_URL}/carta-natal/draconica`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: user.name || 'Usuario',
        fecha_nacimiento: fechaNacimiento,
        hora_nacimiento: horaNacimiento,
        ciudad_nacimiento: user.birthCity,
        pais_nacimiento: user.birthCountry
      })
    });

    if (!fastApiResponse.ok) {
      const errorText = await fastApiResponse.text();
      console.error('Error en FastAPI:', errorText);
      throw new Error(`Error en FastAPI: ${fastApiResponse.status}`);
    }

    const resultado = await fastApiResponse.json();

    if (!resultado.success) {
      throw new Error(resultado.error || 'Error calculando carta dracónica');
    }

    // Guardar en caché
    await prisma.cartaNatal.create({
      data: {
        userId: user.id,
        tipo: 'draconica',
        dataCompleta: JSON.stringify(resultado.data),
        dataReducida: JSON.stringify(resultado.data_reducido),
        fechaNacimiento: user.birthDate,
        lugarNacimiento
      }
    });

    console.log('Carta dracónica calculada y guardada en caché');

    return NextResponse.json({
      success: true,
      data: resultado.data,
      data_reducido: resultado.data_reducido,
      cached: false,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error en API Gateway:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error interno del servidor' 
    }, { status: 500 });
  }
}
