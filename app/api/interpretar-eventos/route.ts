import { NextRequest, NextResponse } from 'next/server';
import {
  getAstroInterpreterClient,
  type InterpretacionEventoRequest
} from '@/lib/api-clients/astro-interpreter-client';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API /interpretar-eventos: Recibida solicitud');

    // Obtener datos del request
    const body: InterpretacionEventoRequest = await request.json();

    if (!body.eventos || !Array.isArray(body.eventos) || body.eventos.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de eventos' },
        { status: 400 }
      );
    }

    console.log(`📊 Interpretando ${body.eventos.length} evento(s)`);

    // Llamar al microservicio usando el cliente generado
    const client = getAstroInterpreterClient();
    const data = await client.default.interpretarEventosCalendarioInterpretarEventosPost(body);

    console.log(`✅ ${data.interpretaciones?.length || 0} evento(s) interpretado(s)`);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('❌ Error en API de interpretación de eventos:', error);

    // Mapeo básico de errores del cliente
    if (error.name === 'AbortError' || error.status === 408) {
      return NextResponse.json(
        { error: 'Timeout: La interpretación tomó demasiado tiempo' },
        { status: 408 }
      );
    }

    if (error.status === 503) {
      return NextResponse.json(
        { error: 'Error al interpretar eventos. El servicio no está disponible.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
