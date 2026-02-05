/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HouseData } from './HouseData';
import type { LocationData } from './LocationData';
import type { PointData } from './PointData';
export type NatalDataRequest = {
    points: Record<string, PointData>;
    houses: Record<string, HouseData>;
    location: LocationData;
    hora_local: string;
    name: string;
    /**
     * Year for which to calculate events
     */
    year?: number;
};

