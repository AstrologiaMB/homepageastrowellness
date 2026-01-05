"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0B0F19] text-white">
            {/* 
        VIDEO BACKGROUND PLACEHOLDER 
        TODO: Replace with <video> tag when asset is provided.
        Current: Deep Indigo gradient + subtle pulse to simulate movement.
      */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#1a1f3c]/50 to-[#0B0F19] z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2988&auto=format&fit=crop')] bg-cover bg-center opacity-20 animate-pulse-slow" />

            <div className="relative z-20 container px-4 md:px-6 flex flex-col items-center text-center space-y-8 mx-auto">

                {/* Badge / Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm font-medium text-[#D4AF37] backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="tracking-wide uppercase text-xs">Algoritmos Suizos de Precisión</span>
                </div>

                {/* H1 Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-serif max-w-4xl leading-tight">
                    Sincroniza tu vida con <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                        precisión de grado.
                    </span>
                </h1>

                {/* Subheader */}
                <p className="max-w-2xl text-lg md:text-xl text-gray-300 md:leading-relaxed font-light">
                    Herramientas astrológicas de nivel profesional: Calendarios personalizados,
                    Cartas Dracónicas y Análisis Vibracional para tu evolución consciente.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <Button
                        asChild
                        size="lg"
                        className="bg-[#D4AF37] hover:bg-[#b08d26] text-[#0B0F19] font-bold text-base px-8 h-12 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105"
                    >
                        <Link href="/auth/login">
                            Comenzar Gratis
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-4 flex items-center justify-center">
                        * Registro en 30 segundos
                    </p>
                </div>
            </div>
        </section>
    );
}
