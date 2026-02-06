/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadisticasBusqueda } from './EstadisticasBusqueda';
import type { MomentoElectivo } from './MomentoElectivo';
/**
 * Datos de la respuesta de búsqueda
 */
export type BusquedaData = {
    momentos: Array<MomentoElectivo>;
    estadisticas: EstadisticasBusqueda;
    task_id?: (string | null);
};

