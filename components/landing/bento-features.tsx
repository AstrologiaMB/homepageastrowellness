'use client';

import { Calendar, Map, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function BentoFeatures() {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1e1b4b]/20 via-transparent to-transparent" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">
            Más allá del Horóscopo.
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Tecnología diseñada para decodificar los patrones ocultos de tu existencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {/* Feature 1: Calendario */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition-colors backdrop-blur-sm h-full flex flex-col">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-500/10 mb-4">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Tu Agenda Personalizada
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed flex-grow">
              Olvídate de lecturas generales. Recibe notificaciones exactas cuando Mercurio toca tu
              Ascendente o la Luna activa tu Casa 10.
            </p>
            {/* Mockup */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/5 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 mt-auto">
              <Image
                src="/assets/landing/calendario-personal.png"
                alt="Calendario Astrológico Personalizado"
                fill
                unoptimized={true}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Feature 2: Cartas (Dracónica) */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/5 to-transparent p-5 sm:p-6 hover:border-[#D4AF37]/40 transition-colors backdrop-blur-sm h-full flex flex-col">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#D4AF37]/10 mb-4">
              <Map className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Profundidad del Alma
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed flex-grow">
              La Carta Dracónica revela tu propósito espiritual y memorias de vidas pasadas. Un
              análisis que cruza el velo de la personalidad.
            </p>
            {/* Mockup */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:scale-[1.02] transition-transform duration-500 mt-auto">
              <Image
                src="/assets/landing/carta-draconica.png"
                alt="Carta Dracónica y Natal"
                fill
                unoptimized={true}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Feature 3: Gematria */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition-colors backdrop-blur-sm h-full flex flex-col">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">AstroGematría</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed flex-grow">
              Descubre la vibración matemática de tus nombres, marcas y ciudades. Ve exactamente
              dónde impactan en tu rueda natal.
            </p>
            {/* Mockup */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/5 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 mt-auto">
              <Image
                src="/assets/landing/astrogematria.png"
                alt="Cálculos de AstroGematría"
                fill
                unoptimized={true}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Feature 4: Calendario Lunar (New) */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition-colors backdrop-blur-sm h-full flex flex-col">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-indigo-500/10 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-indigo-400"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Sincronía Lunar</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed flex-grow">
              Planifica tus acciones con las Fases de la Luna. Descubre los ciclos de siembra y
              cosecha que rigen tu energía vital.
            </p>
            {/* Mockup */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/5 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 mt-auto">
              <Image
                src="/assets/landing/fases-lunares.png"
                alt="Calendario de Fases Lunares"
                fill
                unoptimized={true}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
