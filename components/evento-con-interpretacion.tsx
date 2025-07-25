"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EventoConInterpretacionProps {
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
    // Otros campos opcionales
  };
}

export function EventoConInterpretacion({ evento }: EventoConInterpretacionProps) {
  const [interpretacion, setInterpretacion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la interpretación del evento
  const obtenerInterpretacion = async () => {
    if (interpretacion || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8002/interpretar-eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventos: [evento]
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
  const horaLocal = new Date(`${evento.fecha_utc}T${evento.hora_utc}:00Z`);
  const horaFormateada = `${horaLocal.getHours().toString().padStart(2, '0')}:${horaLocal.getMinutes().toString().padStart(2, '0')}`;

  // Handle special case for house transits
  if (evento.tipo_evento === "Tránsito Casa Estado") {
    const houseTransits = evento.house_transits || [];

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2">
          {houseTransits.map((transit, index) => (
            <div key={index} className="text-sm bg-white/50 rounded p-2 border border-purple-200">
              <div className="font-medium text-purple-700">
                {transit.simbolo} {transit.planeta}
                {transit.tipo === 'luna_progresada' && transit.signo && (
                  <span className="ml-1">en {transit.signo} {transit.grado}°</span>
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

  return (
    <Card className="w-72 flex-shrink-0 h-auto">
      <CardContent className="space-y-2 px-3 py-3">
        <div className="font-semibold">{evento.tipo_evento} a las {horaFormateada}</div>
        <div>{evento.descripcion}</div>
        
        {/* Información adicional para aspectos */}
        {evento.tipo_evento === "Aspecto" && evento.planeta1 && evento.posicion1 && (
          <>
            <div className="text-sm">{evento.planeta1}: {evento.posicion1}</div>
            {evento.planeta2 && evento.posicion2 && (
              <div className="text-sm">{evento.planeta2}: {evento.posicion2}</div>
            )}
          </>
        )}

        {/* Botón para mostrar/ocultar interpretación */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => {
            if (!isExpanded) {
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
              Ver interpretación
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
      </CardContent>
    </Card>
  );
}
