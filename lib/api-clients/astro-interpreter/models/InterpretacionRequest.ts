/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartaNatalData } from './CartaNatalData';
/**
 * Request para generar interpretación
 */
export type InterpretacionRequest = {
    carta_natal: CartaNatalData;
    /**
     * Género: masculino o femenino
     */
    genero: string;
    /**
     * Tipo de carta: tropical o draco
     */
    tipo?: string;
};

