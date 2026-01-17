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

// Helper function to get event styling based on type
const getEventStyle = (tipoEvento: string) => {
  const tipo = tipoEvento.toLowerCase();

  if (tipo.includes('aspecto')) {
    return {
      gradient: 'from-blue-100 to-cyan-100 dark:from-blue-500/10 dark:to-cyan-500/10',
      border: 'border-blue-300 dark:border-blue-500/30',
      icon: Orbit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      badgeColor:
        'bg-blue-200 text-blue-800 hover:bg-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30',
    };
  }

  if (tipo.includes('ingreso') || tipo.includes('signo')) {
    return {
      gradient: 'from-purple-100 to-pink-100 dark:from-purple-500/10 dark:to-pink-500/10',
      border: 'border-purple-300 dark:border-purple-500/30',
      icon: ArrowRight,
      iconColor: 'text-purple-600 dark:text-purple-400',
      badgeColor:
        'bg-purple-200 text-purple-800 hover:bg-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:hover:bg-purple-500/30',
    };
  }

  if (tipo.includes('luna')) {
    return {
      gradient: 'from-indigo-100 to-violet-100 dark:from-indigo-500/10 dark:to-violet-500/10',
      border: 'border-indigo-300 dark:border-indigo-500/30',
      icon: Moon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      badgeColor:
        'bg-indigo-200 text-indigo-800 hover:bg-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30',
    };
  }

  if (tipo.includes('casa')) {
    return {
      gradient: 'from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10',
      border: 'border-amber-300 dark:border-amber-500/30',
      icon: Home,
      iconColor: 'text-amber-600 dark:text-amber-400',
      badgeColor:
        'bg-amber-200 text-amber-800 hover:bg-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30',
    };
  }

  // Default style
  return {
    gradient: 'from-slate-100 to-gray-100 dark:from-slate-500/10 dark:to-gray-500/10',
    border: 'border-slate-300 dark:border-slate-500/30',
    icon: Star,
    iconColor: 'text-slate-600 dark:text-slate-400',
    badgeColor:
      'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:hover:bg-slate-500/30',
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
            <div key={index} className="text-sm bg-white/50 rounded p-2 border border-purple-200">
              <div className="font-medium text-purple-700">
                {transit.simbolo} {transit.planeta}
                {transit.tipo === 'luna_progresada' && transit.signo && (
                  <span className="ml-1">
                    en {transit.signo} {transit.grado}°
                  </span>
                )}
              </div>
              <div className="text-xs text-purple-600">
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
    <Card
      className={`w-full sm:w-72 flex-shrink-0 h-auto bg-gradient-to-br ${style.gradient} border ${style.border} hover:shadow-md transition-all duration-200`}
    >
      <CardContent className="space-y-3 px-3 py-3 sm:px-4 sm:py-4">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${style.iconColor} flex-shrink-0`} />
            <Badge variant="secondary" className={`${style.badgeColor} text-xs font-medium`}>
              {evento.tipo_evento}
            </Badge>
          </div>
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {horaFormateada}
          </span>
        </div>

        {/* Description */}
        <div className="text-sm font-medium leading-relaxed">{evento.descripcion}</div>

        {/* Información adicional para aspectos */}
        {evento.tipo_evento === 'Aspecto' && evento.planeta1 && evento.posicion1 && (
          <div className="space-y-1 pt-2 border-t border-border/40">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <CircleDot className="h-3 w-3" />
              <span>
                {evento.planeta1}: {evento.posicion1}
              </span>
            </div>
            {evento.planeta2 && evento.posicion2 && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <CircleDot className="h-3 w-3" />
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
