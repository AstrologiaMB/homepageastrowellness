/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Datos de carta natal recibidos del microservicio de cálculo
 */
export type CartaNatalData = {
    /**
     * Nombre del consultante
     */
    nombre: string;
    /**
     * Datos de planetas y puntos
     */
    points: Record<string, any>;
    /**
     * Datos de casas
     */
    houses: Record<string, any>;
    /**
     * Lista de aspectos
     */
    aspects: Array<Record<string, any>>;
    cuspides_cruzadas?: null;
    aspectos_cruzados?: null;
};

