"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AstroBackButtonProps {
  label?: string;
  href?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
}

/**
 * AstroBackButton - Animated back button with purple hover effects
 *
 * Design decisions:
 * - Smooth hover animation with color transition
 * - Uses router.back() by default
 * - Optional href for explicit navigation
 * - Multiple visual variants
 */
export function AstroBackButton({
  label = "Volver",
  href,
  className,
  variant = "ghost",
}: AstroBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={cn(
        "gap-2 group transition-all duration-300",
        "hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      <span>{label}</span>
    </Button>
  );
}

/**
 * Inline back button for compact spaces
 */
export function AstroBackButtonInline({
  label = "Volver",
  href,
  className,
}: Omit<AstroBackButtonProps, "variant">) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        "hover:text-primary transition-colors duration-300",
        "group",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
}
