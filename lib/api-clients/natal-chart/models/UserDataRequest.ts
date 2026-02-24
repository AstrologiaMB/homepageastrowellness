/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Datos de entrada para calcular carta natal
 */
export type UserDataRequest = {
    /**
     * Nombre completo del usuario
     */
    nombre: string;
    /**
     * Fecha de nacimiento en formato YYYY-MM-DD
     */
    fecha_nacimiento: string;
    /**
     * Hora de nacimiento en formato HH:MM
     */
    hora_nacimiento: string;
    /**
     * Ciudad de nacimiento (opcional, para display)
     */
    ciudad_nacimiento?: string | null;
    /**
     * País de nacimiento (opcional, para display)
     */
    pais_nacimiento?: string | null;
    /**
     * Latitud de nacimiento (de Google Maps)
     */
    latitud: number;
    /**
     * Longitud de nacimiento (de Google Maps)
     */
    longitud: number;
    /**
     * Zona horaria (de Google Maps API)
     */
    timezone: string;
};

