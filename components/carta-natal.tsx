"use client";

import { useEffect, useRef } from 'react';
import { Chart } from '@astrodraw/astrochart';

interface CartaNatalProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
}

export function CartaNatal({ chartData }: CartaNatalProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && chartData) {
      // Limpiar cualquier gráfico anterior
      chartRef.current.innerHTML = '';
      
      // Crear nuevo gráfico
      const chart = new Chart('chart-container', 800, 800);
      chart.radix(chartData);
    }
  }, [chartData]);
  
  return (
    <div className="flex flex-col items-center">
      <div id="chart-container" ref={chartRef} className="w-full max-w-3xl h-auto" />
    </div>
  );
}
