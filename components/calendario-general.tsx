"use client";

import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, isSameWeek, addDays, startOfMonth, getMonth, getYear, addMonths, getISOWeek } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";

import { getWeeksOfMonth, formatWeekRange, formatMonthYear, getMonthNumber, getYearNumber, createDateFromUtc } from '@/lib/date-utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
    const module = await import(`@/data/eventos_astrologicos_UTC_${year}.json`);
    console.log(`✅ Eventos cargados para ${year}:`, module.default?.length || 0, 'eventos');
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

  const today = new Date();
  const isMobile = useIsMobile();

  // Cargar los eventos cuando cambia el año o al montar el componente
  // 🎯 Pre-cargar también el año siguiente para semanas que cruzan años
  useEffect(() => {
    const loadData = async () => {
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
      console.log(`✅ Eventos cargados: ${selectedYear} (${currentYearData.length}) + ${selectedYear + 1} (${nextYearData.length}) = ${uniqueEvents.length} eventos totales`);
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

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">Calendario Astral - Semana {currentWeekNumber}</h2>
          <p className="text-muted-foreground">Eventos de la semana del mes de {format(currentWeekStart, 'MMMM', { locale: es })} de {currentWeekStart.getFullYear()}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Year Selector */}
          <Select value={selectedYear.toString()} onValueChange={(year) => setSelectedYear(parseInt(year))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_YEARS.map(year => (
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
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
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
                    captionLayout="dropdown-buttons"
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
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Seleccionar fecha
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  defaultMonth={new Date()}
                  fromYear={2024}
                  toYear={2030}
                  captionLayout="dropdown-buttons"
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
              <Button variant="outline" onClick={handlePreviousWeek}>
                 &larr; Semana {previousWeekNumber}
              </Button>
              <Button variant="outline" onClick={handleNextWeek}>
                 Semana {nextWeekNumber} &rarr;
              </Button>
           </div>
        </div>
      </div>

      {/* Week Display */}
      <div className="flex flex-col gap-4">
        {weekDays.map((day) => {
          // Filtrar eventos para este día
          const eventosDelDia = eventos.filter(evento => {
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
                  (No hay eventos)
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
