'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

import type { MapLocationPickerProps } from './map-location-picker';

/**
 * Dynamic wrapper for MapLocationPicker to reduce initial bundle size.
 * Google Maps SDK (~200-400KB) is only loaded when the component is actually used.
 */
export const MapLocationPicker = dynamic<MapLocationPickerProps>(
  () =>
    import('./map-location-picker').then((mod) => ({
      default: mod.MapLocationPicker,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

// Re-export the types for consumers
export type { LocationData, MapLocationPickerProps } from './map-location-picker';
