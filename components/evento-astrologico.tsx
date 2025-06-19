"use client";

import { Card, CardContent } from "@/components/ui/card";

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
    // Otros campos opcionales según el tipo de evento
  };
}

export function EventoAstrologico({ evento }: EventoAstrologicoProps) {
  // Handle special case for house transits
  if (evento.tipo_evento === "Tránsito Casa Estado") {
    // Parse house transit information from description
    const parseHouseTransits = (descripcion: string) => {
      // Extract house transit info from the enhanced description
      // Format: "Estado actual de tránsitos por casas: ♃ Júpiter en Casa 10 (Carrera y Reputación) | ♄ Saturno en Casa 5 (Creatividad y Romance) | ..."
      const parts = descripcion.split(': ');
      if (parts.length > 1) {
        const transitsText = parts[1];
        const transits = transitsText.split(' | ').map(transit => {
          // Parse each transit: "♃ Júpiter en Casa 10 (Carrera y Reputación)"
          const match = transit.match(/^(.) (.+) en Casa (\d+) \((.+)\)$/);
          if (match) {
            return {
              symbol: match[1],
              planet: match[2],
              house: match[3],
              meaning: match[4]
            };
          }
          return null;
        }).filter((transit): transit is { symbol: string; planet: string; house: string; meaning: string } => transit !== null);
        return transits;
      }
      return [];
    };

    const houseTransits = parseHouseTransits(evento.descripcion);

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2">
          {houseTransits.map((transit, index) => (
            <div key={index} className="text-sm bg-white/50 rounded p-2 border border-purple-200">
              <div className="font-medium text-purple-700">
                {transit.symbol} {transit.planet}
              </div>
              <div className="text-xs text-purple-600">
                Casa {transit.house} - {transit.meaning}
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
      </CardContent>
    </Card>
  );
}
