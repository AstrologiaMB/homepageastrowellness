"use client";

/**
 * Componente para renderizar una carta natal con marcado astrogematrícico.
 * 
 * Este componente extiende la funcionalidad de CartaNatal para incluir
 * un marcado visual de la posición astrogematrícica calculada.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useEffect, useRef } from 'react';
import { Chart } from '@astrodraw/astrochart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

/**
 * Interfaz para los datos de la carta natal con marcado astrogematrícico.
 */
interface CartaNatalAstrogematriaProps {
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
 * Componente CartaNatalAstrogematria que renderiza una carta natal con marcado astrogematrícico.
 */
export function CartaNatalAstrogematria({ chartData, astrogematriaData }: CartaNatalAstrogematriaProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && chartData && chartData.planets && chartData.cusps && astrogematriaData) {
      // Debug logging
      console.log('🎯 Renderizando carta con astrogematría:', {
        palabra: astrogematriaData.palabra_original,
        grados: astrogematriaData.grados,
        posicion: astrogematriaData.posicion_completa
      });
      
      // Generar ID único para cada renderizado
      const uniqueChartId = `astrogematria-chart-${Date.now()}-${astrogematriaData.grados}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Limpiar completamente el contenedor
      chartRef.current.innerHTML = '';
      
      // Crear un nuevo div con el ID único
      const chartContainer = document.createElement('div');
      chartContainer.id = uniqueChartId;
      chartContainer.className = 'w-full max-w-3xl h-auto';
      chartRef.current.appendChild(chartContainer);
      
      try {
        // Crear nuevo gráfico con el ID único
        const chart = new Chart(uniqueChartId, 800, 800);
        
        // Crear datos modificados que incluyan el punto astrogematrícico
        const modifiedChartData = {
          ...chartData,
          planets: {
            ...chartData.planets,
            // Agregar el punto astrogematrícico como un "planeta" especial
            'ASTROGEMATRIA': [astrogematriaData.grados]
          }
        };
        
        // Renderizar la carta natal con los datos modificados
        chart.radix(modifiedChartData);
        
        // Agregar estilo personalizado para el punto astrogematrícico
        setTimeout(() => {
          const svgElement = chartRef.current?.querySelector('svg');
          if (svgElement) {
            // Buscar el elemento del punto astrogematrícico y aplicar estilo dorado
            const astrogematriaElements = svgElement.querySelectorAll('[data-planet="ASTROGEMATRIA"], circle[fill*="ASTROGEMATRIA"]');
            astrogematriaElements.forEach(element => {
              element.setAttribute('fill', '#FFD700');
              element.setAttribute('stroke', '#FF8C00');
              element.setAttribute('stroke-width', '3');
              element.setAttribute('r', '8'); // Hacer el círculo más grande
            });
            
            // Agregar un efecto de glow
            const defs = svgElement.querySelector('defs') || svgElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', 'astrogematria-glow');
            filter.innerHTML = `
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            `;
            defs.appendChild(filter);
            
            astrogematriaElements.forEach(element => {
              element.setAttribute('filter', 'url(#astrogematria-glow)');
            });
          }
        }, 100);
        
      } catch (error) {
        console.error('Error renderizando carta natal con astrogematría:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<p class="text-center text-red-500 p-4">Error al renderizar la carta natal</p>';
        }
      }
    }
  }, [chartData, astrogematriaData]);
  
  // Validación defensiva
  if (!chartData || !chartData.planets || !chartData.cusps || !astrogematriaData) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Tu Carta Natal con Astrogematría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-500 p-4">No hay datos disponibles para mostrar la carta natal.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-purple-600" />
          Tu Carta Natal con Astrogematría
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {astrogematriaData.palabra_original}
          </Badge>
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            {astrogematriaData.posicion_completa}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div id="astrogematria-chart-container" ref={chartRef} className="w-full max-w-3xl h-auto" />
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-orange-600"></div>
              <span className="font-semibold text-orange-800">Posición Astrogematrícica</span>
            </div>
            <p className="text-sm text-orange-700">
              La palabra <strong>"{astrogematriaData.palabra_original}"</strong> se ubica en{' '}
              <strong>{astrogematriaData.posicion_completa}</strong> en tu carta natal.
              El punto dorado en la carta marca esta posición especial.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
