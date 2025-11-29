import { NextRequest, NextResponse } from 'next/server'
import { getApiUrl } from '@/lib/api-config'

/**
 * API Route: Interpretar Eventos de Calendario
 * 
 * Proxy para el endpoint /interpretar-eventos del microservicio de interpretaciones.
 * Este endpoint interpreta eventos de calendario personal (tránsitos, luna progresada, etc.)
 */

interface EventoCalendario {
  fecha_utc: string
  hora_utc: string
  tipo_evento: string
  descripcion: string
  planeta1?: string
  planeta2?: string
  posicion1?: string
  posicion2?: string
  tipo_aspecto?: string
  orbe?: string
  es_aplicativo?: string
  harmony?: string
  [key: string]: any
}

interface InterpretacionEventoRequest {
  eventos: EventoCalendario[]
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API /interpretar-eventos: Recibida solicitud')

    // Obtener datos del request
    const body: InterpretacionEventoRequest = await request.json()

    if (!body.eventos || !Array.isArray(body.eventos) || body.eventos.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de eventos' },
        { status: 400 }
      )
    }

    console.log(`📊 Interpretando ${body.eventos.length} evento(s)`)

    // Llamar al microservicio de interpretaciones
    const microserviceUrl = `${getApiUrl('INTERPRETACIONES')}/interpretar-eventos`
    console.log(`🔧 API URL para INTERPRETACIONES: ${microserviceUrl}`)

    const response = await fetch(microserviceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Timeout de 60 segundos (búsquedas en markdown son rápidas)
      signal: AbortSignal.timeout(60000)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error del microservicio de interpretaciones:', errorText)
      
      return NextResponse.json(
        { error: 'Error al interpretar eventos. El servicio no está disponible.' },
        { status: 503 }
      )
    }

    const data = await response.json()
    console.log(`✅ ${data.interpretaciones?.length || 0} evento(s) interpretado(s)`)

    return NextResponse.json(data)

  } catch (error) {
    console.error('❌ Error en API de interpretación de eventos:', error)
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Timeout: La interpretación tomó demasiado tiempo' },
        { status: 408 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
