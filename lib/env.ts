/**
 * Environment Configuration & Validation
 * 
 * This module validates all required environment variables at startup
 * using Zod schemas to ensure type safety and provide clear error messages.
 * 
 * @module lib/env
 */

import { z } from 'zod';

/**
 * Zod schema for validating all environment variables
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // NextAuth.js Configuration
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL').default('http://localhost:3000'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  // JWT Secret
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

  // External APIs
  OPENCAGE_API_KEY: z.string().min(1, 'OPENCAGE_API_KEY is required'),

  // AWS SES (for local development)
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),

  // Resend (for Railway production)
  RESEND_API_KEY: z.string().optional(),

  // Email Configuration
  FROM_EMAIL: z.string().email('FROM_EMAIL must be a valid email').default('noreply@astrochat.online'),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),

  // API URLs for Microservices (Production - Railway)
  NEXT_PUBLIC_CALCULOS_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_INTERPRETACIONES_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_CALENDARIO_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_ASTROGEMATRIA_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_CARTA_ELECTIVA_API_URL: z.string().url().optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables
 * Throws detailed error messages if validation fails
 * 
 * @throws {z.ZodError} If environment variables are invalid or missing
 * @returns {Env} Validated environment variables
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => {
        return `${e.path.join('.')}: ${e.message}`;
      }).join('\n');
      console.error('❌ Environment validation failed:');
      console.error(errorMessage);
      throw new Error(`Environment validation failed:\n${errorMessage}`);
    }
    throw error;
  }
}

/**
 * Cached validated environment variables
 * Validation is lazy - only runs when first accessed at runtime
 */
let cachedEnv: Env | null = null;

/**
 * Exported validated environment variables
 * Access these instead of process.env directly for type safety
 * Validation is lazy and only runs at runtime, not during build
 */
export const env = new Proxy({} as Env, {
  get(_target, prop: keyof Env) {
    if (!cachedEnv) {
      cachedEnv = validateEnv();
    }
    return cachedEnv[prop];
  },
  has(_target, prop: keyof Env) {
    if (!cachedEnv) {
      cachedEnv = validateEnv();
    }
    return prop in cachedEnv;
  },
});

/**
 * Check if running in production environment
 */
export const isProduction = () => env.NODE_ENV === 'production';

/**
 * Check if running in development environment
 */
export const isDevelopment = () => env.NODE_ENV === 'development';

/**
 * Check if running in test environment
 */
export const isTest = () => env.NODE_ENV === 'test';

/**
 * Get API URL for a specific service (for production)
 * Falls back to localhost URLs in development
 */
export const getApiServiceUrl = (service: 'CALCULOS' | 'INTERPRETACIONES' | 'CALENDARIO' | 'ASTROGEMATRIA' | 'CARTA_ELECTIVA'): string => {
  const envVarMap = {
    CALCULOS: 'NEXT_PUBLIC_CALCULOS_API_URL',
    INTERPRETACIONES: 'NEXT_PUBLIC_INTERPRETACIONES_API_URL',
    CALENDARIO: 'NEXT_PUBLIC_CALENDARIO_API_URL',
    ASTROGEMATRIA: 'NEXT_PUBLIC_ASTROGEMATRIA_API_URL',
    CARTA_ELECTIVA: 'NEXT_PUBLIC_CARTA_ELECTIVA_API_URL',
  } as const;

  const envVar = envVarMap[service];
  const url = env[envVar as keyof Env] as string | undefined;

  if (isDevelopment()) {
    // Use localhost URLs in development
    const devUrls = {
      CALCULOS: 'http://127.0.0.1:8001',
      INTERPRETACIONES: 'http://127.0.0.1:8002',
      CALENDARIO: 'http://127.0.0.1:8004',
      ASTROGEMATRIA: 'http://127.0.0.1:8003',
      CARTA_ELECTIVA: 'http://127.0.0.1:8005',
    };
    return devUrls[service];
  }

  if (!url && isProduction()) {
    throw new Error(`API URL for ${service} is not configured. Please set ${envVar} environment variable.`);
  }

  return url || '';
};
