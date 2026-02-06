/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InterpretacionEventoRequest } from '../models/InterpretacionEventoRequest';
import type { InterpretacionEventosResponse } from '../models/InterpretacionEventosResponse';
import type { InterpretacionRequest } from '../models/InterpretacionRequest';
import type { InterpretacionResponse } from '../models/InterpretacionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Generar Interpretacion
     * @param requestBody
     * @returns InterpretacionResponse Successful Response
     * @throws ApiError
     */
    public generarInterpretacionInterpretarPost(
        requestBody: InterpretacionRequest,
    ): CancelablePromise<InterpretacionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/interpretar',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Interpretar Eventos Calendario
     * @param requestBody
     * @returns InterpretacionEventosResponse Successful Response
     * @throws ApiError
     */
    public interpretarEventosCalendarioInterpretarEventosPost(
        requestBody: InterpretacionEventoRequest,
    ): CancelablePromise<InterpretacionEventosResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/interpretar-eventos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
