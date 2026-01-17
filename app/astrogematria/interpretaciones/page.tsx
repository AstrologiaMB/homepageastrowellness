'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Heart, Star, User, ExternalLink, MapPin, Search } from 'lucide-react';
import { CartaNatalRemediosWrapper } from '@/components/carta-natal-remedios-wrapper';
import Link from 'next/link';

interface RemedioData {
  grado: number;
  signo: string;
  remedio: string;
}

interface RemedioLocation {
  signo: string;
  grado: number;
  posicion_completa: string;
}

export default function AstrogematriaInterpretacionesPage() {
  const [error, setError] = useState<string | null>(null);
  const [cartaNatal, setCartaNatal] = useState<any>(null);
  const [cartaNatalLoading, setCartaNatalLoading] = useState(false);
  const [cartaNatalError, setCartaNatalError] = useState<string | null>(null);

  // Estados para remedios
  const [remediosData, setRemediosData] = useState<RemedioData[]>([]);
  const [remediosLoading, setRemediosLoading] = useState(false);
  const [signoSeleccionado, setSigNoSeleccionado] = useState<string>('');
  const [signosDisponibles, setSignosDisponibles] = useState<string[]>([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>('');
  const [gradosDisponibles, setGradosDisponibles] = useState<number[]>([]);
  const [remedioSeleccionado, setRemedioSeleccionado] = useState<string>('');
  const [remediosDisponibles, setRemediosDisponibles] = useState<RemedioData[]>([]);

  // BABY STEP 2: Estados para selector directo de remedios
  const [remedioDirectoSeleccionado, setRemedioDirectoSeleccionado] = useState<string>('');
  const [remediosAlfabeticos, setRemediosAlfabeticos] = useState<string[]>([]);

  // BABY STEP 5: Estado para tabs de métodos de selección
  const [metodoActivo, setMetodoActivo] = useState<'ubicacion' | 'directo'>('ubicacion');

  /**
   * FUNCIONALIDAD DUAL DE REMEDIOS HOMEOPÁTICOS
   *
   * Sistema completo que permite dos métodos de selección:
   * 1. Búsqueda por Ubicación: Signo → Grado → Remedio (cascading)
   * 2. Búsqueda Directa: Remedio → Auto-ubicación (reverse lookup)
   *
   * Total: 354 remedios homeopáticos únicos disponibles
   */

  // Función de búsqueda inversa - remedio → signo + grado
  const buscarUbicacionRemedio = useCallback(
    (nombreRemedio: string): RemedioLocation | null => {
      if (!nombreRemedio || remediosData.length === 0) {
        return null;
      }

      // Buscar el remedio en los datos (puede haber múltiples ubicaciones, toma la primera)
      const remedioEncontrado = remediosData.find(
        (r) => r.remedio.toLowerCase() === nombreRemedio.toLowerCase()
      );

      if (remedioEncontrado) {
        return {
          signo: remedioEncontrado.signo,
          grado: remedioEncontrado.grado,
          posicion_completa: `${remedioEncontrado.grado}° de ${remedioEncontrado.signo}`,
        };
      }

      return null;
    },
    [remediosData]
  );

  const obtenerCartaNatal = async () => {
    setCartaNatalLoading(true);
    setCartaNatalError(null);

    try {
      const response = await fetch('/api/cartas/tropical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success && data.data_reducido) {
        setCartaNatal(data.data_reducido);
      } else {
        setCartaNatalError(data.error || 'Error obteniendo carta natal');
      }
    } catch (err) {
      setCartaNatalError('Error de conexión al obtener carta natal');
      console.error('Error carta natal:', err);
    } finally {
      setCartaNatalLoading(false);
    }
  };

  const cargarRemedios = async () => {
    setRemediosLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/astrogematria/remedios', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success && data.remedios) {
        setRemediosData(data.remedios);

        // Extraer signos únicos
        const signosUnicos = [
          ...new Set(data.remedios.map((r: RemedioData) => r.signo)),
        ] as string[];
        setSignosDisponibles(signosUnicos);

        console.log('Remedios cargados:', data.remedios.length);
        console.log('Signos disponibles:', signosUnicos);
      } else {
        setError(data.error || 'Error cargando remedios');
      }
    } catch (err) {
      setError('Error de conexión al cargar remedios');
      console.error('Error remedios:', err);
    } finally {
      setRemediosLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    obtenerCartaNatal();
    cargarRemedios();
  }, []);

  // BABY STEP 6: Generar lista alfabética de remedios únicos (producción)
  useEffect(() => {
    if (remediosData.length > 0) {
      // Extraer nombres únicos de remedios y ordenar alfabéticamente
      const remediosUnicos = [...new Set(remediosData.map((r) => r.remedio))];
      const remediosOrdenados = remediosUnicos.sort((a, b) => a.localeCompare(b));
      setRemediosAlfabeticos(remediosOrdenados);
    }
  }, [remediosData]);

  // BABY STEP 6: Lógica de auto-selección - conectar selector directo con búsqueda inversa (producción)
  useEffect(() => {
    if (remedioDirectoSeleccionado && remediosData.length > 0) {
      const ubicacion = buscarUbicacionRemedio(remedioDirectoSeleccionado);

      if (ubicacion) {
        // Auto-completar signo y grado basado en la búsqueda inversa
        setSigNoSeleccionado(ubicacion.signo);
        setGradoSeleccionado(ubicacion.grado.toString());

        // Limpiar selección de remedio cascading para evitar conflictos
        setRemedioSeleccionado('');
      }
    }
  }, [remedioDirectoSeleccionado, remediosData, buscarUbicacionRemedio]);

  // Efecto para actualizar grados disponibles cuando cambia el signo
  useEffect(() => {
    if (signoSeleccionado && remediosData.length > 0) {
      const remediosDelSigno = remediosData.filter((r) => r.signo === signoSeleccionado);
      const gradosUnicos = [...new Set(remediosDelSigno.map((r) => r.grado))].sort((a, b) => a - b);
      setGradosDisponibles(gradosUnicos);

      // Limpiar selecciones posteriores
      setGradoSeleccionado('');
      setRemedioSeleccionado('');
      setRemediosDisponibles([]);

      console.log('Grados disponibles para', signoSeleccionado, ':', gradosUnicos);
    } else {
      setGradosDisponibles([]);
      setGradoSeleccionado('');
      setRemedioSeleccionado('');
      setRemediosDisponibles([]);
    }
  }, [signoSeleccionado, remediosData]);

  // Efecto para actualizar remedios disponibles cuando cambia el grado
  useEffect(() => {
    if (signoSeleccionado && gradoSeleccionado && remediosData.length > 0) {
      const remediosDisponiblesParaGrado = remediosData.filter(
        (r) => r.signo === signoSeleccionado && r.grado === parseInt(gradoSeleccionado)
      );
      setRemediosDisponibles(remediosDisponiblesParaGrado);

      // Limpiar selección de remedio
      setRemedioSeleccionado('');

      console.log(
        'Remedios disponibles para',
        signoSeleccionado,
        'grado',
        gradoSeleccionado,
        ':',
        remediosDisponiblesParaGrado
      );
    } else {
      setRemediosDisponibles([]);
      setRemedioSeleccionado('');
    }
  }, [signoSeleccionado, gradoSeleccionado, remediosData]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-green-600" />
          Interpretaciones - Remedios Homeopáticos
        </h1>
        <p className="text-muted-foreground">
          Selecciona remedios homeopáticos por grado zodiacal y visualízalos en tu carta natal
        </p>
      </div>

      {/* Información sobre remedios homeopáticos */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">¿Qué son los Remedios Homeopáticos Zodiacales?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Los remedios homeopáticos zodiacales son sustancias naturales que resuenan con grados
            específicos de los signos del zodíaco. Cada grado tiene un remedio asociado que puede
            ayudar a equilibrar las energías de esa posición en tu carta natal.
          </p>
        </CardContent>
      </Card>

      {/* BABY STEP 5: Selector de Remedios con Tabs Mejorados */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Selector de Remedios
          </CardTitle>
          <CardDescription>
            Elige tu método preferido para encontrar remedios homeopáticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Tabs de métodos de selección */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setMetodoActivo('ubicacion')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  metodoActivo === 'ubicacion'
                    ? 'bg-white text-green-700 shadow-sm border border-green-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MapPin className="h-4 w-4" />
                Búsqueda por Ubicación
              </button>
              <button
                onClick={() => setMetodoActivo('directo')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  metodoActivo === 'directo'
                    ? 'bg-white text-blue-700 shadow-sm border border-blue-200'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Search className="h-4 w-4" />
                Búsqueda Directa
              </button>
            </div>
          </div>

          {/* Contenido de tabs */}
          <div className="space-y-4">
            {metodoActivo === 'ubicacion' && (
              <div className="space-y-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    Búsqueda por Ubicación Zodiacal
                  </p>
                  <p className="text-xs text-green-600 mt-1">Navega: Signo → Grado → Remedio</p>
                </div>

                {/* Selector de Signo */}
                <div>
                  <Label htmlFor="signo">Signo Zodiacal</Label>
                  {remediosLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm text-muted-foreground">Cargando signos...</span>
                    </div>
                  ) : (
                    <Select value={signoSeleccionado} onValueChange={setSigNoSeleccionado}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona un signo zodiacal" />
                      </SelectTrigger>
                      <SelectContent>
                        {signosDisponibles.map((signo) => (
                          <SelectItem key={signo} value={signo}>
                            {signo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Selector de Grado */}
                {signoSeleccionado && (
                  <div>
                    <Label htmlFor="grado">Grado</Label>
                    <Select value={gradoSeleccionado} onValueChange={setGradoSeleccionado}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona un grado" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradosDisponibles.map((grado) => (
                          <SelectItem key={grado} value={grado.toString()}>
                            {grado}°
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Selector de Remedio */}
                {signoSeleccionado && gradoSeleccionado && (
                  <div>
                    <Label htmlFor="remedio">Remedio Homeopático</Label>
                    <Select value={remedioSeleccionado} onValueChange={setRemedioSeleccionado}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona un remedio" />
                      </SelectTrigger>
                      <SelectContent>
                        {remediosDisponibles.map((remedio, index) => (
                          <SelectItem key={index} value={remedio.remedio}>
                            {remedio.remedio}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {metodoActivo === 'directo' && (
              <div className="space-y-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Search className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">Búsqueda Directa por Remedio</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Selecciona el remedio y encuentra su ubicación automáticamente
                  </p>
                </div>

                <div>
                  <Label htmlFor="remedio-directo">Buscar Remedio Homeopático</Label>
                  {remediosLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm text-muted-foreground">Cargando remedios...</span>
                    </div>
                  ) : (
                    <Select
                      value={remedioDirectoSeleccionado}
                      onValueChange={setRemedioDirectoSeleccionado}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Busca y selecciona un remedio..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {remediosAlfabeticos.map((remedio) => (
                          <SelectItem key={remedio} value={remedio}>
                            {remedio}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            )}

            {/* Resumen de selección */}
            {signoSeleccionado && gradoSeleccionado && remedioSeleccionado && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Heart className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-green-800">
                    ✅ Remedio Seleccionado (Por Ubicación)
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {signoSeleccionado}
                    </Badge>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {gradoSeleccionado}°
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-green-800">{remedioSeleccionado}</p>
                  <p className="text-xs text-green-600 mt-2">
                    El remedio se mostrará en tu carta natal a continuación
                  </p>
                </div>
              </div>
            )}

            {/* Resumen de selección directa */}
            {remedioDirectoSeleccionado && (
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Heart className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-800">
                    ✅ Remedio Seleccionado (Búsqueda Directa)
                  </p>
                  <p className="text-lg font-bold text-blue-800">{remedioDirectoSeleccionado}</p>
                  <p className="text-xs text-blue-600 mt-2">
                    📍 Ubicación:{' '}
                    {buscarUbicacionRemedio(remedioDirectoSeleccionado)?.posicion_completa ||
                      'Calculando...'}
                  </p>
                  <p className="text-xs text-blue-600">
                    El remedio se mostrará en tu carta natal a continuación
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Carta Natal */}
      <div className="mt-6">
        {cartaNatalLoading && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Cargando tu carta natal...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {cartaNatalError && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Tu Carta Natal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="border-blue-200 bg-blue-50">
                <User className="h-4 w-4" />
                <AlertDescription className="text-blue-800">
                  <div className="space-y-2">
                    <p>
                      <strong>
                        Para ver tu carta natal con remedios homeopáticos, necesitas completar tus
                        datos natales.
                      </strong>
                    </p>
                    <p className="text-sm">
                      Una vez que tengas tu carta natal, podrás visualizar exactamente dónde se
                      ubican los remedios seleccionados dentro de tu mapa astrológico personal.
                    </p>
                    <div className="mt-4">
                      <Link href="/completar-datos">
                        <Button className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Completar Datos Natales
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {cartaNatal && !cartaNatalLoading && !cartaNatalError && (
          <>
            {/* BABY STEP 4: Mostrar carta con remedio - integrar ambos métodos de selección */}
            {(() => {
              // Determinar qué remedio mostrar: cascading o directo
              let remedioParaMostrar = null;
              let metodoSeleccion = '';

              if (signoSeleccionado && gradoSeleccionado && remedioSeleccionado) {
                // Método cascading (Signo → Grado → Remedio)
                remedioParaMostrar = {
                  remedio: remedioSeleccionado,
                  grado: parseInt(gradoSeleccionado),
                  signo: signoSeleccionado,
                  posicion_completa: `${gradoSeleccionado}° de ${signoSeleccionado}`,
                };
                metodoSeleccion = 'cascading';
              } else if (remedioDirectoSeleccionado) {
                // Método directo (Remedio → Auto-ubicación)
                const ubicacion = buscarUbicacionRemedio(remedioDirectoSeleccionado);
                if (ubicacion) {
                  remedioParaMostrar = {
                    remedio: remedioDirectoSeleccionado,
                    grado: ubicacion.grado,
                    signo: ubicacion.signo,
                    posicion_completa: ubicacion.posicion_completa,
                  };
                  metodoSeleccion = 'directo';
                }
              }

              if (remedioParaMostrar) {
                return (
                  <div
                    key={`remedio-chart-${metodoSeleccion}-${remedioParaMostrar.remedio}-${Date.now()}`}
                  >
                    <CartaNatalRemediosWrapper
                      chartData={cartaNatal}
                      remedioData={remedioParaMostrar}
                    />
                  </div>
                );
              } else {
                return (
                  /* Mostrar carta básica sin remedios */
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-green-600" />
                        Tu Carta Natal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-muted-foreground p-8">
                        <Star className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <p>Carta natal cargada correctamente.</p>
                        <p className="text-sm mt-2">
                          Selecciona un remedio homeopático arriba para verlo marcado en tu carta.
                        </p>
                        <p className="text-xs mt-1 text-blue-600">
                          💡 Puedes usar búsqueda por ubicación (Signo → Grado → Remedio) o búsqueda
                          directa por nombre
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })()}
          </>
        )}
      </div>
    </div>
  );
}
