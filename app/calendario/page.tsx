"use client";

import { ProtectedPage } from "@/components/protected-page";
import { AstroCard } from "@/components/astro/astro-card";
import { Calendar, Moon, Globe, Sparkles } from "lucide-react";

const calendars = [
  {
    title: "Personal",
    description: "Tu calendario astrológico personal basado en tu carta natal",
    icon: Calendar,
    href: "/calendario/personal",
    variant: "featured" as const,
    badge: "Popular",
  },
  {
    title: "Lunar",
    description: "Tus ciclos lunares para el año con fases y tránsitos",
    icon: Moon,
    href: "/calendario/lunar",
    variant: "default" as const,
  },
  {
    title: "General",
    description: "Calendario astrológico general con aspectos planetarios",
    icon: Globe,
    href: "/calendario/general",
    variant: "default" as const,
  },
];

/**
 * Calendario Hub - Main hub page for calendar options
 *
 * Design improvements:
 * - Theme-aware gradient background with purple accents
 * - Uses AstroCard component for consistent styling
 * - Glassmorphism effects on hero section
 * - Decorative celestial elements
 */
export default function CalendarHub() {
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
                Calendarios
              </h1>

              {/* Description */}
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Explora los diferentes calendarios astrológicos y descubre las
                influencias celestiales en tu vida
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

          {/* Calendar Options */}
          <div className="space-y-4">
            {calendars.map((calendar) => (
              <AstroCard
                key={calendar.href}
                icon={calendar.icon}
                title={calendar.title}
                description={calendar.description}
                href={calendar.href}
                variant={calendar.variant}
                badge={calendar.badge}
              />
            ))}
          </div>

          {/* Bottom info card */}
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">¿Necesitas ayuda?</span>{" "}
              Selecciona un calendario para comenzar tu exploración astrológica
            </p>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
