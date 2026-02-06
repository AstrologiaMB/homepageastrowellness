/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Representa un único evento de calendario que necesita interpretación.
 * Es un espejo del modelo AstroEventResponse del servicio de calendario.
 */
export type EventoCalendario = {
    fecha_utc: string;
    hora_utc: string;
    tipo_evento: string;
    descripcion: string;
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
    house_transits?: null;
    interpretacion?: (string | null);
};

