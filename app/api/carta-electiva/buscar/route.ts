import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { getApiUrl } from '@/lib/api-config';

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
    const payload = {
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

    // Llamar al microservicio de carta electiva con timeout de 5 minutos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutos

    let cartaElectivaResponse;
    try {
      cartaElectivaResponse = await fetch(`${getApiUrl('CARTA_ELECTIVA')}/buscar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        console.error('⏰ Timeout en API carta electiva (5 min)');
        return NextResponse.json(
          {
            error:
              'La búsqueda tomó más de 5 minutos. Inténtalo con un período más corto (máximo 30 días recomendado).',
          },
          { status: 408 }
        );
      }

      console.error('Error de conexión con carta electiva API:', fetchError);
      return NextResponse.json(
        {
          error:
            'Servicio de carta electiva no disponible. Verifica que el servidor esté ejecutándose.',
        },
        { status: 503 }
      );
    }

    clearTimeout(timeoutId);

    if (!cartaElectivaResponse.ok) {
      const errorData = await cartaElectivaResponse.json().catch(() => ({}));
      console.error('Error en microservicio carta electiva:', errorData);

      // Manejar diferentes tipos de errores
      if (cartaElectivaResponse.status === 408) {
        return NextResponse.json(
          {
            error:
              errorData.detail ||
              'La búsqueda tomó más de 5 minutos. Inténtalo con un período más corto.',
          },
          { status: 408 }
        );
      }

      if (cartaElectivaResponse.status === 503) {
        return NextResponse.json(
          {
            error: 'Servicio de carta electiva no disponible. Inténtalo más tarde.',
          },
          { status: 503 }
        );
      }

      if (cartaElectivaResponse.status === 400) {
        return NextResponse.json(
          {
            error: errorData.detail || 'Parámetros inválidos en la búsqueda.',
          },
          { status: 400 }
        );
      }

      throw new Error(
        errorData.detail ||
          errorData.error ||
          `Error en el servicio de carta electiva: ${cartaElectivaResponse.status}`
      );
    }

    const resultado = await cartaElectivaResponse.json();

    if (!resultado.success) {
      throw new Error(resultado.error || 'Error procesando la búsqueda de carta electiva');
    }

    console.log('✅ Búsqueda completada:', {
      momentos: resultado.data?.momentos?.length || 0,
      tiempo_calculo: resultado.data?.estadisticas?.tiempo_calculo,
    });

    return NextResponse.json({
      success: true,
      data: resultado.data,
      timestamp: new Date().toISOString(),
    });
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
