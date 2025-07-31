"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Heart, Star, Clock, User, ExternalLink } from "lucide-react";
import { CartaNatalAstrogematriaWrapper } from "@/components/carta-natal-astrogematria-wrapper";
import { CartaNatalRemediosWrapper } from "@/components/carta-natal-remedios-wrapper";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);
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

  // BABY STEP 1: Función de búsqueda inversa - remedio → signo + grado
  const buscarUbicacionRemedio = (nombreRemedio: string): RemedioLocation | null => {
    if (!nombreRemedio || remediosData.length === 0) {
      return null;
    }

    // Buscar el remedio en los datos (puede haber múltiples ubicaciones)
    const remedioEncontrado = remediosData.find(r => 
      r.remedio.toLowerCase() === nombreRemedio.toLowerCase()
    );

    if (remedioEncontrado) {
      return {
        signo: remedioEncontrado.signo,
        grado: remedioEncontrado.grado,
        posicion_completa: `${remedioEncontrado.grado}° de ${remedioEncontrado.signo}`
      };
    }

    return null;
  };

  const obtenerCartaNatal = async () => {
    setCartaNatalLoading(true);
    setCartaNatalError(null);
    
    try {
      const response = await fetch('/api/cartas/tropical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.success && data.remedios) {
        setRemediosData(data.remedios);
        
        // Extraer signos únicos
        const signosUnicos = [...new Set(data.remedios.map((r: RemedioData) => r.signo))] as string[];
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

  // BABY STEP 1: Test de la función de búsqueda inversa
  useEffect(() => {
    if (remediosData.length > 0) {
      // Probar con el ejemplo del task: "CARBO VEGETABILIS" → "Aries 15°"
      const testResult = buscarUbicacionRemedio("CARBO VEGETABILIS");
      console.log('🧪 Test búsqueda inversa CARBO VEGETABILIS:', testResult);
      
      // Probar con otro remedio
      const testResult2 = buscarUbicacionRemedio("NUX VOMICA");
      console.log('🧪 Test búsqueda inversa NUX VOMICA:', testResult2);
    }
  }, [remediosData]);

  // BABY STEP 2: Generar lista alfabética de remedios únicos
  useEffect(() => {
    if (remediosData.length > 0) {
      // Extraer nombres únicos de remedios y ordenar alfabéticamente
      const remediosUnicos = [...new Set(remediosData.map(r => r.remedio))];
      const remediosOrdenados = remediosUnicos.sort((a, b) => a.localeCompare(b));
      setRemediosAlfabeticos(remediosOrdenados);
      
      console.log('📋 Remedios alfabéticos generados:', remediosOrdenados.length, 'remedios únicos');
      console.log('📋 Primeros 5 remedios:', remediosOrdenados.slice(0, 5));
    }
  }, [remediosData]);

  // Efecto para actualizar grados disponibles cuando cambia el signo
  useEffect(() => {
    if (signoSeleccionado && remediosData.length > 0) {
      const remediosDelSigno = remediosData.filter(r => r.signo === signoSeleccionado);
      const gradosUnicos = [...new Set(remediosDelSigno.map(r => r.grado))].sort((a, b) => a - b);
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
        r => r.signo === signoSeleccionado && r.grado === parseInt(gradoSeleccionado)
      );
      setRemediosDisponibles(remediosDisponiblesParaGrado);
      
      // Limpiar selección de remedio
      setRemedioSeleccionado('');
      
      console.log('Remedios disponibles para', signoSeleccionado, 'grado', gradoSeleccionado, ':', remediosDisponiblesParaGrado);
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
            Los remedios homeopáticos zodiacales son sustancias naturales que resuenan con 
            grados específicos de los signos del zodíaco. Cada grado tiene un remedio asociado 
            que puede ayudar a equilibrar las energías de esa posición en tu carta natal.
          </p>
        </CardContent>
      </Card>

      {/* Selector de Remedios */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Selector de Remedios
          </CardTitle>
          <CardDescription>
            Selecciona un signo, grado y remedio para visualizar en tu carta natal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
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

            {/* BABY STEP 2: Selector Directo de Remedios */}
            <div className="border-t pt-4 mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🔍 Búsqueda Directa por Remedio
                </h3>
                <p className="text-sm text-muted-foreground">
                  Selecciona directamente un remedio y el sistema encontrará su ubicación automáticamente
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
                  <Select value={remedioDirectoSeleccionado} onValueChange={setRemedioDirectoSeleccionado}>
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

            {/* Resumen de selección */}
            {signoSeleccionado && gradoSeleccionado && remedioSeleccionado && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Heart className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-green-800">
                    Remedio Seleccionado (Por Ubicación)
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {signoSeleccionado}
                    </Badge>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {gradoSeleccionado}°
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-green-800">
                    {remedioSeleccionado}
                  </p>
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
                    Remedio Seleccionado (Búsqueda Directa)
                  </p>
                  <p className="text-lg font-bold text-blue-800">
                    {remedioDirectoSeleccionado}
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    📍 Ubicación: {buscarUbicacionRemedio(remedioDirectoSeleccionado)?.posicion_completa || 'Calculando...'}
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
                      <strong>Para ver tu carta natal con remedios homeopáticos, necesitas completar tus datos natales.</strong>
                    </p>
                    <p className="text-sm">
                      Una vez que tengas tu carta natal, podrás visualizar exactamente dónde se ubican 
                      los remedios seleccionados dentro de tu mapa astrológico personal.
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
            {/* Mostrar carta con remedio si hay uno seleccionado */}
            {signoSeleccionado && gradoSeleccionado && remedioSeleccionado ? (
              <div key={`remedio-chart-${signoSeleccionado}-${gradoSeleccionado}-${remedioSeleccionado}-${Date.now()}`}>
                <CartaNatalRemediosWrapper 
                  chartData={cartaNatal}
                  remedioData={{
                    remedio: remedioSeleccionado,
                    grado: parseInt(gradoSeleccionado),
                    signo: signoSeleccionado,
                    posicion_completa: `${gradoSeleccionado}° de ${signoSeleccionado}`
                  }}
                />
              </div>
            ) : (
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
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

    </div>
  );
}
