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
}

const MICROSERVICE_URL = 'http://localhost:8004';
const TIMEOUT_MS = 30000; // 30 segundos timeout

export async function fetchPersonalCalendar(natalData: NatalData): Promise<PersonalCalendarResponse> {
  try {
    // Verificar que el microservicio esté disponible
    const healthResponse = await fetch(`${MICROSERVICE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 segundos para health check
    });

    if (!healthResponse.ok) {
      throw new Error('El microservicio de calendario personal no está disponible');
    }

    // Realizar la llamada principal al microservicio usando endpoint dinámico
    const response = await fetch(`${MICROSERVICE_URL}/calculate-personal-calendar-dynamic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(natalData),
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Validar la estructura de la respuesta
    if (!data.events || !Array.isArray(data.events)) {
      throw new Error('Respuesta inválida del microservicio: falta array de eventos');
    }

    // Transformar eventos si es necesario (el formato ya debería ser compatible)
    const transformedEvents: PersonalCalendarEvent[] = data.events.map((event: any) => ({
      fecha_utc: event.fecha_utc,
      hora_utc: event.hora_utc,
      tipo_evento: event.tipo_evento,
      descripcion: event.descripcion,
      planeta1: event.planeta1,
      planeta2: event.planeta2,
      tipo_aspecto: event.tipo_aspecto,
      orbe: event.orbe,
      es_aplicativo: event.es_aplicativo,
      harmony: event.harmony,
      ...event // Incluir cualquier campo adicional
    }));

    return {
      events: transformedEvents,
      calculation_time: data.calculation_time || 0,
      total_events: data.total_events || transformedEvents.length,
      transits_count: data.transits_count || 0,
      progressed_moon_count: data.progressed_moon_count || 0,
      profections_count: data.profections_count || 0
    };

  } catch (error) {
    console.error('Error fetching personal calendar:', error);
    
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        throw new Error('El cálculo del calendario personal está tomando más tiempo del esperado. Por favor, inténtalo de nuevo.');
      }
      if (error.message.includes('fetch')) {
        throw new Error('No se pudo conectar con el microservicio de calendario personal. Verifica que esté ejecutándose en el puerto 8004.');
      }
      throw error;
    }
    
    throw new Error('Error desconocido al calcular el calendario personal');
  }
}

// Función auxiliar para verificar si el microservicio está disponible
export async function checkMicroserviceHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${MICROSERVICE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Función auxiliar para obtener información del microservicio
export async function getMicroserviceInfo(): Promise<any> {
  try {
    const response = await fetch(`${MICROSERVICE_URL}/info`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error('No se pudo obtener información del microservicio');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting microservice info:', error);
    throw error;
  }
}
