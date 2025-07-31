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
import Link from "next/link";

interface RemedioData {
  grado: number;
  signo: string;
  remedio: string;
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

            {/* Placeholder para próximos selectores */}
            {signoSeleccionado && (
              <div className="text-center text-muted-foreground p-4 bg-green-50 rounded-lg border border-green-200">
                <Heart className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm">
                  Signo seleccionado: <strong>{signoSeleccionado}</strong>
                </p>
                <p className="text-xs mt-1">
                  Los selectores de grado y remedio se agregarán en el próximo paso
                </p>
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
                <p>Carta natal cargada correctamente. Los remedios seleccionados se mostrarán aquí.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
