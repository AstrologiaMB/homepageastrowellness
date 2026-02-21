import type { features } from '@/lib/features';
import type { Entitlements } from '@/lib/subscription';

export const BETA_MODE_ENABLED = true;

/**
 * Emails de usuarios con acceso beta.
 * Estos usuarios ignoran las env vars de feature flags y el estado de suscripción.
 */
export const BETA_USERS: string[] = [
  'test@admin.com',
];

/**
 * Features visibles en el menú para beta users.
 * Solo estas claves de lib/features.ts serán visibles, independientemente de NEXT_PUBLIC_ENABLE_*.
 */
export const BETA_FEATURE_FLAGS: Array<keyof typeof features> = [
  'enablePersonalCalendar',
  'enableTropicalChart',
];

/**
 * Entitlements de acceso para beta users.
 * Solo estos entitlements de lib/subscription.ts estarán permitidos, sin requerir suscripción activa.
 */
export const BETA_ENTITLEMENTS: Array<keyof Entitlements> = [
  'hasBaseBundle',
];
