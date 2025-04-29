"use client";

import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, isSameWeek, addDays, startOfMonth, getMonth, getYear, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming ScrollArea might be useful for month/week lists

import { getWeeksOfMonth, formatWeekRange, formatMonthYear, getMonthNumber, getYearNumber } from '@/lib/date-utils';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook exists for mobile detection

export function CalendarioGeneral() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { locale: es }));
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const today = new Date();
  const isMobile = useIsMobile(); // Use the mobile hook

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleBackToToday = () => {
    setCurrentWeekStart(startOfWeek(today, { locale: es }));
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(startOfWeek(currentWeekStart, { locale: es }), i)
  );

  const handleDateSelect = (date: Date) => {
    setCurrentWeekStart(startOfWeek(date, { locale: es }));
    setIsDateSelectOpen(false); // Close the Sheet/Popover
    setSelectedMonth(null); // Reset selected month
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
        {/* Add a close button if needed */}
      </div>
      <Separator />
      <ScrollArea className="flex-1 p-4">
        {!selectedMonth ? (
          // Display months
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
          // Display weeks for the selected month
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

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">Calendario Astral</h2>
          <p className="text-muted-foreground">Eventos de la semana del mes de {format(currentWeekStart, 'MMMM', { locale: es })}</p>
        </div>
        <div className="flex items-center gap-2">
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

      {/* Week Display */}
      <div className="flex flex-col gap-4">
        {weekDays.map((day) => (
          <Card
            key={day.toISOString()}
            className={`flex-none w-64 md:w-auto p-4 ${isSameDay(day, today) ? 'border-primary' : ''}`} // Highlight today
          >
            <h3 className="font-semibold">
              {format(day, 'EEEE d', { locale: es })}
              {isSameDay(day, today) && ' (Hoy)'}
            </h3>
            <Separator className="my-2" />
            {/* Placeholder for events */}
            <p className="text-muted-foreground">
              {/* Logic to check for events for this day */}
              (No hay eventos)
            </p>
          </Card>
        ))}
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
