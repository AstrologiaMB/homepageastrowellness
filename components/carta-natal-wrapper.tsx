"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar el componente dinámicamente
const CartaNatal = dynamic(() => import('@/components/carta-natal').then(mod => mod.CartaNatal), { 
  ssr: false 
});

interface CartaNatalWrapperProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
}

export function CartaNatalWrapper({ chartData }: CartaNatalWrapperProps) {
  return (
    <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Cargando carta natal...</div>}>
      <CartaNatal chartData={chartData} />
    </Suspense>
  );
}
