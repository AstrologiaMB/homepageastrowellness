"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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

interface UserNatalDataHook {
  natalData: NatalData | null;
  isLoading: boolean;
  error: string | null;
  hasCompleteData: boolean;
}

export function useUserNatalData(): UserNatalDataHook {
  const { data: session } = useSession();
  const [natalData, setNatalData] = useState<NatalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCompleteData, setHasCompleteData] = useState(false);

  useEffect(() => {
    async function fetchUserNatalData() {
      if (!session?.user?.email) {
        setIsLoading(false);
        setError('Usuario no autenticado');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/natal-data');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const userData = await response.json();

        // Verificar si el usuario tiene datos completos
        const requiredFields = ['birthDate', 'birthCity', 'birthHour', 'birthMinute'];
        const missingFields = requiredFields.filter(field => !userData[field] && userData[field] !== 0);
        
        if (missingFields.length > 0) {
          setHasCompleteData(false);
          setError(`Faltan datos natales: ${missingFields.join(', ')}`);
          setIsLoading(false);
          return;
        }

        // Obtener coordenadas de la ciudad de nacimiento
        const geocodeResponse = await fetch(`/api/geocode?city=${encodeURIComponent(userData.birthCity)}`);
        
        if (!geocodeResponse.ok) {
          throw new Error('Error al obtener coordenadas de la ciudad de nacimiento');
        }

        const locationData = await geocodeResponse.json();

        // Construir fecha y hora local de nacimiento
        const birthDate = new Date(userData.birthDate);
        const birthDateTime = new Date(
          birthDate.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate(),
          userData.birthHour,
          userData.birthMinute
        );

        // Obtener carta natal del usuario si existe
        const cartaNatalResponse = await fetch('/api/user/carta-natal?tipo=tropical');
        let cartaNatalData = null;
        
        if (cartaNatalResponse.ok) {
          const cartaNatal = await cartaNatalResponse.json();
          if (cartaNatal?.dataCompleta) {
            cartaNatalData = JSON.parse(cartaNatal.dataCompleta);
          }
        }

        // Si no hay carta natal, necesitamos calcularla
        if (!cartaNatalData) {
          throw new Error('No se encontró carta natal del usuario. Debe generarse primero.');
        }

        // Función auxiliar para convertir grados decimales a formato de posición
        const degreesToPosition = (degrees: number): string => {
          const deg = Math.floor(degrees);
          const minutes = Math.floor((degrees - deg) * 60);
          const seconds = Math.floor(((degrees - deg) * 60 - minutes) * 60);
          return `${deg}°${minutes.toString().padStart(2, '0')}'${seconds.toString().padStart(2, '0')}"`;
        };

        // Transformar datos al formato de datos básicos para cálculo dinámico
        const transformedData: NatalData = {
          // Para el endpoint dinámico, enviamos datos básicos de nacimiento
          name: userData.name || 'Usuario',
          birth_date: birthDateTime.toISOString().split('T')[0], // YYYY-MM-DD
          birth_time: `${userData.birthHour.toString().padStart(2, '0')}:${userData.birthMinute.toString().padStart(2, '0')}`, // HH:MM
          location: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            name: userData.birthCity,
            timezone: locationData.timezone || 'UTC'
          },
          year: new Date().getFullYear(),
          // Campos legacy para compatibilidad (no se usan en endpoint dinámico)
          points: {},
          houses: {},
          hora_local: birthDateTime.toISOString().slice(0, 19)
        } as any;

        setNatalData(transformedData);
        setHasCompleteData(true);

      } catch (err) {
        console.error('Error fetching user natal data:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setHasCompleteData(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserNatalData();
  }, [session?.user?.email]);

  return {
    natalData,
    isLoading,
    error,
    hasCompleteData
  };
}
