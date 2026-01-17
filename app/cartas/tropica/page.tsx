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

'use client';

import { useState, useEffect } from 'react';
import { CartaNatalWrapper } from '@/components/carta-natal-wrapper';
import { CartaNatalTabla } from '@/components/carta-natal-tabla';
import { InterpretacionNarrativa } from '@/components/interpretacion-narrativa';
import { InterpretacionesIndividuales } from '@/components/interpretaciones-individuales';
import { useInterpretaciones } from '@/hooks/use-interpretaciones';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProtectedPage } from '@/components/protected-page';
import { AstroBackButtonInline } from '@/components/navigation/astro-back-button';
import { Compass } from 'lucide-react';

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
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setCached] = useState(false);
  const [, setCalculationTime] = useState<string | null>(null);

  // Hook para interpretaciones RAG
  const {
    interpretaciones,
    loading: interpretacionesLoading,
    error: interpretacionesError,
  } = useInterpretaciones(cartaCompleta, 'tropical');

  const calcularCarta = async () => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/cartas/tropical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setError(
        'Error de conexión. Asegúrate de que el servidor FastAPI esté ejecutándose en puerto 8001.'
      );
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
    <ProtectedPage requiredEntitlement="hasBaseBundle" entitlementRedirect="/upgrade">
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <AstroBackButtonInline href="/cartas" />
        </div>

        {/* Page Header */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-l-primary">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Compass className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-light tracking-tight gradient-primary">
                  Carta Natal Trópica
                </h1>
              </div>
              <p className="text-muted-foreground ml-11">
                Tu carta natal clásica - el mapa del cielo en tu momento de nacimiento
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              <strong>Error:</strong> {error}
              {error.includes('FastAPI') && (
                <div className="mt-2 text-sm">
                  <strong>Solución:</strong> Ejecuta el servidor FastAPI:
                  <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                    cd /Users/apple/calculo-carta-natal-api && source venv/bin/activate && python
                    app.py
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
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Visualización Gráfica</h2>
                <p className="text-sm text-muted-foreground mt-1">Tu carta natal representada visualmente</p>
              </div>
              <div className="glass-card-strong rounded-xl p-6">
                <CartaNatalWrapper chartData={cartaData} />
              </div>
            </div>

            {/* Tabla de datos de la carta natal */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Datos Detallados</h2>
                <p className="text-sm text-muted-foreground mt-1">Posiciones planetarias y aspectos completos</p>
              </div>
              <div className="glass-card-strong rounded-xl p-6">
                <CartaNatalTabla chartData={cartaCompleta} />
              </div>
            </div>

            {/* Sección de Interpretaciones */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Interpretación Astrológica</h2>
                <p className="text-sm text-muted-foreground mt-1">Análisis personalizado de tu carta natal</p>
              </div>

              {/* Interpretación Narrativa */}
              <div className="mb-8">
                <InterpretacionNarrativa
                  interpretacion={interpretaciones?.interpretacion_narrativa || null}
                  loading={interpretacionesLoading}
                  error={interpretacionesError}
                  tiempoGeneracion={interpretaciones?.tiempo_generacion}
                  desdeCache={interpretaciones?.desde_cache}
                  loadingMessage="Estamos analizando tu carta natal. Te pido unos minutos de paciencia. Puede navegar por otras secciones hasta tanto finalice"
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
    </ProtectedPage>
  );
}
