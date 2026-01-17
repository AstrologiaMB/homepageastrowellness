"use client";

import { ProtectedPage } from "@/components/protected-page";
import { AstroCard } from "@/components/astro/astro-card";
import { Star, Compass, HelpCircle, Sparkles } from "lucide-react";

const charts = [
  {
    title: "Trópica",
    description: "Tu carta natal clásica, el mapa del cielo en tu momento de nacimiento",
    icon: Compass,
    href: "/cartas/tropica",
    variant: "featured" as const,
    badge: "Popular",
  },
  {
    title: "Dracónica",
    description: "Tu carta del alma, revelando el propósito de tu vida espiritual",
    icon: Star,
    href: "/cartas/draconica",
    variant: "default" as const,
  },
  {
    title: "Horaria",
    description: "Responde una pregunta específica basándose en el momento presente",
    icon: HelpCircle,
    href: "/cartas/horaria",
    variant: "default" as const,
  },
];

/**
 * Cartas Hub - Main hub page for astrological chart options
 *
 * Design improvements:
 * - Theme-aware gradient background with purple accents
 * - Uses AstroCard component for consistent styling
 * - Glassmorphism effects on hero section
 * - Decorative celestial elements
 */
export default function ChartsHub() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-blue-50/30 dark:from-purple-950/30 dark:via-background dark:to-blue-950/20 p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-8 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

            {/* Header content */}
            <div className="relative glass-card-strong rounded-2xl p-8 md:p-12 text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-4">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
              </div>

              {/* Title with gradient */}
              <h1 className="text-3xl md:text-5xl font-light tracking-tight gradient-primary">
                Cartas Astrales
              </h1>

              {/* Description */}
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Explora los diferentes mapas del cielo y descubre los secretos que
                los astros tienen para ti
              </p>

              {/* Decorative stars */}
              <div className="flex justify-center gap-2 pt-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary/40 dark:bg-primary/60"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chart Options */}
          <div className="space-y-4">
            {charts.map((chart) => (
              <AstroCard
                key={chart.href}
                icon={chart.icon}
                title={chart.title}
                description={chart.description}
                href={chart.href}
                variant={chart.variant}
                badge={chart.badge}
              />
            ))}
          </div>

          {/* Bottom info card */}
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">¿Primera vez?</span>{" "}
              Comienza con tu Carta Natal Trópica para conocer los fundamentos de
              tu carta astral
            </p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
