'use client';

import { useCallback, useRef } from 'react';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

interface HapticPatterns {
  light: number[];
  medium: number[];
  heavy: number[];
  success: number[];
  warning: number[];
  error: number[];
  selection: number[];
}

/**
 * Hook for providing haptic feedback on supported mobile devices.
 *
 * `★ Insight ─────────────────────────────────────`
 * The Vibration API patterns use alternating [on, off] durations:
 * - Light/medium/heavy: Single short taps for tactile confirmation
 * - Success: Triple tap pattern for positive feedback
 * - Warning: Double tap for attention without alarm
 * - Error: Triple heavy tap pattern mimicking an alert
 * - Selection: Very light tap for UI interactions
 * `─────────────────────────────────────────────────`
 */
const HAPTIC_PATTERNS: HapticPatterns = {
  light: [10],
  medium: [20],
  heavy: [30],
  success: [10, 50, 10],
  warning: [20, 30, 20],
  error: [30, 20, 30, 20, 30],
  selection: [5],
};

/**
 * Check if haptic feedback is supported in the current environment.
 */
function isHapticSupported(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // Check for Vibration API support
  const hasVibrate = 'vibrate' in navigator && typeof navigator.vibrate === 'function';

  // Additional check for iOS (which doesn't support the Vibration API)
  // We use TouchEvent.deviceCapabilities as a hint
  const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);

  return hasVibrate && !isIOS;
}

/**
 * Rate limiter to prevent haptic spam
 * Some devices throttle vibration if called too frequently
 */
const HAPTIC_COOLDOWN = 50; // ms between haptics

export function useHaptic() {
  const lastHapticTime = useRef(0);

  const trigger = useCallback((type: HapticType = 'light') => {
    if (!isHapticSupported()) {
      return false;
    }

    const now = Date.now();
    const timeSinceLastHaptic = now - lastHapticTime.current;

    // Rate limit haptic feedback
    if (timeSinceLastHaptic < HAPTIC_COOLDOWN) {
      return false;
    }

    const pattern = HAPTIC_PATTERNS[type] || HAPTIC_PATTERNS.light;
    const success = navigator.vibrate(pattern);

    if (success) {
      lastHapticTime.current = now;
    }

    return success;
  }, []);

  /**
   * Light tap for subtle feedback (button presses, small interactions)
   */
  const light = useCallback(() => trigger('light'), [trigger]);

  /**
   * Medium tap for standard feedback (toggles, selections)
   */
  const medium = useCallback(() => trigger('medium'), [trigger]);

  /**
   * Heavy tap for important feedback (confirmations, warnings)
   */
  const heavy = useCallback(() => trigger('heavy'), [trigger]);

  /**
   * Success pattern for positive outcomes
   */
  const success = useCallback(() => trigger('success'), [trigger]);

  /**
   * Warning pattern for attention without alarm
   */
  const warning = useCallback(() => trigger('warning'), [trigger]);

  /**
   * Error pattern for negative outcomes or errors
   */
  const error = useCallback(() => trigger('error'), [trigger]);

  /**
   * Selection pattern for UI selection changes
   */
  const selection = useCallback(() => trigger('selection'), [trigger]);

  return {
    trigger,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    isSupported: isHapticSupported(),
  };
}
