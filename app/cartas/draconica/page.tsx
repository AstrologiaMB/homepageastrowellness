/**
 * Página para mostrar la carta dracónica.
 *
 * Esta página calcula y muestra una carta dracónica dinámica basada en los datos del usuario.
 * Utiliza la API FastAPI para generar cálculos astrológicos precisos.
 * Incluye sistema de caché para optimizar el rendimiento.
 *
 * @author Astrowellness Team
 * @version 3.1.0 - Implementación de Markdown rendering con componentes reutilizables
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { CartaNatalWrapper } from '@/components/carta-natal-wrapper';
import { CartaSuperpuestaWrapper } from '@/components/carta-superpuesta-wrapper';
import { CartaNatalTabla } from '@/components/carta-natal-tabla';
import { DraconicEventsList } from '@/components/DraconicEventsList';
import { InterpretacionNarrativa } from '@/components/interpretacion-narrativa';
import { InterpretacionesIndividuales } from '@/components/interpretaciones-individuales';
import { useInterpretaciones } from '@/hooks/use-interpretaciones';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import {
  formatAstrologicalDegrees,
  getDraconicSuffix,
  translateSign,
  translatePlanet,
  translateAspect,
} from '@/lib/astrology-utils';
import { ProtectedPage } from '@/components/protected-page';
import { AstroBackButtonInline } from '@/components/navigation/astro-back-button';
import { Star } from 'lucide-react';

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
  const [, setCartaTropicalCompleta] = useState<any>(null);

  // Estados para eventos dracónicos
  const [eventosDraconicos, setEventosDraconicos] = useState<any>(null);
  const [loadingEventos, _setLoadingEventos] = useState(false);
  const [errorEventos, _setErrorEventos] = useState<string | null>(null);

  // Hook para interpretaciones RAG (Reemplaza la lógica manual anterior)
  const {
    interpretaciones: interpretacionDraconica,
    loading: loadingInterpretacion,
    error: errorInterpretacion,
  } = useInterpretaciones(cartaCompleta, 'draco');

  // Estados compartidos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función helper para formatear grados decimales en textos a formato sexagesimal
  const formatearGradosEnTexto = (texto: string): string => {
    if (!texto) return texto;

    // Regex para encontrar patrones como "8.988983013091001°" o "123.456°"
    // Busca: número decimal seguido de "°"
    const regexGrados = /(\d+\.\d+)°/g;

    return texto.replace(regexGrados, (match, decimalDegrees) => {
      const degrees = parseFloat(decimalDegrees);
      return formatAstrologicalDegrees(degrees);
    });
  };

  // Función helper para traducir planetas, signos y términos astrológicos en textos
  const traducirSignosEnTexto = (texto: string): string => {
    if (!texto) return texto;
    let textoTraducido = texto;

    // Traducir planetas
    const planetas = {
      Sun: 'Sol',
      Moon: 'Luna',
      Mercury: 'Mercurio',
      Venus: 'Venus',
      Mars: 'Marte',
      Jupiter: 'Júpiter',
      Saturn: 'Saturno',
      Uranus: 'Urano',
      Neptune: 'Neptuno',
      Pluto: 'Plutón',
      'True North Node': 'Nodo Norte Verdadero',
    };

    // Traducir signos
    const signos = {
      Aries: 'Aries',
      Taurus: 'Tauro',
      Gemini: 'Géminis',
      Cancer: 'Cáncer',
      Leo: 'Leo',
      Virgo: 'Virgo',
      Libra: 'Libra',
      Scorpio: 'Escorpio',
      Sagittarius: 'Sagitario',
      Capricorn: 'Capricornio',
      Aquarius: 'Acuario',
      Pisces: 'Piscis',
    };

    // Traducir términos astrológicos
    const terminosAstrologicos = {
      Tropical: 'Trópico',
    };

    // Aplicar traducciones de planetas primero
    Object.entries(planetas).forEach(([ingles, espanol]) => {
      textoTraducido = textoTraducido.replace(new RegExp(ingles, 'g'), espanol);
    });

    // Luego aplicar traducciones de signos
    Object.entries(signos).forEach(([ingles, espanol]) => {
      textoTraducido = textoTraducido.replace(new RegExp(ingles, 'g'), espanol);
    });

    // Finalmente aplicar traducciones de términos astrológicos
    Object.entries(terminosAstrologicos).forEach(([ingles, espanol]) => {
      textoTraducido = textoTraducido.replace(new RegExp(ingles, 'g'), espanol);
    });

    return textoTraducido;
  };

  // Función para procesar eventos dracónicos del análisis cruzado
  const procesarEventosDraconicos = useCallback((datosCruzados: any, cartaDraconica: any) => {
    const eventos: any[] = [];

    // Agregar tarjetas básicas de posiciones dracónicas
    const puntosBasicos = [
      { key: 'Sun', nombre: 'Sol', icono: '☉', tipo: 'posicion_basica' },
      { key: 'Moon', nombre: 'Luna', icono: '☽', tipo: 'posicion_basica' },
    ];

    puntosBasicos.forEach((punto, index) => {
      if (cartaDraconica.points && cartaDraconica.points[punto.key]) {
        const puntoData = cartaDraconica.points[punto.key];
        const formattedDegrees = formatAstrologicalDegrees(puntoData.degrees);
        const draconicSuffix = getDraconicSuffix(punto.key);
        const signSpanish = translateSign(puntoData.sign);

        eventos.push({
          id: `posicion_${index}`,
          tipo: punto.tipo,
          titulo: `${punto.nombre}${draconicSuffix} en ${signSpanish}`,
          descripcion: `${punto.nombre}${draconicSuffix} se encuentra en ${signSpanish} ${formattedDegrees}`,
          icono: punto.icono,
          orbe: undefined,
          relevancia: 'alta',
        });
      }
    });

    // Agregar Ascendente dracónico
    if (cartaDraconica.houses && cartaDraconica.houses['1']) {
      const ascData = cartaDraconica.houses['1'];
      const formattedAscDegrees = formatAstrologicalDegrees(ascData.degrees);
      const signSpanish = translateSign(ascData.sign);

      eventos.push({
        id: 'posicion_asc',
        tipo: 'posicion_basica',
        titulo: `Ascendente Dracónico en ${signSpanish}`,
        descripcion: `Ascendente Dracónico se encuentra en ${signSpanish} ${formattedAscDegrees}`,
        icono: 'AS',
        orbe: undefined,
        relevancia: 'alta',
      });
    }

    // Procesar cúspides cruzadas
    if (datosCruzados.cuspides_cruzadas) {
      datosCruzados.cuspides_cruzadas.forEach((cuspide: any, index: number) => {
        // Aplicar formateo de grados y luego traducción de signos
        const descripcionFormateada = formatearGradosEnTexto(cuspide.descripcion);
        const descripcionTraducida = traducirSignosEnTexto(descripcionFormateada);

        eventos.push({
          id: `cuspide_${index}`,
          tipo: 'cuspide_cruzada',
          titulo: `Casa ${cuspide.casa_draconica} Dracónica en Casa ${cuspide.casa_tropical_ubicacion} Trópica`,
          descripcion: descripcionTraducida,
          icono: '🏠',
          orbe: cuspide.distancia_desde_cuspide?.grados
            ? `${cuspide.distancia_desde_cuspide.grados}°${cuspide.distancia_desde_cuspide.minutos}'`
            : undefined,
          relevancia: cuspide.distancia_desde_cuspide?.grados < 5 ? 'alta' : 'media',
        });
      });
    }

    // Procesar aspectos cruzados
    if (datosCruzados.aspectos_cruzados) {
      datosCruzados.aspectos_cruzados.forEach((aspecto: any, index: number) => {
        // Aplicar formateo de grados y luego traducción de signos
        const descripcionFormateada = formatearGradosEnTexto(aspecto.descripcion);
        const descripcionTraducida = traducirSignosEnTexto(descripcionFormateada);

        eventos.push({
          id: `aspecto_${index}`,
          tipo: 'aspecto_cruzado',
          titulo: `${translatePlanet(aspecto.punto_draconico)} Dracónico ${translateAspect(aspecto.tipo_aspecto)} ${translatePlanet(aspecto.punto_tropical)} Trópico`,
          descripcion: descripcionTraducida,
          icono: '☌',
          orbe: `${aspecto.orbe_grados}°${aspecto.orbe_minutos}'`,
          relevancia: aspecto.exacto ? 'alta' : aspecto.orbe_grados <= 3 ? 'media' : 'baja',
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
      const relevanciaOrder = { alta: 3, media: 2, baja: 1 };
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
  }, []);

  const calcularCarta = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Llamadas paralelas a ambas APIs para optimizar tiempo de carga
      const [draconicaResponse, tropicalResponse, cruzadaResponse] = await Promise.all([
        fetch('/api/cartas/draconica', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/cartas/tropical', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/cartas/cruzada', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
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

        // NOTA: La interpretación ahora se maneja automáticamente via useEffect/hook
        // cuando setCartaCompleta actualiza el estado.
      } else {
        const errorMsg =
          draconicaData.error ||
          tropicalData.error ||
          cruzadaData.error ||
          'Error calculando cartas';
        console.error('Error en las respuestas:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      setError(
        'Error de conexión. Asegúrate de que el servidor FastAPI esté ejecutándose en puerto 8001.'
      );
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [procesarEventosDraconicos]);

  // Efecto para calcular la carta automáticamente al cargar
  useEffect(() => {
    calcularCarta();
  }, [calcularCarta]);

  return (
    <ProtectedPage requiredEntitlement="hasDraconicAccess" entitlementRedirect="/upgrade">
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
                  <Star className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-light tracking-tight gradient-primary">
                  Carta Dracónica
                </h1>
              </div>
              <p className="text-muted-foreground ml-11">
                Tu carta del alma - revelando el propósito de tu vida espiritual
              </p>
            </div>
          </div>
        </div>

        {/* Loader visual cuando se está calculando la carta inicialmente */}
        {!cartaData && loading && (
          <div className="glass-card rounded-xl p-8 mb-6 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Calculando carta dracónica...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              <strong>Error:</strong> {error}
              {error.includes('FastAPI') && (
                <div className="mt-2 text-sm">
                  <strong>Solución:</strong> Ejecuta el servidor FastAPI:
                  <code className="block mt-1 p-2 bg-muted rounded text-xs">
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
            {/* Layout de dos cards: Dracónica individual + Superposición */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Visualización Gráfica</h2>
                <p className="text-sm text-muted-foreground mt-1">Tu carta dracónica y la superposición con tu carta tropical</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card izquierda: Carta dracónica individual (PRESERVADA) */}
                <div className="glass-card-strong rounded-xl p-6">
                  <h3 className="text-lg font-medium mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Carta Dracónica
                  </h3>
                  <CartaNatalWrapper chartData={cartaData} chartId="draconica-individual" />
                </div>

                {/* Card derecha: Carta superpuesta (NUEVA) */}
                {cartaTropicalData && (
                  <div className="glass-card-strong rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-3 text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Superposición: Tropical + Dracónica
                    </h3>
                    <CartaSuperpuestaWrapper
                      tropicalData={cartaTropicalData}
                      draconicaData={cartaData}
                      chartId="carta-superpuesta"
                    />
                  </div>
                )}

                {/* Mensaje si no hay datos tropicales */}
                {!cartaTropicalData && (
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg glass-card">
                    <p className="text-muted-foreground text-center">
                      Cargando carta tropical para superposición...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tabla de datos de la carta dracónica */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Datos Detallados</h2>
                <p className="text-sm text-muted-foreground mt-1">Posiciones planetarias y aspectos completos</p>
              </div>
              <div className="glass-card-strong rounded-xl p-6">
                <CartaNatalTabla chartData={cartaCompleta} />
              </div>
            </div>

            {/* Sección de Eventos Dracónicos */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Eventos Dracónicos</h2>
                <p className="text-sm text-muted-foreground mt-1">Cúspides cruzadas y aspectos significativos</p>
              </div>
              <DraconicEventsList
                eventos={eventosDraconicos}
                loading={loadingEventos}
                error={errorEventos}
              />
            </div>

            {/* Sección de Interpretación Dracónica */}
            <div className="mb-8">
              <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-primary">
                <h2 className="text-xl font-semibold text-foreground">Interpretación Dracónica</h2>
                <p className="text-sm text-muted-foreground mt-1">Análisis profundo del propósito de tu alma</p>
              </div>

              {/* Componente de Interpretación Narrativa con Markdown */}
              <div className="mb-6">
                <InterpretacionNarrativa
                  interpretacion={interpretacionDraconica?.interpretacion_narrativa ?? null}
                  loading={loadingInterpretacion}
                  error={
                    errorInterpretacion
                      ? errorInterpretacion
                      : !interpretacionDraconica && !loadingInterpretacion
                        ? "Haz clic en 'Calcular Carta Dracónica Dinámica' para generar la interpretación."
                        : null
                  }
                  tiempoGeneracion={interpretacionDraconica?.tiempo_generacion}
                  desdeCache={interpretacionDraconica?.desde_cache}
                  loadingMessage="Estamos analizando tu carta natal. Te pido unos minutos de paciencia. Puede navegar por otras secciones hasta tanto finalice"
                />
              </div>

              {/* Componente de Interpretaciones Individuales con Markdown */}
              <InterpretacionesIndividuales
                interpretaciones={interpretacionDraconica?.interpretaciones_individuales ?? null}
                loading={loadingInterpretacion}
                error={errorInterpretacion}
              />
            </div>
          </>
        )}
      </div>
    </ProtectedPage>
  );
}
