import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

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

interface CartaNatalData {
  nombre: string
  points: Record<string, any>
  houses: Record<string, any>
  aspects: Array<any>
}

const RAG_SERVICE_URL = 'http://localhost:8002'

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

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Obtener datos del request
    const { cartaNatalData, tipo = 'tropical' } = await request.json()

    if (!cartaNatalData) {
      return NextResponse.json(
        { error: 'Datos de carta natal requeridos' },
        { status: 400 }
      )
    }

    // Obtener usuario de la base de datos
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el usuario tenga género configurado
    if (!user.gender) {
      return NextResponse.json(
        { error: 'Género del usuario no configurado. Por favor completa tu perfil.' },
        { status: 400 }
      )
    }

    // Crear clave de cache
    const fechaNacimiento = new Date(user.birthDate!)
    const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`

    // Verificar cache existente
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

    // Si existe cache y es reciente (menos de 30 días), devolverlo
    if (cacheExistente) {
      const diasDesdeCreacion = (Date.now() - cacheExistente.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      
      if (diasDesdeCreacion < 30) {
        console.log('📋 Devolviendo interpretación desde cache')
        
        // Combinar información de casa con planetas en signo
        const interpretacionesIndividuales = JSON.parse(cacheExistente.interpretacionesIndividuales)
        const interpretacionesCombinadas = combinarInformacionCasa(interpretacionesIndividuales)
        
        return NextResponse.json({
          interpretacion_narrativa: JSON.parse(cacheExistente.interpretacionNarrativa),
          interpretaciones_individuales: interpretacionesCombinadas,
          tiempo_generacion: cacheExistente.tiempoGeneracion,
          desde_cache: true
        })
      }
    }

    // Preparar datos para el microservicio RAG
    const ragRequest = {
      carta_natal: {
        nombre: user.name || 'Usuario',
        points: cartaNatalData.points,
        houses: cartaNatalData.houses,
        aspects: cartaNatalData.aspects
      },
      genero: user.gender
    }

    console.log('🔄 Llamando al microservicio RAG...')
    
    // Llamar al microservicio RAG
    const ragResponse = await fetch(`${RAG_SERVICE_URL}/interpretar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ragRequest),
      // Timeout de 2 minutos
      signal: AbortSignal.timeout(120000)
    })

    if (!ragResponse.ok) {
      const errorText = await ragResponse.text()
      console.error('❌ Error del microservicio RAG:', errorText)
      
      return NextResponse.json(
        { error: 'Error al generar interpretación. El servicio no está disponible.' },
        { status: 503 }
      )
    }

    const interpretacionData: InterpretacionResponse = await ragResponse.json()

    console.log(`✅ Interpretación generada en ${interpretacionData.tiempo_generacion.toFixed(2)} segundos`)

    // Guardar en cache
    try {
      await prisma.interpretacionCache.upsert({
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
          interpretacionNarrativa: JSON.stringify(interpretacionData.interpretacion_narrativa),
          interpretacionesIndividuales: JSON.stringify(interpretacionData.interpretaciones_individuales),
          tiempoGeneracion: interpretacionData.tiempo_generacion,
          updatedAt: new Date()
        },
        create: {
          userId: user.id,
          fechaNacimiento,
          lugarNacimiento,
          gender: user.gender,
          tipo,
          interpretacionNarrativa: JSON.stringify(interpretacionData.interpretacion_narrativa),
          interpretacionesIndividuales: JSON.stringify(interpretacionData.interpretaciones_individuales),
          tiempoGeneracion: interpretacionData.tiempo_generacion
        }
      })

      console.log('💾 Interpretación guardada en cache')
    } catch (cacheError) {
      console.error('⚠️ Error al guardar en cache:', cacheError)
      // No fallar la request por error de cache
    }

    // Combinar información de casa con planetas en signo para interpretaciones nuevas
    const interpretacionesCombinadas = combinarInformacionCasa(interpretacionData.interpretaciones_individuales)

    // Devolver interpretación
    return NextResponse.json({
      interpretacion_narrativa: interpretacionData.interpretacion_narrativa,
      interpretaciones_individuales: interpretacionesCombinadas,
      tiempo_generacion: interpretacionData.tiempo_generacion,
      desde_cache: false
    })

  } catch (error) {
    console.error('❌ Error en API de interpretaciones:', error)
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Timeout: La generación de interpretación tomó demasiado tiempo' },
        { status: 408 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para limpiar cache de un usuario
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Eliminar todas las interpretaciones en cache del usuario
    const deleted = await prisma.interpretacionCache.deleteMany({
      where: { userId: user.id }
    })

    console.log(`🗑️ Eliminadas ${deleted.count} interpretaciones del cache`)

    return NextResponse.json({
      message: `Cache limpiado: ${deleted.count} interpretaciones eliminadas`,
      count: deleted.count
    })

  } catch (error) {
    console.error('❌ Error al limpiar cache:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
