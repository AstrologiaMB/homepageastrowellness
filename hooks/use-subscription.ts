import { useSession } from 'next-auth/react'
import { hasActiveSubscription, getSubscriptionDaysRemaining, SUBSCRIPTION_STATUS } from '@/lib/subscription'

export function useSubscription() {
  const { data: session, status } = useSession()
  const user = session?.user as any

  const isPremium = hasActiveSubscription(user)
  const daysRemaining = getSubscriptionDaysRemaining(user)
  const statusText = user?.subscriptionStatus || SUBSCRIPTION_STATUS.FREE
  const expiresAt = user?.subscriptionExpiresAt

  return {
    // Estado de carga
    isLoading: status === 'loading',

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
