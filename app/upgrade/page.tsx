'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Calendar, FileText, Bot, Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSubscription } from '@/hooks/use-subscription'

function UpgradeForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const { isPremium, status } = useSubscription()

  // Si ya tiene premium, mostrar mensaje y redirigir
  if (isPremium) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Ya tienes Premium!</h1>
          <p className="text-muted-foreground mb-6">
            Tu suscripción premium está activa. Puedes acceder a todos los servicios.
          </p>
          {callbackUrl ? (
            <Button asChild>
              <Link href={callbackUrl}>
                Continuar al servicio solicitado
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/calendario">
                Ir al Calendario
              </Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Star className="mx-auto h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Actualizar a Premium
          </h1>
          <p className="text-xl text-muted-foreground">
            Desbloquea todo el potencial de Astrowellness
          </p>
        </div>

        {/* Premium Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Calendario Personal
              </CardTitle>
              <CardDescription>
                Eventos astrológicos personalizados basados en tu carta natal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Tránsitos planetarios personalizados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Ciclos lunares individuales
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Alertas de eventos importantes
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Cartas Avanzadas
              </CardTitle>
              <CardDescription>
                Cartas trópica y dracónica con interpretaciones completas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Carta Trópica completa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Carta Dracónica detallada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Exportación PDF profesional
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Interpretaciones IA
              </CardTitle>
              <CardDescription>
                Análisis astrológicos generados por inteligencia artificial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Interpretación narrativa completa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Análisis planetario individual
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Predicciones personalizadas
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>

        {/* Call to Action */}
        <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Listo para el siguiente nivel?</h2>
            <p className="text-muted-foreground mb-6">
              Contacta con el administrador para obtener acceso premium y desbloquear todo el potencial de Astrowellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Star className="mr-2 h-5 w-5" />
                Solicitar Acceso Premium
              </Button>
              {callbackUrl && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={callbackUrl}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver
                  </Link>
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Tu suscripción premium incluye soporte prioritario y actualizaciones exclusivas.
            </p>
          </CardContent>
        </Card>

        {/* Free Services Reminder */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Servicios gratuitos disponibles:</strong> Calendario General, Carta Horaria, Rectificación, Astrogematria Cálculos
          </p>
        </div>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Cargando...</div>}>
      <UpgradeForm />
    </Suspense>
  )
}
