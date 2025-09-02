/**
 * Página para mostrar la carta dracónica.
 * 
 * Esta página calcula y muestra una carta dracónica dinámica basada en los datos del usuario.
 * Utiliza la API FastAPI para generar cálculos astrológicos precisos.
 * Incluye sistema de caché para optimizar el rendimiento.
 * 
 * @author Astrowellness Team
 * @version 3.0.0 - Implementación de superposición de cartas tropicales y dracónicas
 */

"use client";

import { useState } from 'react';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";
import { CartaSuperpuestaWrapper } from "@/components/carta-superpuesta-wrapper";
import { CartaNatalTabla } from "@/components/carta-natal-tabla";
import { DraconicEventsList } from "@/components/DraconicEventsList";
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
  
  // Estados para eventos dracónicos
  const [eventosDraconicos, setEventosDraconicos] = useState<any>(null);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [errorEventos, setErrorEventos] = useState<string | null>(null);

  // Estados para interpretaciones dracónicas
  const [interpretacionDraconica, setInterpretacionDraconica] = useState<any>(null);
  const [loadingInterpretacion, setLoadingInterpretacion] = useState(false);
  const [errorInterpretacion, setErrorInterpretacion] = useState<string | null>(null);

  // Estados compartidos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);
  const [calculationTime, setCalculationTime] = useState<string | null>(null);

  // Función para procesar eventos dracónicos del análisis cruzado
  const procesarEventosDraconicos = (datosCruzados: any, cartaDraconica: any) => {
    const eventos: any[] = [];

    // Agregar tarjetas básicas de posiciones dracónicas
    const puntosBasicos = [
      { key: 'Sun', nombre: 'Sol', icono: '☉', tipo: 'posicion_basica' },
      { key: 'Moon', nombre: 'Luna', icono: '☽', tipo: 'posicion_basica' }
    ];

    puntosBasicos.forEach((punto, index) => {
      if (cartaDraconica.points && cartaDraconica.points[punto.key]) {
        const puntoData = cartaDraconica.points[punto.key];
        eventos.push({
          id: `posicion_${index}`,
          tipo: punto.tipo,
          titulo: `${punto.nombre} Dracónico en ${puntoData.sign}`,
          descripcion: `${punto.nombre} Dracónico se encuentra en ${puntoData.sign} ${puntoData.degrees}°`,
          icono: punto.icono,
          orbe: undefined,
          relevancia: 'alta'
        });
      }
    });

    // Agregar Ascendente dracónico
    if (cartaDraconica.houses && cartaDraconica.houses['1']) {
      const ascData = cartaDraconica.houses['1'];
      eventos.push({
        id: 'posicion_asc',
        tipo: 'posicion_basica',
        titulo: `Ascendente Dracónico en ${ascData.sign}`,
        descripcion: `Ascendente Dracónico se encuentra en ${ascData.sign} ${ascData.degrees}°`,
        icono: 'AS',
        orbe: undefined,
        relevancia: 'alta'
      });
    }

    // Procesar cúspides cruzadas
    if (datosCruzados.cuspides_cruzadas) {
      datosCruzados.cuspides_cruzadas.forEach((cuspide: any, index: number) => {
        eventos.push({
          id: `cuspide_${index}`,
          tipo: 'cuspide_cruzada',
          titulo: `Casa ${cuspide.casa_draconica} Dracónica en Casa ${cuspide.casa_tropical_ubicacion} Tropical`,
          descripcion: cuspide.descripcion,
          icono: '🏠',
          orbe: cuspide.distancia_desde_cuspide?.grados ?
            `${cuspide.distancia_desde_cuspide.grados}°${cuspide.distancia_desde_cuspide.minutos}'` : undefined,
          relevancia: cuspide.distancia_desde_cuspide?.grados < 5 ? 'alta' : 'media'
        });
      });
    }

    // Procesar aspectos cruzados
    if (datosCruzados.aspectos_cruzados) {
      datosCruzados.aspectos_cruzados.forEach((aspecto: any, index: number) => {
        eventos.push({
          id: `aspecto_${index}`,
          tipo: 'aspecto_cruzado',
          titulo: `${aspecto.punto_draconico} Dracónico ${aspecto.tipo_aspecto} ${aspecto.punto_tropical} Tropical`,
          descripcion: aspecto.descripcion,
          icono: '☌',
          orbe: `${aspecto.orbe_grados}°${aspecto.orbe_minutos}'`,
          relevancia: aspecto.exacto ? 'alta' : (aspecto.orbe_grados <= 3 ? 'media' : 'baja')
        });
      });
    }

    // Ordenar: posiciones básicas primero, luego por relevancia
    return eventos.sort((a, b) => {
      // Posiciones básicas siempre primero
      if (a.tipo === 'posicion_basica' && b.tipo !== 'posicion_basica') return -1;
      if (a.tipo !== 'posicion_basica' && b.tipo === 'posicion_basica') return 1;

      // Entre posiciones básicas, mantener orden: Sol, Luna, Ascendente
      if (a.tipo === 'posicion_basica' && b.tipo === 'posicion_basica') {
        const ordenPosiciones = ['posicion_0', 'posicion_1', 'posicion_asc'];
        return ordenPosiciones.indexOf(a.id) - ordenPosiciones.indexOf(b.id);
      }

      // Para otros tipos, ordenar por relevancia
      const relevanciaOrder = { 'alta': 3, 'media': 2, 'baja': 1 };
      const aRelevancia = a.relevancia as keyof typeof relevanciaOrder;
      const bRelevancia = b.relevancia as keyof typeof relevanciaOrder;

      if (relevanciaOrder[aRelevancia] !== relevanciaOrder[bRelevancia]) {
        return relevanciaOrder[bRelevancia] - relevanciaOrder[aRelevancia];
      }

      // Si misma relevancia, cúspides primero que aspectos
      if (a.tipo === 'cuspide_cruzada' && b.tipo === 'aspecto_cruzado') return -1;
      if (a.tipo === 'aspecto_cruzado' && b.tipo === 'cuspide_cruzada') return 1;
      return 0;
    });
  };

  const calcularEventosDraconicos = async (cartaDraconicaData: any) => {
    setLoadingEventos(true);
    setErrorEventos(null);

    try {
      const response = await fetch('/api/cartas/cruzada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        const eventos = procesarEventosDraconicos(data.data, cartaDraconicaData);
        setEventosDraconicos(eventos);
      } else {
        setErrorEventos(data.error || 'Error calculando eventos dracónicos');
      }
    } catch (err) {
      setErrorEventos('Error de conexión al calcular eventos dracónicos');
      console.error('Error:', err);
    } finally {
      setLoadingEventos(false);
    }
  };

  const calcularInterpretacionDraconica = async (cartaDraconicaData: any, skipCache: boolean = false) => {
    setLoadingInterpretacion(true);
    setErrorInterpretacion(null);

    try {
      const response = await fetch('/api/interpretaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartaNatalData: cartaDraconicaData,
          tipo: 'draco',
          skipCache: skipCache
        })
      });

      const data = await response.json();

      if (data.interpretacion_narrativa || data.interpretaciones_individuales) {
        setInterpretacionDraconica(data);
      } else {
        setErrorInterpretacion(data.error || 'Error generando interpretación dracónica');
      }
    } catch (err) {
      setErrorInterpretacion('Error de conexión al generar interpretación dracónica');
      console.error('Error:', err);
    } finally {
      setLoadingInterpretacion(false);
    }
  };

  const calcularCarta = async () => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      // Llamadas paralelas a ambas APIs para optimizar tiempo de carga
      const [draconicaResponse, tropicalResponse, cruzadaResponse] = await Promise.all([
        fetch('/api/cartas/draconica', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch('/api/cartas/tropical', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch('/api/cartas/cruzada', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      const draconicaData: CartaNatalData = await draconicaResponse.json();
      const tropicalData: CartaNatalData = await tropicalResponse.json();
      const cruzadaData = await cruzadaResponse.json();

      console.log('Respuesta API Dracónica:', draconicaData);
      console.log('Respuesta API Tropical:', tropicalData);
      console.log('Respuesta API Cruzada:', cruzadaData);

      // Verificar que ambas APIs respondieron correctamente
      if (draconicaData.success && tropicalData.success && cruzadaData.success) {
        // Establecer datos dracónicos (funcionalidad existente preservada)
        setCartaData(draconicaData.data_reducido);
        setCartaCompleta(draconicaData.data);

        // Establecer datos tropicales (nueva funcionalidad)
        setCartaTropicalData(tropicalData.data_reducido);
        setCartaTropicalCompleta(tropicalData.data);

        // Procesar y establecer eventos dracónicos
        const eventos = procesarEventosDraconicos(cruzadaData.data, draconicaData.data);
        setEventosDraconicos(eventos);

        // Generar interpretación dracónica en paralelo (saltando cache para testing)
        calcularInterpretacionDraconica(draconicaData.data, true);

        setCached(draconicaData.cached || tropicalData.cached || cruzadaData.cached || false);

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        setCalculationTime(duration);
      } else {
        const errorMsg = draconicaData.error || tropicalData.error || cruzadaData.error || 'Error calculando cartas';
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
                <code className="block mt-1 p-2 bg-muted rounded text-xs">
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
                <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground text-center">
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

          {/* Sección de Eventos Dracónicos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔮 Eventos Dracónicos</h2>
            <DraconicEventsList
              eventos={eventosDraconicos}
              loading={loadingEventos}
              error={errorEventos}
            />
          </div>

          {/* Sección de Interpretación Dracónica */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔮 Interpretación Dracónica</h2>

            {loadingInterpretacion && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="text-muted-foreground">Generando interpretación dracónica con IA...</span>
                </div>
              </div>
            )}

            {errorInterpretacion && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  <strong>Error en interpretación:</strong> {errorInterpretacion}
                </AlertDescription>
              </Alert>
            )}

            {interpretacionDraconica && (
              <>
                {/* Interpretación Narrativa */}
                {interpretacionDraconica.interpretacion_narrativa && (
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-primary mb-3">📖 Interpretación Narrativa</h3>
                      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                        {interpretacionDraconica.interpretacion_narrativa.split('\n').map((paragraph: string, index: number) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-3">
                              {paragraph}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interpretaciones Individuales */}
                {interpretacionDraconica.interpretaciones_individuales && interpretacionDraconica.interpretaciones_individuales.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">🔍 Análisis Detallado</h3>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                      {interpretacionDraconica.interpretaciones_individuales.map((item: any, index: number) => (
                        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{item.titulo}</h4>
                            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                              {item.tipo}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.interpretacion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tiempo de generación */}
                {interpretacionDraconica.tiempo_generacion && (
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Interpretación generada en {interpretacionDraconica.tiempo_generacion.toFixed(2)}s
                    {interpretacionDraconica.desde_cache && " (desde caché)"}
                  </div>
                )}
              </>
            )}

            {!loadingInterpretacion && !errorInterpretacion && !interpretacionDraconica && (
              <Alert>
                <AlertDescription>
                  Haz clic en "Calcular Carta Dracónica Dinámica" para generar la interpretación automática con IA.
                </AlertDescription>
              </Alert>
            )}
          </div>
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
