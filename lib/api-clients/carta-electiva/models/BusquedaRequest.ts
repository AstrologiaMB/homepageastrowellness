/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartaNatalData } from './CartaNatalData';
/**
 * Modelo para solicitud de búsqueda de carta electiva
 */
export type BusquedaRequest = {
    /**
     * ID del usuario
     */
    user_id: string;
    /**
     * Tema astrológico (trabajo, amor, etc.)
     */
    tema: string;
    /**
     * Fecha de inicio (YYYY-MM-DD)
     */
    fecha_inicio: string;
    /**
     * Número de días a analizar
     */
    dias?: number;
    /**
     * Ubicación con ciudad y país
     */
    ubicacion: Record<string, string>;
    /**
     * Datos de carta natal del usuario
     */
    carta_natal: CartaNatalData;
};

