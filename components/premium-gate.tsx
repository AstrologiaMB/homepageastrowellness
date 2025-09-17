'use client'

import { ReactNode } from 'react'
import { useSubscription } from '@/hooks/use-subscription'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Lock } from 'lucide-react'
import Link from 'next/link'

interface PremiumGateProps {
  children: ReactNode
  fallback?: ReactNode
  title?: string
  description?: string
}

function UpgradePrompt({
  title = "Servicio Premium",
  description = "Este servicio requiere una suscripción premium para acceder."
}: { title?: string; description?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>🔮 <strong>Calendario Personal</strong> - Eventos astrológicos personalizados</p>
            <p>⭐ <strong>Cartas Avanzadas</strong> - Trópica y Dracónica completas</p>
            <p>🤖 <strong>Interpretaciones IA</strong> - Análisis detallados con IA</p>
            <p>⏰ <strong>Horas Planetarias</strong> - Sistema completo de cronobiología</p>
          </div>
          <Button asChild className="w-full">
            <Link href="/upgrade">
              <Star className="mr-2 h-4 w-4" />
              Actualizar a Premium
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Contacta con el administrador para obtener acceso premium
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function PremiumGate({
  children,
  fallback,
  title,
  description
}: PremiumGateProps) {
  const { isPremium, isLoading } = useSubscription()

  // Mostrar loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Si no tiene premium, mostrar fallback o UpgradePrompt
  if (!isPremium) {
    return fallback || <UpgradePrompt title={title} description={description} />
  }

  // Si tiene premium, mostrar el contenido
  return <>{children}</>
}
