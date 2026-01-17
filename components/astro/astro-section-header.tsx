"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AstroSectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  gradientText?: boolean;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}

/**
 * AstroSectionHeader - Consistent section headers with purple accents
 *
 * Design decisions:
 * - Optional gradient text effect for titles
 * - Purple underline/accent bar
 * - Optional icon display
 * - Configurable alignment and size
 */
export function AstroSectionHeader({
  title,
  description,
  icon,
  gradientText = false,
  align = "left",
  size = "md",
}: AstroSectionHeaderProps) {
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  };

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("space-y-3 mb-8", alignClasses[align])}>
      {/* Icon + Title row */}
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
          align === "right" && "justify-end flex-row-reverse"
        )}
      >
        {icon && (
          <span className="text-primary flex-shrink-0">{icon}</span>
        )}
        <h2
          className={cn(
            "font-light tracking-tight",
            sizeClasses[size],
            gradientText
              ? "gradient-primary font-semibold"
              : "text-foreground"
          )}
        >
          {title}
        </h2>
      </div>

      {/* Purple accent bar */}
      <div
        className={cn(
          "h-0.5 bg-gradient-to-r from-primary via-purple-500 to-transparent rounded-full max-w-xs",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto bg-gradient-to-l from-primary via-purple-500 to-transparent"
        )}
      />

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-muted-foreground max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
