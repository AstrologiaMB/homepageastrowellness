/**
 * API Configuration - Centralized API URLs Management
 * 
 * This configuration automatically selects the appropriate API URLs based on the environment.
 * - development: Uses localhost URLs (no configuration needed)
 * - production: Uses environment variables (configured in Railway)
 * 
 * Benefits:
 * - Zero config for local development
 * - Platform-agnostic (works with Railway, Vercel, VPS, etc.)
 * - Type-safe API URL access
 * - Single source of truth for all API endpoints
 */

const ENV = process.env.NODE_ENV || 'development';

type ApiService = 'CALCULOS' | 'INTERPRETACIONES' | 'CALENDARIO' | 'ASTROGEMATRIA' | 'CARTA_ELECTIVA';

interface ApiUrls {
  CALCULOS: string;
  INTERPRETACIONES: string;
  CALENDARIO: string;
  ASTROGEMATRIA: string;
  CARTA_ELECTIVA: string;
}

/**
 * API URLs configuration by environment
 */
const API_URLS: Record<'development' | 'production', ApiUrls> = {
  development: {
    CALCULOS: 'http://localhost:8001',
    INTERPRETACIONES: 'http://localhost:8002',
    CALENDARIO: 'http://localhost:8003',
    ASTROGEMATRIA: 'http://localhost:8003', // Same port as calendario in local
    CARTA_ELECTIVA: 'http://localhost:8005'
  },
  production: {
    CALCULOS: process.env.NEXT_PUBLIC_CALCULOS_API_URL || '',
    INTERPRETACIONES: process.env.NEXT_PUBLIC_INTERPRETACIONES_API_URL || '',
    CALENDARIO: process.env.NEXT_PUBLIC_CALENDARIO_API_URL || '',
    ASTROGEMATRIA: process.env.NEXT_PUBLIC_ASTROGEMATRIA_API_URL || '',
    CARTA_ELECTIVA: process.env.NEXT_PUBLIC_CARTA_ELECTIVA_API_URL || ''
  }
};

/**
 * Get the API URL for a specific service
 * 
 * @param service - The name of the API service
 * @returns The URL for the specified service
 * @throws Error if the service URL is not configured in production
 * 
 * @example
 * ```typescript
 * const url = getApiUrl('ASTROGEMATRIA');
 * // Development: 'http://localhost:8003'
 * // Production: 'https://astrogematriafastapi-production.up.railway.app'
 * ```
 */
export function getApiUrl(service: ApiService): string {
  const urls = API_URLS[ENV as 'development' | 'production'] || API_URLS.development;
  const url = urls[service];
  
  if (!url && ENV === 'production') {
    throw new Error(
      `API URL for ${service} is not configured. ` +
      `Please set ${service}_API_URL environment variable in Railway.`
    );
  }
  
  return url;
}

/**
 * Get all configured API URLs
 * Useful for debugging and monitoring
 */
export function getAllApiUrls(): ApiUrls {
  const urls = API_URLS[ENV as 'development' | 'production'] || API_URLS.development;
  return { ...urls };
}

/**
 * Check if all required API URLs are configured
 * Useful for health checks
 */
export function areAllApiUrlsConfigured(): boolean {
  if (ENV === 'development') return true;
  
  const urls = API_URLS.production;
  return Object.values(urls).every(url => url && url.length > 0);
}

// Export the current environment for debugging
export const currentEnvironment = ENV;
