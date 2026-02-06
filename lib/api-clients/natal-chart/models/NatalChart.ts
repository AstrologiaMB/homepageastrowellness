/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AspectData } from './AspectData';
import type { BalanceData } from './BalanceData';
import type { HouseData } from './HouseData';
import type { PointData } from './PointData';
/**
 * Strict Schema for Natal Chart Response
 */
export type NatalChart = {
    points: Record<string, PointData>;
    houses: Record<string, HouseData>;
    aspects: Array<AspectData>;
    balance?: (BalanceData | null);
};

