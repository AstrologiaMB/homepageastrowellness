/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartaNatalResponse } from '../models/CartaNatalResponse';
import type { CartaNatalResponseStrict } from '../models/CartaNatalResponseStrict';
import type { UserDataRequest } from '../models/UserDataRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Root
     * Información básica del servicio
     * @returns any Successful Response
     * @throws ApiError
     */
    public rootGet(): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health Check
     * Ultra-simplified health check for Railway
     * @returns any Successful Response
     * @throws ApiError
     */
    public healthCheckHealthGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * Buscar Ubicaciones
     * Endpoint para buscar múltiples ubicaciones antes de calcular carta
     * @returns any Successful Response
     * @throws ApiError
     */
    public buscarUbicacionesGeocodeSearchPost(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/geocode/search',
        });
    }
    /**
     * Calcular Carta Tropical
     * Calcular carta natal trópica
     * @param requestBody
     * @returns CartaNatalResponseStrict Successful Response
     * @throws ApiError
     */
    public calcularCartaTropicalCartaNatalTropicalPost(
        requestBody: UserDataRequest,
    ): CancelablePromise<CartaNatalResponseStrict> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/carta-natal/tropical',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Calcular Carta Draconica
     * Calcular carta natal dracónica
     * @param requestBody
     * @returns CartaNatalResponseStrict Successful Response
     * @throws ApiError
     */
    public calcularCartaDraconicaCartaNatalDraconicaPost(
        requestBody: UserDataRequest,
    ): CancelablePromise<CartaNatalResponseStrict> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/carta-natal/draconica',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Calcular Carta Cruzada
     * Calcular análisis cruzado dracónico-tropical
     * @param requestBody
     * @returns CartaNatalResponse Successful Response
     * @throws ApiError
     */
    public calcularCartaCruzadaCartaNatalCruzadaPost(
        requestBody: UserDataRequest,
    ): CancelablePromise<CartaNatalResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/carta-natal/cruzada',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
