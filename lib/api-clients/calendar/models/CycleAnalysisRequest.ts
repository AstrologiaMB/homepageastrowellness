/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationData } from './LocationData';
export type CycleAnalysisRequest = {
    /**
     * Birth date in YYYY-MM-DD format
     */
    birth_date: string;
    /**
     * Date to check for active cycles (YYYY-MM-DD)
     */
    target_date: string;
    location: LocationData;
};

