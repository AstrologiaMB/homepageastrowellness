/**
 * Página para mostrar la carta natal trópica.
 * 
 * Esta página calcula y muestra una carta natal trópica dinámica basada en los datos del usuario.
 * Utiliza la API FastAPI para generar cálculos astrológicos precisos.
 * Incluye sistema de caché para optimizar el rendimiento.
 * 
 * @author Astrowellness Team
 * @version 2.0.0
 */

"use client";

import { useState, useEffect } from 'react';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";
import { CartaNatalTabla } from "@/components/carta-natal-tabla";
import { CartaNatalInterpretacion } from "@/components/carta-natal-interpretacion";
import { InterpretacionNarrativa } from "@/components/interpretacion-narrativa";
import { InterpretacionesIndividuales } from "@/components/interpretaciones-individuales";
import { useInterpretaciones } from "@/hooks/use-interpretaciones";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw } from "lucide-react";

interface CartaNatalData {
  success: boolean;
  data: any;
  data_reducido: any;
  cached: boolean;
  timestamp: string;
  error?: string;
}

/**
 * Componente de página para la carta natal trópica dinámica.
 * 
 * @returns {JSX.Element} - Elemento JSX que contiene la página de carta natal trópica.
 */
export default function CartasTropicaPage() {
  const [cartaData, setCartaData] = useState<any>(null);
  const [cartaCompleta, setCartaCompleta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);
  const [calculationTime, setCalculationTime] = useState<string | null>(null);

  // Hook para interpretaciones RAG
  const {
    interpretaciones,
    loading: interpretacionesLoading,
    error: interpretacionesError,
    refetch: refetchInterpretaciones,
    clearCache: clearInterpretacionesCache
  } = useInterpretaciones(cartaCompleta, 'tropical');



  const calcularCarta = async () => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/cartas/tropical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data: CartaNatalData = await response.json();

      console.log('Respuesta de la API:', data);

      if (data.success) {
        console.log('data_reducido:', data.data_reducido);
        console.log('data completa:', data.data);

        setCartaData(data.data_reducido);
        setCartaCompleta(data.data);
        setCached(data.cached || false);

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        setCalculationTime(duration);
      } else {
        console.error('Error en la respuesta:', data.error);
        setError(data.error || 'Error calculando carta natal');
      }
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el servidor FastAPI esté ejecutándose en puerto 8001.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para calcular la carta automáticamente al cargar
  useEffect(() => {
    calcularCarta();
  }, []);



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carta Natal Trópica</h1>


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
          {/* Visualización gráfica de la carta natal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Visualización Gráfica</h2>
            <CartaNatalWrapper chartData={cartaData} />
          </div>

          {/* Tabla de datos de la carta natal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Datos Detallados</h2>
            <CartaNatalTabla chartData={cartaCompleta} />
          </div>

          {/* Sección de Interpretaciones */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Interpretación Astrológica</h2>
              <div className="flex gap-2">
              </div>
            </div>

            {/* Interpretación Narrativa */}
            <div className="mb-8">
              <InterpretacionNarrativa
                interpretacion={interpretaciones?.interpretacion_narrativa || null}
                loading={interpretacionesLoading}
                error={interpretacionesError}
                tiempoGeneracion={interpretaciones?.tiempo_generacion}
                desdeCache={interpretaciones?.desde_cache}
              />
            </div>

            {/* Interpretaciones Individuales */}
            <div className="mb-8">
              <InterpretacionesIndividuales
                interpretaciones={interpretaciones?.interpretaciones_individuales || null}
                loading={interpretacionesLoading}
                error={interpretacionesError}
              />
            </div>
          </div>
        </>
      )}


    </div>
  );
}
