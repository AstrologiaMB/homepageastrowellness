"use client";

import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, isSameWeek, addDays, startOfMonth, getMonth, getYear, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { getWeeksOfMonth, formatWeekRange, formatMonthYear, getMonthNumber, getYearNumber, createDateFromUtc } from '@/lib/date-utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { EventoAstrologico } from './evento-astrologico';
import { useUserNatalData } from '@/hooks/use-user-natal-data';
import { fetchPersonalCalendar, checkMicroserviceHealth } from '@/lib/personal-calendar-api';

// Definir la interfaz para los eventos personales
interface EventoPersonal {
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

export function CalendarioPersonal() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { locale: es }));
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [eventos, setEventos] = useState<EventoPersonal[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [calculationStats, setCalculationStats] = useState<{
    total_events: number;
    calculation_time: number;
    transits_count: number;
    progressed_moon_count: number;
    profections_count: number;
  } | null>(null);
  const [microserviceStatus, setMicroserviceStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  const today = new Date();
  const isMobile = useIsMobile();

  // Hook para obtener datos natales del usuario
  const { natalData, isLoading: isLoadingNatalData, error: natalDataError, hasCompleteData } = useUserNatalData();

  // Verificar estado del microservicio al montar el componente
  useEffect(() => {
    async function checkMicroservice() {
      const isHealthy = await checkMicroserviceHealth();
      setMicroserviceStatus(isHealthy ? 'available' : 'unavailable');
    }
    checkMicroservice();
  }, []);

  // Calcular eventos personales cuando los datos natales estén disponibles
  useEffect(() => {
    async function calculatePersonalEvents() {
      if (!natalData || !hasCompleteData || microserviceStatus !== 'available') {
        return;
      }

      try {
        setIsCalculating(true);
        setCalculationError(null);

        const response = await fetchPersonalCalendar(natalData);
        
        setEventos(response.events);
        setCalculationStats({
          total_events: response.total_events,
          calculation_time: response.calculation_time,
          transits_count: response.transits_count,
          progressed_moon_count: response.progressed_moon_count,
          profections_count: response.profections_count
        });

      } catch (error) {
        console.error('Error calculating personal events:', error);
        setCalculationError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setIsCalculating(false);
      }
    }

    calculatePersonalEvents();
  }, [natalData, hasCompleteData, microserviceStatus]);

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleBackToToday = () => {
    setCurrentWeekStart(startOfWeek(today, { locale: es }));
  };

  const handleRefreshCalculation = async () => {
    if (!natalData || !hasCompleteData) return;

    try {
      setIsCalculating(true);
      setCalculationError(null);

      const response = await fetchPersonalCalendar(natalData);
      
      setEventos(response.events);
      setCalculationStats({
        total_events: response.total_events,
        calculation_time: response.calculation_time,
        transits_count: response.transits_count,
        progressed_moon_count: response.progressed_moon_count,
        profections_count: response.profections_count
      });

    } catch (error) {
      console.error('Error refreshing personal events:', error);
      setCalculationError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsCalculating(false);
    }
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(startOfWeek(currentWeekStart, { locale: es }), i)
  );

  const handleDateSelect = (date: Date) => {
    setCurrentWeekStart(startOfWeek(date, { locale: es }));
    setIsDateSelectOpen(false);
    setSelectedMonth(null);
  };

  const handleMonthSelect = (monthDate: Date) => {
    setSelectedMonth(monthDate);
  };

  const handleBackToMonths = () => {
    setSelectedMonth(null);
  };

  // Generate a list of months (e.g., current year +/- 1 year)
  const months = Array.from({ length: 25 }).map((_, i) => {
    const date = addMonths(startOfMonth(new Date(getYear(today) - 1, 0, 1)), i);
    return { value: date, label: formatMonthYear(date) };
  });

  // Get weeks for the selected month
  const weeksInSelectedMonth = selectedMonth
    ? getWeeksOfMonth(getYearNumber(selectedMonth), getMonthNumber(selectedMonth))
    : [];

  const DateSelectContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        {selectedMonth && (
          <Button variant="ghost" size="icon" onClick={handleBackToMonths}>
            &larr;
          </Button>
        )}
        <h3 className="text-lg font-semibold">
          {selectedMonth ? formatMonthYear(selectedMonth) : 'Seleccionar Mes'}
        </h3>
      </div>
      <Separator />
      <ScrollArea className="flex-1 p-4">
        {!selectedMonth ? (
          <div className="grid grid-cols-2 gap-2">
            {months.map((month) => (
              <Button
                key={month.label}
                variant="outline"
                onClick={() => handleMonthSelect(month.value)}
              >
                {month.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {weeksInSelectedMonth.map((week, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleDateSelect(week.start)}
              >
                {formatWeekRange(week.start, week.end, week.weekNumber)}
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  // Mostrar estado de carga de datos natales
  if (isLoadingNatalData) {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Cargando datos natales...</span>
        </div>
      </div>
    );
  }

  // Mostrar error de datos natales
  if (natalDataError || !hasCompleteData) {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {natalDataError || 'Faltan datos natales completos para calcular el calendario personal.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Mostrar estado del microservicio
  if (microserviceStatus === 'checking') {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Verificando microservicio...</span>
        </div>
      </div>
    );
  }

  if (microserviceStatus === 'unavailable') {
    return (
      <div className="flex flex-col gap-4 p-4 pt-0">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            El microservicio de calendario personal no está disponible. 
            Verifica que esté ejecutándose en el puerto 8004.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">Calendario Personal</h2>
          <p className="text-muted-foreground">
            Eventos personales de la semana del mes de {format(currentWeekStart, 'MMMM', { locale: es })}
          </p>
          {calculationStats && (
            <p className="text-sm text-muted-foreground">
              {calculationStats.total_events} eventos calculados en {calculationStats.calculation_time.toFixed(2)}s
              ({calculationStats.transits_count} tránsitos, {calculationStats.progressed_moon_count} luna progresada, {calculationStats.profections_count} profecciones)
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefreshCalculation}
            disabled={isCalculating}
          >
            <RefreshCw className={`h-4 w-4 ${isCalculating ? 'animate-spin' : ''}`} />
          </Button>

          {/* Date Selection Button */}
          {isMobile ? (
            <Sheet open={isDateSelectOpen} onOpenChange={setIsDateSelectOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Seleccionar fecha
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-2/3">
                {DateSelectContent}
              </SheetContent>
            </Sheet>
          ) : (
            <Popover open={isDateSelectOpen} onOpenChange={setIsDateSelectOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Seleccionar fecha
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 h-96 p-0">
                {DateSelectContent}
              </PopoverContent>
            </Popover>
          )}

          {/* Navigation Arrows (Mobile) */}
          <div className="flex md:hidden items-center gap-1">
            <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
              &larr;
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextWeek}>
              &rarr;
            </Button>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={handlePreviousWeek}>
              &larr; Semana anterior
            </Button>
            <Button variant="outline" onClick={handleNextWeek}>
              Semana siguiente &rarr;
            </Button>
          </div>
        </div>
      </div>

      {/* Calculation Status */}
      {isCalculating && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Calculando eventos personales... Esto puede tomar hasta 30 segundos.
          </AlertDescription>
        </Alert>
      )}

      {calculationError && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error: {calculationError}
          </AlertDescription>
        </Alert>
      )}

      {!isCalculating && eventos.length > 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Calendario personal calculado exitosamente con {eventos.length} eventos.
          </AlertDescription>
        </Alert>
      )}

      {/* House Transits State Card */}
      {(() => {
        const eventosEspeciales = eventos.filter(evento => 
          evento.tipo_evento === "Tránsito Casa Estado"
        );
        
        if (eventosEspeciales.length > 0) {
          return (
            <Card className="p-4 mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <h3 className="font-semibold text-lg mb-3 text-purple-800">
                Estado Actual de Tránsitos por Casas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {eventosEspeciales.map((evento, index) => (
                  <EventoAstrologico 
                    key={`house-transit-${index}`} 
                    evento={evento} 
                  />
                ))}
              </div>
            </Card>
          );
        }
        return null;
      })()}

      {/* Week Display */}
      <div className="flex flex-col gap-4">
        {weekDays.map((day) => {
          // Filtrar eventos para este día
          const eventosDelDia = eventos.filter(evento => {
            // Excluir eventos especiales que van en la tarjeta superior
            if (evento.tipo_evento === "Tránsito Casa Estado") {
              return false;
            }
            
            // Incluir eventos de Luna Progresada que son conjunciones específicas
            if (evento.tipo_evento === "Luna Progresada" && 
                evento.descripcion && evento.descripcion.includes("Conjunción")) {
              const fechaEvento = createDateFromUtc(evento.fecha_utc, evento.hora_utc);
              return isSameDay(fechaEvento, day);
            }
            
            // Incluir todos los demás eventos normales
            const fechaEvento = createDateFromUtc(evento.fecha_utc, evento.hora_utc);
            return isSameDay(fechaEvento, day);
          });

          return (
            <Card
              key={day.toISOString()}
              className={`flex-none w-64 md:w-auto p-4 ${isSameDay(day, today) ? 'border-primary' : ''}`}
            >
              <h3 className="font-semibold">
                {format(day, 'EEEE d', { locale: es })}
                {isSameDay(day, today) && ' (Hoy)'}
              </h3>
              <Separator className="my-2" />
              
              {eventosDelDia.length > 0 ? (
                <ScrollArea className="w-full">
                  <div className="flex space-x-4 pb-2 overflow-x-auto">
                    {eventosDelDia.map((evento, index) => (
                      <EventoAstrologico 
                        key={`${evento.fecha_utc}-${evento.hora_utc}-${index}`} 
                        evento={evento} 
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground">
                  (No hay eventos personales)
                </p>
              )}
            </Card>
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
