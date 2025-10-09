"use client";

import React from 'react';

/**
 * Props para el componente EmptyDayState
 */
export interface EmptyDayStateProps {
  day: Date;
  weekData: Date[];
}

/**
 * Estados vacíos contextuales mejorados para el calendario astrológico.
 *
 * Este componente muestra mensajes inspiradores y relevantes cuando un día
 * no tiene eventos astrológicos visibles, utilizando lógica contextual
 * inteligente para determinar el mensaje apropiado.
 */

export function EmptyDayState({ day, weekData }: EmptyDayStateProps) {
  // Import dinámico para evitar problemas con el árbol de dependencias
  const { generateEmptyState } = require('./utils/EmptyStateLogic');

  const stateData = generateEmptyState(day, weekData);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
      {/* Título principal con fuente más pequeña */}
      <h3 className="text-base font-medium text-foreground leading-5 mb-1">
        {stateData.title}
      </h3>

      {/* Subtítulo opcional compacto */}
      {stateData.subtitle && (
        <p className="text-xs text-muted-foreground leading-4">
          {stateData.subtitle}
        </p>
      )}
    </div>
  );
}
