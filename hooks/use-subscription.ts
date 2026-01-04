import { useAuth } from '@/auth/auth-provider'
import { hasActiveSubscription, getSubscriptionDaysRemaining, SUBSCRIPTION_STATUS } from '@/lib/subscription'

export function useSubscription() {
  // Usar useAuth para tener acceso unificado a custom auth + next-auth
  const { user, isLoading } = useAuth()

  const isPremium = hasActiveSubscription(user)
  const daysRemaining = getSubscriptionDaysRemaining(user)
  const statusText = (user as any)?.subscriptionStatus || SUBSCRIPTION_STATUS.FREE
  const expiresAt = (user as any)?.subscriptionExpiresAt

  return {
    // Estado de carga
    isLoading,

    // Estado de suscripción
    isPremium,
    status: statusText,
    expiresAt,

    // Información adicional
    daysRemaining,
    hasExpired: daysRemaining !== null && daysRemaining <= 0,

    // Utilidades
    isFree: statusText === SUBSCRIPTION_STATUS.FREE,
    isExpiringSoon: daysRemaining !== null && daysRemaining <= 7 && daysRemaining > 0,
  }
}
