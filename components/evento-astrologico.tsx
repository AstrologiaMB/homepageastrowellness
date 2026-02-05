'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDot } from 'lucide-react';

interface EventoAstrologicoProps {
  evento: {
    fecha_utc: string;
    hora_utc: string;
    tipo_evento: string;
    descripcion: string;
    planeta1?: string;
    planeta2?: string;
    posicion1?: string;
    posicion2?: string;
    house_transits?: Array<{
      tipo: string;
      planeta: string;
      simbolo: string;
      signo?: string;
      grado?: number;
      casa: number;
      casa_significado: string;
    }>;
    // Otros campos opcionales según el tipo de evento
  };
}

import { getEventStyle } from '@/lib/event-styles';

export function EventoAstrologico({ evento }: EventoAstrologicoProps) {
  if (!evento) return null;

  // Handle special case for house transits
  if (evento.tipo_evento === 'Tránsito Casa Estado') {
    // Use structured data for house transits and progressed moon
    const houseTransits = evento.house_transits || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2">
          {houseTransits.map((transit, index) => (
            <div key={index} className="text-base glass-card rounded-lg p-3">
              <div className="font-medium text-primary">
                {transit.simbolo} {transit.planeta}
                {transit.tipo === 'luna_progresada' && transit.signo && (
                  <span className="ml-1">
                    en {transit.signo} {transit.grado}°
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Casa {transit.casa} - {transit.casa_significado}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Regular event handling
  // Extraer solo la hora y minutos de la hora UTC
  const horaLocal = new Date(`${evento.fecha_utc}T${evento.hora_utc}:00Z`);
  const horaFormateada = `${horaLocal.getHours().toString().padStart(2, '0')}:${horaLocal.getMinutes().toString().padStart(2, '0')}`;

  const style = getEventStyle(evento.tipo_evento);
  const Icon = style.icon;

  return (
    <Card className="glass-card w-full h-auto hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="space-y-3 p-4">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${style.iconBg}`}>
              <Icon className={`h-4 w-4 ${style.iconColor} flex-shrink-0`} />
            </div>
            <Badge variant="secondary" className={`${style.badgeColor} text-xs font-medium`}>
              {evento.tipo_evento}
            </Badge>
          </div>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {horaFormateada}
          </span>
        </div>

        {/* Description */}
        <div className="text-base font-medium leading-relaxed">{evento.descripcion}</div>

        {/* Información adicional para aspectos */}
        {evento.tipo_evento === 'Aspecto' && evento.planeta1 && evento.posicion1 && (
          <div className="space-y-1.5 pt-2 border-t border-border/40">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <CircleDot className="h-3.5 w-3.5" />
              <span>
                {evento.planeta1}: {evento.posicion1}
              </span>
            </div>
            {evento.planeta2 && evento.posicion2 && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5" />
                <span>
                  {evento.planeta2}: {evento.posicion2}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
