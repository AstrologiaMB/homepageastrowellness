'use client';

import {
  addDays,
  addWeeks,
  format,
  getISOWeek,
  isSameDay,
  isSameWeek,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CalendarIcon, Sparkles } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { createDateFromUtc } from '@/lib/date-utils';
import { EventoAstrologico } from './evento-astrologico';

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
    console.log(`Cargando eventos para el año ${year}...`);
    const data = await import(`@/data/eventos_astrologicos_UTC_${year}.json`);
    console.log(`✅ Eventos cargados para ${year}:`, data.default?.length || 0, 'eventos');
    return data.default as EventoAstrologicoData[];
  } catch (error) {
    console.warn(`⚠️ Archivo no encontrado para ${year}, usando datos vacíos:`, error);
    return [];
  }
};

export function CalendarioGeneral() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { locale: es }));
  const [selectedDate] = useState<Date>(new Date());
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [eventos, setEventos] = useState<EventoAstrologicoData[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const today = new Date();
  const isMobile = useIsMobile();

  // Cargar los eventos cuando cambia el año o al montar el componente
  // 🎯 Pre-cargar también el año siguiente para semanas que cruzan años
  useEffect(() => {
    const loadData = async () => {
      const [currentYearData, nextYearData] = await Promise.all([
        loadYearData(selectedYear),
        loadYearData(selectedYear + 1),
      ]);

      // Combinar eventos de ambos años sin duplicados
      const allEvents = [...currentYearData, ...nextYearData];
      const uniqueEvents = allEvents.filter(
        (event, index, self) =>
          index ===
          self.findIndex((e) => e.fecha_utc === event.fecha_utc && e.hora_utc === event.hora_utc)
      );

      setEventos(uniqueEvents);
      console.log(
        `✅ Eventos cargados: ${selectedYear} (${currentYearData.length}) + ${selectedYear + 1} (${nextYearData.length}) = ${uniqueEvents.length} eventos totales`
      );
    };

    loadData();
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
  }, [selectedYear, currentWeekStart]); // Solo depende de selectedYear para evitar loops

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

  return (
    <div className="flex flex-col gap-5 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 py-4 md:p-6 rounded-lg bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 dark:from-violet-500/10 dark:via-purple-500/10 dark:to-fuchsia-500/10 border border-violet-200 dark:border-violet-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-2xl font-bold text-violet-700 dark:text-transparent dark:bg-gradient-to-r dark:from-violet-400 dark:to-fuchsia-400 dark:bg-clip-text">
              Calendario Astral - Semana {currentWeekNumber}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Eventos de la semana del mes de {format(currentWeekStart, 'MMMM', { locale: es })} de{' '}
            {currentWeekStart.getFullYear()}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          {/* Year Selector */}
          <Select
            value={selectedYear.toString()}
            onValueChange={(year) => setSelectedYear(parseInt(year))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Date Selection Button */}
          {isMobile ? (
            <Sheet open={isDateSelectOpen} onOpenChange={setIsDateSelectOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="min-w-fit whitespace-nowrap">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Seleccionar fecha
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-2/3">
                <div className="p-4">
                  <Calendar
                    mode="single"
                    defaultMonth={new Date()}
                    fromYear={2024}
                    toYear={2030}
                    captionLayout="dropdown-months"
                    locale={es}
                    selected={selectedDate}
                    onSelect={(date) => {
                      handleDateSelect(date);
                      setIsDateSelectOpen(false);
                    }}
                    className="rounded-md border"
                  />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Popover open={isDateSelectOpen} onOpenChange={setIsDateSelectOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-fit whitespace-nowrap">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Seleccionar fecha
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  defaultMonth={new Date()}
                  fromYear={2024}
                  toYear={2030}
                  captionLayout="dropdown-months"
                  locale={es}
                  selected={selectedDate}
                  onSelect={(date) => {
                    handleDateSelect(date);
                    setIsDateSelectOpen(false);
                  }}
                  className="rounded-md border"
                />
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
            <Button
              variant="outline"
              className="min-w-fit whitespace-nowrap"
              onClick={handlePreviousWeek}
            >
              &larr; Semana {previousWeekNumber}
            </Button>
            <Button
              variant="outline"
              className="min-w-fit whitespace-nowrap"
              onClick={handleNextWeek}
            >
              Semana {nextWeekNumber} &rarr;
            </Button>
          </div>
        </div>
      </div>

      {/* Week Display */}
      <div className="flex flex-col gap-5">
        {weekDays.map((day) => {
          // Filtrar eventos para este día
          const eventosDelDia = eventos.filter((evento) => {
            const fechaEvento = createDateFromUtc(evento.fecha_utc, evento.hora_utc);
            return isSameDay(fechaEvento, day);
          });

          const isToday = isSameDay(day, today);

          return (
            <Card
              key={day.toISOString()}
              className={`flex-none w-full max-w-full box-border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isToday
                  ? 'border-[2px] border-primary bg-primary/5 dark:bg-primary/10'
                  : 'glass-card'
              }`}
            >
              {/* Day Header */}
              <div
                className={`px-3 py-3 md:p-4 rounded-t-lg ${
                  isToday ? 'bg-primary/10 dark:bg-primary/20' : 'bg-muted/50 dark:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg capitalize flex items-center gap-2">
                    {format(day, 'EEEE d', { locale: es })}
                    {isToday && (
                      <Badge variant="default" className="bg-primary hover:bg-primary/90 text-xs">
                        Hoy
                      </Badge>
                    )}
                  </h3>
                  {eventosDelDia.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {eventosDelDia.length} {eventosDelDia.length === 1 ? 'evento' : 'eventos'}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="px-2 py-3 md:p-4">
                {eventosDelDia.length > 0 ? (
                  <ScrollArea className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
                      {eventosDelDia.map((evento, index) => (
                        <EventoAstrologico
                          key={`${evento.fecha_utc}-${evento.hora_utc}-${index}`}
                          evento={evento}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No hay eventos programados
                  </p>
                )}
              </div>
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
