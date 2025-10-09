import React from 'react';
import { getISOWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DateSelector } from './DateSelector';
import { YearSelector } from './YearSelector';

interface CalendarHeaderProps {
  currentWeekStart: Date;
  previousWeekNumber: number;
  nextWeekNumber: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  selectedYear: number;
  availableYears: readonly number[];
  selectedDate: Date;
  isDateSelectOpen: boolean;
  onYearChange: (year: number) => void;
  onDateSelectOpenChange: (open: boolean) => void;
  onDateSelect: (date: Date | undefined) => void;
}

// Estado simulador para navegación (será controlado por el padre)
export function CalendarHeader({
  currentWeekStart,
  previousWeekNumber,
  nextWeekNumber,
  onPreviousWeek,
  onNextWeek,
  selectedYear,
  availableYears,
  selectedDate,
  isDateSelectOpen,
  onYearChange,
  onDateSelectOpenChange,
  onDateSelect
}: CalendarHeaderProps) {
  const currentWeekNumber = getISOWeek(currentWeekStart);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            <span className="text-primary">Calendario Astral</span>
            <Badge variant="secondary" className="ml-2">
              Semana {currentWeekNumber}
            </Badge>
          </h2>
          <p className="text-muted-foreground mt-1">
            Eventos de la semana del mes de {currentWeekStart.toLocaleDateString('es-ES', {
              month: 'long'
            })} de {currentWeekStart.getFullYear()}
          </p>
        </div>

        {/* Controles de navegación - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onPreviousWeek}
            className="hover:bg-primary/5"
          >
            ← Semana {previousWeekNumber}
          </Button>
          <Button
            variant="outline"
            onClick={onNextWeek}
            className="hover:bg-primary/5"
          >
            Semana {nextWeekNumber} →
          </Button>
          <YearSelector
            selectedYear={selectedYear}
            availableYears={availableYears}
            onYearChange={onYearChange}
          />
          <DateSelector
            selectedDate={selectedDate}
            currentWeekStart={currentWeekStart}
            availableYears={availableYears}
            isOpen={isDateSelectOpen}
            onOpenChange={onDateSelectOpenChange}
            onSelectDate={onDateSelect}
          />
        </div>

        {/* Controles de navegación - Mobile (solo flechas) */}
        <div className="flex md:hidden items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPreviousWeek}
            className="w-10 h-10"
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextWeek}
            className="w-10 h-10"
          >
            →
          </Button>
        </div>
      </div>
    </Card>
  );
}
