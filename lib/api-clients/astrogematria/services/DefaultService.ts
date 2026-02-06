/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AstrogematriaRequest } from '../models/AstrogematriaRequest';
import type { AstrogematriaResponseStrict } from '../models/AstrogematriaResponseStrict';
import type { HealthResponse } from '../models/HealthResponse';
import type { RemediosResponseStrict } from '../models/RemediosResponseStrict';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Root
     * Endpoint raíz con información básica del servicio
     * @returns any Successful Response
     * @throws ApiError
     */
    public rootGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health Check
     * Health check del servicio
     * @returns HealthResponse Successful Response
     * @throws ApiError
     */
    public healthCheckHealthGet(): CancelablePromise<HealthResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * Calcular Astrogematria
     * Calcula el valor astrogematrícico de una palabra o frase
     * y determina su posición en la rueda zodiacal
     * @param requestBody
     * @returns AstrogematriaResponseStrict Successful Response
     * @throws ApiError
     */
    public calcularAstrogematriaAstrogematriaCalcularPost(
        requestBody: AstrogematriaRequest,
    ): CancelablePromise<AstrogematriaResponseStrict> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/astrogematria/calcular',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Remedios
     * Obtiene la lista de remedios homeopáticos por grado y signo zodiacal
     * @returns RemediosResponseStrict Successful Response
     * @throws ApiError
     */
    public getRemediosAstrogematriaRemediosGet(): CancelablePromise<RemediosResponseStrict> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/astrogematria/remedios',
        });
    }
}
