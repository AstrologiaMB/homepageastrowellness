"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AstroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  variant?: "default" | "featured";
  badge?: string;
}

/**
 * AstroCard - A reusable card component with purple accents
 *
 * Design decisions:
 * - Uses glass-card utility for glassmorphism effect
 * - Purple left border as accent (border-l-4 border-l-primary)
 * - Icon container with purple background (bg-primary/10 dark:bg-primary/20)
 * - Enhanced hover with shadow and lift effect
 * - Featured variant has additional glow effect
 */
export function AstroCard({
  icon: Icon,
  title,
  description,
  href,
  variant = "default",
  badge,
}: AstroCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link
      href={href}
      className={cn(
        "group relative block glass-card transition-all duration-300 ease-in-out",
        "hover:-translate-y-2 hover:shadow-elegant-lg dark:hover:shadow-primary/20",
        "border-l-4 border-l-primary",
        isFeatured &&
          "shadow-[0_0_30px_-10px_rgba(121,104,231,0.3)] dark:shadow-[0_0_40px_-10px_rgba(121,104,231,0.5)]",
        "overflow-hidden"
      )}
    >
      {badge && (
        <span className="absolute -top-1 -right-1 xs:top-2 xs:right-2 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary to-purple-600 text-white shadow-elegant">
            {badge}
          </span>
        </span>
      )}

      <div className="p-6 md:p-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
          {/* Icon container with purple background */}
          <div
            className={cn(
              "flex-shrink-0 p-3 md:p-4 rounded-xl transition-all duration-300",
              "bg-primary/10 dark:bg-primary/20",
              "group-hover:bg-primary/20 dark:group-hover:bg-primary/30"
            )}
          >
            <Icon
              className="w-6 h-6 md:w-8 md:h-8 text-primary transition-colors"
              strokeWidth={1.5}
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Arrow indicator */}
        <span
          className={cn(
            "flex-shrink-0 text-muted-foreground/50",
            "group-hover:text-primary group-hover:translate-x-1",
            "transition-all duration-300"
          )}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "pointer-events-none"
        )}
      />
    </Link>
  );
}
