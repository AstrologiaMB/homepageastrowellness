"use client";

/**
 * Componente para renderizar una carta superpuesta (tropical + dracónica) utilizando la biblioteca @astrodraw/astrochart.
 * 
 * Este componente utiliza el patrón Transit de AstroChart para mostrar dos cartas superpuestas:
 * - Carta interior: Tropical (radix)
 * - Carta exterior: Dracónica (transit)
 * - Aspectos entre ambas cartas
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useEffect, useRef } from 'react';
import { Chart } from '@astrodraw/astrochart';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Interfaz para los datos de la carta superpuesta.
 * 
 * @property {Object} tropicalData - Datos de la carta tropical (interior).
 * @property {Object} draconicaData - Datos de la carta dracónica (exterior).
 * @property {string} chartId - ID único para el contenedor del gráfico (opcional, por defecto 'carta-superpuesta').
 */
interface CartaSuperpuestaProps {
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
 * Componente CartaSuperpuesta que renderiza una carta superpuesta usando el patrón Transit.
 * 
 * @param {CartaSuperpuestaProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene la carta superpuesta.
 */
export function CartaSuperpuesta({ tropicalData, draconicaData, chartId = 'carta-superpuesta' }: CartaSuperpuestaProps) {
  // Referencia al contenedor del gráfico
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && tropicalData && draconicaData && 
        tropicalData.planets && tropicalData.cusps &&
        draconicaData.planets && draconicaData.cusps) {
      
      // Limpiar cualquier gráfico anterior
      chartRef.current.innerHTML = '';
      
      try {
        // Crear nuevo gráfico con dimensiones 800x800
        const chart = new Chart(chartId, 800, 800);
        
        // Patrón Transit: carta tropical interior + dracónica exterior
        const radix = chart.radix(tropicalData);      // Carta interior (tropical)
        const transit = radix.transit(draconicaData); // Carta exterior (dracónica)
        // Los aspectos se calculan automáticamente en el patrón transit
        
        // Carta superpuesta renderizada correctamente
      } catch (error) {
        console.error('Error renderizando carta superpuesta:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<p class="text-center text-red-500 p-4">Error al renderizar la carta superpuesta</p>';
        }
      }
    }
  }, [tropicalData, draconicaData, chartId]); // Re-renderizar cuando cambien los datos o el chartId
  
  // Validación defensiva: verificar que ambas cartas tienen la estructura esperada
  if (!tropicalData || !tropicalData.planets || !tropicalData.cusps ||
      !draconicaData || !draconicaData.planets || !draconicaData.cusps) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold">Superposición: Tropical + Dracónica</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-500 p-4">
              No hay datos suficientes para mostrar la carta superpuesta. 
              Se requieren tanto los datos tropicales como dracónicos.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-xl font-bold">Superposición: Tropical + Dracónica</h2>
        <p className="text-sm text-gray-600">
          Interior: Carta Tropical • Exterior: Carta Dracónica • Aspectos entre ambas
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div id={chartId} ref={chartRef} className="w-full max-w-3xl h-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
