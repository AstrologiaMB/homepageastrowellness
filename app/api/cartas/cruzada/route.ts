import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { getApiUrl } from '@/lib/api-config';

export async function POST() {
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
        knowsBirthTime: true,
      },
    });

    if (!user || !user.birthDate || !user.birthCity) {
      return NextResponse.json(
        {
          error: 'Datos de nacimiento incompletos. Por favor completa tu perfil.',
        },
        { status: 400 }
      );
    }

    // Preparar datos para FastAPI - usar métodos UTC para fecha correcta
    const fechaNacimiento = `${user.birthDate.getUTCFullYear()}-${(user.birthDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${user.birthDate.getUTCDate().toString().padStart(2, '0')}`;
    const horaNacimiento =
      user.knowsBirthTime && user.birthHour !== null
        ? `${user.birthHour.toString().padStart(2, '0')}:${user.birthMinute?.toString().padStart(2, '0') || '00'}`
        : '12:00';

    const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;

    // Verificar caché
    const cartaExistente = await prisma.cartaNatal.findUnique({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'cruzada',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
    });

    if (cartaExistente) {
      // 🔍 DEBUG: Análisis de aspectos desde caché
      const dataCacheada = JSON.parse(cartaExistente.dataCompleta);

      // 🚫 CONSOLE.LOGS COMENTADOS TEMPORALMENTE PARA REDUCIR RATE LIMIT (Railway 500 logs/sec)
      // Estos logs ejecutan dentro de forEach sobre 100-200+ aspectos = 500+ logs por request
      // Recuperables para debugging futuro si es necesario
      /*
      if (dataCacheada && dataCacheada.aspectos) {
        console.log('🔍 DEBUG: === ANÁLISIS DE ASPECTOS CRUZADOS (CACHÉ) ===');
        console.log('🔍 DEBUG: Total aspectos calculados:', dataCacheada.aspectos.length);

        // Mostrar todos los aspectos con detalles
        dataCacheada.aspectos.forEach((aspecto: any, index: number) => {
          console.log(`🔍 DEBUG: Aspecto ${index + 1}:`, {
            descripcion: aspecto.descripcion || aspecto.titulo,
            tipo: aspecto.tipo || aspecto.aspecto,
            orbe: aspecto.orbe,
            importancia: aspecto.importancia || 'N/A'
          });
        });

        // Análisis de tipos de aspectos
        const tiposAspectos = dataCacheada.aspectos.reduce((acc: any, aspecto: any) => {
          const tipo = aspecto.tipo || aspecto.aspecto || 'desconocido';
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        console.log('🔍 DEBUG: Distribución por tipo de aspecto:', tiposAspectos);

        // Análisis de orbes
        const orbes = dataCacheada.aspectos.map((a: any) => a.orbe).filter((o: any) => o !== undefined);
        if (orbes.length > 0) {
          console.log('🔍 DEBUG: Estadísticas de orbes:', {
            promedio: (orbes.reduce((a: number, b: number) => a + b, 0) / orbes.length).toFixed(2),
            minimo: Math.min(...orbes),
            maximo: Math.max(...orbes)
          });
        }

        console.log('🔍 DEBUG: === FIN ANÁLISIS (CACHÉ) ===');
      }
      */

      return NextResponse.json({
        success: true,
        data: dataCacheada,
        cached: true,
        timestamp: cartaExistente.createdAt,
      });
    }

    // Llamar a FastAPI
    console.log('Llamando a FastAPI para calcular análisis cruzado dracónico-tropical...');
    const fastApiResponse = await fetch(`${getApiUrl('CALCULOS')}/carta-natal/cruzada`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: user.name || 'Usuario',
        fecha_nacimiento: fechaNacimiento,
        hora_nacimiento: horaNacimiento,
        ciudad_nacimiento: user.birthCity,
        pais_nacimiento: user.birthCountry,
      }),
    });

    if (!fastApiResponse.ok) {
      const errorText = await fastApiResponse.text();
      console.error('Error en FastAPI:', errorText);
      throw new Error(`Error en FastAPI: ${fastApiResponse.status}`);
    }

    const resultado = await fastApiResponse.json();

    if (!resultado.success) {
      throw new Error(resultado.error || 'Error calculando análisis cruzado');
    }

    // 🚫 CONSOLE.LOGS COMENTADOS TEMPORALMENTE PARA REDUCIR RATE LIMIT (Railway 500 logs/sec)
    // Estos logs ejecutan dentro de forEach sobre 100-200+ aspectos = 500+ logs por request
    // Recuperables para debugging futuro si es necesario
    /*
    // 🔍 DEBUG: Análisis de aspectos para investigación
    console.log('🔍 DEBUG: Iniciando análisis de debug...');
    console.log('🔍 DEBUG: resultado.data existe:', !!resultado.data);
    console.log('🔍 DEBUG: resultado.data.aspectos existe:', !!(resultado.data && resultado.data.aspectos));

    if (resultado.data && resultado.data.aspectos) {
      console.log('🔍 DEBUG: === ANÁLISIS DE ASPECTOS CRUZADOS ===');
      console.log('🔍 DEBUG: Total aspectos calculados:', resultado.data.aspectos.length);

      // Mostrar todos los aspectos con detalles
      resultado.data.aspectos.forEach((aspecto: any, index: number) => {
        console.log(`🔍 DEBUG: Aspecto ${index + 1}:`, {
          descripcion: aspecto.descripcion || aspecto.titulo,
          tipo: aspecto.tipo || aspecto.aspecto,
          orbe: aspecto.orbe,
          importancia: aspecto.importancia || 'N/A'
        });
      });

      // Análisis de tipos de aspectos
      const tiposAspectos = resultado.data.aspectos.reduce((acc: any, aspecto: any) => {
        const tipo = aspecto.tipo || aspecto.aspecto || 'desconocido';
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {});

      console.log('🔍 DEBUG: Distribución por tipo de aspecto:', tiposAspectos);

      // Análisis de orbes
      const orbes = resultado.data.aspectos.map((a: any) => a.orbe).filter((o: any) => o !== undefined);
      if (orbes.length > 0) {
        console.log('🔍 DEBUG: Estadísticas de orbes:', {
          promedio: (orbes.reduce((a: number, b: number) => a + b, 0) / orbes.length).toFixed(2),
          minimo: Math.min(...orbes),
          maximo: Math.max(...orbes)
        });
      }

      console.log('🔍 DEBUG: === FIN ANÁLISIS ===');
    } else {
      console.log('🔍 DEBUG: No se encontraron aspectos en la respuesta');
      console.log('🔍 DEBUG: Estructura de datos recibida:', Object.keys(resultado.data || {}));
    }
    */

    // Guardar en caché
    // Guardar en caché
    // Guardar en caché (Upsert para evitar colisiones)
    try {
      await prisma.cartaNatal.upsert({
        where: {
          userId_tipo_fechaNacimiento_lugarNacimiento: {
            userId: user.id,
            tipo: 'cruzada',
            fechaNacimiento: user.birthDate,
            lugarNacimiento,
          },
        },
        update: {
          dataCompleta: JSON.stringify(resultado.data),
          dataReducida: JSON.stringify(resultado.data),
        },
        create: {
          userId: user.id,
          tipo: 'cruzada',
          dataCompleta: JSON.stringify(resultado.data),
          dataReducida: JSON.stringify(resultado.data),
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      });
    } catch (e: any) {
      // Ignorar error de unique constraint race condition
      if (e.code !== 'P2002') {
        console.error('Error guardando carta cruzada:', e);
      } else {
        console.log('Race condition (P2002) ignorada: La carta cruzada ya existe.');
      }
    }

    console.log('Análisis cruzado calculado y guardado en caché');

    return NextResponse.json({
      success: true,
      data: resultado.data,
      cached: false,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error en API Gateway:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
