"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Star } from "lucide-react";
// import { TermsCheckbox } from "@/components/auth/terms-checkbox"; // Unused in new design
import { HeroSection } from "@/components/landing/hero-section";
import { BentoFeatures } from "@/components/landing/bento-features";
import { ComparisonTable } from "@/components/landing/comparison-table";

export default function Page() {
  const { data: session, status } = useSession();
  // const [termsAccepted, setTermsAccepted] = useState(false); // Unused
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

  // LOGGED OUT STATE: Landing (High Impact)
  return (
      <main className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#D4AF37] selection:text-[#0B0F19]">
        <HeroSection />
        <BentoFeatures />
        <ComparisonTable />

        {/* Simple Footer Placeholder */}
        <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
          <p>© 2026 AstroChat. Precisión Suiza para el Alma.</p>
        </footer>
      </main>
  );
}