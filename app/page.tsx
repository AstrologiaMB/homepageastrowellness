"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Star } from "lucide-react";

export default function Page() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="text-muted-foreground animate-pulse">Sincronizando...</div>
      </div>
    );
  }

  // LOGGED IN STATE: Dashboard
  if (session) {
    return (
      <div className="min-h-screen p-6 md:p-12 space-y-8 bg-gradient-to-br from-background via-background to-accent/5">

        {/* Header de Bienvenida */}
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Hola, {session.user?.name || "Viajero Astral"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Bienvenido a Astrowellness. Tu guía astrológica para el 2026 está lista.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">

          {/* HERO CARD: Calendario General (Free) */}
          <Card className="col-span-1 md:col-span-2 border-primary/20 shadow-lg bg-card/60 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Acceso Gratuito</span>
              </div>
              <CardTitle className="text-2xl">Calendario General 2026</CardTitle>
              <CardDescription className="text-base text-muted-foreground mt-2">
                Explora los tránsitos planetarios que definirán este año. Además, la posibilidad de solicitar tu Carta Horaria o Rectificación de Carta (estos servicios son pagos).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
                <Link href="/calendario/general">
                  Ver Calendario 2026
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* SECONDARY CARD: Carta Natal (Upsell/Teaser) */}
          <Card className="col-span-1 md:col-span-2 border-muted bg-muted/20 opacity-90 hover:opacity-100 transition-opacity">
            <CardHeader>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Star className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Servicios Premium</span>
              </div>
              <CardTitle className="text-xl">Tu Universo Completo</CardTitle>
              <CardDescription className="space-y-2 pt-2">
                <p>
                  Accede a herramientas profesionales diseñadas para tu evolución:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm list-disc pl-4 pt-1">
                  <li><strong>Carta Natal & Dracónica:</strong> Tu propósito vital y viaje del alma (Visión M. Blaquier).</li>
                  <li><strong>Calendario Personal:</strong> Tránsitos diarios y semanales exclusivos.</li>
                  <li><strong>Journal Lunar:</strong> Sincroniza proyectos con las fases lunares.</li>
                  <li><strong>Astrogematría:</strong> Descubre el valor vibracional de tus palabras.</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full hover:bg-primary/5 hover:text-primary transition-colors border-primary/20">
                <Link href="/upgrade">
                  Ver Planes Disponibles
                </Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    );
  }

  // LOGGED OUT STATE: Landing (Simple)
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/5">
      <Card className="mx-auto max-w-lg text-center shadow-xl border border-accent/30 bg-card/98 backdrop-blur-sm">
        <CardContent className="p-14">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground drop-shadow-sm">
                Astrowellness
              </h1>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Tu app personal de astrología profesional.
            </p>
            <div className="grid gap-3 pt-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Continuar con Google
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/auth/register">Crear Cuenta</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
