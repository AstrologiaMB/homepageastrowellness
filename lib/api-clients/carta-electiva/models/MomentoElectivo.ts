/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Modelo para un momento electivo encontrado
 */
export type MomentoElectivo = {
    /**
     * Posición en el ranking (1 es mejor)
     */
    ranking: number;
    /**
     * Fecha y hora del momento (ISO 8601)
     */
    fecha_hora: string;
    /**
     * Puntuación calculada
     */
    puntuacion_total: number;
    /**
     * Porcentaje de enraizamiento
     */
    enraizamiento_pct: number;
    /**
     * Porcentaje de calidad astrológica
     */
    calidad_pct: number;
    /**
     * Categoría descriptiva
     */
    categoria: string;
    /**
     * Detalles adicionales del cálculo
     */
    detalles?: (Record<string, any> | null);
};

