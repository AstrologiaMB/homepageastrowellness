import React from 'react';
import { DraconicEventCard } from './DraconicEventCard';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface DraconicEvent {
  id: string;
  tipo: 'cuspide_cruzada' | 'aspecto_cruzado';
  titulo: string;
  descripcion: string;
  icono: string;
  orbe?: string;
  relevancia: 'alta' | 'media' | 'baja';
}

interface DraconicEventsListProps {
  eventos: DraconicEvent[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * Componente para mostrar una lista de eventos dracónicos como tarjetas
 */
export function DraconicEventsList({ eventos, loading, error }: DraconicEventsListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          <span className="text-gray-600">Calculando eventos dracónicos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          <strong>Error al cargar eventos dracónicos:</strong> {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!eventos || eventos.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No se encontraron eventos dracónicos significativos para mostrar.
        </AlertDescription>
      </Alert>
    );
  }

  // Separar eventos por tipo para mejor organización
  const cuspidesCruzadas = eventos.filter(event => event.tipo === 'cuspide_cruzada');
  const aspectosCruzados = eventos.filter(event => event.tipo === 'aspecto_cruzado');

  return (
    <div className="space-y-8">
      {/* Cúspides Cruzadas */}
      {cuspidesCruzadas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-800 flex items-center">
            🏠 Cúspides Cruzadas ({cuspidesCruzadas.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {cuspidesCruzadas.map((event, index) => (
              <DraconicEventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Aspectos Cruzados */}
      {aspectosCruzados.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
            ☌ Aspectos Cruzados ({aspectosCruzados.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {aspectosCruzados.map((event, index) => (
              <DraconicEventCard
                key={event.id}
                event={event}
                index={index + cuspidesCruzadas.length}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resumen */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h4 className="font-semibold text-gray-800 mb-2">📊 Resumen de Eventos</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-purple-600">🏠 Cúspides:</span>
            <span className="ml-2 font-medium">{cuspidesCruzadas.length}</span>
          </div>
          <div>
            <span className="text-blue-600">☌ Aspectos:</span>
            <span className="ml-2 font-medium">{aspectosCruzados.length}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">📈 Total:</span>
            <span className="ml-2 font-bold text-lg">{eventos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
