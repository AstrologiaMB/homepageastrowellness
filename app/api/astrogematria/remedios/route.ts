import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAuthOptionsSync } from '@/lib/auth-url';
import { getApiUrl } from '@/lib/api-config';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(getAuthOptionsSync());
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Llamar al microservicio de remedios
    const remediosResponse = await fetch(`${getApiUrl('ASTROGEMATRIA')}/astrogematria/remedios`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!remediosResponse.ok) {
      const errorData = await remediosResponse.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error en el servicio de remedios');
    }

    const resultado = await remediosResponse.json();

    if (!resultado.success || !resultado.data || !resultado.data.remedios) {
      throw new Error('Respuesta inválida del servicio de remedios');
    }

    return NextResponse.json({
      success: true,
      remedios: resultado.data.remedios,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en API remedios:', error);
    
    // Determinar el tipo de error y código de estado apropiado
    let statusCode = 500;
    let errorMessage = 'Error interno del servidor';
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        statusCode = 503;
        errorMessage = 'Servicio de remedios no disponible';
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
