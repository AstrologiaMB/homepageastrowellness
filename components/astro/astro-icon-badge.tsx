"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode, createElement } from "react";

interface AstroIconBadgeProps {
  icon?: LucideIcon | ReactNode;
  children?: ReactNode;
  variant?: "default" | "subtle" | "glow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * AstroIconBadge - Icon containers with purple backgrounds
 *
 * Design decisions:
 * - Adapts to light/dark mode automatically
 * - Multiple variants for different use cases
 * - Consistent sizing across the app
 */
export function AstroIconBadge({
  icon,
  children,
  variant = "default",
  size = "md",
  className,
}: AstroIconBadgeProps) {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantClasses = {
    default: "bg-primary/10 dark:bg-primary/20 text-primary",
    subtle: "bg-primary/5 dark:bg-primary/10 text-primary/70",
    glow:
      "bg-primary/10 dark:bg-primary/20 text-primary shadow-[0_0_20px_-5px_rgba(121,104,231,0.4)]",
  };

  // Determine what to render
  let content: ReactNode = children;
  if (icon) {
    if (typeof icon === "function") {
      // It's a LucideIcon component
      content = createElement(icon as LucideIcon, {
        className: iconSizeClasses[size],
        strokeWidth: 1.5,
      });
    } else {
      // It's already a ReactNode
      content = icon;
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {content}
    </div>
  );
}
