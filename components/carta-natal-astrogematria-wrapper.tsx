"use client";

/**
 * Componente wrapper para la carta natal con astrogematría que utiliza carga dinámica.
 * 
 * Este componente envuelve el componente CartaNatalAstrogematria y lo carga dinámicamente
 * con { ssr: false } para evitar problemas de renderizado en el servidor.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar el componente dinámicamente con { ssr: false }
const CartaNatalAstrogematria = dynamic(() => import('@/components/carta-natal-astrogematria').then(mod => mod.CartaNatalAstrogematria), { 
  ssr: false 
});

/**
 * Interfaz para los datos de la carta natal con astrogematría.
 */
interface CartaNatalAstrogematriaWrapperProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  astrogematriaData: {
    palabra_original: string;
    grados: number;
    signo: string;
    posicion_completa: string;
  };
}

/**
 * Componente CartaNatalAstrogematriaWrapper que carga dinámicamente el componente CartaNatalAstrogematria.
 */
export function CartaNatalAstrogematriaWrapper({ chartData, astrogematriaData }: CartaNatalAstrogematriaWrapperProps) {
  return (
    <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Cargando carta natal con astrogematría...</div>}>
      <CartaNatalAstrogematria chartData={chartData} astrogematriaData={astrogematriaData} />
    </Suspense>
  );
}
