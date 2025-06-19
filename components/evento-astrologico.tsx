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

export function EventoAstrologico({ evento }: EventoAstrologicoProps) {
  // Handle special case for house transits
  if (evento.tipo_evento === "Tránsito Casa Estado") {
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
