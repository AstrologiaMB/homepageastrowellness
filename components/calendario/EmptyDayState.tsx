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
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
      {/* Icono contextual */}
      <div className="text-4xl animate-pulse">
        {stateData.icon}
      </div>

      {/* Título principal */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground leading-tight">
          {stateData.title}
        </h3>

        {/* Subtítulo opcional con tipografía más suave */}
        {stateData.subtitle && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {stateData.subtitle}
          </p>
        )}
      </div>

      {/* Indicador visual sutil que indica que es un estado vacío */}
      <div className="w-12 h-px bg-border/50 rounded-full mt-4" />
    </div>
  );
}
