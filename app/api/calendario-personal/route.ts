import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCalendarCache, setCalendarCache } from '@/lib/calendar-cache';

const MICROSERVICE_URL = 'http://localhost:8004';
const TIMEOUT_MS = 30000; // 30 segundos

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
  try {
    // Obtener sesión del usuario
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Obtener datos de la solicitud
    const body = await request.json();
    const natalData: NatalData = body.natalData;
    const forceRecalculate = body.forceRecalculate === true;

    if (!natalData || !natalData.year) {
      return NextResponse.json(
        { error: 'Datos natales inválidos' },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;
    const year = natalData.year;

    console.log(`📅 Solicitud de calendario personal: usuario ${userId}, año ${year}, forceRecalculate: ${forceRecalculate}`);

    // Intentar obtener del cache (si no es recalculación forzada)
    if (!forceRecalculate) {
      const cachedData = await getCalendarCache(userId, year);
      
      if (cachedData) {
        console.log(`⚡ Devolviendo desde cache`);
        return NextResponse.json({
          events: cachedData.events,
          calculation_time: 0,
          total_events: cachedData.events.length,
          transits_count: cachedData.events.filter((e: any) => e.tipo_evento?.includes('Tránsito')).length,
          progressed_moon_count: cachedData.events.filter((e: any) => e.tipo_evento === 'Luna Progresada').length,
          profections_count: cachedData.events.filter((e: any) => e.tipo_evento === 'Profección Anual').length,
          from_cache: true,
          calculated_at: cachedData.calculatedAt,
          expires_at: cachedData.expiresAt,
        });
      }
    }

    // Cache miss o recalculación forzada: llamar al microservicio
    console.log(`🔄 Calculando eventos (cache miss o recalculación)`);

    const startTime = Date.now();

    const response = await fetch(`${MICROSERVICE_URL}/calculate-personal-calendar-dynamic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(natalData),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error del microservicio: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Error del microservicio: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validar respuesta
    if (!data.events || !Array.isArray(data.events)) {
      return NextResponse.json(
        { error: 'Respuesta inválida del microservicio' },
        { status: 500 }
      );
    }

    // Guardar en cache
    const cacheSuccess = await setCalendarCache(userId, year, data.events);
    
    if (!cacheSuccess) {
      console.warn('⚠️ No se pudo guardar en cache');
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

  } catch (error) {
    console.error('Error en API de calendario personal:', error);

    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        return NextResponse.json(
          { error: 'El cálculo está tomando más tiempo del esperado' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error desconocido' },
      { status: 500 }
    );
  }
}

// Endpoint para verificar salud del microservicio
export async function GET() {
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
