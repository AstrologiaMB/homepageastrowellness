'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Calendar, Bot, CheckCircle, Moon, Calculator, Clock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { isFeatureEnabled } from '@/lib/features';
import { STRIPE_PRICES } from '@/lib/constants/stripe.constants';

const PRICE_VALUES = {
  BASE: 3.0,
  LUNAR: 1.5,
  ASTRO: 1.0,
  ELECTIVE: 4.5,
  DRACONIC: 25.0,
};

function UpgradePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const callbackUrl = searchParams.get('callbackUrl');

  // Properly destructure session and status
  const { data: session, status, update } = useSession();
  const user = session?.user as any;
  const entitlements = user?.entitlements || {};
  const isBaseActive = entitlements.hasBaseBundle && entitlements.status === 'active';

  // State for Add-ons (Base is always selected if subscribing)
  const [selectedAddOns, setSelectedAddOns] = useState({
    lunar: false,
    astro: false,
    elective: false,
  });

  // State hooks (MUST be before any conditional return)
  const [loading, setLoading] = useState(false);

  // 3. Side effects (Moved up to avoid conditional return violation)
  useEffect(() => {
    if (success) {
      update();
    }
  }, [success, update]);

  // 4. Polling for activation (Race Condition Fix)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (success && !isBaseActive) {
      interval = setInterval(() => {
        update(); // Poll session every 2s until webhook updates DB
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [success, isBaseActive, update]);

  // 1. Defensively handle loading state
  if (status === 'loading' && !success) {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando...</div>;
  }

  // 2. Safe access to entitlements (already defined above)

  // Calculate Monthly Total
  const monthlyTotal =
    PRICE_VALUES.BASE +
    (selectedAddOns.lunar ? PRICE_VALUES.LUNAR : 0) +
    (selectedAddOns.astro ? PRICE_VALUES.ASTRO : 0) +
    (selectedAddOns.elective ? PRICE_VALUES.ELECTIVE : 0);

  const handleUpdateSubscription = async (priceId: string, action: 'add' | 'remove') => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/subscription/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, action }),
      });

      if (!response.ok) throw new Error('Failed to update subscription');

      // Force session update to fetch new entitlements
      await update();

      toast.success(
        action === 'add'
          ? 'Complemento agregado correctamente'
          : 'Complemento eliminado correctamente'
      );
      router.refresh();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Error al actualizar la suscripción');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (mode: 'subscription' | 'payment') => {
    // If base is active and user clicks "Subscription", send to portal for general management
    if (mode === 'subscription' && isBaseActive) {
      try {
        setLoading(true);
        const response = await fetch('/api/stripe/portal', { method: 'POST' });
        const data = await response.json();
        window.location.href = data.url;
      } catch {
        toast.error('Error al redirigir al portal');
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      let items: string[] = [];

      if (mode === 'subscription') {
        items.push(STRIPE_PRICES.BASE_BUNDLE);
        if (selectedAddOns.lunar) items.push(STRIPE_PRICES.ADD_ON_LUNAR);
        if (selectedAddOns.astro) items.push(STRIPE_PRICES.ADD_ON_ASTROGEMATRIA);
        if (selectedAddOns.elective) items.push(STRIPE_PRICES.ADD_ON_ELECTIVE);
      } else {
        // Draconic logic
        items.push(STRIPE_PRICES.ONE_TIME_DRACONIC);
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error al iniciar el pago');
      setLoading(false);
    }
  };

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
                {user?.hasCompletedData
                  ? 'Tu suscripción se ha activado correctamente. Ya puedes acceder a las funcionalidades premium.'
                  : 'Tu suscripción se ha activado correctamente. Completa tu perfil para acceder a tus cartas astrológicas.'}
              </p>
              <Button asChild size="lg" className="w-full">
                <Link
                  href={
                    user?.hasCompletedData
                      ? callbackUrl || '/calendario/personal'
                      : `/completar-datos?postpago=true${callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`
                  }
                >
                  {user?.hasCompletedData ? 'Acceder' : 'Completar Perfil'}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-6 sm:py-8 lg:py-12 max-w-6xl">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-primary">
          Elige tu Plan Astrochat
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
          Personaliza tu experiencia astrológica añadiendo los módulos que necesitas. Elige los
          servicios que desees, recuerda que siempre como mínimo hay que comprar la suscripción
          mensual de USD 3 por mes.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 items-start">
        {/* Main Bundle Card */}
        <Card className="lg:col-span-2 border-primary/20 glass-card-strong">
          <CardHeader className="space-y-3 sm:space-y-4">
            <Badge className="w-fit bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs sm:text-sm">
              Bundle Base (Requerido)
            </Badge>
            <CardTitle className="text-xl sm:text-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span>Suscripción Principal</span>
              <span className="text-lg sm:text-xl font-bold">
                ${PRICE_VALUES.BASE.toFixed(2)}
                <span className="text-xs sm:text-sm font-normal text-muted-foreground">/mes</span>
              </span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Tu puerta de entrada al autoconocimiento. Incluye tu Carta Natal Trópica esencial y tu
              Calendario Personal diario.
            </CardDescription>
          </CardHeader>
          {!isFeatureEnabled('enablePersonalCalendar', user?.email) ? (
            <CardContent className="space-y-5 sm:space-y-6">
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Próximamente</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Estamos preparando la apertura oficial. ¡Mantente atento!
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <>
              <CardContent className="space-y-5 sm:space-y-6">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 transition-smooth">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full shrink-0">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">Calendario Personal</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Tu clima astrológico personal día a día.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 transition-smooth">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full shrink-0">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">Carta Trópica</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Mapa completo de tu psique y potenciales natales.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 sm:my-6" />

                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-4 flex items-center gap-2">
                    <TargetIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Agrega complementos (Add-ons)
                  </h3>

                  {isBaseActive && (
                    <div className="glass-card bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200 p-3 sm:p-4 rounded-lg mb-4 text-xs sm:text-sm flex gap-2 sm:gap-3 items-start">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <strong className="block mb-1">Suscripción Activa</strong>
                        <p>
                          Puedes activar o desactivar los complementos directamente marcando las
                          casillas. Los cambios se reflejarán en tu próxima facturación.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    {/* Add-on: Lunar */}
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg transition-smooth ${entitlements.hasLunarCalendar ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'glass-card hover:border-primary/30'}`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <Checkbox
                          id="addon-lunar"
                          checked={selectedAddOns.lunar || entitlements.hasLunarCalendar}
                          onCheckedChange={(c) => {
                            if (isBaseActive) {
                              handleUpdateSubscription(STRIPE_PRICES.ADD_ON_LUNAR, !!c ? 'add' : 'remove');
                            } else {
                              setSelectedAddOns((prev) => ({ ...prev, lunar: !!c }));
                            }
                          }}
                          disabled={loading}
                          className="mt-0.5 sm:mt-0 shrink-0"
                        />
                        <label htmlFor="addon-lunar" className="cursor-pointer space-y-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base flex flex-wrap items-center gap-2">
                            <Moon
                              className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 ${entitlements.hasLunarCalendar ? 'text-green-600' : 'text-slate-500'}`}
                            />
                            <span>Fases Lunares</span>
                            {entitlements.hasLunarCalendar && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs"
                              >
                                Activo
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Sincroniza tus intenciones con el ciclo de la Luna.
                          </p>
                        </label>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-right sm:text-left shrink-0">
                        {entitlements.hasLunarCalendar
                          ? 'Activo'
                          : `+$${PRICE_VALUES.LUNAR.toFixed(2)}/mes`}
                      </div>
                    </div>

                    {/* Add-on: Astrogematria */}
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg transition-smooth ${entitlements.hasAstrogematria ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'glass-card hover:border-primary/30'}`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <Checkbox
                          id="addon-astro"
                          checked={selectedAddOns.astro || entitlements.hasAstrogematria}
                          onCheckedChange={(c) => {
                            if (isBaseActive) {
                              handleUpdateSubscription(
                                STRIPE_PRICES.ADD_ON_ASTROGEMATRIA,
                                !!c ? 'add' : 'remove'
                              );
                            } else {
                              setSelectedAddOns((prev) => ({ ...prev, astro: !!c }));
                            }
                          }}
                          disabled={loading}
                          className="mt-0.5 sm:mt-0 shrink-0"
                        />
                        <label htmlFor="addon-astro" className="cursor-pointer space-y-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base flex flex-wrap items-center gap-2">
                            <Calculator
                              className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 ${entitlements.hasAstrogematria ? 'text-green-600' : 'text-emerald-500'}`}
                            />
                            <span>Astrogematria</span>
                            {entitlements.hasAstrogematria && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs"
                              >
                                Activo
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            La alquimia entre tus palabras y tu mapa astral.
                          </p>
                        </label>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-right sm:text-left shrink-0">
                        {entitlements.hasAstrogematria
                          ? 'Activo'
                          : `+$${PRICE_VALUES.ASTRO.toFixed(2)}/mes`}
                      </div>
                    </div>

                    {/* Add-on: Elective (Disabled / Coming Soon) */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg transition-smooth glass-card opacity-60 cursor-not-allowed">
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <Checkbox
                          id="addon-elective"
                          checked={false}
                          disabled={true}
                          className="mt-0.5 sm:mt-0 shrink-0"
                        />
                        <label
                          htmlFor="addon-elective"
                          className="cursor-not-allowed space-y-1 min-w-0"
                        >
                          <div className="font-medium text-sm sm:text-base flex flex-wrap items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                            <span>Buenos Momentos</span>
                            <Badge
                              variant="outline"
                              className="bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 text-xs"
                            >
                              Próximamente
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Encuentra el mejor momento para tus acciones.
                          </p>
                        </label>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-muted-foreground text-right sm:text-left shrink-0">
                        No disponible
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 sm:gap-4 glass-card bg-muted/10 border-t p-4 sm:p-6">
                {!isBaseActive && (
                  <div className="flex justify-between items-center w-full">
                    <span className="text-base sm:text-lg font-medium">Total Mensual</span>
                    <span className="text-2xl sm:text-3xl font-bold gradient-primary">
                      ${monthlyTotal.toFixed(2)}
                    </span>
                  </div>
                )}

                <Button
                  onClick={() => handleCheckout('subscription')}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-sm sm:text-base lg:text-lg shadow-md h-11 sm:h-12"
                  disabled={loading}
                >
                  {loading
                    ? 'Procesando...'
                    : isBaseActive
                      ? 'Gestionar Facturación (Tarjetas)'
                      : 'Suscribirse Ahora'}
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  {isBaseActive
                    ? 'Gestiona tus métodos de pago y facturas en el Portal de Stripe.'
                    : 'Gestionado por Stripe. Puedes cancelar o modificar tu plan en cualquier momento.'}
                </p>
              </CardFooter>
            </>
          )}
        </Card>

        {/* Draconic One-Time */}
        <Card className="border-amber-200 dark:border-amber-800 border-2 glass-card bg-gradient-to-b from-amber-50/50 dark:from-amber-950/20 to-transparent">
          <CardHeader className="space-y-3 sm:space-y-4">
            <Badge
              variant="outline"
              className="w-fit border-amber-500 dark:border-amber-600 text-amber-700 dark:text-amber-400 text-xs sm:text-sm"
            >
              Pago Único
            </Badge>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">Carta Dracónica</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Revela la misión de tu alma. Un análisis profundo de tu Carta Dracónica para entender
              tu viaje espiritual.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-200">
              ${PRICE_VALUES.DRACONIC.toFixed(2)}
              <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-1">
                una vez
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Requiere tener activa la suscripción base. Acceso de por vida mientras mantengas la
              suscripción activa.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleCheckout('payment')}
              className="w-full h-10 sm:h-11 text-sm sm:text-base"
              variant={isBaseActive ? 'outline' : 'ghost'}
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
      </div >

      <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground">
        <p>¿Necesitas ayuda? Contacta a soporte.</p>
      </div>
    </div >
  );
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
  );
}

export default function UpgradePage() {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-16 text-center">Cargando...</div>}
    >
      <UpgradePageContent />
    </Suspense>
  );
}
