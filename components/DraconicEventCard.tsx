import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DraconicEvent {
  id: string;
  tipo: 'posicion_basica' | 'cuspide_cruzada' | 'aspecto_cruzado';
  titulo: string;
  descripcion: string;
  icono: string;
  orbe?: string;
  relevancia: 'alta' | 'media' | 'baja';
}

interface DraconicEventCardProps {
  event: DraconicEvent;
  index: number;
}

/**
 * Componente para mostrar un evento dracónico individual como tarjeta
 */
export function DraconicEventCard({ event, index }: DraconicEventCardProps) {
  // Determinar colores según tipo de evento
  const getCardStyles = () => {
    switch (event.tipo) {
      case 'posicion_basica':
        return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200';
      case 'cuspide_cruzada':
        return 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200';
      case 'aspecto_cruzado':
        return 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200';
    }
  };

  // Determinar badge de relevancia
  const getRelevanciaBadge = () => {
    switch (event.relevancia) {
      case 'alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={`${getCardStyles()} hover:shadow-lg transition-shadow duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{event.icono}</span>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {event.titulo}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRelevanciaBadge()}`}>
                  {event.relevancia.toUpperCase()}
                </span>
                {event.orbe && (
                  <span className="text-xs text-gray-500">
                    Orbe: {event.orbe}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-gray-700 leading-relaxed">
          {event.descripcion}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
