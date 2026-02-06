/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InterpretacionItem } from './InterpretacionItem';
/**
 * Respuesta con interpretaciones completas
 */
export type InterpretacionResponse = {
    interpretacion_narrativa: string;
    interpretaciones_individuales: Array<InterpretacionItem>;
    tiempo_generacion: number;
};

