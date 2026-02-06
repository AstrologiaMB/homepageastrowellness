/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ZodiacSign } from './ZodiacSign';
/**
 * Strict schema for calculation results
 */
export type AstrogematriaDataStrict = {
    /**
     * Input word
     */
    palabra_original: string;
    /**
     * Processed word (uppercase, no accents)
     */
    palabra_procesada: string;
    /**
     * Calculated numerical value
     */
    valor_astrogematrico: number;
    /**
     * Zodiac index (1-12)
     */
    reduccion_zodiacal: number;
    signo: ZodiacSign;
    /**
     * Degree within the sign (0-29)
     */
    grados: number;
    /**
     * Full textual description (e.g. '12° Aries')
     */
    posicion_completa: string;
};

