"use client";

/**
 * Componente para renderizar una carta natal astrológica utilizando la biblioteca @astrodraw/astrochart.
 * 
 * Este componente utiliza la API de Chart de AstroChart para renderizar una carta natal en SVG.
 * La carta muestra los planetas, sus posiciones, indicadores de retrogradación y las cúspides de las casas.
 * 
 * @author Astrowellness Team
 * @version 1.1.0
 */

import { useEffect, useRef } from 'react';
import { Chart } from '@astrodraw/astrochart';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Interfaz para los datos de la carta natal.
 * 
 * @property {Record<string, number[]>} planets - Objeto con las posiciones planetarias en grados (0-359).
 *                                               Si hay un segundo valor -0.1, indica retrogradación.
 * @property {number[]} cusps - Array de 12 valores numéricos representando las cúspides de las casas.
 */
interface CartaNatalProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
}

/**
 * Componente CartaNatal que renderiza una carta natal astrológica.
 * 
 * @param {CartaNatalProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene la carta natal.
 */
export function CartaNatal({ chartData }: CartaNatalProps) {
  // Referencia al contenedor del gráfico
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && chartData && chartData.planets && chartData.cusps) {
      // Limpiar cualquier gráfico anterior
      chartRef.current.innerHTML = '';
      
      try {
        // Crear nuevo gráfico con dimensiones 800x800
        const chart = new Chart('chart-container', 800, 800);
        
        // Renderizar la carta natal con los datos proporcionados
        chart.radix(chartData);
      } catch (error) {
        console.error('Error renderizando carta natal:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<p class="text-center text-red-500 p-4">Error al renderizar la carta natal</p>';
        }
      }
    }
  }, [chartData]); // Re-renderizar cuando cambien los datos
  
  // Validación defensiva: verificar que chartData tiene la estructura esperada
  if (!chartData || !chartData.planets || !chartData.cusps) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold">Gráfico</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-500 p-4">No hay datos de carta natal disponibles para mostrar el gráfico.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-xl font-bold">Gráfico</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div id="chart-container" ref={chartRef} className="w-full max-w-3xl h-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
