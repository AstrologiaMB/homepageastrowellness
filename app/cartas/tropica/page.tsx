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

import { useState } from 'react';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";
import { CartaNatalTabla } from "@/components/carta-natal-tabla";
import { CartaNatalInterpretacion } from "@/components/carta-natal-interpretacion";
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
  const [clearingCache, setClearingCache] = useState(false);

  const limpiarCache = async () => {
    setClearingCache(true);
    try {
      const response = await fetch('/api/cartas/clear-cache', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`Caché limpiado exitosamente. ${result.deletedCount} registros eliminados.`);
        // Limpiar estado local también
        setCartaData(null);
        setCartaCompleta(null);
        setCached(false);
        setCalculationTime(null);
      } else {
        alert(`Error limpiando caché: ${result.error}`);
      }
    } catch (err) {
      alert('Error de conexión al limpiar caché.');
      console.error('Error:', err);
    } finally {
      setClearingCache(false);
    }
  };

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carta Natal Trópica</h1>
      
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <Button 
            onClick={calcularCarta} 
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculando carta natal...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Carta Natal Dinámica
              </>
            )}
          </Button>
          
          <Button 
            onClick={limpiarCache} 
            disabled={clearingCache}
            variant="outline"
            size="lg"
          >
            {clearingCache ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Limpiando caché...
              </>
            ) : (
              <>
                🗑️ Limpiar Caché
              </>
            )}
          </Button>
        </div>
        
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
          
          {/* Nota sobre interpretación */}
          <Alert className="mb-4">
            <AlertDescription>
              📝 <strong>Próximamente:</strong> Interpretación automática de la carta natal basada en IA.
              Por ahora, puedes analizar los datos de planetas, casas y aspectos mostrados arriba.
            </AlertDescription>
          </Alert>
        </>
      )}
      
      {!cartaData && !loading && !error && (
        <Alert>
          <AlertDescription>
            👆 Haz clic en "Calcular Carta Natal Dinámica" para generar tu carta natal personalizada 
            basada en tus datos de nacimiento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
