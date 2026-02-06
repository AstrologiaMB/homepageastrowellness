/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusquedaRequest } from '../models/BusquedaRequest';
import type { BusquedaResponse } from '../models/BusquedaResponse';
import type { ProgressResponse } from '../models/ProgressResponse';
import type { TaskResponse } from '../models/TaskResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Buscar Fechas V2
     * @param requestBody
     * @returns BusquedaResponse Successful Response
     * @throws ApiError
     */
    public buscarFechasV2BuscarFechasV2Post(
        requestBody: BusquedaRequest,
    ): CancelablePromise<BusquedaResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/buscar-fechas-v2',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Buscar
     * @param requestBody
     * @returns TaskResponse Successful Response
     * @throws ApiError
     */
    public buscarBuscarPost(
        requestBody: BusquedaRequest,
    ): CancelablePromise<TaskResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/buscar',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Progress
     * @param taskId
     * @returns ProgressResponse Successful Response
     * @throws ApiError
     */
    public progressProgressTaskIdGet(
        taskId: string,
    ): CancelablePromise<ProgressResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/progress/{task_id}',
            path: {
                'task_id': taskId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
