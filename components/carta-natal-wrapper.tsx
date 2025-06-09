"use client";

/**
 * Componente wrapper para la carta natal que utiliza carga dinámica.
 * 
 * Este componente envuelve el componente CartaNatal y lo carga dinámicamente
 * con { ssr: false } para evitar problemas de renderizado en el servidor,
 * ya que la biblioteca @astrodraw/astrochart manipula el DOM directamente.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar el componente dinámicamente con { ssr: false }
// Esto evita que Next.js intente renderizar el componente en el servidor
const CartaNatal = dynamic(() => import('@/components/carta-natal').then(mod => mod.CartaNatal), { 
  ssr: false 
});

/**
 * Interfaz para los datos de la carta natal.
 * 
 * @property {Record<string, number[]>} planets - Objeto con las posiciones planetarias en grados (0-359).
 * @property {number[]} cusps - Array de 12 valores numéricos representando las cúspides de las casas.
 */
interface CartaNatalWrapperProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
}

/**
 * Componente CartaNatalWrapper que carga dinámicamente el componente CartaNatal.
 * 
 * @param {CartaNatalWrapperProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene el componente CartaNatal.
 */
export function CartaNatalWrapper({ chartData }: CartaNatalWrapperProps) {
  return (
    <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Cargando carta natal...</div>}>
      <CartaNatal chartData={chartData} />
    </Suspense>
  );
}
