'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Book, ArrowRight } from 'lucide-react';
import { CycleFamily } from '@/lib/services/cycles-service';
// Note: We might need to duplicate interfaces if standard import fails in client, but shared lib should work.

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: CycleFamily;
}

export function StoryModal({ isOpen, onClose, family }: StoryModalProps) {
  const [expandedPhase, setExpandedPhase] = React.useState<number | null>(null);

  if (!family) return null;

  const phases = [
    { label: 'Semilla (Luna Nueva)', data: family.seed, step: 1 },
    { label: 'Acción (Cuarto Creciente)', data: family.action, step: 2 },
    { label: 'Fructificación (Luna Llena)', data: family.fruition, step: 3 },
    { label: 'Liberación (Cuarto Menguante)', data: family.release, step: 4 },
  ];

  // Determine current phase (last one that passed)
  const now = new Date();
  const currentPhaseIndex = phases.findLastIndex(
    (p) => p.data?.date && new Date(p.data.date) <= now
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 overflow-hidden bg-white/95 backdrop-blur-md">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-purple-500 text-purple-700 bg-purple-50">
              Ciclo de Gestación
            </Badge>
            <Badge variant="secondary">
              {family.metonic_index === 1
                ? 'Ciclo Inicial'
                : `${family.metonic_index - 1}º Retorno Metónico`}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-serif text-slate-800">
            La Historia en {family.family_sign}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Una trama de 27 meses que revela tu evolución en el área de {family.family_sign}.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 p-6">
          <div className="relative border-l-2 border-purple-200 ml-4 space-y-10 pb-10">
            {phases.map((phase, idx) => {
              if (!phase.data) return null; // Future phases might be null if calc failed, but usually calc returns all.
              // Actually pure calc returns all, but filtering might happen.

              const dateObj = new Date(phase.data.date);
              const isPast = dateObj <= now;
              const isCurrent = idx === currentPhaseIndex;
              const hasJournal =
                phase.data.journal_entries && phase.data.journal_entries.length > 0;

              return (
                <div key={idx} className="relative pl-8">
                  {/* Timeline Node */}
                  <div
                    className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
                                        ${isCurrent
                        ? 'bg-purple-600 border-purple-600 ring-4 ring-purple-100'
                        : isPast
                          ? 'bg-purple-400 border-purple-400'
                          : 'bg-white border-slate-300'
                      }`}
                  />

                  <div
                    className={`bg-white p-4 rounded-lg border shadow-sm transition-all
                                        ${isCurrent ? 'border-purple-400 shadow-md ring-1 ring-purple-100' : 'border-slate-100'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">{phase.label}</h4>
                        <p className="text-sm font-medium text-slate-500">
                          {format(dateObj, "d 'de' MMMM, yyyy", { locale: es })}
                        </p>
                      </div>
                      {hasJournal && phase.data?.journal_entries && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-slate-200"
                          onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                        >
                          <Book className="w-3 h-3" />
                          {phase.data.journal_entries.length}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 mb-3 italic">{phase.data.description}</p>

                    {hasJournal && phase.data?.journal_entries && (
                      <div
                        className="bg-slate-50 p-3 rounded text-sm text-slate-700 space-y-2 cursor-pointer transition-colors hover:bg-slate-100"
                        onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                      >
                        {expandedPhase === idx ? (
                          // Expanded View: Show ALL entries fully
                          phase.data.journal_entries.map((entry) => (
                            <div key={entry.id} className="border-l-2 border-purple-400 pl-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>
                                  {format(new Date(entry.date), 'd MMM HH:mm', { locale: es })}
                                </span>
                              </div>
                              <p className="whitespace-pre-wrap">{entry.notes}</p>
                            </div>
                          ))
                        ) : (
                          // Collapsed View: Show 2 entries truncated
                          <>
                            {phase.data.journal_entries.slice(0, 2).map((entry) => (
                              <div key={entry.id} className="border-l-2 border-slate-300 pl-2">
                                "{entry.notes.substring(0, 100)}
                                {entry.notes.length > 100 ? '...' : ''}"
                              </div>
                            ))}
                            {phase.data.journal_entries.length > 2 && (
                              <p className="text-xs text-muted-foreground text-center">
                                +{phase.data.journal_entries.length - 2} entradas más (Click para
                                expandir)
                              </p>
                            )}
                            {phase.data.journal_entries.length <= 2 && (
                              <p className="text-xs text-muted-foreground text-center mt-1">
                                (Click para ver detalles)
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {isCurrent && (
                      <div className="mt-3 flex justify-end">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Escribir en el Diario
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
