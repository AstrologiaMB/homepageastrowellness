"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calculator, Star, Clock, User, ExternalLink } from "lucide-react";
import { CartaNatalAstrogematriaWrapper } from "@/components/carta-natal-astrogematria-wrapper";
import Link from "next/link";

interface AstrogematriaData {
  palabra_original: string;
  palabra_procesada: string;
  valor_astrogematrico: number;
  reduccion_zodiacal: number;
  signo: string;
  grados: number;
  posicion_completa: string;
}

interface AstrogematriaResponse {
  success: boolean;
  data?: AstrogematriaData;
  error?: string;
  cached?: boolean;
  timestamp?: string;
}

export default function AstrogematriaCalculosPage() {
  const [palabra, setPalabra] = useState('');
  const [resultado, setResultado] = useState<AstrogematriaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);
  const [cartaNatal, setCartaNatal] = useState<any>(null);
  const [cartaNatalLoading, setCartaNatalLoading] = useState(false);
  const [cartaNatalError, setCartaNatalError] = useState<string | null>(null);

  const calcularAstrogematria = async () => {
    if (!palabra.trim()) {
      setError('Por favor, ingresa una palabra o frase');
      return;
    }

    setLoading(true);
    setError(null);
    setResultado(null);
    
    try {
      const response = await fetch('/api/astrogematria/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ palabra: palabra.trim() })
      });
      
      const data: AstrogematriaResponse = await response.json();
      
      if (data.success && data.data) {
        setResultado(data.data);
        setCached(data.cached || false);
        // Después de calcular astrogematría, obtener carta natal
        obtenerCartaNatal();
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servicio esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      calcularAstrogematria();
    }
  };

  const limpiarFormulario = () => {
    setPalabra('');
    setResultado(null);
    setError(null);
    setCached(false);
    setCartaNatal(null);
    setCartaNatalError(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Star className="h-8 w-8 text-purple-600" />
          Astrogematría - Cálculos
        </h1>
        <p className="text-muted-foreground">
          Convierte palabras y frases en posiciones zodiacales mediante cálculos astrogematrícicos
        </p>
      </div>

      {/* Información sobre astrogematría */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">¿Qué es la Astrogematría?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La astrogematría es un sistema que asigna valores numéricos a las letras para calcular 
            la posición zodiacal correspondiente a palabras y frases. Cada letra tiene un valor 
            específico que se suma para obtener un total, el cual se reduce según las reglas 
            zodiacales para determinar la posición en la rueda astrológica.
          </p>
        </CardContent>
      </Card>

      {/* Formulario de entrada */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Astrogematría
          </CardTitle>
          <CardDescription>
            Ingresa una palabra o frase para calcular su valor astrogematrícico y posición zodiacal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="palabra">Palabra o frase</Label>
              <Input
                id="palabra"
                type="text"
                placeholder="Ejemplo: amor, sabiduría, mi nombre..."
                value={palabra}
                onChange={(e) => setPalabra(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={calcularAstrogematria} 
                disabled={loading || !palabra.trim()}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4" />
                    Calcular
                  </>
                )}
              </Button>
              
              {(resultado || error) && (
                <Button 
                  variant="outline" 
                  onClick={limpiarFormulario}
                  disabled={loading}
                >
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Resultados */}
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              Resultado Astrogematrico
              {cached && (
                <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Caché
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información básica */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Palabra Original
                  </Label>
                  <p className="text-lg font-semibold">{resultado.palabra_original}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Palabra Procesada
                  </Label>
                  <p className="text-lg">{resultado.palabra_procesada}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Valor Astrogematrico
                  </Label>
                  <p className="text-2xl font-bold text-purple-600">
                    {resultado.valor_astrogematrico}
                  </p>
                </div>
              </div>

              {/* Posición zodiacal */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Reducción Zodiacal
                  </Label>
                  <p className="text-lg">{resultado.reduccion_zodiacal}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Signo Zodiacal
                  </Label>
                  <p className="text-lg font-semibold">{resultado.signo}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Posición Completa
                  </Label>
                  <p className="text-2xl font-bold text-orange-600">
                    {resultado.posicion_completa}
                  </p>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {cached ? 'Resultado obtenido desde caché' : 'Resultado calculado en tiempo real'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {cached ? 'Instantáneo' : 'Calculado ahora'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Carta Natal con Astrogematría */}
      {resultado && (
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
                        <strong>Para ver tu carta natal con la posición astrogematrícica, necesitas completar tus datos natales.</strong>
                      </p>
                      <p className="text-sm">
                        Una vez que tengas tu carta natal, podrás ver exactamente dónde se ubica 
                        <strong> "{resultado.palabra_original}"</strong> en <strong>{resultado.posicion_completa}</strong> 
                        dentro de tu mapa astrológico personal.
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
            <CartaNatalAstrogematriaWrapper 
              key={`${resultado.palabra_original}-${resultado.grados}`}
              chartData={cartaNatal}
              astrogematriaData={resultado}
            />
          )}
        </div>
      )}

    </div>
  );
}
