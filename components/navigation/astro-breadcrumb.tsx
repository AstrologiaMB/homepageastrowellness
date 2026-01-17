"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface AstroBreadcrumbItem {
  label: string;
  href?: string;
}

interface AstroBreadcrumbProps {
  items: AstroBreadcrumbItem[];
  className?: string;
  homeHref?: string;
}

/**
 * AstroBreadcrumb - Breadcrumb navigation with purple accents
 *
 * Design decisions:
 * - Purple separator icons (ChevronRight)
 * - Hover effects on links
 * - Current page highlighted without link
 * - Optional home link
 */
export function AstroBreadcrumb({
  items,
  className,
  homeHref = "/",
}: AstroBreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)} aria-label="Breadcrumb">
      {/* Home link */}
      <Link
        href={homeHref}
        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Inicio</span>
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-primary/60 flex-shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors truncate max-w-[150px] md:max-w-[200px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate max-w-[150px] md:max-w-[200px]">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </nav>
  );
}
