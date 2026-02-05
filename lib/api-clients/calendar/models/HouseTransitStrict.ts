/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Modelo estricto para tránsitos por casas.
 */
export type HouseTransitStrict = {
    /**
     * Tipo de tránsito (ej. 'transito_planetario', 'luna_progresada')
     */
    tipo: string;
    planeta: string;
    simbolo: string;
    signo?: (string | null);
    grado?: (number | null);
    casa: number;
    casa_significado: string;
};

