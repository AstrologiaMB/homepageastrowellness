/**
 * Utilidades para cálculos astrológicos
 */

/**
 * Convierte grados decimales a formato astrológico (grados° minutos' segundos")
 *
 * @param decimalDegrees - Grados en formato decimal (ej: 12.669442120888988)
 * @returns String en formato astrológico (ej: "12° 40' 10"")
 */
export function formatAstrologicalDegrees(decimalDegrees: number): string {
  const degrees = Math.floor(decimalDegrees);
  const decimalMinutes = (decimalDegrees - degrees) * 60;
  const minutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - minutes) * 60);

  return `${degrees}° ${minutes}' ${seconds}"`;
}

/**
 * Formatea orbe de aspecto en formato astrológico
 *
 * @param orbeGrados - Parte entera de grados del orbe
 * @param orbeMinutos - Parte decimal convertida a minutos
 * @returns String en formato "X°Y'"
 */
export function formatOrbe(orbeGrados: number, orbeMinutos: number): string {
  return `${orbeGrados}°${orbeMinutos}'`;
}

/**
 * Convierte grados decimales a minutos y segundos (útil para orbes)
 *
 * @param decimalDegrees - Grados decimales
 * @returns Objeto con grados, minutos y segundos
 */
export function degreesToGMS(decimalDegrees: number): {
  degrees: number;
  minutes: number;
  seconds: number;
} {
  const degrees = Math.floor(decimalDegrees);
  const decimalMinutes = (decimalDegrees - degrees) * 60;
  const minutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - minutes) * 60);

  return { degrees, minutes, seconds };
}
