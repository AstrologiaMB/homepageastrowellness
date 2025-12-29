interface PersonalCalendarEvent {
  fecha_utc: string;
  hora_utc: string;
  tipo_evento: string;
  descripcion: string;
  planeta1?: string;
  planeta2?: string;
  tipo_aspecto?: string;
  orbe?: string;
  es_aplicativo?: string;
  harmony?: string;
  [key: string]: any;
}

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

interface PersonalCalendarResponse {
  events: PersonalCalendarEvent[];
  calculation_time: number;
  total_events: number;
  transits_count: number;
  progressed_moon_count: number;
  profections_count: number;
  from_cache?: boolean;
  calculated_at?: Date;
  expires_at?: Date;
}

/**
 * Obtiene el calendario personal del usuario
 * Usa cache automáticamente en el servidor
 */
export async function fetchPersonalCalendar(
  natalData: NatalData,
  forceRecalculate: boolean = false,
  year?: number
): Promise<PersonalCalendarResponse> {
  try {
    // Si se especifica un año, usamos ese. Si no, usamos el del natalData original.
    const targetYear = year || natalData.year;

    // Crear copia de natalData con el año correcto si es necesario
    const requestNatalData = year ? { ...natalData, year: targetYear } : natalData;

    console.log(`🔄 Solicitando calendario personal (año ${targetYear}, force: ${forceRecalculate})`);

    const response = await fetch('/api/calendario-personal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        natalData: requestNatalData,
        forceRecalculate,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    const data: PersonalCalendarResponse = await response.json();

    // Log de resultado
    if (data.from_cache) {
      console.log(`⚡ Calendario cargado desde CACHE (${data.events.length} eventos)`);
    } else {
      console.log(`🔄 Calendario CALCULADO (${data.events.length} eventos en ${data.calculation_time.toFixed(2)}s)`);
    }

    return data;

  } catch (error) {
    console.error('Error fetching personal calendar:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Error desconocido al obtener el calendario personal');
  }
}

/**
 * Verifica si el microservicio está disponible
 */
export async function checkMicroserviceHealth(): Promise<boolean> {
  try {
    const response = await fetch('/api/calendario-personal', {
      method: 'GET',
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.available === true;
  } catch {
    return false;
  }
}
