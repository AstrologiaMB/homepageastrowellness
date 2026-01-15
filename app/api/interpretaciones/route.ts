import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { getApiUrl } from '@/lib/api-config'

// Tipos para las interpretaciones
interface InterpretacionItem {
  titulo: string
  tipo: string
  interpretacion: string
  planeta?: string
  signo?: string
  casa?: string
  aspecto?: string
  planeta1?: string
  planeta2?: string
  grados?: string
}

interface InterpretacionResponse {
  interpretacion_narrativa: string
  interpretaciones_individuales: InterpretacionItem[]
  tiempo_generacion: number
}

// Función para combinar información de casa con planetas en signo
function combinarInformacionCasa(interpretaciones: InterpretacionItem[]): InterpretacionItem[] {
  // Crear un mapa de planetas en casa
  const planetasEnCasa = new Map<string, string>()

  // Buscar todos los registros "PlanetaEnCasa" y mapear planeta -> casa
  interpretaciones.forEach(item => {
    if (item.tipo === 'PlanetaEnCasa' && item.planeta && item.casa) {
      planetasEnCasa.set(item.planeta, item.casa)
    }
  })

  // Combinar información: agregar casa a los registros "PlanetaEnSigno"
  return interpretaciones.map(item => {
    if (item.tipo === 'PlanetaEnSigno' && item.planeta && !item.casa) {
      const casa = planetasEnCasa.get(item.planeta)
      if (casa) {
        return {
          ...item,
          casa: casa
        }
      }
    }
    return item
  })
}

// Función auxiliar para procesar en background (Fire & Forget)
async function procesarInterpretacionBackground(
  cacheId: string,
  ragRequest: any,
  getRequestCookies: () => string
) {
  try {
    console.log(`🔄 Iniciando procesamiento background para ${cacheId}...`)
    const startTime = Date.now()

    // Para cartas dracónicas, obtener datos cruzados (si aplica)
    if (ragRequest.tipo === "draco") {
      try {
        const cruzadaResponse = await fetch(`${getApiUrl('FRONTEND_INTERNAL')}/api/cartas/cruzada`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': getRequestCookies()
          }
        })

        if (cruzadaResponse.ok) {
          const cruzadaData = await cruzadaResponse.json()
          if (cruzadaData.success && cruzadaData.data) {
            if (cruzadaData.data.cuspides_cruzadas) {
              ragRequest.carta_natal.cuspides_cruzadas = cruzadaData.data.cuspides_cruzadas
            }
            if (cruzadaData.data.aspectos_cruzados) {
              ragRequest.carta_natal.aspectos_cruzados = cruzadaData.data.aspectos_cruzados
            }
          }
        }
      } catch (cruzadaError) {
        console.error('⚠️ Error al llamar API de datos cruzados (Background):', cruzadaError)
      }
    }

    // Llamar al microservicio RAG
    const ragResponse = await fetch(`${getApiUrl('INTERPRETACIONES')}/interpretar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ragRequest),
      signal: AbortSignal.timeout(600000) // 10 minutos server-side timeout
    })

    if (!ragResponse.ok) {
      throw new Error(`Error RAG Microservice: ${await ragResponse.text()}`)
    }

    const interpretacionData: InterpretacionResponse = await ragResponse.json()
    const duration = (Date.now() - startTime) / 1000

    console.log(`✅ Interpretación generada en background (${duration}s)`)

    // Actualizar DB a COMPLETED
    await prisma.interpretacionCache.update({
      where: { id: cacheId },
      data: {
        status: 'COMPLETED',
        interpretacionNarrativa: JSON.stringify(interpretacionData.interpretacion_narrativa),
        interpretacionesIndividuales: JSON.stringify(interpretacionData.interpretaciones_individuales),
        tiempoGeneracion: interpretacionData.tiempo_generacion,
        updatedAt: new Date()
      }
    })

  } catch (error) {
    console.error(`❌ Error en procesamiento background para ${cacheId}:`, error)

    // Actualizar DB a FAILED
    await prisma.interpretacionCache.update({
      where: { id: cacheId },
      data: {
        status: 'FAILED',
        updatedAt: new Date()
      }
    }).catch(e => console.error("Error updating status to FAILED:", e))
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { cartaNatalData, tipo = 'tropical', skipCache = false } = await request.json()

    if (!cartaNatalData) {
      return NextResponse.json({ error: 'Datos de carta natal requeridos' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || !user.gender) {
      return NextResponse.json(
        { error: 'Usuario no encontrado o género no configurado' },
        { status: 404 }
      )
    }

    const fechaNacimiento = new Date(user.birthDate!)
    const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`

    // 1. Verificar Cache
    if (!skipCache) {
      const cacheExistente = await prisma.interpretacionCache.findUnique({
        where: {
          userId_fechaNacimiento_lugarNacimiento_gender_tipo: {
            userId: user.id,
            fechaNacimiento,
            lugarNacimiento,
            gender: user.gender,
            tipo
          }
        }
      })

      if (cacheExistente) {
        // COMPLETED: Devolver datos
        if (cacheExistente.status === 'COMPLETED' && cacheExistente.interpretacionNarrativa && cacheExistente.interpretacionesIndividuales) {
          const diasDesdeCreacion = (Date.now() - cacheExistente.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          if (diasDesdeCreacion < 30) {
            console.log('📋 Devolviendo interpretación desde cache (COMPLETED)')
            const interpretacionesIndividuales = JSON.parse(cacheExistente.interpretacionesIndividuales)
            const interpretacionesCombinadas = combinarInformacionCasa(interpretacionesIndividuales)

            return NextResponse.json({
              status: 'COMPLETED',
              interpretacion_narrativa: JSON.parse(cacheExistente.interpretacionNarrativa),
              interpretaciones_individuales: interpretacionesCombinadas,
              tiempo_generacion: cacheExistente.tiempoGeneracion,
              desde_cache: true
            })
          }
        }

        // PROCESSING: Devolver 202
        if (cacheExistente.status === 'PROCESSING') {
          // Verificar si no está "stuck" (ej. más de 1 min para testing)
          const minutosProcesando = (Date.now() - cacheExistente.updatedAt.getTime()) / (1000 * 60)
          if (minutosProcesando < 1) {
            console.log('⏳ Interpretación en proceso...')
            return NextResponse.json({ status: 'PROCESSING' }, { status: 202 })
          } else {
            console.log('⚠️ Interpretación cacheada como PROCESSING pero expiró (Stuck > 1min). Reiniciando.')
          }
        }

        // FAILED: Devolver error y detener loop, PERO permitir reintento tras 15s
        if (cacheExistente.status === 'FAILED') {
          const segundosDesdeFallo = (Date.now() - cacheExistente.updatedAt.getTime()) / 1000
          if (segundosDesdeFallo < 15) {
            console.log('❌ Interpretación fallida recientemente. Deteniendo reintentos inmediatos.')
            return NextResponse.json({
              status: 'FAILED',
              error: 'La generación anterior falló. Reintentando...'
            }, { status: 500 })
          } else {
            console.log('🔄 Interpretación fallida antigua. Reintentando generación...')
            // Permitimos que continúe hacia la generación (fall-through)
          }
        }
      }
    }

    // 2. Iniciar Nuevo Procesamiento (Async)
    console.log(`🚀 Iniciando generación ASYNC para ${user.email} (${tipo})`)

    const ragRequest = {
      carta_natal: {
        nombre: user.name || 'Usuario',
        points: cartaNatalData.points,
        houses: cartaNatalData.houses,
        aspects: cartaNatalData.aspects,
        cuspides_cruzadas: undefined, // Se llenará en background para draco
        aspectos_cruzados: undefined   // Se llenará en background para draco
      },
      genero: user.gender,
      tipo: tipo
    }

    // Upsert a PROCESSING
    const cacheRecord = await prisma.interpretacionCache.upsert({
      where: {
        userId_fechaNacimiento_lugarNacimiento_gender_tipo: {
          userId: user.id,
          fechaNacimiento,
          lugarNacimiento,
          gender: user.gender,
          tipo
        }
      },
      update: {
        status: 'PROCESSING',
        updatedAt: new Date()
        // Resetear campos de datos si existían
      },
      create: {
        userId: user.id,
        fechaNacimiento,
        lugarNacimiento,
        gender: user.gender,
        tipo,
        status: 'PROCESSING',
        interpretacionNarrativa: null,
        interpretacionesIndividuales: null
      }
    })

    // 3. Trigger Background Job
    // Capturamos cookies actuales para pasarlas al background request si es necesario (para llamadas internas autenticadas)
    const cookiesStr = request.headers.get('cookie') || ''

    // [IMPORTANTE] No hacemos await aquí para liberar la respuesta
    procesarInterpretacionBackground(cacheRecord.id, ragRequest, () => cookiesStr)

    // 4. Responder inmediatamente al cliente
    return NextResponse.json({ status: 'PROCESSING' }, { status: 202 })

  } catch (error) {
    console.error('❌ Error en API de interpretaciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para limpiar cache (Mantenemos igual pero logs actualizados)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

    const deleted = await prisma.interpretacionCache.deleteMany({ where: { userId: user.id } })

    return NextResponse.json({ message: `Cache limpiado`, count: deleted.count })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
