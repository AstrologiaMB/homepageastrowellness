import prisma from '@/lib/prisma';

/**
 * Calcula el TTL (Time To Live) dinámico según el año
 * - Año actual: 24 horas (datos cambian frecuentemente)
 * - Año futuro: hasta fin de año (máximo 1 año)
 * - Año pasado: 30 días (datos son inmutables)
 */
export function calculateDynamicTTL(year: number): number {
  const currentYear = new Date().getFullYear();
  
  if (year === currentYear) {
    // Año actual: 30 días en milisegundos (balance óptimo para luna progresada ~1°/mes)
    return 30 * 24 * 60 * 60 * 1000;
  } else if (year > currentYear) {
    // Año futuro: hasta fin de año
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);
    const now = new Date();
    const msUntilEndOfYear = endOfYear.getTime() - now.getTime();
    
    // Mínimo 1 día, máximo 1 año
    const oneDayMs = 24 * 60 * 60 * 1000;
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    
    return Math.max(oneDayMs, Math.min(msUntilEndOfYear, oneYearMs));
  } else {
    // Año pasado: 30 días (datos inmutables)
    return 30 * 24 * 60 * 60 * 1000;
  }
}

/**
 * Obtiene el cache del calendario personal para un usuario y año específico
 */
export async function getCalendarCache(userId: string, year: number) {
  try {
    const cache = await prisma.personalCalendarCache.findUnique({
      where: {
        userId_year: {
          userId,
          year,
        },
      },
    });

    if (!cache) {
      console.log(`⚡ Cache miss: usuario ${userId}, año ${year}`);
      return null;
    }

    // Verificar si el cache ha expirado
    if (cache.expiresAt < new Date()) {
      console.log(`⏰ Cache expirado: usuario ${userId}, año ${year}`);
      // Eliminar cache expirado
      await prisma.personalCalendarCache.delete({
        where: {
          userId_year: {
            userId,
            year,
          },
        },
      });
      return null;
    }

    console.log(`✅ Cache hit: usuario ${userId}, año ${year}`);
    
    // Parsear eventos desde JSON
    const events = JSON.parse(cache.events);
    
    return {
      events,
      calculatedAt: cache.calculatedAt,
      expiresAt: cache.expiresAt,
    };
  } catch (error) {
    console.error('Error obteniendo cache:', error);
    return null;
  }
}

/**
 * Guarda el cache del calendario personal para un usuario y año específico
 */
export async function setCalendarCache(
  userId: string,
  year: number,
  events: any[]
) {
  try {
    const ttlMs = calculateDynamicTTL(year);
    const ttlHours = Math.round(ttlMs / (1000 * 60 * 60));
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlMs);

    await prisma.personalCalendarCache.upsert({
      where: {
        userId_year: {
          userId,
          year,
        },
      },
      update: {
        events: JSON.stringify(events),
        calculatedAt: now,
        expiresAt,
      },
      create: {
        userId,
        year,
        events: JSON.stringify(events),
        calculatedAt: now,
        expiresAt,
      },
    });

    console.log(`✅ Cache guardado: usuario ${userId}, año ${year}, TTL ${ttlHours}h`);
    
    return true;
  } catch (error) {
    console.error('Error guardando cache:', error);
    return false;
  }
}

/**
 * Invalida el cache de un usuario para un año específico o todos los años
 */
export async function invalidateCalendarCache(userId: string, year?: number) {
  try {
    if (year !== undefined) {
      // Invalidar año específico
      await prisma.personalCalendarCache.delete({
        where: {
          userId_year: {
            userId,
            year,
          },
        },
      });
      console.log(`🗑️ Cache invalidado: usuario ${userId}, año ${year}`);
    } else {
      // Invalidar todos los años del usuario
      await prisma.personalCalendarCache.deleteMany({
        where: {
          userId,
        },
      });
      console.log(`🗑️ Cache invalidado: usuario ${userId}, todos los años`);
    }
    
    return true;
  } catch (error) {
    console.error('Error invalidando cache:', error);
    return false;
  }
}

/**
 * Limpia todos los caches expirados (para cron job)
 */
export async function cleanExpiredCache() {
  try {
    const result = await prisma.personalCalendarCache.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    
    console.log(`🧹 Caches expirados eliminados: ${result.count}`);
    return result.count;
  } catch (error) {
    console.error('Error limpiando caches expirados:', error);
    return 0;
  }
}
