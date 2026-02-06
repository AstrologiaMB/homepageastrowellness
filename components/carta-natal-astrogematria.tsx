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
import type { AstrogematriaDataStrict } from '@/lib/api-clients/astrogematria';

/**
 * Interfaz para los datos de la carta natal con marcado astrogematrícico.
 */
interface CartaNatalAstrogematriaProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  astrogematriaData: AstrogematriaDataStrict;
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

        // 🔧 SOLUCIÓN: Renderizar carta SIN punto astrogematrícico
        // Usar solo los datos originales, sin agregar ASTROGEMATRIA
        const cleanChartData = {
          ...chartData,
          planets: { ...chartData.planets } // Solo planetas reales
        };

        // 🔍 DEBUG: Verificar datos limpios
        console.log('📊 Datos limpios (sin ASTROGEMATRIA):', cleanChartData.planets);
        console.log('📊 Grados astrogematría para overlay:', astrogematriaData.grados);
        console.log('📊 ID del chart:', uniqueChartId);

        // Renderizar la carta natal limpia
        chart.radix(cleanChartData);

        // 🔧 OVERLAY MANUAL: Agregar punto astrogematrícico después
        setTimeout(() => {
          const svgElement = chartRef.current?.querySelector('svg');
          if (svgElement) {
            // 🔧 FÓRMULA EXACTA DE @astrodraw/astrochart
            // Basada en el código fuente: utils.ts getPointPosition()

            // Configuración exacta de la biblioteca
            const SHIFT_IN_DEGREES = 180; // 0° está en el Oeste
            const MARGIN = 50; // Margen del chart
            const chartSize = 800; // Tamaño del SVG

            // Cálculos exactos como en la biblioteca
            const cx = chartSize / 2; // 400
            const cy = chartSize / 2; // 400
            const radius = chartSize / 2 - MARGIN; // 350

            // 🔧 CORRECCIÓN: Convertir grados del signo a grados absolutos del zodíaco
            const signosBase: Record<string, number> = {
              'Aries': 0, 'Tauro': 30, 'Géminis': 60, 'Cáncer': 90,
              'Leo': 120, 'Virgo': 150, 'Libra': 180, 'Escorpio': 210,
              'Sagitario': 240, 'Capricornio': 270, 'Acuario': 300, 'Piscis': 330
            };

            // Extraer signo de la posición completa
            const signo = astrogematriaData.signo || astrogematriaData.posicion_completa.split(' de ')[1];
            const gradosBase = signosBase[signo] || 0;
            const gradosAbsolutos = gradosBase + astrogematriaData.grados;

            // 🎯 FÓRMULA EXACTA DE @astrodraw/astrochart CON SHIFT
            // Basada en radix.ts: this.shift = deg360 - this.data.cusps[0]
            // Y en drawPoints(): this.data.planets[planet][0] + this.shift

            // Calcular el shift como lo hace la biblioteca
            const deg360 = 360; // radiansToDegree(2 * Math.PI)
            const ascendente = cleanChartData.cusps[0]; // Tu Ascendente
            const shift = deg360 - ascendente;

            // Aplicar el shift a los grados absolutos como hace la biblioteca
            const gradosConShift = gradosAbsolutos + shift;

            // Aplicar la fórmula exacta de getPointPosition()
            const angleInRadians = (SHIFT_IN_DEGREES - gradosConShift) * Math.PI / 180;
            const x = cx + radius * Math.cos(angleInRadians);
            const y = cy + radius * Math.sin(angleInRadians);

            console.log('🎯 Calculando posición overlay (FÓRMULA EXACTA CON SHIFT):');
            console.log('   - Configuración: cx =', cx, ', cy =', cy, ', radius =', radius);
            console.log('   - SHIFT_IN_DEGREES:', SHIFT_IN_DEGREES);
            console.log('   - Ascendente (cusps[0]):', ascendente);
            console.log('   - Shift calculado:', shift);
            console.log('   - Grados en signo:', astrogematriaData.grados);
            console.log('   - Signo:', signo);
            console.log('   - Grados base del signo:', gradosBase);
            console.log('   - Grados absolutos:', gradosAbsolutos);
            console.log('   - Grados con shift:', gradosConShift);
            console.log('   - Ángulo en radianes:', angleInRadians);
            console.log('   - Coordenadas finales: x =', x, ', y =', y);
            console.log('   - Posición esperada:', astrogematriaData.posicion_completa);

            // Crear círculo overlay
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x.toString());
            circle.setAttribute('cy', y.toString());
            circle.setAttribute('r', '8');
            circle.setAttribute('fill', 'red');
            circle.setAttribute('stroke', 'darkred');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('id', 'astrogematria-overlay-point');

            // Eliminar punto anterior si existe
            const existingPoint = svgElement.querySelector('#astrogematria-overlay-point');
            if (existingPoint) {
              existingPoint.remove();
            }

            // Agregar nuevo punto
            svgElement.appendChild(circle);

            console.log('✅ Punto overlay agregado en:', x, y);
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
