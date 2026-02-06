/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NatalChart } from './NatalChart';
/**
 * Strict Response Wrapper replacing CartaNatalResponse
 */
export type CartaNatalResponseStrict = {
    success: boolean;
    data: NatalChart;
    data_reducido?: (Record<string, any> | null);
    error?: (string | null);
    timestamp?: string;
};

