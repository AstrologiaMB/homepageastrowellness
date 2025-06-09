"use client";

/**
 * Componente para mostrar las interpretaciones de una carta natal.
 * 
 * Este componente muestra las interpretaciones de una carta natal en formato de tarjetas,
 * organizadas por categorías (planetas en signos, planetas en casas, aspectos).
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AstroSymbol } from "@/components/astro-symbol";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mapeos de traducción español a inglés
const planetaAIngles: Record<string, string> = {
  "Sol": "Sun",
  "Luna": "Moon",
  "Mercurio": "Mercury",
  "Venus": "Venus",
  "Marte": "Mars",
  "Júpiter": "Jupiter",
  "Saturno": "Saturn",
  "Urano": "Uranus",
  "Neptuno": "Neptune",
  "Plutón": "Pluto",
  "NNodo": "NNode",
  "SNodo": "SNode",
  "Lilith": "Lilith",
  "Quirón": "Chiron"
};

const signoAIngles: Record<string, string> = {
  "Aries": "Aries",
  "Tauro": "Taurus",
  "Géminis": "Gemini",
  "Cáncer": "Cancer",
  "Leo": "Leo",
  "Virgo": "Virgo",
  "Libra": "Libra",
  "Escorpio": "Scorpio",
  "Sagitario": "Sagittarius",
  "Capricornio": "Capricorn",
  "Acuario": "Aquarius",
  "Piscis": "Pisces"
};

const aspectoAIngles: Record<string, string> = {
  "Conjunción": "Conjunction",
  "Cuadratura": "Square",
  "Sextil": "Sextile",
  "Trígono": "Trine",
  "Oposición": "Opposition",
  "Quincuncio": "Quincunx",
  "Semisextil": "Semisextile"
};

/**
 * Función auxiliar para traducir nombres de español a inglés.
 * 
 * @param {string | undefined} nombre - Nombre en español a traducir.
 * @param {Record<string, string>} mapa - Mapa de traducción a utilizar.
 * @returns {string} - Nombre traducido al inglés o el nombre original si no se encuentra en el mapa.
 */
const traducirNombre = (nombre: string | undefined, mapa: Record<string, string>): string => {
  if (!nombre) return "";
  return mapa[nombre] || nombre; // Si no está en el mapa, devolver el nombre original
};

/**
 * Determina el tipo correcto de símbolo astrológico basado en el nombre.
 * 
 * @param {string | undefined} nombre - Nombre del elemento astrológico.
 * @returns {[string, string]} - Tupla con [tipo, nombre] para usar en AstroSymbol.
 */
const determinarTipoYNombre = (nombre: string | undefined): [string, string] => {
  if (!nombre) return ["planet", ""];
  
  // Casos especiales para ángulos astrológicos
  if (nombre === "Ascendente") return ["angle", "ASC"];
  if (nombre === "Medio Cielo" || nombre === "MC") return ["angle", "MC"];
  if (nombre === "Descendente") return ["angle", "DSC"];
  if (nombre === "Fondo del Cielo" || nombre === "IC") return ["angle", "IC"];
  
  // Nodos y Lilith
  if (nombre === "Nodo Norte" || nombre === "NNodo") return ["lunar", "NNode"];
  if (nombre === "Nodo Sur" || nombre === "SNodo") return ["lunar", "SNode"];
  if (nombre === "Lilith") return ["lunar", "Lilith"];
  
  // Quirón
  if (nombre === "Quirón") return ["asteroid", "Chiron"];
  
  // Por defecto, asumir que es un planeta y traducirlo
  return ["planet", traducirNombre(nombre, planetaAIngles)];
};

/**
 * Interfaz para una interpretación individual.
 */
interface Interpretacion {
  titulo: string;
  tipo: string;
  interpretacion: string;
  planeta?: string;
  signo?: string;
  grados?: string;
  casa?: number;
  planeta1?: string;
  planeta2?: string;
  aspecto?: string;
}

/**
 * Interfaz para los datos de interpretación de la carta natal.
 */
interface InterpretacionData {
  titulo: string;
  tipo: string;
  llm: string;
  interpretaciones: Interpretacion[];
}

/**
 * Interfaz para las propiedades del componente CartaNatalInterpretacion.
 */
interface CartaNatalInterpretacionProps {
  interpretacionData: InterpretacionData;
}

/**
 * Componente CartaNatalInterpretacion que muestra las interpretaciones de una carta natal.
 * 
 * @param {CartaNatalInterpretacionProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene las interpretaciones.
 */
export function CartaNatalInterpretacion({ interpretacionData }: CartaNatalInterpretacionProps) {
  // Estado para controlar qué tarjetas están expandidas
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  /**
   * Función para alternar el estado de expansión de una tarjeta.
   * 
   * @param {string} id - Identificador único de la tarjeta.
   */
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  /**
   * Función para renderizar el contenido de una tarjeta con texto expandible.
   * 
   * @param {Interpretacion} item - Datos de la interpretación.
   * @param {string} id - Identificador único de la tarjeta.
   * @returns {JSX.Element} - Elemento JSX con el contenido de la tarjeta.
   */
  const renderCardContent = (item: Interpretacion, id: string) => {
    const isExpanded = expandedCards[id] || false;
    const text = item.interpretacion;
    
    // Si el texto es corto, mostrarlo completo
    if (text.length < 150) {
      return <p className="text-sm">{text}</p>;
    }
    
    // Si el texto es largo, mostrar un resumen o el texto completo según el estado
    return (
      <>
        <p className="text-sm">
          {isExpanded ? text : `${text.substring(0, 150)}...`}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => toggleCard(id)}
          className="mt-2 flex items-center text-xs"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Ver más
            </>
          )}
        </Button>
      </>
    );
  };

  // Filtrar interpretaciones por tipo
  const planetasEnSignos = interpretacionData.interpretaciones.filter(
    item => item.tipo === "PlanetaEnSigno"
  );
  
  const planetasEnCasas = interpretacionData.interpretaciones.filter(
    item => item.tipo === "PlanetaEnCasa"
  );
  
  const aspectos = interpretacionData.interpretaciones.filter(
    item => item.tipo === "Aspecto"
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Interpretación de tu Carta Natal</h2>
      
      {/* Sección de Planetas en Signos */}
      {planetasEnSignos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Planetas en Signos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planetasEnSignos.map((item, index) => (
              <Card key={`signo-${index}`} className="shadow-md">
                <CardHeader className="pb-2">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    {(() => {
                      const [tipo, nombre] = determinarTipoYNombre(item.planeta);
                      return (
                        <div className="flex items-center">
                          <span className="text-xl">
                            <AstroSymbol type={tipo as any} name={nombre} />
                          </span>
                          <span className="text-xs ml-1">({item.planeta})</span>
                        </div>
                      );
                    })()}
                    <span className="mx-1">en</span>
                    <div className="flex items-center">
                      <span className="text-xl">
                        <AstroSymbol type="sign" name={traducirNombre(item.signo, signoAIngles)} />
                      </span>
                      <span className="text-xs ml-1">({item.signo})</span>
                    </div>
                  </h4>
                </CardHeader>
                <CardContent>
                  {renderCardContent(item, `signo-${index}`)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Sección de Planetas en Casas */}
      {planetasEnCasas.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Planetas en Casas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planetasEnCasas.map((item, index) => (
              <Card key={`casa-${index}`} className="shadow-md">
                <CardHeader className="pb-2">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    {(() => {
                      const [tipo, nombre] = determinarTipoYNombre(item.planeta);
                      return (
                        <div className="flex items-center">
                          <span className="text-xl">
                            <AstroSymbol type={tipo as any} name={nombre} />
                          </span>
                          <span className="text-xs ml-1">({item.planeta})</span>
                        </div>
                      );
                    })()}
                    <span className="mx-1">en Casa</span>
                    <span>{item.casa}</span>
                  </h4>
                </CardHeader>
                <CardContent>
                  {renderCardContent(item, `casa-${index}`)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Sección de Aspectos */}
      {aspectos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Aspectos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aspectos.map((item, index) => (
              <Card key={`aspecto-${index}`} className="shadow-md">
                <CardHeader className="pb-2">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    {(() => {
                      const [tipo1, nombre1] = determinarTipoYNombre(item.planeta1);
                      return (
                        <div className="flex items-center">
                          <span className="text-xl">
                            <AstroSymbol type={tipo1 as any} name={nombre1} />
                          </span>
                          <span className="text-xs ml-1">({item.planeta1})</span>
                        </div>
                      );
                    })()}
                    <span className="mx-1 text-xl">
                      <AstroSymbol type="aspect" name={traducirNombre(item.aspecto, aspectoAIngles)} />
                    </span>
                    {(() => {
                      const [tipo2, nombre2] = determinarTipoYNombre(item.planeta2);
                      return (
                        <div className="flex items-center">
                          <span className="text-xl">
                            <AstroSymbol type={tipo2 as any} name={nombre2} />
                          </span>
                          <span className="text-xs ml-1">({item.planeta2})</span>
                        </div>
                      );
                    })()}
                  </h4>
                </CardHeader>
                <CardContent>
                  {renderCardContent(item, `aspecto-${index}`)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
