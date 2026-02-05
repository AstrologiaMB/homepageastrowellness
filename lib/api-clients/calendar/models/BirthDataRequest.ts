/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationData } from './LocationData';
/**
 * Request model for basic birth data that will be used to calculate natal chart dynamically.
 */
export type BirthDataRequest = {
    name: string;
    /**
     * Birth date in YYYY-MM-DD format
     */
    birth_date: string;
    /**
     * Birth time in HH:MM format
     */
    birth_time: string;
    location: LocationData;
    /**
     * Year for which to calculate events
     */
    year?: number;
};

