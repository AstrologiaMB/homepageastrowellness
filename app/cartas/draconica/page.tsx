/**
 * Página para mostrar la carta dracónica.
 * 
 * Esta página calcula y muestra una carta dracónica dinámica basada en los datos del usuario.
 * Utiliza la API FastAPI para generar cálculos astrológicos precisos.
 * Incluye sistema de caché para optimizar el rendimiento.
 * 
 * @author Astrowellness Team
 * @version 2.0.0
 */

"use client";

import { useState } from 'react';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";
import { CartaSuperpuestaWrapper } from "@/components/carta-superpuesta-wrapper";
import { CartaNatalTabla } from "@/components/carta-natal-tabla";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Calculator, Clock } from "lucide-react";

interface CartaNatalData {
  success: boolean;
  data: any;
  data_reducido: any;
  cached: boolean;
  timestamp: string;
  error?: string;
}

/**
 * Componente de página para la carta dracónica dinámica.
 * 
 * @returns {JSX.Element} - Elemento JSX que contiene la página de carta dracónica.
 */
export default function CartasDraconicaPage() {
  // Estados para carta dracónica (existentes)
  const [cartaData, setCartaData] = useState<any>(null);
  const [cartaCompleta, setCartaCompleta] = useState<any>(null);
  
  // Estados para carta tropical (nuevos)
  const [cartaTropicalData, setCartaTropicalData] = useState<any>(null);
  const [cartaTropicalCompleta, setCartaTropicalCompleta] = useState<any>(null);
  
  // Estados compartidos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);
  const [calculationTime, setCalculationTime] = useState<string | null>(null);

  const calcularCarta = async () => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();
    
    try {
      // Llamadas paralelas a ambas APIs para optimizar tiempo de carga
      const [draconicaResponse, tropicalResponse] = await Promise.all([
        fetch('/api/cartas/draconica', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch('/api/cartas/tropical', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      ]);
      
      const draconicaData: CartaNatalData = await draconicaResponse.json();
      const tropicalData: CartaNatalData = await tropicalResponse.json();
      
      console.log('Respuesta API Dracónica:', draconicaData);
      console.log('Respuesta API Tropical:', tropicalData);
      
      // Verificar que ambas APIs respondieron correctamente
      if (draconicaData.success && tropicalData.success) {
        // Establecer datos dracónicos (funcionalidad existente preservada)
        setCartaData(draconicaData.data_reducido);
        setCartaCompleta(draconicaData.data);
        
        // Establecer datos tropicales (nueva funcionalidad)
        setCartaTropicalData(tropicalData.data_reducido);
        setCartaTropicalCompleta(tropicalData.data);
        
        setCached(draconicaData.cached || tropicalData.cached || false);
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        setCalculationTime(duration);
      } else {
        const errorMsg = draconicaData.error || tropicalData.error || 'Error calculando cartas';
        console.error('Error en las respuestas:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el servidor FastAPI esté ejecutándose en puerto 8001.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carta Dracónica</h1>
      
      <div className="mb-6">
        <Button 
          onClick={calcularCarta} 
          disabled={loading}
          className="mb-4"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculando carta dracónica...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Carta Dracónica Dinámica
            </>
          )}
        </Button>
        
        {cached && calculationTime && (
          <Alert className="mb-4">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              ✅ Carta cargada desde caché en {calculationTime}s (calculada previamente)
            </AlertDescription>
          </Alert>
        )}
        
        {!cached && calculationTime && (
          <Alert className="mb-4">
            <Calculator className="h-4 w-4" />
            <AlertDescription>
              🆕 Carta calculada dinámicamente en {calculationTime}s y guardada en caché
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            <strong>Error:</strong> {error}
            {error.includes('FastAPI') && (
              <div className="mt-2 text-sm">
                <strong>Solución:</strong> Ejecuta el servidor FastAPI:
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                  cd /Users/apple/calculo-carta-natal-api && source venv/bin/activate && python app.py
                </code>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {cartaData && (
        <>
          {/* Layout de dos cards: Dracónica individual + Superposición */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Visualización Gráfica</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card izquierda: Carta dracónica individual (PRESERVADA) */}
              <div>
                <h3 className="text-lg font-medium mb-3">Carta Dracónica</h3>
                <CartaNatalWrapper chartData={cartaData} chartId="draconica-individual" />
              </div>
              
              {/* Card derecha: Carta superpuesta (NUEVA) */}
              {cartaTropicalData && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Superposición: Tropical + Dracónica</h3>
                  <CartaSuperpuestaWrapper 
                    tropicalData={cartaTropicalData} 
                    draconicaData={cartaData}
                    chartId="carta-superpuesta"
                  />
                </div>
              )}
              
              {/* Mensaje si no hay datos tropicales */}
              {!cartaTropicalData && (
                <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 text-center">
                    Cargando carta tropical para superposición...
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabla de datos de la carta dracónica */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Datos Detallados</h2>
            <CartaNatalTabla chartData={cartaCompleta} />
          </div>
          
          {/* Nota sobre interpretación */}
          <Alert className="mb-4">
            <AlertDescription>
              📝 <strong>Próximamente:</strong> Interpretación automática de la carta dracónica basada en IA.
              Por ahora, puedes analizar los datos de planetas, casas y aspectos mostrados arriba.
            </AlertDescription>
          </Alert>
        </>
      )}
      
      {!cartaData && !loading && !error && (
        <Alert>
          <AlertDescription>
            👆 Haz clic en "Calcular Carta Dracónica Dinámica" para generar tu carta dracónica personalizada 
            basada en tus datos de nacimiento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
