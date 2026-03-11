"use client";

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Search, ArrowRight, Star } from 'lucide-react';
import { createDateFromUtc } from '@/lib/date-utils';
import { cn } from '@/lib/utils';
import { SelectGroup, SelectLabel } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { PersonalCalendarEvent } from '@/lib/personal-calendar-api';

interface TransitSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: PersonalCalendarEvent[];
  onSelectEvent: (date: Date) => void;
  activeYear?: number;
}

const CATEGORIZED_TRANSITS = {
  HITOS: [
    { value: "Eclipse Solar", label: "Eclipse Solar 🌑" },
    { value: "Eclipse Lunar", label: "Eclipse Lunar 🌕" },
    { value: "Luna Nueva", label: "Luna Nueva 🌑" },
    { value: "Luna Llena", label: "Luna Llena 🌕" },
    { value: "Luna Progresada", label: "Luna Progresada 🌙" },
  ],
  LENTOS: [
    { value: "Júpiter", label: "Júpiter (Expansión) ♃" },
    { value: "Saturno", label: "Saturno (Estructura) ♄" },
    { value: "Urano", label: "Urano (Cambio) ♅" },
    { value: "Neptuno", label: "Neptuno (Inspiración) ♆" },
    { value: "Plutón", label: "Plutón (Transformación) ♇" },
  ],
  PERSONALES: [
    { value: "Marte", label: "Marte ♂" },
    { value: "Venus", label: "Venus ♀" },
    { value: "Mercurio", label: "Mercurio ☿" },
    { value: "Sol", label: "Sol ☉" },
  ],
  DIARIO: [
    { value: "Luna", label: "Luna (Pulso Diario) ☽" },
  ]
};

const ASPECTS = [
  "Conjunción", "Oposición", "Cuadratura", "Trígono", "Sextil"
];

const NATAL_POINTS = [
  "Sol", "Luna", "Mercurio", "Venus", "Marte", "Júpiter", "Saturno", "Ascendente", "Medio Cielo"
];

export function TransitSearchModal({
  isOpen,
  onClose,
  events,
  onSelectEvent,
  activeYear
}: TransitSearchModalProps) {
  const [selectedTransit, setSelectedTransit] = useState<string>("all");
  const [selectedAspect, setSelectedAspect] = useState<string>("all");
  const [selectedNatal, setSelectedNatal] = useState<string>("all");
  const [onlyRelevant, setOnlyRelevant] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredEvents = useMemo(() => {
    if (!hasSearched) return [];

    return events.filter(event => {
      // Filter by activeYear if provided
      if (activeYear) {
        const eventDate = createDateFromUtc(event.fecha_utc, event.hora_utc);
        if (eventDate.getFullYear() !== activeYear) return false;
      }
      // Filter by relevance if toggled
      if (onlyRelevant) {
        const isEclipse = event.tipo_evento.includes('Eclipse');
        const isMajorPhase = ['Luna Nueva', 'Luna Llena'].includes(event.tipo_evento);
        const isHighRelevance = event.relevance === 'high';

        if (!isEclipse && !isMajorPhase && !isHighRelevance) return false;
      }

      // Exclude minor lunar phases from search results to reduce noise, but NOT eclipses
      if (['Cuarto Creciente', 'Cuarto Menguante'].includes(event.tipo_evento)) {
        return false;
      }

      // Filter by Transit Planet / Event Type
      if (selectedTransit !== "all") {
        const isLunarEvent = ["Eclipse Solar", "Eclipse Lunar", "Luna Nueva", "Luna Llena"].includes(selectedTransit);

        if (isLunarEvent) {
          if (event.tipo_evento !== selectedTransit) return false;
        } else {
          if (event.planeta1 !== selectedTransit) return false;
        }
      }

      // Filter by Aspect
      if (selectedAspect !== "all" && event.tipo_aspecto !== selectedAspect) {
        return false;
      }

      // Filter by Natal Point
      if (selectedNatal !== "all" && event.planeta2 !== selectedNatal) {
        return false;
      }

      return true;
    });
  }, [events, selectedTransit, selectedAspect, selectedNatal, onlyRelevant, hasSearched]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleReset = () => {
    setSelectedTransit("all");
    setSelectedAspect("all");
    setSelectedNatal("all");
    setOnlyRelevant(false);
    setHasSearched(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Explorador de Tránsitos
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4 flex-1 overflow-hidden">
          {/* Categorized Filter Group */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Qué quieres buscar</label>
              <Select value={selectedTransit} onValueChange={setSelectedTransit}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Energías</SelectItem>

                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase tracking-wider text-muted-foreground pt-3">💎 Hitos Relevantes</SelectLabel>
                    {CATEGORIZED_TRANSITS.HITOS.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase tracking-wider text-muted-foreground pt-3">🪐 Clima Generacional</SelectLabel>
                    {CATEGORIZED_TRANSITS.LENTOS.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase tracking-wider text-muted-foreground pt-3">⚡ Activadores Personales</SelectLabel>
                    {CATEGORIZED_TRANSITS.PERSONALES.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-[10px] uppercase tracking-wider text-muted-foreground pt-3">🌙 El Pulso Diario</SelectLabel>
                    {CATEGORIZED_TRANSITS.DIARIO.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Smart Relevance Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold leading-none">Solo Hitos Importantes</span>
                  <span className="text-[10px] text-muted-foreground">Eclipses, fases y transitos lentos</span>
                </div>
              </div>
              <Switch checked={onlyRelevant} onCheckedChange={setOnlyRelevant} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Aspecto</label>
              <Select value={selectedAspect} onValueChange={setSelectedAspect} disabled={onlyRelevant && ["Luna Nueva", "Luna Llena", "Eclipse Solar", "Eclipse Lunar"].includes(selectedTransit)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquiera</SelectItem>
                  {ASPECTS.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Punto Natal</label>
              <Select value={selectedNatal} onValueChange={setSelectedNatal}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Cualquiera</SelectItem>
                  {NATAL_POINTS.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button className="flex-1" onClick={handleSearch}>
              Buscar Eventos
            </Button>
            {hasSearched && (
              <Button variant="ghost" onClick={handleReset}>
                Limpiar
              </Button>
            )}
          </div>

          {/* Results Area */}
          {hasSearched && (
            <div className="flex flex-col gap-2 mt-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Resultados ({filteredEvents.length})
              </h4>
              <ScrollArea className="h-[350px] w-full rounded-md border p-2">
                {filteredEvents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm p-8 text-center gap-2">
                    <p>No se encontraron eventos en {activeYear || 'este periodo'} con estos filtros.</p>
                    <p className="text-[10px]">Utiliza los selectores o el filtro de hitos para ampliar la búsqueda.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pr-3">
                    {filteredEvents.map((event, idx) => {
                      const date = createDateFromUtc(event.fecha_utc, event.hora_utc);
                      const isEclipse = event.tipo_evento.toLowerCase().includes('eclipse');
                      const isHighRelevance = event.relevance === 'high' || isEclipse || ['Luna Nueva', 'Luna Llena'].includes(event.tipo_evento);

                      return (
                        <Button
                          key={`${event.fecha_utc}-${idx}`}
                          variant="secondary"
                          className={cn(
                            "h-auto py-3 px-3 justify-between group hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all shrink-0 whitespace-normal text-left",
                            isEclipse && "bg-orange-50/50 border-orange-200/50 dark:bg-orange-950/10 dark:border-orange-500/20"
                          )}
                          onClick={() => {
                            if (date && !isNaN(date.getTime())) {
                              onSelectEvent(date);
                              onClose();
                            }
                          }}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="flex flex-col items-center bg-background/50 rounded p-1 min-w-[3.5rem] border border-border/50 shrink-0">
                              <span className="text-[10px] font-bold uppercase text-primary leading-tight">
                                {format(date, 'MMM', { locale: es })}
                              </span>
                              <span className="text-xl font-bold leading-none">
                                {format(date, 'd', { locale: es })}
                              </span>
                              <span className="text-[10px] text-muted-foreground leading-tight lowercase">
                                {format(date, 'yyyy', { locale: es })}
                              </span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {isEclipse && (
                                  <span className="bg-orange-500 text-[8px] uppercase font-bold text-white px-1.5 rounded-sm leading-tight">
                                    Eclipse
                                  </span>
                                )}
                                {event.tipo_evento === 'Luna Nueva' && (
                                  <span className="bg-slate-700 text-[8px] uppercase font-bold text-white px-1.5 rounded-sm leading-tight">
                                    Luna Nueva
                                  </span>
                                )}
                                {event.tipo_evento === 'Luna Llena' && (
                                  <span className="bg-blue-600 text-[8px] uppercase font-bold text-white px-1.5 rounded-sm leading-tight">
                                    Luna Llena
                                  </span>
                                )}
                                {isHighRelevance && !isEclipse && !['Luna Nueva', 'Luna Llena'].includes(event.tipo_evento) && (
                                  <span className="bg-amber-500 text-[8px] uppercase font-bold text-white px-1.5 rounded-sm leading-tight">
                                    Relevante
                                  </span>
                                )}
                              </div>
                              <span className="font-semibold text-sm line-clamp-3 leading-tight">
                                {event.descripcion}
                              </span>
                              <span className="text-xs text-muted-foreground mt-1 capitalize">
                                {format(date, 'EEEE', { locale: es })} {event.hora_utc} UTC
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-2 shrink-0" />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
              <p className="text-[10px] text-muted-foreground text-center pt-1">
                * Buscando en los años calendario actualmente cargados.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
