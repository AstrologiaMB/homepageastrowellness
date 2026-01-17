/**
 * API Constants
 * 
 * Centralized constants for API-related functionality.
 * Includes service names, endpoints, and configuration.
 * 
 * @module lib/constants/api.constants
 */

/**
 * API service identifiers
 */
export const API_SERVICES = {
  /** Natal chart calculation service */
  CALCULOS: 'CALCULOS',
  /** Chart interpretation service */
  INTERPRETACIONES: 'INTERPRETACIONES',
  /** Calendar service */
  CALENDARIO: 'CALENDARIO',
  /** Astrogematria service */
  ASTROGEMATRIA: 'ASTROGEMATRIA',
  /** Elective chart service */
  CARTA_ELECTIVA: 'CARTA_ELECTIVA',
} as const;

/**
 * API service names for display
 */
export const API_SERVICE_NAMES = {
  [API_SERVICES.CALCULOS]: 'Chart Calculation',
  [API_SERVICES.INTERPRETACIONES]: 'Chart Interpretation',
  [API_SERVICES.CALENDARIO]: 'Calendar',
  [API_SERVICES.ASTROGEMATRIA]: 'Astrogematria',
  [API_SERVICES.CARTA_ELECTIVA]: 'Elective Chart',
} as const;

/**
 * Development API URLs (localhost)
 */
export const DEV_API_URLS = {
  [API_SERVICES.CALCULOS]: 'http://127.0.0.1:8001',
  [API_SERVICES.INTERPRETACIONES]: 'http://127.0.0.1:8002',
  [API_SERVICES.CALENDARIO]: 'http://127.0.0.1:8004',
  [API_SERVICES.ASTROGEMATRIA]: 'http://127.0.0.1:8003',
  [API_SERVICES.CARTA_ELECTIVA]: 'http://127.0.0.1:8005',
} as const;

/**
 * API endpoint paths
 */
export const API_ENDPOINTS = {
  /** Natal chart calculation */
  CALCULAR_CARTA_NATAL: '/carta-natal/calcular',
  /** Draconic chart calculation */
  CALCULAR_CARTA_DRACONICA: '/carta-draconica/calcular',
  /** Horary chart calculation */
  CALCULAR_CARTA_HORARIA: '/carta-horaria/calcular',
  /** Crossed chart calculation */
  CALCULAR_CARTA_CRUZADA: '/carta-cruzada/calcular',
  /** Chart interpretation */
  INTERPRETAR: '/interpretar',
  /** Event interpretation */
  INTERPRETAR_EVENTO: '/interpretar-eventos',
  /** Lunar calendar */
  CALENDARIO_LUNAR: '/calendario-lunar',
  /** Personal calendar */
  CALENDARIO_PERSONAL: '/calendario-personal',
  /** Astrogematria calculation */
  ASTROGEMATRIA_CALCULAR: '/astrogematria/calcular',
  /** Astrogematria remedies */
  ASTROGEMATRIA_REMEDIOS: '/astrogematria/remedios',
  /** Elective chart search */
  CARTA_ELECTIVA_BUSCAR: '/carta-electiva/buscar',
  /** Elective chart progress */
  CARTA_ELECTIVA_PROGRESS: '/carta-electiva/progress',
} as const;

/**
 * HTTP methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API request timeout (in milliseconds)
 */
export const API_TIMEOUT = {
  /** Default timeout */
  DEFAULT: 30000,
  /** Short timeout for quick operations */
  SHORT: 5000,
  /** Long timeout for heavy calculations */
  LONG: 120000,
} as const;

/**
 * API retry configuration
 */
export const API_RETRY = {
  /** Maximum number of retries */
  MAX_RETRIES: 3,
  /** Base delay between retries (in milliseconds) */
  BASE_DELAY: 1000,
  /** Exponential backoff factor */
  BACKOFF_FACTOR: 2,
} as const;

/**
 * API response types
 */
export const API_RESPONSE_TYPES = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  HTML: 'text/html',
  FORM_DATA: 'multipart/form-data',
  STREAM: 'application/octet-stream',
} as const;

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  /** Network error */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** Timeout error */
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  /** Validation error */
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  /** Authentication error */
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  /** Authorization error */
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  /** Not found error */
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  /** Server error */
  SERVER_ERROR: 'SERVER_ERROR',
  /** Unknown error */
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  /** Default cache TTL (in seconds) */
  DEFAULT_TTL: 3600,
  /** Short cache TTL (in seconds) */
  SHORT_TTL: 300,
  /** Long cache TTL (in seconds) */
  LONG_TTL: 86400,
  /** Cache key prefix */
  KEY_PREFIX: 'api:',
} as const;

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT_CONFIG = {
  /** Maximum requests per window */
  MAX_REQUESTS: 100,
  /** Window size (in seconds) */
  WINDOW_SIZE: 60,
} as const;

/**
 * Pagination configuration
 */
export const PAGINATION_CONFIG = {
  /** Default page size */
  DEFAULT_PAGE_SIZE: 20,
  /** Maximum page size */
  MAX_PAGE_SIZE: 100,
  /** Default page number */
  DEFAULT_PAGE: 1,
} as const;

/**
 * API versioning
 */
export const API_VERSION = {
  /** Current API version */
  CURRENT: 'v1',
  /** API version header name */
  HEADER_NAME: 'API-Version',
} as const;

/**
 * Request headers
 */
export const REQUEST_HEADERS = {
  /** Content type header */
  CONTENT_TYPE: 'Content-Type',
  /** Authorization header */
  AUTHORIZATION: 'Authorization',
  /** Accept header */
  ACCEPT: 'Accept',
  /** User agent header */
  USER_AGENT: 'User-Agent',
  /** Request ID header */
  REQUEST_ID: 'X-Request-ID',
  /** Client ID header */
  CLIENT_ID: 'X-Client-ID',
} as const;

/**
 * CORS configuration
 */
export const CORS_CONFIG = {
  /** Allowed origins */
  ALLOWED_ORIGINS: ['*'],
  /** Allowed methods */
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  /** Allowed headers */
  ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Request-ID'],
  /** Max age (in seconds) */
  MAX_AGE: 86400,
} as const;
