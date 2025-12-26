export const SUBSCRIPTION_STATUS = {
  FREE: 'free',
  ACTIVE: 'active',
  PAST_DUE: 'past_due',
  CANCELED: 'canceled',
} as const;

export interface Entitlements {
  hasBaseBundle: boolean;
  hasLunarCalendar: boolean;
  hasAstrogematria: boolean;
  hasElectiveChart: boolean;
  hasDraconicAccess: boolean;
}

/**
 * Verifica si un usuario tiene acceso a una funcionalidad específica
 */
export function checkEntitlement(user: any, feature: keyof Entitlements): boolean {
  if (!user) return false;

  // 1. Support NextAuth Session User (has .entitlements property)
  if (user.entitlements) {
    if (feature === 'hasDraconicAccess') {
      const entitlements = user.entitlements;
      // Verify dependency again just in case token is stale or raw
      return entitlements.hasDraconicAccess && entitlements.hasBaseBundle && entitlements.status === 'active';
    }
    // For others, check directly
    return user.entitlements[feature] === true;
  }

  // 2. Support Prisma DB User (has .subscription relation)
  // Draconic is on User model
  if (feature === 'hasDraconicAccess') {
    // Must have Draconic purchased AND Active Base Bundle
    return user.hasDraconicAccess && user.subscription?.hasBaseBundle && user.subscription?.status === 'active';
  }

  // Others are on Subscription model
  if (!user.subscription || user.subscription.status !== 'active') return false;

  return user.subscription[feature] === true;
}

/**
 * Helper legacy compatible (optional)
 * Maps path to required entitlement
 */
export function isPremiumService(path: string): boolean {
  // Free services
  if (path.startsWith('/calendario/general')) return false;
  if (path.startsWith('/cartas/horaria')) return false;
  if (path.startsWith('/rectificacion')) return false;
  if (path.startsWith('/astrogematria/calculos') && !path.includes('interpretaciones')) return false;

  // Premium paths
  return true;
}

export function getRequiredEntitlement(path: string): keyof Entitlements | null {
  if (path.startsWith('/calendario/personal')) return 'hasBaseBundle';
  if (path.startsWith('/cartas/tropica')) return 'hasBaseBundle';

  if (path.startsWith('/calendario/lunar')) return 'hasLunarCalendar';
  if (path.startsWith('/astrogematria/interpretaciones')) return 'hasAstrogematria';
  if (path.startsWith('/carta-electiva')) return 'hasElectiveChart';
  if (path.startsWith('/cartas/draconica')) return 'hasDraconicAccess';


  return null;
}

/**
 * Verifica si un usuario tiene una suscripción activa (Legacy wrapper)
 */
export function hasActiveSubscription(user: any): boolean {
  if (!user) return false;
  // En el nuevo modelo, 'hasActiveSubscription' equivale a tener el Bundle Base activo
  return checkEntitlement(user, 'hasBaseBundle');
}

/**
 * Obtiene el tiempo restante de suscripción en días (Legacy wrapper)
 */
export function getSubscriptionDaysRemaining(user: any): number | null {
  // Try to use subscription info
  if (user?.subscription?.stripeCurrentPeriodEnd) {
    const expiresAt = new Date(user.subscription.stripeCurrentPeriodEnd);
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  // Fallback to old user field (for migration safety)
  if (user?.subscriptionExpiresAt) {
    const expiresAt = new Date(user.subscriptionExpiresAt);
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  return null;
}
