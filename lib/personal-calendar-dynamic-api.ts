/**
 * API service for dynamic personal calendar calculation
 * Uses basic birth data to calculate natal chart dynamically
 */

import { getApiUrl } from '@/lib/api-config';

export interface BirthData {
  name: string;
  birth_date: string; // YYYY-MM-DD
  birth_time: string; // HH:MM
  location: {
    latitude: number;
    longitude: number;
    name: string;
    timezone: string;
  };
  year: number;
}

export interface AstroEvent {
  fecha_utc: string;
  hora_utc: string;
  tipo_evento: string;
  descripcion: string;
  planeta1?: string;
  planeta2?: string;
  posicion1?: string;
  posicion2?: string;
  tipo_aspecto?: string;
  orbe?: string;
  es_aplicativo?: string;
  harmony?: string;
  elevacion?: string;
  azimut?: string;
  signo?: string;
  grado?: string;
  posicion?: string;
  casa_natal?: number;
}

export interface PersonalCalendarResponse {
  events: AstroEvent[];
  total_events: number;
  calculation_time: number;
  year: number;
  name: string;
}

// Removed hardcoded URL
// const MICROSERVICE_URL = 'http://localhost:8004';

export class PersonalCalendarDynamicAPI {
  /**
   * Calculate personal calendar using dynamic natal chart calculation
   */
  static async calculatePersonalCalendar(birthData: BirthData): Promise<PersonalCalendarResponse> {
    try {
      console.log('Calling dynamic personal calendar API with birth data:', birthData);

      const MICROSERVICE_URL = getApiUrl('CALENDARIO');
      const response = await fetch(`${MICROSERVICE_URL}/calculate-personal-calendar-dynamic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(birthData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log(`Personal calendar calculated successfully: ${result.total_events} events in ${result.calculation_time}s`);

      return result;
    } catch (error) {
      console.error('Error calculating personal calendar:', error);
      throw error;
    }
  }

  /**
   * Check if the microservice is healthy
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const MICROSERVICE_URL = getApiUrl('CALENDARIO');
      const response = await fetch(`${MICROSERVICE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Microservice health check failed:', error);
      return false;
    }
  }

  /**
   * Get microservice info
   */
  static async getServiceInfo() {
    try {
      const MICROSERVICE_URL = getApiUrl('CALENDARIO');
      const response = await fetch(`${MICROSERVICE_URL}/info`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error getting service info:', error);
      return null;
    }
  }
}
