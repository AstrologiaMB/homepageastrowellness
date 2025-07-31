"use client";

/**
 * Componente wrapper para la carta natal con remedios que utiliza carga dinámica.
 * 
 * Este componente envuelve el componente CartaNatalRemedios y lo carga dinámicamente
 * con { ssr: false } para evitar problemas de renderizado en el servidor.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar el componente dinámicamente con { ssr: false }
const CartaNatalRemedios = dynamic(() => import('@/components/carta-natal-remedios').then(mod => mod.CartaNatalRemedios), { 
  ssr: false 
});

/**
 * Interfaz para los datos de la carta natal con remedios.
 */
interface CartaNatalRemediosWrapperProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  remedioData: {
    remedio: string;
    grado: number;
    signo: string;
    posicion_completa: string;
  };
}

/**
 * Componente CartaNatalRemediosWrapper que carga dinámicamente el componente CartaNatalRemedios.
 */
export function CartaNatalRemediosWrapper({ chartData, remedioData }: CartaNatalRemediosWrapperProps) {
  return (
    <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Cargando carta natal con remedios...</div>}>
      <CartaNatalRemedios chartData={chartData} remedioData={remedioData} />
    </Suspense>
  );
}
