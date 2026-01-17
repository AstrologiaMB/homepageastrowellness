import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import { es } from 'date-fns/locale';

interface DateSelectorProps {
  selectedDate: Date;
  currentWeekStart: Date;
  availableYears: readonly number[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDate: (date: Date | undefined) => void;
}

export function DateSelector({
  selectedDate,
  currentWeekStart,
  availableYears,
  isOpen,
  onOpenChange,
  onSelectDate,
}: DateSelectorProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile: Sheet para fecha */}
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Seleccionar fecha</span>
              <span className="sm:hidden">📅</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-3/4">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Seleccionar fecha</h3>
                <p className="text-sm text-muted-foreground">
                  Selecciona una fecha para saltar directamente a esa semana
                </p>
              </div>
              <Calendar
                mode="single"
                defaultMonth={currentWeekStart}
                fromYear={Math.min(...availableYears)}
                toYear={Math.max(...availableYears)}
                captionLayout="dropdown"
                locale={es}
                selected={selectedDate}
                onSelect={(date) => {
                  onSelectDate(date);
                  onOpenChange(false);
                }}
                className="rounded-md border mx-auto"
                numberOfMonths={1}
              />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        // Desktop: Popover para fecha
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Seleccionar fecha
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              defaultMonth={currentWeekStart}
              fromYear={Math.min(...availableYears)}
              toYear={Math.max(...availableYears)}
              captionLayout="dropdown"
              locale={es}
              selected={selectedDate}
              onSelect={(date) => {
                onSelectDate(date);
                onOpenChange(false);
              }}
              className="rounded-md border"
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
