/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Respuesta del health check
 */
export type HealthResponse = {
    status: string;
    service: string;
    version: string;
    timestamp: string;
    python_version: string;
    dependencies_ok: boolean;
    commit_sha?: (string | null);
};

