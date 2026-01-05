"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Sparkles, MoveRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  const { data: session, status } = useSession();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isLoading = status === "loading";

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/60">Sincronizando...</p>
      </div>
    );
  }

  // LOGGED IN STATE: Dashboard
  if (session) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-black">
              Hola, {session.user?.name?.split(' ')[0] || "Viajero Astral"}
            </h1>
            <p className="text-black/60 max-w-md mx-auto leading-relaxed">
              Bienvenido a Astrowellness
            </p>
          </div>

          {/* Main Actions */}
          <div className="space-y-4">
            {/* Calendario General - Free */}
            <Link
              href="/calendario/general"
              className="group block border border-black/10 hover:border-black/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8 md:p-10 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-black/70 group-hover:text-black transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wider text-black/40 mb-2">
                      Acceso Gratuito
                    </div>
                    <h2 className="text-xl md:text-2xl font-light text-black tracking-tight">
                      Calendario General 2026
                    </h2>
                    <p className="text-sm text-black/50">
                      Explora los tránsitos planetarios del año
                    </p>
                  </div>
                </div>
                <MoveRight className="w-5 h-5 text-black/30 group-hover:text-black/60 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </div>
            </Link>

            {/* Premium Services */}
            <div className="border border-black/10 p-8 md:p-10">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider text-black/40 mb-2">
                    Servicios Premium
                  </div>
                  <h2 className="text-xl md:text-2xl font-light text-black tracking-tight">
                    Tu Universo Completo
                  </h2>
                </div>

                <div className="space-y-3 text-sm text-black/60">
                  <p>Accede a herramientas profesionales diseñadas para tu evolución:</p>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-black/30 mt-0.5">—</span>
                      <span>Carta Natal & Dracónica: Tu propósito vital y viaje del alma</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black/30 mt-0.5">—</span>
                      <span>Calendario Personal: Tránsitos diarios y semanales exclusivos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black/30 mt-0.5">—</span>
                      <span>Journal Lunar: Sincroniza proyectos con las fases lunares</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black/30 mt-0.5">—</span>
                      <span>Astrogematría: Descubre el valor vibracional de tus palabras</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/upgrade"
                  className="inline-block border border-black/20 px-6 py-3 text-sm text-black hover:bg-black hover:text-white transition-colors"
                >
                  Ver Planes Disponibles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED OUT STATE: Landing
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background stars */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-white/80" strokeWidth={1.5} />
          <h1 className="text-2xl font-light tracking-wide text-white">
            Astrowellness
          </h1>
          <p className="text-sm text-white/60">
            Tu app personal de astrología profesional
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms-home"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-0.5 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <label htmlFor="terms-home" className="text-sm text-white/60 leading-relaxed">
              Acepto los{' '}
              <Link href="/legal" className="text-white underline decoration-white/20 underline-offset-4 hover:text-white/80 transition-colors">
                Términos y Condiciones
              </Link>
              {' '}y la{' '}
              <Link href="/legal" className="text-white underline decoration-white/20 underline-offset-4 hover:text-white/80 transition-colors">
                Política de Privacidad
              </Link>
            </label>
          </div>

          {/* Google Login */}
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            disabled={!termsAccepted}
            className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all h-12 rounded-sm font-light tracking-wide disabled:opacity-50"
          >
            Continuar con Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-4 text-white/40 tracking-wider">
                O
              </span>
            </div>
          </div>

          {/* Email Login */}
          <Button
            asChild
            className="w-full bg-white text-black hover:bg-white/90 transition-all h-12 rounded-sm font-light tracking-wide"
          >
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full text-white hover:bg-white/5 h-12 rounded-sm font-light tracking-wide"
          >
            <Link href="/auth/register">Crear Cuenta</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
