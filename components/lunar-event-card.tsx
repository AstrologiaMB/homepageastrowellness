"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
}

export function LunarEventCard({ group, initialEntry }: LunarEventCardProps) {
    const { mainEvent, aspects, date } = group;
    const [entry, setEntry] = useState<JournalEntry | undefined>(initialEntry);
    const [notes, setNotes] = useState(initialEntry?.notes || '');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const isEclipse = mainEvent.tipo_evento.includes('Eclipse') || mainEvent.metadata?.is_eclipse;
    const phaseName = mainEvent.tipo_evento;

    // Formatter for degrees
    const formatDegree = (deg?: number, sign?: string) => {
        if (deg === undefined || !sign) return "";
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
                notes: notes
            };

            const res = await fetch('/api/journal/lunar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Error al guardar");

            const savedEntry = await res.json();
            setEntry(savedEntry);

            toast({
                title: "Diario actualizado",
                description: "Tus notas han sido guardadas correctamente.",
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "No se pudieron guardar tus notas.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className={`p-6 border-l-4 ${isEclipse ? 'border-l-orange-500 bg-orange-50/50' : 'border-l-blue-400'}`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold capitalize text-slate-800">
                            {phaseName} {mainEvent.signo && `en ${mainEvent.signo}`}
                        </h3>
                        {isEclipse && (
                            <Badge variant="destructive" className="animate-pulse">🔥 Eclipse</Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                        {format(date, "EEEE d 'de' MMMM, yyyy - HH:mm", { locale: es })}
                    </p>

                    <div className="mt-2 space-y-1">
                        {mainEvent.grado !== undefined && mainEvent.signo && (
                            <p className="text-sm">
                                📍 <strong>Posición:</strong> {formatDegree(mainEvent.grado, mainEvent.signo)}
                            </p>
                        )}
                        {mainEvent.casa_natal && (
                            <p className="text-sm">
                                🏠 <strong>Casa Natal:</strong> {mainEvent.casa_natal}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {aspects.length > 0 && (
                <div className="mb-6 bg-white/50 p-3 rounded-lg border border-slate-100">
                    <h4 className="text-sm font-semibold mb-2 text-slate-700">Aspectos Natales:</h4>
                    <ul className="space-y-1">
                        {aspects.map((aspect, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{aspect.descripcion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Separator className="my-4" />

            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    📖 Tu Diario Lunar
                </label>
                <Textarea
                    placeholder={`Escribe tus intenciones, sensaciones o eventos manifestados durante esta ${phaseName.toLowerCase()}...`}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] bg-white"
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
        </Card>
    );
}
