/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveCyclesResponse } from '../models/ActiveCyclesResponse';
import type { BirthDataRequest } from '../models/BirthDataRequest';
import type { CalculationResponse } from '../models/CalculationResponse';
import type { CalculationResponseStrict } from '../models/CalculationResponseStrict';
import type { CycleAnalysisRequest } from '../models/CycleAnalysisRequest';
import type { HealthResponse } from '../models/HealthResponse';
import type { InfoResponse } from '../models/InfoResponse';
import type { NatalDataRequest } from '../models/NatalDataRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Calculate Personal Calendar Dynamic Endpoint
     * Calculate personal astrological calendar events using dynamic natal chart calculation.
     * This endpoint receives basic birth data and calculates the complete natal chart dynamically.
     * Returns Strict Types (datetime, etc).
     * @param requestBody
     * @returns CalculationResponseStrict Successful Response
     * @throws ApiError
     */
    public calculatePersonalCalendarDynamicEndpointCalculatePersonalCalendarDynamicPost(
        requestBody: BirthDataRequest,
    ): CancelablePromise<CalculationResponseStrict> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/calculate-personal-calendar-dynamic',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Calculate Personal Calendar Endpoint
     * Legacy endpoint: Calculate personal astrological calendar events using pre-calculated natal chart.
     * This endpoint receives a complete natal chart and uses it for calculations.
     * @param requestBody
     * @returns CalculationResponse Successful Response
     * @throws ApiError
     */
    public calculatePersonalCalendarEndpointCalculatePersonalCalendarPost(
        requestBody: NatalDataRequest,
    ): CancelablePromise<CalculationResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/calculate-personal-calendar',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Calculate Cycles Endpoint
     * Identify active Lunar Gestation Cycles (Families) for a specific date.
     * Traces back from the target date (if it's a key phase) to the Seed New Moon,
     * and returns the full 27-month cycle timeline.
     * Also calculates Metonic Index based on birth date.
     * @param requestBody
     * @returns ActiveCyclesResponse Successful Response
     * @throws ApiError
     */
    public calculateCyclesEndpointCalculateCyclesPost(
        requestBody: CycleAnalysisRequest,
    ): CancelablePromise<ActiveCyclesResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/calculate-cycles',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Health Check
     * Health check endpoint.
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
     * Service Info
     * Service information endpoint.
     * @returns InfoResponse Successful Response
     * @throws ApiError
     */
    public serviceInfoInfoGet(): CancelablePromise<InfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/info',
        });
    }
    /**
     * Root
     * Root endpoint with basic service information.
     * @returns any Successful Response
     * @throws ApiError
     */
    public rootGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
}
