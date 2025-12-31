'use client'

import { useState, Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Star, Calendar, FileText, Bot, CheckCircle, ArrowLeft, Moon, Calculator, Clock } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

// Note: STRIPE_PRICES are in lib/stripe but we'll hardcode here for client safety/ease if needed, or import.
// For now, restoring the object definitions.

const PRICES = {
  BASE_BUNDLE: 'price_1ShGWULOQsTENXFlKx62Lxlx',
  ADD_ON_LUNAR: 'price_1ShGX9LOQsTENXFlz3FXikyg',
  ADD_ON_ASTROGEMATRIA: 'price_1ShGXVLOQsTENXFlygB8zOK0',
  ADD_ON_ELECTIVE: 'price_1ShGY7LOQsTENXFlvmAt6Nk2',
  ONE_TIME_DRACONIC: 'price_1ShGYSLOQsTENXFlGVyzY7t4',
}

const PRICE_VALUES = {
  BASE: 3.00,
  LUNAR: 1.50,
  ASTRO: 1.00,
  ELECTIVE: 4.50,
  DRACONIC: 25.00
}

function UpgradePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')
  const callbackUrl = searchParams.get('callbackUrl')

  // Properly destructure session and status
  const { data: session, status, update } = useSession()
  const user = session?.user as any
  const entitlements = user?.entitlements || {}
  const isBaseActive = entitlements.hasBaseBundle && entitlements.status === 'active'

  // State for Add-ons (Base is always selected if subscribing)
  const [selectedAddOns, setSelectedAddOns] = useState({
    lunar: false,
    astro: false,
    elective: false
  })

  // State hooks (MUST be before any conditional return)
  const [buyingDraconic, setBuyingDraconic] = useState(false)
  const [loading, setLoading] = useState(false)

  // 3. Side effects (Moved up to avoid conditional return violation)
  useEffect(() => {
    if (success) {
      update()
    }
  }, [success, update])

  // 4. Polling for activation (Race Condition Fix)
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (success && !isBaseActive) {
      interval = setInterval(() => {
        update() // Poll session every 2s until webhook updates DB
      }, 2000)
    }

    return () => clearInterval(interval)
  }, [success, isBaseActive, update])

  // 1. Defensively handle loading state
  if (status === 'loading' && !success) {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando...</div>
  }

  // 2. Safe access to entitlements (already defined above)



  // Calculate Monthly Total
  const monthlyTotal = PRICE_VALUES.BASE +
    (selectedAddOns.lunar ? PRICE_VALUES.LUNAR : 0) +
    (selectedAddOns.astro ? PRICE_VALUES.ASTRO : 0) +
    (selectedAddOns.elective ? PRICE_VALUES.ELECTIVE : 0)

  const handleUpdateSubscription = async (priceId: string, action: 'add' | 'remove') => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/subscription/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, action })
      })

      if (!response.ok) throw new Error('Failed to update subscription')

      // Force session update to fetch new entitlements
      await update()

      toast.success(action === 'add' ? 'Complemento agregado correctamente' : 'Complemento eliminado correctamente')
      router.refresh()
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Error al actualizar la suscripción')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async (mode: 'subscription' | 'payment') => {
    // If base is active and user clicks "Subscription", send to portal for general management
    if (mode === 'subscription' && isBaseActive) {
      try {
        setLoading(true)
        const response = await fetch('/api/stripe/portal', { method: 'POST' })
        const data = await response.json()
        window.location.href = data.url
      } catch (e) {
        toast.error("Error al redirigir al portal")
        setLoading(false)
      }
      return
    }

    setLoading(true)
    try {
      let items: string[] = []

      if (mode === 'subscription') {
        items.push(PRICES.BASE_BUNDLE)
        if (selectedAddOns.lunar) items.push(PRICES.ADD_ON_LUNAR)
        if (selectedAddOns.astro) items.push(PRICES.ADD_ON_ASTROGEMATRIA)
        if (selectedAddOns.elective) items.push(PRICES.ADD_ON_ELECTIVE)
      } else {
        // Draconic logic
        items.push(PRICES.ONE_TIME_DRACONIC)
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          mode
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Error al iniciar el pago')
      setLoading(false)
    }
  }






  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {/* Show Syncing State if not yet active */}
          {!isBaseActive ? (
            <>
              <div className="h-20 w-20 mx-auto mb-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Activando Suscripción...</h1>
              <p className="text-muted-foreground mb-8">
                Estamos sincronizando tu pago con el servidor. Esto puede tardar unos segundos.
                <br />
                <span className="text-xs opacity-70">No cierres esta página.</span>
              </p>
            </>
          ) : (
            <>
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">¡Pago Exitoso!</h1>
              <p className="text-muted-foreground mb-8">
                Tu suscripción se ha activado correctamente. Ya puedes acceder a las funcionalidades premium.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href={callbackUrl || '/calendario/personal'}>
                  Continuar
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Elige tu Plan Astrochat
        </h1>
        <p className="text-muted-foreground text-lg">
          Personaliza tu experiencia astrológica añadiendo los módulos que necesitas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Main Bundle Card */}
        <Card className="md:col-span-2 border-primary/20 shadow-lg">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-purple-100 text-purple-700 hover:bg-purple-100">Bundle Base (Requerido)</Badge>
            <CardTitle className="text-2xl flex justify-between items-center">
              <span>Suscripción Principal</span>
              <span className="text-xl font-bold">${PRICE_VALUES.BASE.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/mes</span></span>
            </CardTitle>
            <CardDescription>
              Incluye Carta Trópica y Calendario Personal. Es la base para todos los servicios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="bg-purple-100 p-2 rounded-full"><Calendar className="h-5 w-5 text-purple-600" /></div>
                <div>
                  <h4 className="font-semibold">Calendario Personal</h4>
                  <p className="text-xs text-muted-foreground">Tránsitos diarios y semanales personalizados.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-indigo-100 p-2 rounded-full"><Star className="h-5 w-5 text-indigo-600" /></div>
                <div>
                  <h4 className="font-semibold">Carta Trópica</h4>
                  <p className="text-xs text-muted-foreground">Visualización e interpreteación básica.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TargetIcon className="h-4 w-4" /> Agrega complementos (Add-ons)
              </h3>

              {isBaseActive && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-md mb-4 text-sm flex gap-2 items-start">
                  <Bot className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <strong>Suscripción Activa</strong>
                    <p>Puedes activar o desactivar los complementos directamente marcando las casillas. Los cambios se reflejarán en tu próxima facturación.</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">

                {/* Add-on: Lunar */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition ${entitlements.hasLunarCalendar ? 'bg-green-50 border-green-200' : 'bg-card hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="addon-lunar"
                      checked={selectedAddOns.lunar || entitlements.hasLunarCalendar}
                      onCheckedChange={(c) => {
                        if (isBaseActive) {
                          handleUpdateSubscription(PRICES.ADD_ON_LUNAR, !!c ? 'add' : 'remove')
                        } else {
                          setSelectedAddOns(prev => ({ ...prev, lunar: !!c }))
                        }
                      }}
                      disabled={loading}
                    />
                    <label htmlFor="addon-lunar" className="cursor-pointer space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        <Moon className={`h-4 w-4 ${entitlements.hasLunarCalendar ? 'text-green-600' : 'text-slate-500'}`} />
                        Fases Lunares
                        {entitlements.hasLunarCalendar && <Badge variant="secondary" className="bg-green-100 text-green-700 ml-2">Activo</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">Calendario lunar detallado y fases.</p>
                    </label>
                  </div>
                  <div className="font-semibold text-sm">{entitlements.hasLunarCalendar ? 'Activo' : `+$${PRICE_VALUES.LUNAR.toFixed(2)}/mes`}</div>
                </div>

                {/* Add-on: Astrogematria */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition ${entitlements.hasAstrogematria ? 'bg-green-50 border-green-200' : 'bg-card hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="addon-astro"
                      checked={selectedAddOns.astro || entitlements.hasAstrogematria}
                      onCheckedChange={(c) => {
                        if (isBaseActive) {
                          handleUpdateSubscription(PRICES.ADD_ON_ASTROGEMATRIA, !!c ? 'add' : 'remove')
                        } else {
                          setSelectedAddOns(prev => ({ ...prev, astro: !!c }))
                        }
                      }}
                      disabled={loading}
                    />
                    <label htmlFor="addon-astro" className="cursor-pointer space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        <Calculator className={`h-4 w-4 ${entitlements.hasAstrogematria ? 'text-green-600' : 'text-emerald-500'}`} />
                        Astrogematria
                        {entitlements.hasAstrogematria && <Badge variant="secondary" className="bg-green-100 text-green-700 ml-2">Activo</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">Interpretaciones numerológicas completas.</p>
                    </label>
                  </div>
                  <div className="font-semibold text-sm">{entitlements.hasAstrogematria ? 'Activo' : `+$${PRICE_VALUES.ASTRO.toFixed(2)}/mes`}</div>
                </div>

                {/* Add-on: Elective (Disabled / Coming Soon) */}
                <div className={`flex items-center justify-between p-4 border rounded-lg transition bg-gray-50/50 opacity-80`}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="addon-elective"
                      checked={false}
                      disabled={true} // Hard disabled
                    />
                    <label htmlFor="addon-elective" className="cursor-not-allowed space-y-1">
                      <div className="font-medium flex items-center gap-2 text-gray-500">
                        <Clock className="h-4 w-4 text-gray-400" />
                        Buenos Momentos
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 ml-2 text-xs">
                          Próximamente
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Encuentra el mejor momento para tus acciones.</p>
                    </label>
                  </div>
                  <div className="font-semibold text-sm text-gray-400">No disponible</div>
                </div>

              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 bg-muted/20 border-t p-6">
            {!isBaseActive && (
              <div className="flex justify-between items-center w-full">
                <span className="text-lg font-medium">Total Mensual</span>
                <span className="text-3xl font-bold text-primary">${monthlyTotal.toFixed(2)}</span>
              </div>
            )}

            <Button
              onClick={() => handleCheckout('subscription')}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg shadow-md"
              disabled={loading}
            >
              {loading ? 'Procesando...' : (isBaseActive ? 'Gestionar Facturación (Tarjetas)' : 'Suscribirse Ahora')}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {isBaseActive
                ? 'Gestiona tus métodos de pago y facturas en el Portal de Stripe.'
                : 'Gestionado por Stripe. Puedes cancelar o modificar tu plan en cualquier momento.'}
            </p>
          </CardFooter>
        </Card>

        {/* Draconic One-Time */}
        <Card className="border-amber-200 border-2 bg-gradient-to-b from-amber-50/50 to-transparent">
          <CardHeader>
            <Badge variant="outline" className="w-fit mb-2 border-amber-500 text-amber-700">Pago Único</Badge>
            <CardTitle className="text-xl">Carta Dracónica</CardTitle>
            <CardDescription>
              Descubre tu propósito del alma con la astrología dracónica.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900 mb-4">
              ${PRICE_VALUES.DRACONIC.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground ml-1">una vez</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Requiere tener activa la suscripción base. Acceso de por vida mientras mantengas la suscripción activa.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleCheckout('payment')}
              className="w-full"
              variant={isBaseActive ? "outline" : "ghost"}
              disabled={loading || entitlements.hasDraconicAccess || !isBaseActive}
            >
              {loading
                ? '...'
                : entitlements.hasDraconicAccess
                  ? 'Ya adquirido'
                  : isBaseActive
                    ? 'Comprar Carta Dracónica'
                    : 'Requiere Suscripción Base'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>¿Necesitas ayuda? Contacta a soporte.</p>
      </div>
    </div>
  )
}

function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Cargando...</div>}>
      <UpgradePageContent />
    </Suspense>
  )
}
