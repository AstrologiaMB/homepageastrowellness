/**
 * Página de Carta Electiva - Interfaz de búsqueda de momentos óptimos
 *
 * Esta página permite a los usuarios buscar momentos astrológicamente favorables
 * para diferentes propósitos (trabajo, amor, viajes, etc.) utilizando el
 * algoritmo de carta electiva optimizada.
 *
 * @author Astrowellness Team
 * @version 2.0.0 - Refactored with React Hook Form + Zod
 */

'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FormStatus } from '@/components/ui/form-status';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { cartaElectivaSchema, type CartaElectivaFormData } from '@/lib/form-schemas';
import { Loader2, Search, Calendar, Target, Clock, Star, Calendar as CalendarIcon } from 'lucide-react';

import type {
  BusquedaResponse
} from '@/lib/api-clients/carta-electiva';


const TEMAS_DISPONIBLES = [
  {
    value: 'trabajo',
    label: '💼 Trabajo y Carrera',
    description: 'Momentos óptimos para decisiones laborales',
  },
  { value: 'amor', label: '❤️ Amor y Relaciones', description: 'Momentos favorables para el amor' },
  { value: 'viajes', label: '✈️ Viajes y Mudanzas', description: 'Tiempos propicios para viajar' },
  { value: 'salud', label: '🏥 Salud y Bienestar', description: 'Momentos para cuidado personal' },
  {
    value: 'dinero',
    label: '💰 Dinero e Inversiones',
    description: 'Decisiones financieras óptimas',
  },
  { value: 'estudios', label: '📚 Estudios y Aprendizaje', description: 'Momentos para educación' },
  { value: 'familia', label: '👨‍👩‍👧‍👦 Familia y Hogar', description: 'Asuntos familiares importantes' },
  { value: 'creatividad', label: '🎨 Creatividad y Arte', description: 'Proyectos creativos' },
  { value: 'amistades', label: '🤝 Amistades y Redes', description: 'Relaciones sociales' },
  { value: 'espiritualidad', label: '🧘 Espiritualidad', description: 'Crecimiento espiritual' },
];

// Feature Flag para controlar la disponibilidad del servicio
const IS_ENABLED = false;

/**
 * Componente principal de la página de carta electiva
 */
export default function CartaElectivaPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [resultado, setResultado] = useState<BusquedaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);

  const form = useForm<CartaElectivaFormData>({
    resolver: zodResolver(cartaElectivaSchema),
    defaultValues: {
      tema: '',
      fechaInicio: '',
      dias: 30,
    },
  });

  const tema = form.watch('tema');
  const fechaInicio = form.watch('fechaInicio');
  const dias = form.watch('dias');

  // GATING LOGIC
  if (!IS_ENABLED) {
    return (
      <div className="p-6 max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md border-amber-200 bg-amber-50/30 text-center shadow-lg">
          <CardHeader className="pb-4">
            <div className="mx-auto bg-amber-100 p-4 rounded-full w-fit mb-4">
              <Clock className="h-10 w-10 text-amber-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-amber-900">Buenos Momentos</CardTitle>
            <CardDescription className="text-amber-700/80 text-base font-medium">
              Próximamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Estamos calibrando nuestros algoritmos e IA para encontrarte los momentos más
              auspiciosos con precisión matemática.
            </p>
            <div className="p-3 bg-white/50 rounded-lg border border-amber-100 text-sm text-amber-800">
              ⚡️ Tu suscripción premium ya incluye este servicio. Tendrás acceso inmediato en cuanto
              terminemos la calibración.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /**
   * Inicia polling para consultar progreso real del backend
   */
  const startProgressPolling = (taskId: string) => {
    setProgress(0);
    setProgressMessage('Iniciando búsqueda...');

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/carta-electiva/progress/${taskId}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProgress(data.progress);
        setProgressMessage(data.status);

        // Si completado, mostrar resultados
        if (data.progress >= 100 && data.result) {
          clearInterval(interval);
          setProgressInterval(null);
          setResultado({
            success: true,
            data: data.result,
          });
          setLoading(false);
        }

        // Si hay error
        if (data.progress === -1) {
          clearInterval(interval);
          setProgressInterval(null);
          setError(data.error || data.status);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error consultando progreso:', err);
        // Fallback: simulación simple si falla el polling
        setProgress((prev) => Math.min(prev + 5, 90));
        setProgressMessage('Procesando...');
      }
    }, 2000); // Consultar cada 2 segundos

    setProgressInterval(interval);
    return interval;
  };

  /**
   * Maneja la búsqueda de momentos electivos
   */
  const handleBuscar = async (data: CartaElectivaFormData) => {
    setLoading(true);
    setError(null);
    setResultado(null);
    setProgress(0);
    setProgressMessage('');

    try {
      // Obtener datos del usuario (simplificado para este ejemplo)
      const userData = {
        fecha_nacimiento: '1990-01-01',
        hora_nacimiento: '12:00',
        ciudad: 'Buenos Aires',
        pais: 'Argentina',
        timezone: 'America/Argentina/Buenos_Aires',
      };

      const response = await fetch('/api/carta-electiva/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'test-user',
          tema: data.tema,
          fecha_inicio: data.fechaInicio,
          dias: data.dias,
          ubicacion: { ciudad: userData.ciudad, pais: userData.pais },
          carta_natal: userData,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `Error ${response.status}`);
      }

      if (responseData.success && responseData.task_id) {
        // Iniciar polling con el task_id
        startProgressPolling(responseData.task_id);
      } else {
        throw new Error(responseData.error || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error en búsqueda:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoading(false);

      // Limpiar progreso en caso de error
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
  };

  /**
   * Obtiene la fecha mínima permitida (hoy)
   */
  const getFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  /**
   * Obtiene la fecha máxima permitida (6 meses adelante)
   */
  const getFechaMaxima = () => {
    const maxFecha = new Date();
    maxFecha.setMonth(maxFecha.getMonth() + 6);
    return maxFecha.toISOString().split('T')[0];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Carta Electiva</h1>
        <p className="text-gray-600">
          Encuentra los momentos astrológicamente más favorables para tus proyectos importantes
        </p>
      </div>

      {/* Formulario de búsqueda */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Momentos Óptimos
          </CardTitle>
          <CardDescription>
            Selecciona el propósito y período para encontrar los mejores momentos astrológicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleBuscar)} className="space-y-6">
              {/* Selector de tema */}
              <FormField
                control={form.control}
                name="tema"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propósito Astrológico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un propósito" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TEMAS_DISPONIBLES.map((temaOption) => (
                          <SelectItem key={temaOption.value} value={temaOption.value}>
                            <div>
                              <div className="font-medium">{temaOption.label}</div>
                              <div className="text-sm text-gray-500">{temaOption.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fecha de inicio */}
              <FormField
                control={form.control}
                name="fechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Fecha de Inicio
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} min={getFechaMinima()} max={getFechaMaxima()} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Desde hoy hasta 6 meses adelante</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número de días */}
              <FormField
                control={form.control}
                name="dias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período de Análisis (días)</FormLabel>
                    <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="7">7 días</SelectItem>
                        <SelectItem value="15">15 días</SelectItem>
                        <SelectItem value="30">30 días</SelectItem>
                        <SelectItem value="60">60 días</SelectItem>
                        <SelectItem value="90">90 días</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón de búsqueda */}
              <Button
                type="submit"
                disabled={loading || !tema || !fechaInicio || !dias}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando momentos óptimos...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    Buscar Momentos Óptimos
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Barra de progreso */}
      {loading && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Buscando momentos óptimos...</h3>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full h-3" />
              <p className="text-sm text-gray-600 text-center italic">{progressMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensaje de error */}
      {error && (
        <FormStatus variant="error" className="mb-6">
          <strong>Error:</strong> {error}
        </FormStatus>
      )}

      {/* Resultados */}
      {resultado?.success && resultado.data && (
        <div className="space-y-6">
          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Resultados de la Búsqueda
              </CardTitle>
              <CardDescription>
                Se encontraron {resultado.data.estadisticas.total_momentos} momentos óptimos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {resultado.data.estadisticas.total_momentos}
                  </div>
                  <div className="text-sm text-gray-600">Momentos encontrados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {resultado.data.estadisticas.tiempo_calculo}
                  </div>
                  <div className="text-sm text-gray-600">Tiempo de cálculo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {resultado.data.estadisticas.factor_optimizacion}
                  </div>
                  <div className="text-sm text-gray-600">Optimización</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de momentos */}
          <Card>
            <CardHeader>
              <CardTitle>Momentos Óptimos Recomendados</CardTitle>
              <CardDescription>
                Los mejores momentos ordenados por puntuación astrológica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultado.data.momentos.map((momento) => (
                  <div
                    key={momento.ranking}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          #{momento.ranking}
                        </div>
                        <span className="font-medium">{momento.categoria}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {momento.puntuacion_total.toFixed(1)} pts
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(momento.fecha_hora).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(momento.fecha_hora).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Enraizamiento:</span>
                        <span className="font-medium ml-1">
                          {momento.enraizamiento_pct.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Calidad:</span>
                        <span className="font-medium ml-1">{momento.calidad_pct.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estado inicial */}
      {!resultado && !error && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¿Listo para encontrar tu momento perfecto?
            </h3>
            <p className="text-gray-600">
              Completa el formulario arriba para buscar los momentos astrológicamente más favorables
              para tu propósito específico.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
