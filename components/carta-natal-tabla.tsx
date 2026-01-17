'use client';

/**
 * Componente para mostrar una tabla con los datos de la carta natal.
 *
 * Este componente muestra dos tablas:
 * 1. Tabla de planetas: muestra el símbolo del planeta, signo, grados, casa y si es retrógrado
 * 2. Tabla de casas: muestra el número de casa, signo y grados de la cúspide
 *
 * @author Astrochat Team
 * @version 1.0.0
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AstroSymbol } from '@/components/astro-symbol';

/**
 * Interfaz para los datos completos de la carta natal.
 *
 * @property {Record<string, any>} points - Objeto con las posiciones planetarias completas.
 * @property {Record<string, any>} houses - Objeto con las casas astrológicas.
 */
interface CartaNatalTablaProps {
  chartData: {
    points: Record<string, any>;
    houses: Record<string, any>;
  };
}

// Mapeo de grados a nombres de signos zodiacales
const zodiacSignNames: [string, number][] = [
  ['Aries', 0],
  ['Taurus', 30],
  ['Gemini', 60],
  ['Cancer', 90],
  ['Leo', 120],
  ['Virgo', 150],
  ['Libra', 180],
  ['Scorpio', 210],
  ['Sagittarius', 240],
  ['Capricorn', 270],
  ['Aquarius', 300],
  ['Pisces', 330],
];

/**
 * Convierte grados decimales a formato sexagesimal (grados y minutos)
 * relativos al signo zodiacal
 *
 * @param {number} decimal - Grados en formato decimal (0-359)
 * @returns {string} - Grados y minutos en formato "XX° XX'" (0-29°)
 */
function decimalToSexagesimal(decimal: number): string {
  // Normalizar a 0-360
  const normalizedDecimal = ((decimal % 360) + 360) % 360;

  // Obtener grados relativos al signo (0-29)
  const relativePosition = normalizedDecimal % 30;

  // Obtener grados (parte entera)
  const degrees = Math.floor(relativePosition);

  // Obtener minutos (parte decimal convertida a minutos)
  const minutes = Math.round((relativePosition - degrees) * 60);

  // Manejar el caso donde los minutos son 60 (redondear al siguiente grado)
  if (minutes === 60) {
    return `${degrees + 1}° 00'`;
  }

  return `${degrees}° ${minutes.toString().padStart(2, '0')}'`;
}

/**
 * Determina el nombre del signo zodiacal basado en los grados
 *
 * @param {number} degrees - Grados (0-359)
 * @returns {string} - Nombre del signo zodiacal
 */
function getZodiacSignName(degrees: number): string {
  // Normalizar a 0-360
  const normalizedDegrees = ((degrees % 360) + 360) % 360;

  // Encontrar el signo correspondiente
  for (let i = zodiacSignNames.length - 1; i >= 0; i--) {
    if (normalizedDegrees >= zodiacSignNames[i][1]) {
      return zodiacSignNames[i][0];
    }
  }

  return zodiacSignNames[0][0]; // Default a Aries si algo sale mal
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
  // Validación defensiva: verificar que chartData tiene la estructura esperada
  if (!chartData || !chartData.points || !chartData.houses) {
    return (
      <div className="mt-8">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              No hay datos de carta natal disponibles para mostrar.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Validación adicional: verificar que points y houses son objetos
  if (typeof chartData.points !== 'object' || typeof chartData.houses !== 'object') {
    return (
      <div className="mt-8">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <p className="text-center text-red-500">
              Error: Los datos de la carta natal tienen un formato incorrecto.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extraer cúspides de las casas para calcular posiciones
  const cusps = Object.values(chartData.houses).map((house: any) => house.longitude);

  // Filtrar solo los planetas principales (excluir ángulos)
  const planetNames = [
    'Sun',
    'Moon',
    'Mercury',
    'Venus',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
    'Pluto',
    'True North Node',
    'Lilith',
    'Chiron',
  ];
  const planets = Object.entries(chartData.points).filter(([name]) => planetNames.includes(name));

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna de planetas */}
        <Card className="shadow-md border border-purple-200 dark:border-purple-500/30
          bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5
          hover:shadow-md transition-all duration-200">
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
                {planets.map(([planetName, planetData]: [string, any]) => {
                  const position = planetData.longitude;
                  const isRetrograde = planetData.retrograde;
                  const house = getHouse(position, cusps);
                  const signName = planetData.sign;

                  // Debug logging para verificar conversiones
                  if (planetName === 'Sun' || planetName === 'Moon') {
                    console.log(
                      `${planetName}: ${position}° → ${signName} ${decimalToSexagesimal(position)} Casa ${house}`
                    );
                  }

                  // Mapear nombres para compatibilidad con AstroSymbol
                  const symbolName = planetName === 'True North Node' ? 'NNode' : planetName;

                  return (
                    <TableRow key={planetName}>
                      <TableCell>
                        {symbolName === 'NNode' ? (
                          <AstroSymbol type="lunar" name={symbolName} />
                        ) : symbolName === 'Lilith' ? (
                          <AstroSymbol type="lunar" name={symbolName} />
                        ) : symbolName === 'Chiron' ? (
                          <AstroSymbol type="asteroid" name={symbolName} />
                        ) : (
                          <AstroSymbol type="planet" name={symbolName} />
                        )}
                      </TableCell>
                      <TableCell>
                        <AstroSymbol type="sign" name={signName} />
                      </TableCell>
                      <TableCell>{decimalToSexagesimal(position)}</TableCell>
                      <TableCell>
                        {house === 1 ? (
                          <AstroSymbol type="angle" name="ASC" />
                        ) : house === 4 ? (
                          <AstroSymbol type="angle" name="IC" />
                        ) : house === 7 ? (
                          <AstroSymbol type="angle" name="DSC" />
                        ) : house === 10 ? (
                          <AstroSymbol type="angle" name="MC" />
                        ) : (
                          house
                        )}
                      </TableCell>
                      <TableCell>{isRetrograde ? 'Rx' : ''}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Columna de casas */}
        <Card className="shadow-md border border-pink-200 dark:border-pink-500/30
          bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-500/5 dark:to-rose-500/5
          hover:shadow-md transition-all duration-200">
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
                {cusps.map((cusp: number, index: number) => {
                  const signName = getZodiacSignName(cusp);

                  // Determinar si es un ángulo astrológico principal
                  let houseLabel;
                  switch (index) {
                    case 0:
                      houseLabel = <AstroSymbol type="angle" name="ASC" />;
                      break;
                    case 3:
                      houseLabel = <AstroSymbol type="angle" name="IC" />;
                      break;
                    case 6:
                      houseLabel = <AstroSymbol type="angle" name="DSC" />;
                      break;
                    case 9:
                      houseLabel = <AstroSymbol type="angle" name="MC" />;
                      break;
                    default:
                      houseLabel = index + 1;
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell>{houseLabel}</TableCell>
                      <TableCell>
                        <AstroSymbol type="sign" name={signName} />
                      </TableCell>
                      <TableCell>{decimalToSexagesimal(cusp)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
