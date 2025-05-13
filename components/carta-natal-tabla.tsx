"use client";

/**
 * Componente para mostrar una tabla con los datos de la carta natal.
 * 
 * Este componente muestra dos tablas:
 * 1. Tabla de planetas: muestra el símbolo del planeta, signo, grados, casa y si es retrógrado
 * 2. Tabla de casas: muestra el número de casa, signo y grados de la cúspide
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Interfaz para los datos de la carta natal.
 * 
 * @property {Record<string, number[]>} planets - Objeto con las posiciones planetarias en grados (0-359).
 *                                               Si hay un segundo valor -0.1, indica retrogradación.
 * @property {number[]} cusps - Array de 12 valores numéricos representando las cúspides de las casas.
 */
interface CartaNatalTablaProps {
  chartData: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
}

// Mapeo de nombres de planetas a sus símbolos
const planetSymbols: Record<string, string> = {
  "Sun": "☉",
  "Moon": "☽",
  "Mercury": "☿",
  "Venus": "♀",
  "Mars": "♂",
  "Jupiter": "♃",
  "Saturn": "♄",
  "Uranus": "♅",
  "Neptune": "♆",
  "Pluto": "♇",
  "NNode": "☊",
  "Lilith": "⚸",
  "Chiron": "⚷"
};

// Mapeo de grados a signos zodiacales
const zodiacSigns: [string, number][] = [
  ["♈", 0],   // Aries
  ["♉", 30],  // Tauro
  ["♊", 60],  // Géminis
  ["♋", 90],  // Cáncer
  ["♌", 120], // Leo
  ["♍", 150], // Virgo
  ["♎", 180], // Libra
  ["♏", 210], // Escorpio
  ["♐", 240], // Sagitario
  ["♑", 270], // Capricornio
  ["♒", 300], // Acuario
  ["♓", 330]  // Piscis
];

/**
 * Convierte grados decimales a formato sexagesimal (grados y minutos)
 * 
 * @param {number} decimal - Grados en formato decimal
 * @returns {string} - Grados y minutos en formato "XX° XX'"
 */
function decimalToSexagesimal(decimal: number): string {
  // Normalizar a 0-360
  const normalizedDecimal = ((decimal % 360) + 360) % 360;
  
  // Obtener grados (parte entera)
  const degrees = Math.floor(normalizedDecimal);
  
  // Obtener minutos (parte decimal convertida a minutos)
  const minutes = Math.floor((normalizedDecimal - degrees) * 60);
  
  return `${degrees}° ${minutes.toString().padStart(2, '0')}'`;
}

/**
 * Determina el signo zodiacal basado en los grados
 * 
 * @param {number} degrees - Grados (0-359)
 * @returns {string} - Símbolo del signo zodiacal
 */
function getZodiacSign(degrees: number): string {
  // Normalizar a 0-360
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  
  // Encontrar el signo correspondiente
  for (let i = zodiacSigns.length - 1; i >= 0; i--) {
    if (normalizedDegrees >= zodiacSigns[i][1]) {
      return zodiacSigns[i][0];
    }
  }
  
  return zodiacSigns[0][0]; // Default a Aries si algo sale mal
}

/**
 * Determina en qué casa se encuentra un planeta basado en su posición
 * 
 * @param {number} position - Posición del planeta en grados (0-359)
 * @param {number[]} cusps - Array de cúspides de casas
 * @returns {number} - Número de casa (1-12)
 */
function getHouse(position: number, cusps: number[]): number {
  // Normalizar a 0-360
  const normalizedPosition = ((position % 360) + 360) % 360;
  
  // Verificar cada casa
  for (let i = 0; i < 12; i++) {
    const startCusp = cusps[i];
    const endCusp = cusps[(i + 1) % 12];
    
    // Si la casa cruza 0°
    if (startCusp > endCusp) {
      if (normalizedPosition >= startCusp || normalizedPosition < endCusp) {
        return i + 1;
      }
    } else {
      if (normalizedPosition >= startCusp && normalizedPosition < endCusp) {
        return i + 1;
      }
    }
  }
  
  return 1; // Default a casa 1 si algo sale mal
}

/**
 * Componente CartaNatalTabla que muestra los datos de la carta natal en formato de tabla.
 * 
 * @param {CartaNatalTablaProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene las tablas de datos.
 */
export function CartaNatalTabla({ chartData }: CartaNatalTablaProps) {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  useEffect(() => {
    // Cargar la fuente Astronomicon
    const font = new FontFace('Astronomicon', 'url(/fonts/Astronomicon.ttf)');
    
    font.load().then(() => {
      document.fonts.add(font);
      setFontLoaded(true);
    }).catch(err => {
      console.error('Error cargando la fuente Astronomicon:', err);
      // Usar símbolos Unicode como fallback
      setFontLoaded(true);
    });
  }, []);
  
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna de planetas */}
        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold">Planetas</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5">Planeta</TableHead>
                  <TableHead className="w-1/5">Signo</TableHead>
                  <TableHead className="w-1/5">Posición</TableHead>
                  <TableHead className="w-1/5">Casa</TableHead>
                  <TableHead className="w-1/5">Rx</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(chartData.planets).map(([planet, data]) => {
                  const position = data[0];
                  const isRetrograde = data.length > 1 && data[1] === -0.1;
                  const house = getHouse(position, chartData.cusps);
                  
                  return (
                    <TableRow key={planet}>
                      <TableCell className={fontLoaded ? "font-astronomicon" : ""}>
                        {planetSymbols[planet] || planet}
                      </TableCell>
                      <TableCell className={fontLoaded ? "font-astronomicon" : ""}>
                        {getZodiacSign(position)}
                      </TableCell>
                      <TableCell>{decimalToSexagesimal(position)}</TableCell>
                      <TableCell>{house}</TableCell>
                      <TableCell>{isRetrograde ? "Rx" : ""}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Columna de casas */}
        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold">Casas</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Casa</TableHead>
                  <TableHead className="w-1/3">Signo</TableHead>
                  <TableHead className="w-1/3">Posición</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chartData.cusps.map((cusp, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className={fontLoaded ? "font-astronomicon" : ""}>
                      {getZodiacSign(cusp)}
                    </TableCell>
                    <TableCell>{decimalToSexagesimal(cusp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
