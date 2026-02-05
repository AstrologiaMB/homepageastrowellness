import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getCalendarCache, setCalendarCache } from '@/lib/calendar-cache';
import { setLunarCache } from '@/lib/lunar-cache';
import prisma from '@/lib/prisma';
import { getApiUrl } from '@/lib/api-config';
import { CalendarClient } from '@/lib/api-clients/calendar';

// MICROSERVICE_URL is now retrieved lazily inside the handler to avoid build-time errors

interface NatalData {
  points: {
    [planet: string]: {
      sign: string;
      position: string;
      longitude: number;
      retrograde: boolean;
    };
  };
  houses: {
    [house: string]: {
      sign: string;
      position: string;
      longitude: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    name: string;
    timezone: string;
  };
  hora_local: string;
  name: string;
  year: number;
}

export async function POST(request: NextRequest) {
  // Retrieve configuration lazily inside handler
  const MICROSERVICE_URL = getApiUrl('CALENDARIO');

  try {
    // Obtener sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener datos de la solicitud
    const body = await request.json();
    const natalData: NatalData = body.natalData;
    const forceRecalculate = body.forceRecalculate === true;

    if (!natalData || !natalData.year) {
      return NextResponse.json({ error: 'Datos natales inválidos' }, { status: 400 });
    }

    // Obtener userId desde la base de datos usando el email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const userId = user.id;
    const year = natalData.year;

    console.log(
      `📅 Solicitud de calendario personal: usuario ${userId}, año ${year}, forceRecalculate: ${forceRecalculate}`
    );

    // Intentar obtener del cache (si no es recalculación forzada)
    if (!forceRecalculate) {
      const cachedData = await getCalendarCache(userId, year);

      if (cachedData) {
        console.log(`⚡ Devolviendo desde cache`);
        return NextResponse.json({
          events: cachedData.events,
          calculation_time: 0,
          total_events: cachedData.events.length,
          transits_count: cachedData.events.filter((e: any) => e.tipo_evento?.includes('Tránsito'))
            .length,
          progressed_moon_count: cachedData.events.filter(
            (e: any) => e.tipo_evento === 'Luna Progresada'
          ).length,
          profections_count: cachedData.events.filter(
            (e: any) => e.tipo_evento === 'Profección Anual'
          ).length,
          from_cache: true,
          calculated_at: cachedData.calculatedAt,
          expires_at: cachedData.expiresAt,
        });
      }
    }

    // Cache miss o recalculación forzada: llamar al microservicio
    console.log(`🔄 Calculando eventos (cache miss o recalculación)`);

    const startTime = Date.now();

    // Initialize generated client
    const client = new CalendarClient({ BASE: MICROSERVICE_URL });

    // Adapt legacy NatalData to BirthDataRequest for the NEW strict endpoint
    // natalData.hora_local is typically "YYYY-MM-DDTHH:MM" or similar ISO
    const [birthDate, birthTimeFull] = natalData.hora_local.split('T');
    const birthTime = birthTimeFull ? birthTimeFull.substring(0, 5) : "12:00"; // Ensure HH:MM

    try {
      const data = await client.default.calculatePersonalCalendarDynamicEndpointCalculatePersonalCalendarDynamicPost({
        name: natalData.name,
        birth_date: birthDate,
        birth_time: birthTime,
        location: {
          latitude: natalData.location.latitude,
          longitude: natalData.location.longitude,
          name: natalData.location.name,
          timezone: natalData.location.timezone,
        },
        year: year,
      });

      // Guardar en cache
      const cacheSuccess = await setCalendarCache(userId, year, data.events);

      if (!cacheSuccess) {
        console.warn('⚠️ No se pudo guardar en cache');
      }

      // Guardar en cache lunar (Fases y sus aspectos)
      try {
        const lunarEvents = data.events.filter((e: any) => {
          const isPhaseType = [
            'Luna Nueva',
            'Luna Llena',
            'Cuarto Creciente',
            'Cuarto Menguante',
            'Eclipse Solar',
            'Eclipse Lunar',
          ].includes(e.tipo_evento);
          const isPhaseAspect = e.metadata && (e.metadata as any).phase_type;
          return isPhaseType || isPhaseAspect;
        });

        if (lunarEvents.length > 0) {
          await setLunarCache(userId, year, lunarEvents);
          console.log(`🌙 Guardados ${lunarEvents.length} eventos lunares en cache auxiliar`);
        }
      } catch (lunarError) {
        console.error('Error guardando cache lunar:', lunarError);
      }

      const calculationTime = (Date.now() - startTime) / 1000;

      return NextResponse.json({
        events: data.events,
        calculation_time: calculationTime,
        total_events: data.total_events || data.events.length,
        transits_count: data.transits_count || 0,
        progressed_moon_count: data.progressed_moon_count || 0,
        profections_count: data.profections_count || 0,
        from_cache: false,
      });

    } catch (apiError: any) {
      console.error(`Error del microservicio:`, apiError);
      return NextResponse.json(
        { error: `Error del microservicio: ${apiError.message || apiError}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en API de calendario personal:', error);
    // ... rest of error handling
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        return NextResponse.json(
          { error: 'El cálculo está tomando más tiempo del esperado' },
          { status: 408 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
  }
}

// Endpoint para verificar salud del microservicio
export async function GET() {
  const MICROSERVICE_URL = getApiUrl('CALENDARIO');
  try {
    const response = await fetch(`${MICROSERVICE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    return NextResponse.json({
      available: response.ok,
      status: response.status,
    });
  } catch {
    return NextResponse.json({
      available: false,
      status: 0,
    });
  }
}
