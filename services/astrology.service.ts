/**
 * Astrology Service
 *
 * Business logic for astrology-related operations including chart calculations,
 * interpretations, calendars, and astrogematria.
 *
 * @module services/astrology.service
 */

import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { ApiError } from '@/lib/errors/ApiError';
import { getApiUrl } from '@/lib/api-config';

// Extended API response type for astrology-specific responses
interface AstrologyApiResponse {
  success: boolean;
  data?: any;
  data_reducido?: any;
  cached?: boolean;
  timestamp?: string | Date;
  interpretacionNarrativa?: any;
  interpretacionesIndividuales?: any;
  tiempoGeneracion?: number | null;
  events?: any;
  palabra?: string;
  valorTotal?: number;
  reduccionZodiacal?: number;
  signo?: string;
  grados?: number;
  posicionCompleta?: string;
}

/**
 * Calculate tropical natal chart
 *
 * @param userId - User ID
 * @param forceRecalculate - Force recalculation even if cached
 * @returns Promise resolving to chart data
 * @throws {ApiError} If calculation fails
 */
export async function calculateTropicalChart(
  userId: string,
  forceRecalculate: boolean = false
): Promise<AstrologyApiResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    throw new ApiError('Birth data incomplete', undefined, undefined, 400, 'VALIDATION_ERROR', 400);
  }

  const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;
  const fechaNacimiento = formatDateForApi(user.birthDate);
  const horaNacimiento =
    user.knowsBirthTime && user.birthHour !== null
      ? `${user.birthHour.toString().padStart(2, '0')}:${(user.birthMinute ?? 0).toString().padStart(2, '0')}`
      : '12:00';

  // Check cache
  if (!forceRecalculate) {
    const cachedChart = await prisma.cartaNatal.findUnique({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'tropical',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
    });

    if (cachedChart) {
      logger.info('Returning cached tropical chart', { userId });
      return {
        success: true,
        data: JSON.parse(cachedChart.dataCompleta),
        data_reducido: JSON.parse(cachedChart.dataReducida),
        cached: true,
        timestamp: cachedChart.createdAt,
      };
    }
  }

  // Call FastAPI
  logger.info('Calling FastAPI for tropical chart calculation', { userId });
  const fastApiResponse = await fetch(`${getApiUrl('CALCULOS')}/carta-natal/tropical`, {
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
    logger.error('FastAPI error for tropical chart', { error: errorText, userId });
    throw ApiError.fromResponse(
      `${getApiUrl('CALCULOS')}/carta-natal/tropical`,
      'POST',
      fastApiResponse
    );
  }

  const resultado = await fastApiResponse.json();

  if (!resultado.success) {
    throw new ApiError(
      resultado.error || 'Error calculating chart',
      `${getApiUrl('CALCULOS')}/carta-natal/tropical`,
      'POST',
      fastApiResponse.status,
      'SERVER_ERROR',
      502
    );
  }

  // Save to cache (upsert to handle race conditions)
  try {
    await prisma.cartaNatal.upsert({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'tropical',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
      update: {
        dataCompleta: JSON.stringify(resultado.data),
        dataReducida: JSON.stringify(resultado.data_reducido),
      },
      create: {
        userId: user.id,
        tipo: 'tropical',
        dataCompleta: JSON.stringify(resultado.data),
        dataReducida: JSON.stringify(resultado.data_reducido),
        fechaNacimiento: user.birthDate,
        lugarNacimiento,
      },
    });
  } catch (e: any) {
    if (e.code !== 'P2002') {
      logger.error('Error caching tropical chart', { error: e, userId });
    } else {
      logger.info('Race condition (P2002) ignored: Chart already exists', { userId });
    }
  }

  logger.info('Tropical chart calculated and cached', { userId });

  return {
    success: true,
    data: resultado.data,
    data_reducido: resultado.data_reducido,
    cached: false,
    timestamp: new Date(),
  };
}

/**
 * Calculate draconic chart
 *
 * @param userId - User ID
 * @param forceRecalculate - Force recalculation even if cached
 * @returns Promise resolving to chart data
 * @throws {ApiError} If calculation fails
 */
export async function calculateDraconicChart(
  userId: string,
  forceRecalculate: boolean = false
): Promise<AstrologyApiResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    throw new ApiError('Birth data incomplete', undefined, undefined, 400, 'VALIDATION_ERROR', 400);
  }

  const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;
  const fechaNacimiento = formatDateForApi(user.birthDate);
  const horaNacimiento =
    user.knowsBirthTime && user.birthHour !== null
      ? `${user.birthHour.toString().padStart(2, '0')}:${(user.birthMinute ?? 0).toString().padStart(2, '0')}`
      : '12:00';

  // Check cache
  if (!forceRecalculate) {
    const cachedChart = await prisma.cartaNatal.findUnique({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'draconica',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
    });

    if (cachedChart) {
      logger.info('Returning cached draconic chart', { userId });
      return {
        success: true,
        data: JSON.parse(cachedChart.dataCompleta),
        data_reducido: JSON.parse(cachedChart.dataReducida),
        cached: true,
        timestamp: cachedChart.createdAt,
      };
    }
  }

  // Call FastAPI
  logger.info('Calling FastAPI for draconic chart calculation', { userId });
  const fastApiResponse = await fetch(`${getApiUrl('CALCULOS')}/carta-draconica/calcular`, {
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
    logger.error('FastAPI error for draconic chart', { error: errorText, userId });
    throw ApiError.fromResponse(
      `${getApiUrl('CALCULOS')}/carta-draconica/calcular`,
      'POST',
      fastApiResponse
    );
  }

  const resultado = await fastApiResponse.json();

  if (!resultado.success) {
    throw new ApiError(
      resultado.error || 'Error calculating chart',
      `${getApiUrl('CALCULOS')}/carta-draconica/calcular`,
      'POST',
      fastApiResponse.status,
      'SERVER_ERROR',
      502
    );
  }

  // Save to cache
  try {
    await prisma.cartaNatal.upsert({
      where: {
        userId_tipo_fechaNacimiento_lugarNacimiento: {
          userId: user.id,
          tipo: 'draconica',
          fechaNacimiento: user.birthDate,
          lugarNacimiento,
        },
      },
      update: {
        dataCompleta: JSON.stringify(resultado.data),
        dataReducida: JSON.stringify(resultado.data_reducido),
      },
      create: {
        userId: user.id,
        tipo: 'draconica',
        dataCompleta: JSON.stringify(resultado.data),
        dataReducida: JSON.stringify(resultado.data_reducido),
        fechaNacimiento: user.birthDate,
        lugarNacimiento,
      },
    });
  } catch (e: any) {
    if (e.code !== 'P2002') {
      logger.error('Error caching draconic chart', { error: e, userId });
    }
  }

  logger.info('Draconic chart calculated and cached', { userId });

  return {
    success: true,
    data: resultado.data,
    data_reducido: resultado.data_reducido,
    cached: false,
    timestamp: new Date(),
  };
}

/**
 * Get chart interpretation
 *
 * @param userId - User ID
 * @param chartType - Chart type ('tropical' or 'draconica')
 * @returns Promise resolving to interpretation data
 * @throws {ApiError} If interpretation fails
 */
export async function getChartInterpretation(
  userId: string,
  chartType: 'tropical' | 'draconica' = 'tropical'
): Promise<AstrologyApiResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      birthDate: true,
      birthCity: true,
      birthCountry: true,
      gender: true,
    },
  });

  if (!user || !user.birthDate || !user.birthCity) {
    throw new ApiError('Birth data incomplete', undefined, undefined, 400, 'VALIDATION_ERROR', 400);
  }

  const lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;
  const fechaNacimiento = formatDateForApi(user.birthDate);
  const gender = user.gender || 'masculino';

  // Check cache
  const cachedInterpretation = await prisma.interpretacionCache.findUnique({
    where: {
      userId_fechaNacimiento_lugarNacimiento_gender_tipo: {
        userId: user.id,
        fechaNacimiento: user.birthDate,
        lugarNacimiento,
        gender,
        tipo: chartType,
      },
    },
  });

  if (cachedInterpretation && cachedInterpretation.status === 'COMPLETED') {
    logger.info('Returning cached interpretation', { userId, chartType });
    return {
      success: true,
      interpretacionNarrativa: cachedInterpretation.interpretacionNarrativa
        ? JSON.parse(cachedInterpretation.interpretacionNarrativa)
        : undefined,
      interpretacionesIndividuales: cachedInterpretation.interpretacionesIndividuales
        ? JSON.parse(cachedInterpretation.interpretacionesIndividuales)
        : undefined,
      cached: true,
      tiempoGeneracion: cachedInterpretation.tiempoGeneracion,
    };
  }

  // Call FastAPI
  logger.info('Calling FastAPI for interpretation', { userId, chartType });
  const fastApiResponse = await fetch(`${getApiUrl('INTERPRETACIONES')}/interpretar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fecha_nacimiento: fechaNacimiento,
      lugar_nacimiento: lugarNacimiento,
      genero: gender,
      tipo: chartType,
    }),
  });

  if (!fastApiResponse.ok) {
    const errorText = await fastApiResponse.text();
    logger.error('FastAPI error for interpretation', { error: errorText, userId });
    throw ApiError.fromResponse(
      `${getApiUrl('INTERPRETACIONES')}/interpretar`,
      'POST',
      fastApiResponse
    );
  }

  const resultado = await fastApiResponse.json();

  if (!resultado.success) {
    throw new ApiError(
      resultado.error || 'Error interpreting chart',
      `${getApiUrl('INTERPRETACIONES')}/interpretar`,
      'POST',
      fastApiResponse.status,
      'SERVER_ERROR',
      502
    );
  }

  // Save to cache
  await prisma.interpretacionCache.upsert({
    where: {
      userId_fechaNacimiento_lugarNacimiento_gender_tipo: {
        userId: user.id,
        fechaNacimiento: user.birthDate,
        lugarNacimiento,
        gender,
        tipo: chartType,
      },
    },
    update: {
      interpretacionNarrativa: resultado.interpretacionNarrativa
        ? JSON.stringify(resultado.interpretacionNarrativa)
        : null,
      interpretacionesIndividuales: resultado.interpretacionesIndividuales
        ? JSON.stringify(resultado.interpretacionesIndividuales)
        : null,
      status: 'COMPLETED',
      tiempoGeneracion: resultado.tiempoGeneracion,
    },
    create: {
      userId: user.id,
      fechaNacimiento: user.birthDate,
      lugarNacimiento,
      gender,
      tipo: chartType,
      interpretacionNarrativa: resultado.interpretacionNarrativa
        ? JSON.stringify(resultado.interpretacionNarrativa)
        : null,
      interpretacionesIndividuales: resultado.interpretacionesIndividuales
        ? JSON.stringify(resultado.interpretacionesIndividuales)
        : null,
      status: 'COMPLETED',
      tiempoGeneracion: resultado.tiempoGeneracion,
    },
  });

  logger.info('Interpretation calculated and cached', { userId, chartType });

  return {
    success: true,
    interpretacionNarrativa: resultado.interpretacionNarrativa,
    interpretacionesIndividuales: resultado.interpretacionesIndividuales,
    cached: false,
    tiempoGeneracion: resultado.tiempoGeneracion,
  };
}

/**
 * Get personal calendar
 *
 * @param userId - User ID
 * @param year - Calendar year
 * @param forceRecalculate - Force recalculation even if cached
 * @returns Promise resolving to calendar data
 * @throws {ApiError} If calendar generation fails
 */
export async function getPersonalCalendar(
  userId: string,
  year: number,
  forceRecalculate: boolean = false
): Promise<AstrologyApiResponse> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      birthDate: true,
      birthCity: true,
      birthCountry: true,
      birthHour: true,
      birthMinute: true,
      knowsBirthTime: true,
      timezone: true,
    },
  });

  if (!user || !user.birthDate || !user.birthCity) {
    throw new ApiError('Birth data incomplete', undefined, undefined, 400, 'VALIDATION_ERROR', 400);
  }

  const _lugarNacimiento = `${user.birthCity}, ${user.birthCountry}`;
  const fechaNacimiento = formatDateForApi(user.birthDate);
  const horaNacimiento =
    user.knowsBirthTime && user.birthHour !== null
      ? `${user.birthHour.toString().padStart(2, '0')}:${(user.birthMinute ?? 0).toString().padStart(2, '0')}`
      : '12:00';

  // Check cache
  const now = new Date();
  if (!forceRecalculate) {
    const cachedCalendar = await prisma.personalCalendarCache.findUnique({
      where: { userId_year: { userId: user.id, year } },
    });

    if (cachedCalendar && cachedCalendar.expiresAt > now) {
      logger.info('Returning cached personal calendar', { userId, year });
      return {
        success: true,
        events: JSON.parse(cachedCalendar.events),
        cached: true,
      };
    }
  }

  // Call FastAPI
  logger.info('Calling FastAPI for personal calendar', { userId, year });
  const fastApiResponse = await fetch(`${getApiUrl('CALENDARIO')}/calendario-personal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: user.name || 'Usuario',
      fecha_nacimiento: fechaNacimiento,
      hora_nacimiento: horaNacimiento,
      ciudad_nacimiento: user.birthCity,
      pais_nacimiento: user.birthCountry,
      zona_horaria: user.timezone || 'UTC',
      year,
    }),
  });

  if (!fastApiResponse.ok) {
    const errorText = await fastApiResponse.text();
    logger.error('FastAPI error for personal calendar', { error: errorText, userId });
    throw ApiError.fromResponse(
      `${getApiUrl('CALENDARIO')}/calendario-personal`,
      'POST',
      fastApiResponse
    );
  }

  const resultado = await fastApiResponse.json();

  if (!resultado.success) {
    throw new ApiError(
      resultado.error || 'Error generating calendar',
      `${getApiUrl('CALENDARIO')}/calendario-personal`,
      'POST',
      fastApiResponse.status,
      'SERVER_ERROR',
      502
    );
  }

  // Cache for 30 days
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.personalCalendarCache.upsert({
    where: { userId_year: { userId: user.id, year } },
    update: {
      events: JSON.stringify(resultado.events),
      calculatedAt: now,
      expiresAt,
    },
    create: {
      userId: user.id,
      year,
      events: JSON.stringify(resultado.events),
      calculatedAt: now,
      expiresAt,
    },
  });

  logger.info('Personal calendar calculated and cached', { userId, year });

  return {
    success: true,
    events: resultado.events,
    cached: false,
  };
}

/**
 * Calculate astrogematria
 *
 * @param palabra - Word to calculate
 * @returns Promise resolving to astrogematria data
 * @throws {ApiError} If calculation fails
 */
export async function calculateAstrogematria(palabra: string): Promise<AstrologyApiResponse> {
  if (!palabra || palabra.trim().length === 0) {
    throw new ApiError('Word is required', undefined, undefined, 400, 'VALIDATION_ERROR', 400);
  }

  const normalizedPalabra = palabra.trim().toLowerCase();

  // Check cache
  const cachedResult = await prisma.astrogematriaCache.findUnique({
    where: { palabra: normalizedPalabra },
  });

  if (cachedResult) {
    logger.info('Returning cached astrogematria', { palabra: normalizedPalabra });
    return {
      success: true,
      palabra: cachedResult.palabraProcesada,
      valorTotal: cachedResult.valorTotal,
      reduccionZodiacal: cachedResult.reduccionZodiacal,
      signo: cachedResult.signo,
      grados: cachedResult.grados,
      posicionCompleta: cachedResult.posicionCompleta,
      cached: true,
    };
  }

  // Call FastAPI
  logger.info('Calling FastAPI for astrogematria', { palabra: normalizedPalabra });
  const fastApiResponse = await fetch(`${getApiUrl('ASTROGEMATRIA')}/astrogematria/calcular`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ palabra: normalizedPalabra }),
  });

  if (!fastApiResponse.ok) {
    const errorText = await fastApiResponse.text();
    logger.error('FastAPI error for astrogematria', { error: errorText });
    throw ApiError.fromResponse(
      `${getApiUrl('ASTROGEMATRIA')}/astrogematria/calcular`,
      'POST',
      fastApiResponse
    );
  }

  const resultado = await fastApiResponse.json();

  if (!resultado.success) {
    throw new ApiError(
      resultado.error || 'Error calculating astrogematria',
      `${getApiUrl('ASTROGEMATRIA')}/astrogematria/calcular`,
      'POST',
      fastApiResponse.status,
      'SERVER_ERROR',
      502
    );
  }

  // Save to cache
  await prisma.astrogematriaCache.upsert({
    where: { palabra: normalizedPalabra },
    update: {
      palabraProcesada: resultado.palabra,
      valorTotal: resultado.valorTotal,
      reduccionZodiacal: resultado.reduccionZodiacal,
      signo: resultado.signo,
      grados: resultado.grados,
      posicionCompleta: resultado.posicionCompleta,
    },
    create: {
      palabra: normalizedPalabra,
      palabraProcesada: resultado.palabra,
      valorTotal: resultado.valorTotal,
      reduccionZodiacal: resultado.reduccionZodiacal,
      signo: resultado.signo,
      grados: resultado.grados,
      posicionCompleta: resultado.posicionCompleta,
    },
  });

  logger.info('Astrogematria calculated and cached', { palabra: normalizedPalabra });

  return {
    success: true,
    palabra: resultado.palabra,
    valorTotal: resultado.valorTotal,
    reduccionZodiacal: resultado.reduccionZodiacal,
    signo: resultado.signo,
    grados: resultado.grados,
    posicionCompleta: resultado.posicionCompleta,
    cached: false,
  };
}

/**
 * Clear chart cache
 *
 * @param userId - User ID
 * @param chartType - Optional chart type to clear
 */
export async function clearChartCache(userId: string, chartType?: string): Promise<void> {
  const where: any = { userId };

  if (chartType) {
    where.tipo = chartType;
  }

  const result = await prisma.cartaNatal.deleteMany({ where });

  logger.info('Chart cache cleared', { userId, chartType, count: result.count });
}

/**
 * Clear interpretation cache
 *
 * @param userId - User ID
 * @param chartType - Optional chart type to clear
 */
export async function clearInterpretationCache(userId: string, chartType?: string): Promise<void> {
  const where: any = { userId };

  if (chartType) {
    where.tipo = chartType;
  }

  const result = await prisma.interpretacionCache.deleteMany({ where });

  logger.info('Interpretation cache cleared', { userId, chartType, count: result.count });
}

/**
 * Helper function to format date for API
 */
function formatDateForApi(date: Date): string {
  return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
}
