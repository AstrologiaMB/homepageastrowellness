import React from 'react';
import { DraconicEventCard } from './DraconicEventCard';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface DraconicEvent {
  id: string;
  tipo: 'posicion_basica' | 'cuspide_cruzada' | 'aspecto_cruzado';
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
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Calculando eventos dracónicos...</span>
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
  const posicionesBasicas = eventos.filter(event => event.tipo === 'posicion_basica');
  const cuspidesCruzadas = eventos.filter(event => event.tipo === 'cuspide_cruzada');
  const aspectosCruzados = eventos.filter(event => event.tipo === 'aspecto_cruzado');

  return (
    <div className="space-y-8">
      {/* Posiciones Básicas Dracónicas */}
      {posicionesBasicas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary flex items-center">
            ⭐ Posiciones Dracónicas Básicas ({posicionesBasicas.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {posicionesBasicas.map((event, index) => (
              <DraconicEventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cúspides Cruzadas */}
      {cuspidesCruzadas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">
            🏠 Cúspides Cruzadas ({cuspidesCruzadas.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {cuspidesCruzadas.map((event, index) => (
              <DraconicEventCard
                key={event.id}
                event={event}
                index={index + posicionesBasicas.length}
              />
            ))}
          </div>
        </div>
      )}

      {/* Aspectos Cruzados */}
      {aspectosCruzados.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-accent flex items-center">
            ☌ Aspectos Cruzados ({aspectosCruzados.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {aspectosCruzados.map((event, index) => (
              <DraconicEventCard
                key={event.id}
                event={event}
                index={index + posicionesBasicas.length + cuspidesCruzadas.length}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resumen */}
      <div className="bg-muted/30 rounded-lg p-4 border">
        <h4 className="font-semibold text-foreground mb-2">📊 Resumen de Eventos</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-secondary">⭐ Básicas:</span>
            <span className="ml-2 font-medium">{posicionesBasicas.length}</span>
          </div>
          <div>
            <span className="text-primary">🏠 Cúspides:</span>
            <span className="ml-2 font-medium">{cuspidesCruzadas.length}</span>
          </div>
          <div>
            <span className="text-accent">☌ Aspectos:</span>
            <span className="ml-2 font-medium">{aspectosCruzados.length}</span>
          </div>
          <div className="col-span-3 pt-2 border-t">
            <span className="text-muted-foreground">📈 Total:</span>
            <span className="ml-2 font-bold text-lg">{eventos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
