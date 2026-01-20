'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Orbit, ArrowRight, Moon, Star, CircleDot, Home } from 'lucide-react';

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

// Helper function to get event styling based on type - now uses primary/purple theme
const getEventStyle = (tipoEvento: string) => {
  const tipo = tipoEvento.toLowerCase();

  if (tipo.includes('aspecto')) {
    return {
      icon: Orbit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      badgeColor:
        'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30',
    };
  }

  if (tipo.includes('ingreso') || tipo.includes('signo')) {
    return {
      icon: ArrowRight,
      iconColor: 'text-primary dark:text-primary',
      iconBg: 'bg-primary/10 dark:bg-primary/20',
      badgeColor:
        'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30',
    };
  }

  if (tipo.includes('luna')) {
    return {
      icon: Moon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      badgeColor:
        'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30',
    };
  }

  if (tipo.includes('casa')) {
    return {
      icon: Home,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      badgeColor:
        'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30',
    };
  }

  // Default style
  return {
    icon: Star,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted/50',
    badgeColor: 'bg-muted text-muted-foreground hover:bg-muted/70',
  };
};

export function EventoAstrologico({ evento }: EventoAstrologicoProps) {
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
