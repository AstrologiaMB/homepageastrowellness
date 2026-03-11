'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { StoryModal } from './lunar-cycles/StoryModal';
import { ActiveCyclesResponse } from '@/lib/services/cycles-service';
import { getEventStyle } from '@/lib/event-styles';
import { BookOpen, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createDateFromUtc } from '@/lib/date-utils';

import { PersonalCalendarEvent } from '@/lib/personal-calendar-api';
import { RelevanceLevel, HouseTransitStrict } from '@/lib/api-clients/calendar';

interface EventoConInterpretacionProps {
  evento: PersonalCalendarEvent;
  natalData?: any;
  variant?: 'default' | 'minimal';
  className?: string;
  specialContext?: {
    type: string;
    name: string;
    isEclipse: boolean;
    phaseIcon?: string;
  };
}

export function EventoConInterpretacion({
  evento,
  natalData,
  variant = 'default',
  className = '',
  specialContext,
}: EventoConInterpretacionProps) {
  const [interpretacion, setInterpretacion] = useState<string | null>(
    evento.interpretacion || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Personal Hero Card Logic ---
  const isSlowPlanet = (planet?: string | null) =>
    planet ? ['júpiter', 'jupiter', 'saturno', 'urano', 'neptuno', 'plutón', 'pluton'].includes(planet.toLowerCase()) : false;

  const isPersonalPoint = (point?: string | null) =>
    point ? ['sol', 'luna', 'mercurio', 'venus', 'marte', 'ascendente', 'medio cielo'].includes(point.toLowerCase()) : false;

  const isExactTransit = evento.orbe === "0°00'00\"";

  const isPersonalHero =
    evento.tipo_evento === 'Aspecto' &&
    isSlowPlanet(evento.planeta1) &&
    isPersonalPoint(evento.planeta2) &&
    isExactTransit;

  const isEclipse = evento.tipo_evento.includes('Eclipse');
  const isMajorPhase = ['Luna Nueva', 'Luna Llena'].includes(evento.tipo_evento);
  const isCelestialHero = isEclipse || isMajorPhase;

  const isAnyHero = isPersonalHero || isCelestialHero;

  // Auto-expand if it's ANY Hero card to maximize WOW factor
  const [isExpanded, setIsExpanded] = useState(isAnyHero);

  // --- Auto-Fetch Logic for Hero Cards ---
  // If the card mounts naturally expanded (Hero) but has no interpretation yet, fetch it automatically.
  useEffect(() => {
    if (isExpanded && !interpretacion && !isLoading && !error) {
      obtenerInterpretacion();
    }
  }, [isExpanded, interpretacion, isLoading, error]);

  // Update effect if prop changes
  useEffect(() => {
    if (evento.interpretacion) {
      setInterpretacion(evento.interpretacion);
    }
  }, [evento.interpretacion]);

  // Cycle Logic
  const [cycleData, setCycleData] = useState<ActiveCyclesResponse | null>(null);
  const [, setIsCycleLoading] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  // Removed internal hook usage: const { natalData } = useUserNatalData();

  // Determine if it's a phase event
  const isPhase = ['Luna Nueva', 'Luna Llena', 'Cuarto Creciente', 'Cuarto Menguante'].includes(
    evento.tipo_evento
  );

  // Fetch Cycle Data on Mount if Phase
  useEffect(() => {
    if ((isPhase || isEclipse) && natalData && !cycleData) {
      const fetchCycles = async () => {
        setIsCycleLoading(true);
        try {
          // Extract clean date YYYY-MM-DD from event
          const datePart = evento.fecha_utc.split('T')[0];

          const res = await fetch('/api/cycles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              natalData,
              targetDate: datePart,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setCycleData(data);
          } else {
            await res.text();
          }
        } catch (e) {
          console.error('Cycle fetch error', e);
        } finally {
          setIsCycleLoading(false);
        }
      };
      fetchCycles();
    }
  }, [evento, isPhase, isEclipse, natalData, cycleData]);

  // Función para obtener la interpretación del evento
  const obtenerInterpretacion = async () => {
    if (interpretacion || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/interpretar-eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventos: [evento],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.interpretaciones && data.interpretaciones.length > 0) {
        setInterpretacion(data.interpretaciones[0].interpretacion);
      } else {
        setInterpretacion('No se encontró interpretación para este evento.');
      }
    } catch (err) {
      console.error('Error al obtener interpretación:', err);
      setError('No se pudo cargar la interpretación');
    } finally {
      setIsLoading(false);
    }
  };

  // Extraer solo la hora y minutos de la hora UTC
  const horaLocal = createDateFromUtc(evento.fecha_utc, evento.hora_utc);
  const horaFormateada = `${horaLocal.getHours().toString().padStart(2, '0')}:${horaLocal.getMinutes().toString().padStart(2, '0')}`;

  // Handle special case for house transits
  if (evento.tipo_evento === 'Tránsito Casa Estado') {
    const houseTransits: HouseTransitStrict[] = evento.house_transits || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2">
          {houseTransits.map((transit, index) => (
            <div key={index} className="text-sm bg-card/50 rounded p-2 border border-border">
              <div className="font-medium text-primary">
                {transit.simbolo} {transit.planeta}
                {transit.tipo === 'luna_progresada' && transit.signo && (
                  <span className="ml-1">
                    en {transit.signo} {transit.grado}°
                  </span>
                )}
              </div>
              <div className="text-xs text-primary">
                Casa {transit.casa} - {transit.casa_significado}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isHighRelevance = evento.relevance === RelevanceLevel.HIGH || isPersonalHero;

  const style = getEventStyle(evento.tipo_evento, evento.planeta1);
  const Icon = style.icon;

  const isMoonTransit = evento.tipo_evento === 'Aspecto' && (evento.planeta1 === 'Luna' || evento.planeta2 === 'Luna');
  const isActivator = !!specialContext && isMoonTransit;

  const content = (
    <div
      className={cn(
        "space-y-2 px-3 py-3 sm:px-4 sm:py-4",
        variant === 'minimal' ? 'p-0 sm:p-0' : '',
        isActivator && !isHighRelevance && "border-l-2 border-amber-400 dark:border-amber-500 bg-amber-50/10"
      )}
    >
      {isActivator && !isHighRelevance && (
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 animate-pulse">
            ⚡ {specialContext.isEclipse ? 'Activador de Eclipse' : 'Activador Lunar'}
          </Badge>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
            Este tránsito activa la energía de hoy
          </span>
        </div>
      )}
      {isHighRelevance && variant !== 'minimal' && (
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20">
            <Icon className="w-3 h-3 text-amber-700 dark:text-amber-400" />
          </div>
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
            Evento Destacado
          </div>
        </div>
      )}

      {!isHighRelevance && variant !== 'minimal' && (
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-1 rounded-md ${style.iconBg}`}>
            <Icon className={`h-3 w-3 ${style.iconColor}`} />
          </div>
          <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badgeColor}`}>
            {evento.tipo_evento}
          </div>
        </div>
      )}

      <div
        className={`font-semibold ${isAnyHero && variant !== 'minimal' ? 'text-xl font-serif tracking-tight text-amber-900 dark:text-amber-100 leading-tight' : ''}`}
      >
        {isAnyHero &&
          variant !== 'minimal' &&
          evento.tipo_evento === 'Aspecto' &&
          evento.planeta1 &&
          evento.tipo_aspecto ? (
          <span>
            {evento.planeta1} {evento.tipo_aspecto} {evento.planeta2}
          </span>
        ) : (
          <span>
            {!isAnyHero && variant !== 'minimal'
              ? // For non-hero, title is simpler now that we have the badge above
              `A las ${horaFormateada}`
              : // For hero or minimal, keep existing title
              `${evento.tipo_evento} a las ${horaFormateada}`}
          </span>
        )}
      </div>

      {/* Activator Logic - Only show subtitle if NOT high relevance or if it adds value */}
      {!isHighRelevance && isActivator && variant !== 'minimal' && (
        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium italic">
          {specialContext.isEclipse ? "Este tránsito activa la energía del eclipse" : "Este tránsito activa la energía lunar de hoy"}
        </div>
      )}

      {/* Cycle Badges */}
      {cycleData && cycleData.active_cycles.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1 mb-2">
          <Badge
            variant="outline"
            className="text-[10px] py-0 h-5 border-primary/50 text-primary bg-primary/5"
          >
            {cycleData.active_cycles[0].metonic_index === 1
              ? 'Ciclo Inicial'
              : `${cycleData.active_cycles[0].metonic_index - 1}º Retorno`}
          </Badge>
          {isEclipse && (
            <Badge variant="destructive" className="text-[10px] py-0 h-5">
              Eclipse
            </Badge>
          )}
        </div>
      )}

      {/* High Relevance Preview */}
      {isHighRelevance && interpretacion && !isExpanded && variant !== 'minimal' && (
        <div className="text-sm text-foreground/80 italic border-l-2 border-amber-300 pl-2 my-2 line-clamp-3">
          "{interpretacion.substring(0, 150)}..."
        </div>
      )}

      <div>{evento.descripcion}</div>

      {/* Story Button */}
      {cycleData && cycleData.active_cycles.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          onClick={() => setIsStoryOpen(true)}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Ver Historia del Ciclo
        </Button>
      )}

      {/* Información adicional para aspectos */}
      {evento.tipo_evento === 'Aspecto' && evento.planeta1 && evento.posicion1 && (
        <>
          <div className="text-sm">
            {evento.planeta1}: {evento.posicion1}
          </div>
          {evento.planeta2 && evento.posicion2 && (
            <div className="text-sm">
              {evento.planeta2}: {evento.posicion2}
            </div>
          )}
        </>
      )}

      <Button
        variant={isAnyHero && variant !== 'minimal' ? 'default' : 'outline'}
        size="sm"
        className={`w-full mt-2 ${isAnyHero && variant !== 'minimal' ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-200' : ''}`}
        onClick={() => {
          if (!isExpanded && !interpretacion) {
            obtenerInterpretacion();
          }
          setIsExpanded(!isExpanded);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Cargando...
          </>
        ) : isExpanded ? (
          <>
            <ChevronUp className="h-4 w-4 mr-2" />
            Ocultar interpretación
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2" />
            {isAnyHero && variant !== 'minimal'
              ? 'Leer interpretación completa'
              : 'Ver interpretación'}
          </>
        )}
      </Button>

      {/* Interpretación expandida */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : interpretacion ? (
            <ScrollArea className="h-32 w-full rounded-md border p-2">
              <p className="text-sm text-muted-foreground">{interpretacion}</p>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">Cargando interpretación...</p>
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className={`w-full ${className}`}>
        {content}
        {cycleData && cycleData.active_cycles.length > 0 && (
          <StoryModal
            isOpen={isStoryOpen}
            onClose={() => setIsStoryOpen(false)}
            family={cycleData.active_cycles[0]}
          />
        )}
      </div>
    );
  }

  return (
    <Card
      className={cn(
        'w-full sm:w-72 flex-shrink-0 h-auto transition-all duration-300',
        isAnyHero
          ? cn(
            'border-amber-400/50 shadow-md transform hover:scale-[1.01]',
            style.heroGradient || 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10'
          )
          : 'bg-card',
        className
      )}
    >
      {content}

      {cycleData && cycleData.active_cycles.length > 0 && (
        <StoryModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
          family={cycleData.active_cycles[0]}
        />
      )}
    </Card>
  );
}
