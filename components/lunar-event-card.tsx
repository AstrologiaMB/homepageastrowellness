'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StoryModal } from './lunar-cycles/StoryModal';
import { ActiveCyclesResponse } from '@/lib/services/cycles-service';

interface AstroEvent {
  fecha_utc: string;
  hora_utc: string;
  tipo_evento: string;
  descripcion: string;
  signo?: string;
  grado?: number;
  casa_natal?: number;
  metadata?: any;
  [key: string]: any;
}

interface LunarEventGroup {
  mainEvent: AstroEvent;
  aspects: AstroEvent[];
  date: Date;
}

interface JournalEntry {
  id?: string;
  date: string; // ISO
  eventType: string;
  notes: string;
}

interface LunarEventCardProps {
  group: LunarEventGroup;
  initialEntry?: JournalEntry;
  natalData?: any;
}

export function LunarEventCard({ group, initialEntry, natalData }: LunarEventCardProps) {
  const { mainEvent, aspects, date } = group;
  const [entry, setEntry] = useState<JournalEntry | undefined>(initialEntry);
  const [notes, setNotes] = useState(initialEntry?.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  // Cycle Logic
  const [cycleData, setCycleData] = useState<ActiveCyclesResponse | null>(null);
  const [, setIsCycleLoading] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const { toast } = useToast();

  // Fetch Cycle Data on Mount
  React.useEffect(() => {
    if (natalData && !cycleData) {
      const fetchCycles = async () => {
        setIsCycleLoading(true);
        try {
          // Extract clean date YYYY-MM-DD from event. date is Date object
          const datePart = date.toISOString().split('T')[0];
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
          }
        } catch (e) {
          console.error('Cycle fetch error', e);
        } finally {
          setIsCycleLoading(false);
        }
      };
      fetchCycles();
    }
  }, [date, natalData, cycleData]);

  const isEclipse = mainEvent.tipo_evento.includes('Eclipse') || mainEvent.metadata?.is_eclipse;
  const phaseName = mainEvent.tipo_evento;

  // Formatter for degrees
  const formatDegree = (deg?: number, sign?: string) => {
    if (deg === undefined || !sign) return '';
    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    return `${d}° ${m}' ${sign}`;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = {
        id: entry?.id,
        date: date.toISOString(),
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
      setEntry(savedEntry);

      toast({
        title: 'Diario actualizado',
        description: 'Tus notas han sido guardadas correctamente.',
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
    <Card
      className={`p-6 border-l-4 ${isEclipse ? 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-500/10' : 'border-l-violet-400 dark:border-l-violet-500'}`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold capitalize text-slate-800 dark:text-slate-100">
              {phaseName} {mainEvent.signo && `en ${mainEvent.signo}`}
            </h3>
            {isEclipse && (
              <Badge variant="destructive" className="animate-pulse">
                🔥 Eclipse
              </Badge>
            )}
          </div>

          {/* Cycle Badges */}
          {cycleData && cycleData.active_cycles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge
                variant="outline"
                className="text-[10px] py-0 h-5 border-purple-400 dark:border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/20"
              >
                {cycleData.active_cycles[0].metonic_index === 1
                  ? 'Ciclo Inicial'
                  : `${cycleData.active_cycles[0].metonic_index - 1}º Retorno`}
              </Badge>
            </div>
          )}

          <p className="text-sm text-muted-foreground font-medium">
            {format(date, "EEEE d 'de' MMMM, yyyy - HH:mm", { locale: es })}
          </p>

          <div className="mt-2 space-y-1">
            {mainEvent.grado !== undefined && mainEvent.signo && (
              <p className="text-sm text-slate-700 dark:text-slate-300">
                📍 <strong>Posición:</strong> {formatDegree(mainEvent.grado, mainEvent.signo)}
              </p>
            )}
            {mainEvent.casa_natal && (
              <p className="text-sm text-slate-700 dark:text-slate-300">
                🏠 <strong>Casa Natal:</strong> {mainEvent.casa_natal}
              </p>
            )}
          </div>
        </div>
        {/* Story Button (Desktop Right) */}
        {cycleData && cycleData.active_cycles.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 mr-2 shrink-0 mt-2 md:mt-0"
            onClick={() => setIsStoryOpen(true)}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Ver Historia
          </Button>
        )}
      </div>

      {aspects.length > 0 && (
        <div className="mb-6 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
          <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Aspectos Natales:</h4>
          <ul className="space-y-1">
            {aspects.map((aspect, idx) => (
              <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span className="text-violet-500 dark:text-violet-400 mt-1">•</span>
                <span>{aspect.descripcion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator className="my-4" />

      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          📖 Tu Diario Lunar
        </label>
        <Textarea
          placeholder={`Escribe tus intenciones, sensaciones o eventos manifestados durante esta ${phaseName.toLowerCase()}...`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px] bg-white dark:bg-slate-900"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving || notes === (initialEntry?.notes || '')}
            size="sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
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
