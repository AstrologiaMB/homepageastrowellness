"use client";

import React, { useState, useEffect, useRef } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, isSameWeek, addDays, startOfMonth, getMonth, getYear, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, RefreshCw, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransitSearchModal } from './transit-search-modal';

import { getWeeksOfMonth, formatWeekRange, formatMonthYear, getMonthNumber, getYearNumber, createDateFromUtc } from '@/lib/date-utils';
import { degreesToGMS } from '@/lib/astrology-utils';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { EventoConInterpretacion } from './evento-con-interpretacion';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false); // NEW STATE
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [eventos, setEventos] = useState<EventoPersonal[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  // Track which years have been loaded to avoid re-fetching
  const [loadedYears, setLoadedYears] = useState<Set<number>>(new Set());

  const [calculationStats, setCalculationStats] = useState<{
    total_events: number;
    calculation_time: number;
    transits_count: number;
    from_cache?: boolean;
  } | null>(null);
  const [microserviceStatus, setMicroserviceStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  const today = new Date();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Hook para obtener datos natales del usuario
  const { natalData, isLoading: isLoadingNatalData, error: natalDataError, hasCompleteData } = useUserNatalData();

  // Verificar estado del microservicio al montar el componente
  useEffect(() => {
    async function checkMicroservice() {
      let attempts = 0;
      const maxAttempts = 5; // Intentar durante 5 segundos

      while (attempts < maxAttempts) {
        const isHealthy = await checkMicroserviceHealth();
        if (isHealthy) {
          setMicroserviceStatus('available');
          return;
        }
        // Esperar 1 segundo antes del siguiente intento
        attempts++;
        if (attempts < maxAttempts) await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setMicroserviceStatus('unavailable');
    }
    checkMicroservice();
  }, []);

  // Función para verificar si un año está disponible
  const isYearAvailable = (targetYear: number) => {
    const currentYear = new Date().getFullYear();
    if (targetYear <= currentYear) return { available: true };

    // El año siguiente solo está disponible a partir del 15 de diciembre del año actual
    if (targetYear === currentYear + 1) {
      const today = new Date();
      // Mes 11 es Diciembre (0-indexed)
      const isMidDec = today.getMonth() === 11 && today.getDate() >= 15;
      if (isMidDec) return { available: true };

      return {
        available: false,
        message: `Los datos del ${targetYear} recién estarán disponibles a partir de mediados de diciembre de ${currentYear}.`
      };
    }

    return {
      available: false,
      message: `Los datos del ${targetYear} aún no están disponibles.`
    };
  };

  // Calcular eventos personales dinámicamente según la semana visualizada
  useEffect(() => {
    async function calculatePersonalEvents() {
      // Validaciones básicas
      if (!natalData || !hasCompleteData || microserviceStatus !== 'available') {
        return;
      }

      // Determinar qué año(s) necesitamos para la semana actual
      const weekStart = currentWeekStart;
      const weekEnd = addDays(weekStart, 6);
      const startYear = getYear(weekStart);
      const endYear = getYear(weekEnd);

      const yearsNeeded = new Set([startYear]);
      if (endYear !== startYear) {
        yearsNeeded.add(endYear);
      }

      // Identificar años faltantes en loadedYears
      const yearsToFetch: number[] = [];

      yearsNeeded.forEach(year => {
        if (!loadedYears.has(year)) {
          yearsToFetch.push(year);
        }
      });

      // Si no hace falta nada, terminamos
      if (yearsToFetch.length === 0) return;

      setIsCalculating(true);
      setCalculationError(null);

      // Procesar cada año faltante
      for (const year of yearsToFetch) {
        // Verificar restricción de fechas
        const availability = isYearAvailable(year);

        if (!availability.available) {
          // Si no está disponible, mostrar aviso.
          // NO marcamos como cargado para permitir que el aviso salga de nuevo si el usuario insiste en navegar a estas fechas.
          toast({
            title: "Año no disponible",
            description: availability.message || `No se pueden cargar datos del año ${year}`,
            variant: "destructive"
          });

          continue;
        }

        try {
          const response = await fetchPersonalCalendar(natalData, false, year);

          // Filter out Lunar Phases and Eclipses (Commercial Separation)
          const filteredEvents = response.events.filter(e =>
            !['Luna Nueva', 'Luna Llena', 'Cuarto Creciente', 'Cuarto Menguante', 'Eclipse Solar', 'Eclipse Lunar'].includes(e.tipo_evento)
          );

          setEventos(prev => {
            // Eliminar eventos existentes para este año antes de agregar los nuevos (evitar duplicados)
            const otherYearsEvents = prev.filter(e => !e.fecha_utc.startsWith(String(year)));

            return [...otherYearsEvents, ...filteredEvents].sort((a, b) => {
              // Ordenar por fecha y hora
              if (a.fecha_utc !== b.fecha_utc) return a.fecha_utc.localeCompare(b.fecha_utc);
              return a.hora_utc.localeCompare(b.hora_utc);
            });
          });

          // Actualizar estadísticas (mostrando las del último fetch)
          setCalculationStats({
            total_events: response.total_events,
            calculation_time: response.calculation_time,
            transits_count: response.transits_count,
            from_cache: response.from_cache
          });

          // Marcar año como cargado
          setLoadedYears(prev => new Set(prev).add(year));

        } catch (error) {
          console.error(`Error calculating personal events for year ${year}:`, error);
          setCalculationError(error instanceof Error ? error.message : 'Error desconocido');
        }
      }

      setIsCalculating(false);
    }

    calculatePersonalEvents();
  }, [natalData, hasCompleteData, microserviceStatus, currentWeekStart]); // Dependencias: Si cambia la semana, reevaluamos si falta info

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

    // For refresh, we assume we want to refresh the CURRENT view's year(s)
    const yearToRefresh = getYear(currentWeekStart);

    // Verificar disponibilidad (re-check)
    const availability = isYearAvailable(yearToRefresh);
    if (!availability.available) {
      toast({
        title: "No se puede actualizar",
        description: availability.message,
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCalculating(true);
      setCalculationError(null);

      // Force refresh for this year
      const response = await fetchPersonalCalendar(natalData, true, yearToRefresh);

      // Filter out Lunar Phases
      const filteredEvents = response.events.filter(e =>
        !['Luna Nueva', 'Luna Llena', 'Cuarto Creciente', 'Cuarto Menguante', 'Eclipse Solar', 'Eclipse Lunar'].includes(e.tipo_evento)
      );

      setEventos(prev => {
        // Remove old events for this year and add new ones
        const otherYearsEvents = prev.filter(e => {
          // Simple filtering by checking the year in the date string
          return !e.fecha_utc.startsWith(String(yearToRefresh));
        });

        const newEventsList = [...otherYearsEvents, ...filteredEvents];
        // Sort again
        return newEventsList.sort((a, b) => {
          if (a.fecha_utc !== b.fecha_utc) return a.fecha_utc.localeCompare(b.fecha_utc);
          return a.hora_utc.localeCompare(b.hora_utc);
        });
      });

      setCalculationStats({
        total_events: response.total_events,
        calculation_time: response.calculation_time,
        transits_count: response.transits_count,
        from_cache: response.from_cache
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
  // Expanded range to allow testing navigation to future years
  const months = Array.from({ length: 36 }).map((_, i) => {
    const date = addMonths(startOfMonth(new Date(getYear(today) - 1, 0, 1)), i);
    return { value: date, label: formatMonthYear(date) };
  });

  // Get weeks for the selected month
  const weeksInSelectedMonth = selectedMonth
    ? getWeeksOfMonth(getYearNumber(selectedMonth), getMonthNumber(selectedMonth))
    : [];

  const DateSelectContent = (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        {selectedMonth && (
          <Button variant="ghost" size="icon" onClick={handleBackToMonths}>
            &larr;
          </Button>
        )}
        <h3 className="text-lg font-semibold">
          {selectedMonth ? formatMonthYear(selectedMonth) : 'Seleccionar Fecha'}
        </h3>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        {!selectedMonth ? (
          <Tabs defaultValue="2025" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              {/* 
                 Dynamic Year Logic: 
                 Start: 2025
                 End: Current Year + 1 
               */}
              {(() => {
                const currentYear = new Date().getFullYear();
                const endYear = currentYear + 1;
                const years = [];
                for (let y = 2025; y <= endYear; y++) {
                  years.push(y);
                }
                return years.map(year => (
                  <TabsTrigger key={year} value={String(year)}>{year}</TabsTrigger>
                ));
              })()}
            </TabsList>

            {(() => {
              const currentYear = new Date().getFullYear();
              const endYear = currentYear + 1;
              const years = [];
              for (let y = 2025; y <= endYear; y++) {
                years.push(y);
              }

              return years.map(year => (
                <TabsContent key={year} value={String(year)} className="flex-1 mt-0">
                  <ScrollArea className="h-[280px]">
                    <div className="grid grid-cols-3 gap-2 pb-4">
                      {Array.from({ length: 12 }).map((_, monthIndex) => {
                        const date = new Date(year, monthIndex, 1);
                        return (
                          <Button
                            key={monthIndex}
                            variant="outline"
                            className="h-14 flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                            onClick={() => handleMonthSelect(date)}
                          >
                            <span className="text-sm font-semibold capitalize">
                              {format(date, 'MMM', { locale: es })}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ));
            })()}
          </Tabs>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-2">
              {weeksInSelectedMonth.map((week, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => handleDateSelect(week.start)}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-medium">Semana {week.weekNumber}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatWeekRange(week.start, week.end, week.weekNumber).split(' - ')[1] ? formatWeekRange(week.start, week.end, week.weekNumber) : `del ${format(week.start, "d 'de' MMMM", { locale: es })}`}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
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
            Eventos personales de la semana del mes de {format(currentWeekStart, 'MMMM yyyy', { locale: es })}
          </p>
          {calculationStats && (
            <div className="flex items-center gap-2 text-sm justify-between"> {/* Adjusted for consistency */}
              <div className="flex gap-4">
                <span>{calculationStats.total_events} eventos</span>
                <span className="text-muted-foreground">
                  {calculationStats.from_cache ? '(Cache)' : `(${calculationStats.calculation_time.toFixed(2)}s)`}
                </span>
              </div>
            </div>
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

          {/* NEW: Search Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            title="Buscar Tránsitos"
          >
            <Search className="h-4 w-4" />
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
            Calculando eventos personales para el año seleccionado... Esto puede tomar hasta 30 segundos.
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

      {/* SECCIÓN: ESTADO ACTUAL (Horoscope / Weather) */}
      {eventos.some(e => e.tipo_evento === 'Tránsito Casa Estado') && (
        <div className="mb-0 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="text-xl">🪐</span>
            <h3 className="text-lg font-serif font-bold text-slate-700">
              Clima Astral de Fondo
            </h3>
          </div>

          <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-slate-50/50 p-4">
            <div className="flex w-max space-x-4">
              {(() => {
                // Lógica de deduplicación para visualización
                const uniqueHouseTransits = new Map();

                // Filtrar eventos de estado para el mes actual que se está visualizando
                const stateEvents = eventos.filter(e => e.tipo_evento === 'Tránsito Casa Estado');
                let targetEvent: EventoPersonal | null = null;

                if (stateEvents.length > 0) {
                  // Estrategia: Buscar el evento más cercano a la semana que se está visualizando.
                  // Esto evita problemas de timezone (ej. 1 Agosto 00:00 -> 31 Julio 21:00) y asegura
                  // que siempre mostremos el 'Clima' más relevante temporalmente.

                  let minDiff = Infinity;
                  const weekCenter = addDays(currentWeekStart, 3); // Comparamos con el centro de la semana

                  stateEvents.forEach(e => {
                    const eDate = createDateFromUtc(e.fecha_utc, e.hora_utc);
                    const diff = Math.abs(eDate.getTime() - weekCenter.getTime());

                    if (diff < minDiff) {
                      minDiff = diff;
                      targetEvent = e;
                    }
                  });
                }

                if (targetEvent) {
                  // Extraer items del metadata del evento seleccionado
                  const houseTransits = (targetEvent as any).metadata?.house_transits || [];
                  if (Array.isArray(houseTransits)) {
                    houseTransits.forEach((item: any) => {
                      // Clave única: Planeta + Casa
                      const key = `${item.planeta}-${item.casa}`;
                      if (!uniqueHouseTransits.has(key)) {
                        uniqueHouseTransits.set(key, item);
                      }
                    });
                  }
                } else {
                  // Fallback legacy (solo si no hay eventos de estado)
                  stateEvents.forEach(event => {
                    const houseTransits = event.metadata?.house_transits || [];
                    if (Array.isArray(houseTransits)) {
                      houseTransits.forEach((item: any) => {
                        const key = `${item.planeta}-${item.casa}`;
                        if (!uniqueHouseTransits.has(key)) {
                          uniqueHouseTransits.set(key, item);
                        }
                      });
                    }
                  });
                }

                // Ordenar: Luna Progresada primero, luego por orden tradicional (Júpiter -> Plutón)
                const planetOrder = ['Luna Progresada', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'];
                const sortedItems = Array.from(uniqueHouseTransits.values()).sort((a: any, b: any) => {
                  return planetOrder.indexOf(a.planeta) - planetOrder.indexOf(b.planeta);
                });

                return sortedItems.map((item: any, idx) => (
                  <div
                    key={`${item.planeta}-${idx}`}
                    className="flex flex-col justify-between w-[200px] h-[110px] p-3 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all cursor-default select-none relative overflow-hidden group"
                  >
                    {/* Background Decor */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br opacity-5 rounded-full -mr-4 -mt-4
                      ${item.tipo === 'luna_progresada' ? 'from-purple-400 to-blue-400' : 'from-orange-400 to-amber-400'}
                    `} />

                    {/* Header: Icon + Planet */}
                    <div className="flex items-center gap-2 z-10 w-full mb-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm shrink-0
                        ${item.tipo === 'luna_progresada'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                        }
                      `}>
                        {item.simbolo || (item.tipo === 'luna_progresada' ? '🌙' : '🪐')}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm text-slate-700 line-clamp-1">
                          {item.planeta}
                        </span>
                        {item.signo && (
                          <span className={`text-[10px] uppercase font-bold leading-none
                            ${item.tipo === 'luna_progresada' ? 'text-purple-600' : 'text-orange-600'}
                          `}>
                            {item.signo} {(() => {
                              const { degrees, minutes } = degreesToGMS(item.grado);
                              return `${degrees}° ${minutes}'`;
                            })()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content: House Info */}
                    <div className="flex flex-col z-10">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Casa {item.casa}
                      </span>
                      <span className="text-xs text-slate-600 line-clamp-2 leading-tight h-8 mt-0.5 whitespace-normal" title={item.casa_significado}>
                        {item.casa_significado}
                      </span>
                    </div>
                  </div>
                ));
              })()}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}

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
                      <EventoConInterpretacion
                        key={`${evento.fecha_utc}-${evento.hora_utc}-${index}`}
                        evento={evento}
                        natalData={natalData}
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

      {/* MODAL INTEGRATION */}
      <TransitSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={eventos}
        onSelectEvent={(date) => {
          setCurrentWeekStart(startOfWeek(date, { locale: es }));
        }}
      />
    </div>
  );
}
