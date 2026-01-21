'use client';

import { cn } from '@/lib/utils';

interface EdgeSwipeIndicatorProps {
  progress: number; // 0 to 1
  isActive?: boolean; // Whether threshold has been met
  className?: string;
}

/**
 * Visual indicator that appears when the user starts swiping from the left edge
 * to open the mobile sidebar.
 *
 * `★ Insight ─────────────────────────────────────`
 * The indicator provides real-time visual feedback:
 * - Width grows from 4px to 8px based on progress
 * - Opacity fades in as the gesture progresses
 * - Subtle purple glow effect for the cosmic theme
 * - Hidden on desktop to prevent visual clutter
 * `─────────────────────────────────────────────────`
 */
export function EdgeSwipeIndicator({
  progress,
  isActive = false,
  className,
}: EdgeSwipeIndicatorProps) {
  // Don't render if no progress (not currently swiping)
  if (progress <= 0) {
    return null;
  }

  return (
    <>
      {/* Main indicator bar */}
      <div
        className={cn(
          'fixed left-0 top-0 bottom-0 pointer-events-none z-50',
          'md:hidden', // Mobile only
          'bg-gradient-to-t from-purple-500 via-violet-500 to-purple-500',
          'transition-all duration-75 ease-out',
          isActive && 'bg-gradient-to-t from-purple-400 via-violet-400 to-purple-400',
          className
        )}
        style={{
          width: `${Math.max(4, Math.min(12, progress * 12))}px`,
          opacity: Math.min(1, progress * 2.5),
        }}
        aria-hidden="true"
      >
        {/* Glow effect that intensifies with progress */}
        <div
          className={cn(
            'absolute inset-0 blur-sm',
            isActive ? 'bg-purple-400' : 'bg-purple-500'
          )}
          style={{
            opacity: Math.min(0.6, progress * 1.5),
            transform: `translateX(${progress * 8}px)`,
          }}
        />
      </div>

      {/* Optional: Show subtle hint icon when active */}
      {isActive && (
        <div
          className={cn(
            'fixed left-4 top-1/2 -translate-y-1/2 pointer-events-none z-50',
            'md:hidden',
            'text-purple-500/80 transition-opacity duration-200'
          )}
          style={{ opacity: progress }}
          aria-hidden="true"
        >
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
            className="animate-pulse"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}
    </>
  );
}
