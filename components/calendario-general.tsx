"use client";

import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addWeeks, subWeeks, isSameDay, isSameWeek, addDays, getISOWeek } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Imports requeridas para el componente principal (aún no completamente refactorizado)
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EventoAstrologico } from './evento-astrologico';

// Imports de los nuevos subcomponentes
import { CalendarHeader } from './calendario/CalendarHeader';
import { DateSelector } from './calendario/DateSelector';
import { YearSelector } from './calendario/YearSelector';
import { DayEventList } from './calendario/DayEventList';
import { useIsMobile } from '@/hooks/use-mobile';
import { createDateFromUtc } from '@/lib/date-utils';

// Años disponibles (futuro-proof hasta 2030) - EDITAR AQUÍ CUANDO LLEGUE 2031
const AVAILABLE_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030] as const;

// Interface para los eventos
interface EventoAstrologicoData {
  fecha_utc: string;
  hora_utc: string;
  tipo_evento: string;
  descripcion: string;
  planeta1?: string;
  planeta2?: string;
  posicion1?: string;
  posicion2?: string;
  [key: string]: any; // Para otros campos que puedan variar según el tipo de evento
}

// Cargar eventos por año con manejo robusto de errores
const loadYearData = async (year: number): Promise<EventoAstrologicoData[]> => {
  try {
    const module = await import(`@/data/eventos_astrologicos_UTC_${year}.json`);
    return module.default as EventoAstrologicoData[];
  } catch (error) {
    console.warn(`⚠️ Archivo no encontrado para ${year}, usando datos vacíos:`, error);
    return [];
  }
};

export function CalendarioGeneral() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { locale: es }));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [eventos, setEventos] = useState<EventoAstrologicoData[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const today = new Date();
  const isMobile = useIsMobile();

  // Función para cargar eventos con manejo de estados
  const loadEventos = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const [currentYearData, nextYearData] = await Promise.all([
        loadYearData(selectedYear),
        loadYearData(selectedYear + 1)
      ]);

      // Combinar eventos de ambos años sin duplicados
      const allEvents = [...currentYearData, ...nextYearData];
      const uniqueEvents = allEvents.filter((event, index, self) =>
        index === self.findIndex(e => e.fecha_utc === event.fecha_utc && e.hora_utc === event.hora_utc)
      );

      setEventos(uniqueEvents);
    } catch (error) {
      console.error('❌ Error cargando eventos:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar los eventos cuando cambia el año o al montar el componente
  // 🎯 Pre-cargar también el año siguiente para semanas que cruzan años
  useEffect(() => {
    loadEventos();
  }, [selectedYear]);

  // Ajustar la semana mostrada cuando cambia el año seleccionado
  useEffect(() => {
    const currentYear = new Date().getFullYear();

    // Solo ajustar si el año seleccionado es diferente al actual
    // y si no estamos ya en una fecha del año seleccionado
    if (selectedYear !== currentYear && currentWeekStart.getFullYear() !== selectedYear) {
      const currentMonth = currentWeekStart.getMonth();
      const currentDate = currentWeekStart.getDate();

      // Crear la misma fecha en el nuevo año
      const newDate = new Date(selectedYear, currentMonth, currentDate);

      // Verificar que la fecha sea válida (manejo de años bisiestos)
      if (!isNaN(newDate.getTime())) {
        const newWeekStart = startOfWeek(newDate, { locale: es });
        setCurrentWeekStart(newWeekStart);
      }
    }
  }, [selectedYear]); // Solo depende de selectedYear para evitar loops

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleBackToToday = () => {
    const currentYear = new Date().getFullYear();
    // 🔥 Si estamos en otro año, cambiar selectedYear para forzar recarga de eventos
    if (currentYear !== selectedYear) {
      setSelectedYear(currentYear);
    }
    setCurrentWeekStart(startOfWeek(today, { locale: es }));
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(startOfWeek(currentWeekStart, { locale: es }), i)
  );

  // 🌟 Calcular números de semana para navegación y título
  const currentWeekNumber = getISOWeek(currentWeekStart);
  const previousWeekNumber = getISOWeek(addWeeks(currentWeekStart, -1));
  const nextWeekNumber = getISOWeek(addWeeks(currentWeekStart, 1));

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const selectedYear = date.getFullYear();
      setCurrentWeekStart(startOfWeek(date, { locale: es }));
      // 🔥 SINCRONIZAR: Actualizar selectedYear cuando se selecciona fecha de otro año
      setSelectedYear(selectedYear);
    }
  };

  // Estados de UI condicional
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Week Cards Skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Card key={index} className="flex-none w-64 md:w-auto p-4">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-px w-full mb-3" />

              <div className="space-y-3">
                {/* Simular eventos múltiples */}
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>No se pudieron cargar los eventos astrológicos. Verifica tu conexión a internet.</span>
            <Button variant="outline" size="sm" onClick={loadEventos}>
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      {/* Header con subcomponentes */}
      <CalendarHeader
        currentWeekStart={currentWeekStart}
        previousWeekNumber={previousWeekNumber}
        nextWeekNumber={nextWeekNumber}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        selectedYear={selectedYear}
        availableYears={AVAILABLE_YEARS}
        selectedDate={selectedDate}
        isDateSelectOpen={isDateSelectOpen}
        onYearChange={setSelectedYear}
        onDateSelectOpenChange={setIsDateSelectOpen}
        onDateSelect={handleDateSelect}
      />

      {/* Week Display con subcomponentes */}
      <div className="flex flex-col gap-4">
        {weekDays.map((day) => {
          // Filtrar eventos para este día
          const eventosDelDia = eventos.filter(evento => {
            const fechaEvento = createDateFromUtc(evento.fecha_utc, evento.hora_utc);
            return isSameDay(fechaEvento, day);
          });

          return (
            <DayEventList
              key={day.toISOString()}
              day={day}
              eventosDelDia={eventosDelDia}
            />
          );
        })}
      </div>

      {/* Back to Today Button */}
      {!isSameWeek(currentWeekStart, startOfWeek(today, { locale: es })) && (
         <div className="flex justify-center">
            <Button variant="outline" onClick={handleBackToToday}>
               🏠 Volver a Hoy
            </Button>
         </div>
      )}
    </div>
  );
}
