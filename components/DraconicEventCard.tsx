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
  // Determinar colores según tipo de evento usando variables del tema Midnight Bloom
  const getCardStyles = () => {
    switch (event.tipo) {
      case 'posicion_basica':
        return 'bg-gradient-to-br from-secondary/20 to-secondary/30 border-secondary';
      case 'cuspide_cruzada':
        return 'bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30';
      case 'aspecto_cruzado':
        return 'bg-gradient-to-br from-accent/20 to-accent/30 border-accent/40';
      default:
        return 'bg-card border-border';
    }
  };

  // Determinar badge de relevancia usando variables del tema Midnight Bloom
  const getRelevanciaBadge = () => {
    switch (event.relevancia) {
      case 'alta':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'media':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'baja':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Card className={`${getCardStyles()} hover:shadow-lg transition-shadow duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{event.icono}</span>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {event.titulo}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRelevanciaBadge()}`}>
                  {event.relevancia.toUpperCase()}
                </span>
                {event.orbe && (
                  <span className="text-xs text-muted-foreground">
                    Orbe: {event.orbe}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {event.descripcion}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
