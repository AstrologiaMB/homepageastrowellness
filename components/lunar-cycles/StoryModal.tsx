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
import { Book, ArrowRight, Save, Loader2 } from 'lucide-react';
import { CycleFamily } from '@/lib/services/cycles-service';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
// Note: We might need to duplicate interfaces if standard import fails in client, but shared lib should work.

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: CycleFamily;
  focusedDate?: Date;
  onNavigateToEntry?: (dateStr: string) => void;
}

export function StoryModal({ isOpen, onClose, family, focusedDate }: StoryModalProps) {
  const [expandedPhase, setExpandedPhase] = React.useState<number | null>(null);
  const [editingPhase, setEditingPhase] = React.useState<number | null>(null);
  const [notes, setNotes] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  // Track successful saves locally so we don't need a hard page refresh
  const [localJournalEntries, setLocalJournalEntries] = React.useState<Record<number, any[]>>({});
  const { toast } = useToast();

  if (!family) return null;

  const phases = [
    { label: 'Semilla (Luna Nueva)', data: family.seed, step: 1 },
    { label: 'Acción (Cuarto Creciente)', data: family.action, step: 2 },
    { label: 'Fructificación (Luna Llena)', data: family.fruition, step: 3 },
    { label: 'Liberación (Cuarto Menguante)', data: family.release, step: 4 },
  ];

  // Determine current phase
  // If focusedDate is provided, verify which phase matches it (approx match by day).
  // Otherwise, use time-based logic.
  const now = new Date();

  let currentPhaseIndex = -1;

  if (focusedDate) {
    // Find phase matching the focused date
    const focusIso = focusedDate.toISOString().split('T')[0];
    currentPhaseIndex = phases.findIndex(p => p.data?.date && p.data.date.startsWith(focusIso));
  }

  // If no match by date (or no date provided), fallback to "last passed phase"
  if (currentPhaseIndex === -1) {
    currentPhaseIndex = phases.findLastIndex(
      (p) => p.data?.date && new Date(p.data.date) <= now
    );
  }

  const handleSaveJournal = async (phaseIdx: number, phaseName: string, dateIso: string, existingId?: string) => {
    try {
      setIsSaving(true);
      const payload = {
        id: existingId,
        date: dateIso,
        eventType: phaseName,
        notes: notes,
      };

      const res = await fetch('/api/journal/lunar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error al guardar');

      const savedEntry = await res.json();

      // Optimistically update local state so the user sees it immediately
      setLocalJournalEntries(prev => ({
        ...prev,
        [phaseIdx]: [savedEntry] // we assume the latest entry overwrites or is the only one
      }));

      setEditingPhase(null);
      setExpandedPhase(phaseIdx); // Auto-expand so the user immediately sees the saved note
      setNotes('');
      toast({
        title: 'Diario actualizado',
        description: 'Tus notas han sido guardadas con éxito.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron guardar tus notas.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

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

              const activeJournal = localJournalEntries[idx] || phase.data.journal_entries;
              const hasJournal = activeJournal && activeJournal.length > 0;

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
                      {hasJournal && activeJournal && (
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-slate-200"
                          onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                        >
                          <Book className="w-3 h-3" />
                          {activeJournal.length}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 mb-3 italic">{phase.data.description}</p>

                    {hasJournal && activeJournal && (
                      <div
                        className="bg-slate-50 p-3 rounded text-sm text-slate-700 space-y-2 cursor-pointer transition-colors hover:bg-slate-100"
                        onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                      >
                        {expandedPhase === idx ? (
                          // Expanded View: Show ALL entries fully
                          activeJournal.map((entry: any) => (
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
                            {activeJournal.slice(0, 2).map((entry: any) => (
                              <div key={entry.id} className="border-l-2 border-slate-300 pl-2">
                                "{entry.notes.substring(0, 100)}
                                {entry.notes.length > 100 ? '...' : ''}"
                              </div>
                            ))}
                            {activeJournal.length > 2 && (
                              <p className="text-xs text-muted-foreground text-center">
                                +{activeJournal.length - 2} entradas más (Click para
                                expandir)
                              </p>
                            )}
                            {activeJournal.length <= 2 && (
                              <p className="text-xs text-muted-foreground text-center mt-1">
                                (Click para ver detalles)
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Allow editing if it's past, or if it's the currently focused/active one */}
                    {(isCurrent || isPast) && editingPhase !== idx && (
                      <div className="mt-3 flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-600 hover:bg-purple-50"
                          onClick={() => {
                            setEditingPhase(idx);
                            // If they are editing, prepopulate with their most recent entry if any
                            if (hasJournal && activeJournal) {
                              setNotes(activeJournal[0].notes);
                            } else {
                              setNotes('');
                            }
                          }}
                        >
                          {hasJournal ? 'Editar Diario' : 'Escribir Diario'}
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    )}

                    {/* Editor Form */}
                    {editingPhase === idx && (
                      <div className="mt-4 space-y-3 bg-purple-50/50 p-3 rounded-lg border border-purple-100">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          📖 Tu Diario para esta Fase
                        </label>
                        <Textarea
                          placeholder={`Tus intenciones o eventos manifestados...`}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="min-h-[100px] bg-white w-full"
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingPhase(null);
                              setNotes('');
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={() => handleSaveJournal(
                              idx,
                              // Map 'Semilla' etc to exact names if needed, or use phaseName. 
                              // Using phase.label simplified. Let's use the DB expected format if possible.
                              // Wait, mainEvent.tipo_evento is what the other card uses. 
                              // The label has the name in parens, e.g., 'Semilla (Luna Nueva)'
                              // But `date` matches exactly. We'll extract what's in parentheses for eventType.
                              phase.label.split('(')[1]?.replace(')', '') || phase.label,
                              new Date(phase.data!.date).toISOString(),
                              hasJournal && activeJournal ? activeJournal[0].id : undefined
                            )}
                            disabled={isSaving || !notes.trim()}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                              </>
                            )}
                          </Button>
                        </div>
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
