'use client';

import { useEffect, useState, useRef } from 'react';

interface EdgeSwipeOptions {
  edgeThreshold?: number; // px from edge (default: 20)
  swipeThreshold?: number; // px to trigger (default: 100)
  onSwipe?: () => void;
  onProgress?: (progress: number) => void; // 0-1 progress value
  disabled?: boolean;
}

interface EdgeSwipeState {
  isTracking: boolean;
  progress: number; // 0 to 1
  isActive: boolean; // Whether the threshold has been met
}

/**
 * Hook for detecting edge swipe gestures to open the mobile sidebar.
 *
 * `★ Insight ─────────────────────────────────────`
 * This hook uses a velocity-based detection system:
 * - Only tracks swipes starting within 20px of the left edge
 * - Requires 100px horizontal movement to trigger
 * - Ignores vertical movements (>50px) to prevent conflict with scroll
 * - Provides progress callbacks for visual feedback
 * `─────────────────────────────────────────────────`
 */
export function useEdgeSwipe({
  edgeThreshold = 20,
  swipeThreshold = 100,
  onSwipe,
  onProgress,
  disabled = false,
}: EdgeSwipeOptions = {}): EdgeSwipeState {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [hasMetThreshold, setHasMetThreshold] = useState(false);
  const isTrackingRef = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Skip if already tracking to prevent conflicts
      if (isTrackingRef.current) return;

      const touch = e.touches[0];
      const startX = touch.clientX;

      // Only start tracking if touch is near left edge
      if (startX <= edgeThreshold) {
        // Don't interfere with horizontal scroll or other gestures
        const target = e.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('role') === 'slider' ||
          target.getAttribute('role') === 'scrollbar'
        ) {
          return;
        }

        isTrackingRef.current = true;
        setTouchStart({ x: startX, y: touch.clientY });
        setTouchCurrent(startX);
        setHasMetThreshold(false);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart || !isTrackingRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = Math.abs(touch.clientY - touchStart.y);

      // Cancel if there's too much vertical movement (scrolling)
      if (deltaY > 50) {
        isTrackingRef.current = false;
        setTouchStart(null);
        setHasMetThreshold(false);
        onProgress?.(0);
        return;
      }

      setTouchCurrent(touch.clientX);

      // Calculate progress (0 to 1, capped at 1)
      const progress = Math.min(1, Math.max(0, deltaX / swipeThreshold));
      onProgress?.(progress);

      // Check if threshold has been met
      if (deltaX >= swipeThreshold && !hasMetThreshold) {
        setHasMetThreshold(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart || !isTrackingRef.current) {
        isTrackingRef.current = false;
        return;
      }

      const deltaX = touchCurrent - touchStart.x;
      const deltaY = Math.abs(e.changedTouches[0].clientY - touchStart.y);

      // Trigger swipe if horizontal movement exceeds threshold
      // and vertical movement is minimal
      if (deltaX >= swipeThreshold && deltaY < 50) {
        onSwipe?.();
      }

      // Reset tracking state
      isTrackingRef.current = false;
      setTouchStart(null);
      setTouchCurrent(0);
      setHasMetThreshold(false);
      onProgress?.(0);
    };

    const handleTouchCancel = () => {
      isTrackingRef.current = false;
      setTouchStart(null);
      setTouchCurrent(0);
      setHasMetThreshold(false);
      onProgress?.(0);
    };

    // Use passive: true for better scroll performance
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [touchStart, touchCurrent, edgeThreshold, swipeThreshold, onSwipe, onProgress, disabled, hasMetThreshold]);

  return {
    isTracking: touchStart !== null,
    progress: touchStart ? Math.min(1, Math.max(0, (touchCurrent - touchStart.x) / swipeThreshold)) : 0,
    isActive: hasMetThreshold,
  };
}
