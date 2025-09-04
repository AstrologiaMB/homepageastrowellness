"use client";

/**
 * Componente para renderizar una carta natal con marcado de remedios homeopáticos.
 * 
 * Este componente extiende la funcionalidad de CartaNatal para incluir
 * un marcado visual de la posición del remedio homeopático seleccionado.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useEffect, useRef } from 'react';
import { Chart } from '@astrodraw/astrochart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";

/**
 * Interfaz para los datos de la carta natal con marcado de remedios.
 */
interface CartaNatalRemediosProps {
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
 * Componente CartaNatalRemedios que renderiza una carta natal con marcado de remedios homeopáticos.
 */
export function CartaNatalRemedios({ chartData, remedioData }: CartaNatalRemediosProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && chartData && chartData.planets && chartData.cusps && remedioData) {
      // Debug logging
      console.log('🌿 Renderizando carta con remedio:', {
        remedio: remedioData.remedio,
        grado: remedioData.grado,
        signo: remedioData.signo,
        posicion: remedioData.posicion_completa
      });
      
      // Generar ID único para cada renderizado
      const uniqueChartId = `remedios-chart-${Date.now()}-${remedioData.grado}-${Math.random().toString(36).substr(2, 9)}`;
      
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
        
        // Renderizar carta natal limpia (sin agregar el remedio como planeta)
        const cleanChartData = {
          ...chartData,
          planets: { ...chartData.planets } // Solo planetas reales
        };
        
        // Debug: Verificar datos limpios
        console.log('📊 Datos limpios (sin REMEDIO):', cleanChartData.planets);
        console.log('📊 Grados remedio para overlay:', remedioData.grado);
        console.log('📊 ID del chart:', uniqueChartId);
        
        // Renderizar la carta natal limpia
        chart.radix(cleanChartData);
        
        // OVERLAY MANUAL: Agregar punto de remedio después
        setTimeout(() => {
          const svgElement = chartRef.current?.querySelector('svg');
          if (svgElement) {
            // Configuración exacta de la biblioteca @astrodraw/astrochart
            const SHIFT_IN_DEGREES = 180; // 0° está en el Oeste
            const MARGIN = 50; // Margen del chart
            const chartSize = 800; // Tamaño del SVG
            
            // Cálculos exactos como en la biblioteca
            const cx = chartSize / 2; // 400
            const cy = chartSize / 2; // 400
            const radius = chartSize / 2 - MARGIN; // 350
            
            // Convertir grados del signo a grados absolutos del zodíaco
            const signosBase: Record<string, number> = {
              'Aries': 0, 'Tauro': 30, 'Géminis': 60, 'Cáncer': 90,
              'Leo': 120, 'Virgo': 150, 'Libra': 180, 'Escorpio': 210,
              'Sagitario': 240, 'Capricornio': 270, 'Acuario': 300, 'Piscis': 330
            };
            
            const gradosBase = signosBase[remedioData.signo] || 0;
            const gradosAbsolutos = gradosBase + remedioData.grado;
            
            // Calcular el shift como lo hace la biblioteca
            const deg360 = 360;
            const ascendente = cleanChartData.cusps[0]; // Tu Ascendente
            const shift = deg360 - ascendente;
            
            // Aplicar el shift a los grados absolutos
            const gradosConShift = gradosAbsolutos + shift;
            
            // Aplicar la fórmula exacta de getPointPosition()
            const angleInRadians = (SHIFT_IN_DEGREES - gradosConShift) * Math.PI / 180;
            const x = cx + radius * Math.cos(angleInRadians);
            const y = cy + radius * Math.sin(angleInRadians);
            
            console.log('🌿 Calculando posición overlay remedio (FÓRMULA EXACTA CON SHIFT):');
            console.log('   - Configuración: cx =', cx, ', cy =', cy, ', radius =', radius);
            console.log('   - SHIFT_IN_DEGREES:', SHIFT_IN_DEGREES);
            console.log('   - Ascendente (cusps[0]):', ascendente);
            console.log('   - Shift calculado:', shift);
            console.log('   - Grados en signo:', remedioData.grado);
            console.log('   - Signo:', remedioData.signo);
            console.log('   - Grados base del signo:', gradosBase);
            console.log('   - Grados absolutos:', gradosAbsolutos);
            console.log('   - Grados con shift:', gradosConShift);
            console.log('   - Ángulo en radianes:', angleInRadians);
            console.log('   - Coordenadas finales: x =', x, ', y =', y);
            console.log('   - Posición esperada:', remedioData.posicion_completa);
            
            // Crear círculo overlay para el remedio (color verde para diferenciarlo)
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x.toString());
            circle.setAttribute('cy', y.toString());
            circle.setAttribute('r', '8');
            circle.setAttribute('fill', '#16a34a'); // Verde
            circle.setAttribute('stroke', '#15803d'); // Verde oscuro
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('id', 'remedio-overlay-point');
            
            // Agregar título para hover
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${remedioData.remedio} - ${remedioData.posicion_completa}`;
            circle.appendChild(title);
            
            // Eliminar punto anterior si existe
            const existingPoint = svgElement.querySelector('#remedio-overlay-point');
            if (existingPoint) {
              existingPoint.remove();
            }
            
            // Agregar nuevo punto
            svgElement.appendChild(circle);
            
            console.log('✅ Punto overlay remedio agregado en:', x, y);
          }
        }, 100);
        
      } catch (error) {
        console.error('Error renderizando carta natal con remedio:', error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<p class="text-center text-red-500 p-4">Error al renderizar la carta natal</p>';
        }
      }
    }
  }, [chartData, remedioData]);
  
  // Validación defensiva
  if (!chartData || !chartData.planets || !chartData.cusps || !remedioData) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Tu Carta Natal con Remedios
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
          <Heart className="h-5 w-5 text-green-600" />
          Tu Carta Natal con Remedios
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {remedioData.remedio}
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {remedioData.posicion_completa}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div id="remedios-chart-container" ref={chartRef} className="w-full max-w-3xl h-auto" />
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-green-600"></div>
              <span className="font-semibold text-green-800">Remedio Homeopático</span>
            </div>
            <p className="text-sm text-green-700">
              El remedio <strong>"{remedioData.remedio}"</strong> se ubica en{' '}
              <strong>{remedioData.posicion_completa}</strong> en tu carta natal.
              El punto verde en la carta marca esta posición terapéutica.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
