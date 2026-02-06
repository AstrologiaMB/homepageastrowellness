/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Data strict for a celestial point
 */
export type PointData = {
    /**
     * Name of the celestial body
     */
    name: string;
    /**
     * Zodiac sign name
     */
    sign: string;
    /**
     * Zodiac sign index (0=Aries)
     */
    sign_id: number;
    /**
     * Degree within the sign
     */
    degree: number;
    /**
     * Absolute degree in the zodiac
     */
    abs_degree: number;
    /**
     * Minutes portion of the position
     */
    minutes: number;
    /**
     * True if retrograde
     */
    retrograde: boolean;
    /**
     * House placement (1-12)
     */
    house: number;
};

