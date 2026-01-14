"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/auth/auth-provider';

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
  const { user } = useAuth();
  const [natalData, setNatalData] = useState<NatalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCompleteData, setHasCompleteData] = useState(false);

  useEffect(() => {
    async function fetchUserNatalData() {
      if (!user?.email) {
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
        // Construir fecha y hora local de nacimiento
        const birthDate = new Date(userData.birthDate);

        // FIX: Usar métodos UTC para preservar la fecha exacta guardada en BD
        // Evita que usuarios en hemisferio oeste (ej. Argentina) vean la fecha desplazada al día anterior
        const year = birthDate.getUTCFullYear();
        const month = birthDate.getUTCMonth();
        const date = birthDate.getUTCDate();

        // Construir strings directamente para evitar confusiones de objeto Date
        const birthDateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
        const birthTimeString = `${userData.birthHour.toString().padStart(2, '0')}:${userData.birthMinute.toString().padStart(2, '0')}`;

        // Transformar datos al formato de datos básicos para cálculo dinámico
        const transformedData: NatalData = {
          // Para el endpoint dinámico, enviamos datos básicos de nacimiento
          name: userData.name || 'Usuario',
          birth_date: birthDateString, // YYYY-MM-DD (Corregido)
          birth_time: birthTimeString, // HH:MM
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
          hora_local: `${birthDateString}T${birthTimeString}:00` // Formato local ISO
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
  }, [user?.email]);

  return {
    natalData,
    isLoading,
    error,
    hasCompleteData
  };
}
