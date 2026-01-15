import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptionsSync } from '@/lib/auth-url';
import prisma from '@/lib/prisma';
import { getApiUrl } from '@/lib/api-config';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(getAuthOptionsSync());
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Obtener datos del request
    const { palabra } = await request.json();
    
    if (!palabra || typeof palabra !== 'string' || palabra.trim().length === 0) {
      return NextResponse.json({ error: 'Palabra requerida' }, { status: 400 });
    }

    const palabraNormalizada = palabra.trim().toLowerCase();

    // Verificar caché
    const cacheExistente = await prisma.astrogematriaCache.findUnique({
      where: { palabra: palabraNormalizada }
    });

    if (cacheExistente) {
      return NextResponse.json({
        success: true,
        data: {
          palabra_original: palabra,
          palabra_procesada: cacheExistente.palabraProcesada,
          valor_astrogematrico: cacheExistente.valorTotal,
          reduccion_zodiacal: cacheExistente.reduccionZodiacal,
          signo: cacheExistente.signo,
          grados: cacheExistente.grados,
          posicion_completa: cacheExistente.posicionCompleta
        },
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    // Llamar al microservicio de astrogematría
    const astrogematriaResponse = await fetch(`${getApiUrl('ASTROGEMATRIA')}/astrogematria/calcular`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ palabra })
    });

    if (!astrogematriaResponse.ok) {
      const errorData = await astrogematriaResponse.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error en el servicio de astrogematría');
    }

    const resultado = await astrogematriaResponse.json();

    if (!resultado.success || !resultado.data) {
      throw new Error('Respuesta inválida del servicio de astrogematría');
    }

    // Guardar en caché
    try {
      await prisma.astrogematriaCache.create({
        data: {
          palabra: palabraNormalizada,
          palabraProcesada: resultado.data.palabra_procesada,
          valorTotal: resultado.data.valor_astrogematrico,
          reduccionZodiacal: resultado.data.reduccion_zodiacal,
          signo: resultado.data.signo,
          grados: resultado.data.grados,
          posicionCompleta: resultado.data.posicion_completa
        }
      });
    } catch (cacheError) {
      // Si hay error en el caché, continuar sin fallar
      console.warn('Error guardando en caché astrogematría:', cacheError);
    }

    return NextResponse.json({
      success: true,
      data: resultado.data,
      cached: false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en API astrogematría:', error);
    
    // Determinar el tipo de error y código de estado apropiado
    let statusCode = 500;
    let errorMessage = 'Error interno del servidor';
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        statusCode = 503;
        errorMessage = 'Servicio de astrogematría no disponible';
      } else if (error.message.includes('requerida') || error.message.includes('inválida')) {
        statusCode = 400;
        errorMessage = error.message;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ 
      success: false,
      error: errorMessage 
    }, { status: statusCode });
  }
}
