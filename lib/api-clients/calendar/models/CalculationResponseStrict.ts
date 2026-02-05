/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AstroEventStrict } from './AstroEventStrict';
export type CalculationResponseStrict = {
    events: Array<AstroEventStrict>;
    total_events: number;
    calculation_time: number;
    year: number;
    name: string;
    transits_count?: number;
    progressed_moon_count?: number;
    profections_count?: number;
    from_cache?: boolean;
};

