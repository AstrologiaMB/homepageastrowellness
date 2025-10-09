import React from 'react';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { EventoAstrologico } from '../evento-astrologico';
import { createDateFromUtc } from '@/lib/date-utils';
import { addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns';
import { EmptyDayState } from './EmptyDayState';

interface EventoAstrologicoData {
  fecha_utc: string;
  hora_utc: string;
  tipo_evento: string;
  descripcion: string;
  planeta1?: string;
  planeta2?: string;
  posicion1?: string;
  posicion2?: string;
  [key: string]: any;
}

interface DayEventListProps {
  day: Date;
  eventosDelDia: EventoAstrologicoData[];
}

export function DayEventList({ day, eventosDelDia }: DayEventListProps) {
  // Si no hay eventos, mostrar estados vacíos contextuales mejorados
  if (eventosDelDia.length === 0) {
    // Crear contexto semanal básico (7 días de la semana actual)
    const weekStart = startOfWeek(day, { locale: es });
    const weekData = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <Card className={`flex-none w-64 md:w-auto p-4 ${isSameDay(day, new Date()) ? 'border-primary' : ''}`}>
        <h3 className="font-semibold">
          {format(day, 'EEEE d', { locale: es })}
          {isSameDay(day, new Date()) && ' (Hoy)'}
        </h3>
        <Separator className="my-2" />
        <EmptyDayState day={day} weekData={weekData} />
      </Card>
    );
  }

  // Si hay solo un evento, mostrarlo directamente
  if (eventosDelDia.length === 1) {
    return (
      <Card className={`flex-none w-64 md:w-auto p-4 ${isSameDay(day, new Date()) ? 'border-primary' : ''}`}>
        <h3 className="font-semibold">
          {format(day, 'EEEE d', { locale: es })}
          {isSameDay(day, new Date()) && ' (Hoy)'}
        </h3>
        <Separator className="my-2" />
        <EventoAstrologico evento={eventosDelDia[0]} />
      </Card>
    );
  }

  // Si hay múltiples eventos, usar Accordion
  return (
    <Card className={`flex-none w-64 md:w-auto p-4 ${isSameDay(day, new Date()) ? 'border-primary' : ''}`}>
      <h3 className="font-semibold">
        {format(day, 'EEEE d', { locale: es })}
        {isSameDay(day, new Date()) && ' (Hoy)'}
      </h3>
      <Separator className="my-2" />

      <Accordion type="single" collapsible className="w-full">
        {eventosDelDia.map((evento, index) => {
          const horaLocal = new Date(`${evento.fecha_utc}T${evento.hora_utc}:00Z`);
          const horaFormateada = `${horaLocal.getHours().toString().padStart(2, '0')}:${horaLocal.getMinutes().toString().padStart(2, '0')}`;

          return (
            <AccordionItem key={`evento-${index}`} value={`evento-${index}`}>
              <AccordionTrigger className="text-sm justify-start text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{evento.tipo_evento}</span>
                  <span className="text-muted-foreground">- {horaFormateada}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <EventoAstrologico evento={evento} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
}
