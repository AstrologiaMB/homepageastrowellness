'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Format a URL segment for display in breadcrumbs
 * - Decodes URI components (e.g., "carta%20natal" → "carta natal")
 * - Replaces hyphens with spaces (e.g., "completar-datos" → "completar datos")
 * - Capitalizes each word (title case)
 */
function formatSegment(segment: string): string {
  const decoded = decodeURIComponent(segment);
  // Replace hyphens with spaces for multi-word page names
  const withSpaces = decoded.replace(/-/g, ' ');
  // Capitalize each word
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text for mobile displays with ellipsis
 */
function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function DynamicBreadcrumb() {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);

  // Don't show breadcrumbs on the home page
  if (segments.length === 0) {
    return null;
  }

  // Only show the last segment (current page) after Inicio
  // This creates "Inicio - Login" instead of "Inicio - Auth - Login"
  const lastSegment = segments[segments.length - 1];
  const formattedSegment = formatSegment(lastSegment);

  return (
    <nav className="flex items-center" aria-label="Navegación celestial">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="flex items-center gap-1.5">
              <Link href="/" aria-label="Inicio">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <div className="flex items-center">
            <BreadcrumbSeparator />
            <div className="ml-2">
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="block sm:hidden" aria-hidden="true">
                    {truncateText(formattedSegment, 15)}
                  </span>
                  <span className="hidden sm:block">SEGMENTOOOO {formattedSegment}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </div>
          </div>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
