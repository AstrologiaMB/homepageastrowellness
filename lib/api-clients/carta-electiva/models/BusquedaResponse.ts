/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusquedaData } from './BusquedaData';
/**
 * Respuesta de búsqueda de carta electiva
 */
export type BusquedaResponse = {
    success: boolean;
    data?: (BusquedaData | null);
    error?: (string | null);
    task_id?: (string | null);
};

