import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { getCartaElectivaClient } from '@/lib/api-clients/carta-electiva-client';
import type { BusquedaRequest } from '@/lib/api-clients/carta-electiva';

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
        timezone: true,
        knowsBirthTime: true,
      },
    });

    if (!user || !user.birthDate || !user.birthCity || !user.birthCountry) {
      return NextResponse.json(
        {
          error: 'Datos de nacimiento incompletos. Por favor completa tu perfil en Configuración.',
        },
        { status: 400 }
      );
    }

    // Obtener parámetros del request
    const { tema, fecha_inicio, dias } = await request.json();

    // Validar parámetros requeridos
    if (!tema || !fecha_inicio || !dias) {
      return NextResponse.json(
        {
          error: 'Parámetros requeridos: tema, fecha_inicio, dias',
        },
        { status: 400 }
      );
    }

    // Preparar ubicación basada en datos del usuario
    const ubicacion = {
      ciudad: user.birthCity,
      pais: user.birthCountry,
    };

    // Preparar datos de carta natal
    const cartaNatal = {
      fecha_nacimiento: user.birthDate.toISOString().split('T')[0], // YYYY-MM-DD
      hora_nacimiento:
        user.birthHour && user.birthMinute
          ? `${user.birthHour.toString().padStart(2, '0')}:${user.birthMinute.toString().padStart(2, '0')}`
          : '12:00', // Hora por defecto si no se conoce
      ciudad: user.birthCity,
      pais: user.birthCountry,
      timezone: user.timezone || 'America/Argentina/Buenos_Aires', // Default timezone
    };

    // Preparar payload para el microservicio
    const payload: BusquedaRequest = {
      user_id: user.id,
      tema: tema,
      fecha_inicio: fecha_inicio,
      dias: dias,
      ubicacion: ubicacion,
      carta_natal: cartaNatal,
    };

    console.log('🔍 Buscando momentos electivos:', {
      user: session.user.email,
      tema,
      fecha_inicio,
      dias,
      ubicacion,
    });

    // Llamar al microservicio de carta electiva
    const client = getCartaElectivaClient();
    let taskResponse;

    try {
      taskResponse = await client.default.buscarBuscarPost(payload);
    } catch (error: any) {
      console.error('Error en microservicio carta electiva:', error);

      // Mapeo básico de errores basado en status
      if (error.status === 408) { // Timeout logic handled in client/backend
        throw new Error('La búsqueda tomó demasiado tiempo.');
      }
      if (error.status === 503) {
        throw new Error('Servicio no disponible.');
      }

      throw new Error(error.body?.error || error.message || 'Error desconocido en servicio');
    }

    if (!taskResponse.success) {
      throw new Error(taskResponse.error || 'Error procesando la búsqueda de carta electiva');
    }

    console.log('✅ Búsqueda completada (Async Task Started):', {
      task_id: taskResponse.task_id
    });

    return NextResponse.json(taskResponse);
  } catch (error) {
    console.error('Error en API carta electiva:', error);

    // Determinar el tipo de error y código de estado apropiado
    let statusCode = 500;
    let errorMessage = 'Error interno del servidor';

    if (error instanceof Error) {
      if (error.message.includes('fetch') || error.message.includes('ECONNREFUSED')) {
        statusCode = 503;
        errorMessage =
          'Servicio de carta electiva no disponible. Verifica que el servidor esté ejecutándose.';
      } else if (
        error.message.includes('autenticado') ||
        error.message.includes('No autenticado')
      ) {
        statusCode = 401;
        errorMessage = 'Sesión expirada. Por favor inicia sesión nuevamente.';
      } else if (error.message.includes('incompletos') || error.message.includes('requeridos')) {
        statusCode = 400;
        errorMessage = error.message;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
