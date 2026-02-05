"use client";

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Search, ArrowRight } from 'lucide-react';
import { createDateFromUtc } from '@/lib/date-utils';

import { PersonalCalendarEvent } from '@/lib/personal-calendar-api';

interface TransitSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: PersonalCalendarEvent[];
  onSelectEvent: (date: Date) => void;
}

const TRANSIT_PLANETS = [
  "Luna Progresada", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno", "Plutón"
];

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
  onSelectEvent
}: TransitSearchModalProps) {
  const [selectedTransit, setSelectedTransit] = useState<string>("all");
  const [selectedAspect, setSelectedAspect] = useState<string>("all");
  const [selectedNatal, setSelectedNatal] = useState<string>("all");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredEvents = useMemo(() => {
    if (!hasSearched) return [];

    return events.filter(event => {
      // Exclude lunar phases from search results to reduce noise
      if (['Luna Nueva', 'Luna Llena', 'Cuarto Creciente', 'Cuarto Menguante'].includes(event.tipo_evento)) {
        return false;
      }

      // Filter by Transit Planet
      if (selectedTransit !== "all" && event.planeta1 !== selectedTransit) {
        return false;
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
  }, [events, selectedTransit, selectedAspect, selectedNatal, hasSearched]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleReset = () => {
    setSelectedTransit("all");
    setSelectedAspect("all");
    setSelectedNatal("all");
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
          {/* Filters Row 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Planeta en Tránsito</label>
              <Select value={selectedTransit} onValueChange={setSelectedTransit}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {TRANSIT_PLANETS.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Aspecto</label>
              <Select value={selectedAspect} onValueChange={setSelectedAspect}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {ASPECTS.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Row 2 */}
          <div className="grid grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground p-0.5">Punto Natal Impactado</label>
              <Select value={selectedNatal} onValueChange={setSelectedNatal}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquiera (Sol, Luna, Asc...)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
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
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm p-4">
                    No se encontraron eventos con estos filtros en el periodo cargado.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pr-3">
                    {filteredEvents.map((event, idx) => {
                      const date = createDateFromUtc(event.fecha_utc, event.hora_utc);
                      return (
                        <Button
                          key={`${event.fecha_utc}-${idx}`}
                          variant="secondary"
                          className="h-auto py-3 px-3 justify-between group hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all shrink-0 whitespace-normal text-left"
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
