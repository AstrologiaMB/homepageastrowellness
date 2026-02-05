/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HouseTransitStrict } from './HouseTransitStrict';
import type { RelevanceLevel } from './RelevanceLevel';
/**
 * Modelo estricto para eventos astrológicos.
 * Elimina la ambigüedad de 'Dict[str, Any]' y fuerza tipos concretos.
 */
export type AstroEventStrict = {
    /**
     * Fecha y hora exacta en UTC
     */
    fecha_utc: string;
    /**
     * Hora formateada HH:MM para compatibilidad UI
     */
    hora_utc: string;
    tipo_evento: string;
    descripcion: string;
    relevance?: RelevanceLevel;
    planeta1?: (string | null);
    planeta2?: (string | null);
    posicion1?: (string | null);
    posicion2?: (string | null);
    tipo_aspecto?: (string | null);
    orbe?: (string | null);
    es_aplicativo?: (string | null);
    harmony?: (string | null);
    elevacion?: (string | null);
    azimut?: (string | null);
    signo?: (string | null);
    grado?: (string | null);
    posicion?: (string | null);
    casa_natal?: (number | null);
    house_transits?: (Array<HouseTransitStrict> | null);
    interpretacion?: (string | null);
    visibilidad_local?: (string | null);
    /**
     * Tipo de fase lunar asociada
     */
    phase_type?: (string | null);
};

