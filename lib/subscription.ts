export const SUBSCRIPTION_STATUS = {
  FREE: 'free',
  PREMIUM: 'premium'
} as const

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS]

// Servicios premium que requieren suscripción
export const PREMIUM_SERVICES = [
  '/calendario/personal',
  '/cartas/tropica',
  '/cartas/draconica',
  '/astrogematria/interpretaciones'
] as const

/**
 * Verifica si una ruta corresponde a un servicio premium
 */
export function isPremiumService(path: string): boolean {
  return PREMIUM_SERVICES.some(service => path.startsWith(service))
}

/**
 * Verifica si un usuario tiene una suscripción activa
 */
export function hasActiveSubscription(user: any): boolean {
  if (!user?.subscriptionStatus) return false
  if (user.subscriptionStatus !== SUBSCRIPTION_STATUS.PREMIUM) return false

  // Verificar expiración si existe
  if (user.subscriptionExpiresAt) {
    const expiresAt = new Date(user.subscriptionExpiresAt)
    const now = new Date()
    if (now > expiresAt) return false
  }

  return true
}

/**
 * Obtiene el tiempo restante de suscripción en días
 */
export function getSubscriptionDaysRemaining(user: any): number | null {
  if (!user?.subscriptionExpiresAt) return null
  if (user.subscriptionStatus !== SUBSCRIPTION_STATUS.PREMIUM) return null

  const expiresAt = new Date(user.subscriptionExpiresAt)
  const now = new Date()
  const diffTime = expiresAt.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}
