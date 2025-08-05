"use client";

/**
 * Componente wrapper para la carta superpuesta que utiliza carga dinámica.
 * 
 * Este componente envuelve el componente CartaSuperpuesta y lo carga dinámicamente
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
const CartaSuperpuesta = dynamic(() => import('@/components/carta-superpuesta').then(mod => mod.CartaSuperpuesta), { 
  ssr: false 
});

/**
 * Interfaz para los datos de la carta superpuesta.
 * 
 * @property {Object} tropicalData - Datos de la carta tropical (interior).
 * @property {Object} draconicaData - Datos de la carta dracónica (exterior).
 * @property {string} chartId - ID único para el contenedor del gráfico (opcional).
 */
interface CartaSuperpuestaWrapperProps {
  tropicalData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  draconicaData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  chartId?: string;
}

/**
 * Componente CartaSuperpuestaWrapper que carga dinámicamente el componente CartaSuperpuesta.
 * 
 * @param {CartaSuperpuestaWrapperProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene el componente CartaSuperpuesta.
 */
export function CartaSuperpuestaWrapper({ tropicalData, draconicaData, chartId }: CartaSuperpuestaWrapperProps) {
  return (
    <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Cargando carta superpuesta...</div>}>
      <CartaSuperpuesta 
        tropicalData={tropicalData} 
        draconicaData={draconicaData} 
        chartId={chartId}
      />
    </Suspense>
  );
}
