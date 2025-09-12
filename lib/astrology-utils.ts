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

/**
 * Obtiene el sufijo dracónico correcto según el género gramatical del planeta
 *
 * @param planet - Nombre del planeta en inglés
 * @returns Sufijo con género correcto (" dracónico" o " dracónica")
 */
export function getDraconicSuffix(planet: string): string {
  // Luna es femenino, todos los demás planetas son masculinos
  return planet === "Moon" ? " dracónica" : " dracónico";
}

/**
 * Traduce signos astrológicos del inglés al español
 *
 * @param sign - Nombre del signo en inglés
 * @returns Nombre del signo en español
 */
export function translateSign(sign: string): string {
  const translations: Record<string, string> = {
    "Aries": "Aries",
    "Taurus": "Tauro",
    "Gemini": "Géminis",
    "Cancer": "Cáncer",
    "Leo": "Leo",
    "Virgo": "Virgo",
    "Libra": "Libra",
    "Scorpio": "Escorpio",
    "Sagittarius": "Sagitario",
    "Capricorn": "Capricornio",
    "Aquarius": "Acuario",
    "Pisces": "Piscis"
  };

  return translations[sign] || sign;
}

/**
 * Traduce nombres de planetas del inglés al español
 *
 * @param planet - Nombre del planeta en inglés
 * @returns Nombre del planeta en español
 */
export function translatePlanet(planet: string): string {
  const translations: Record<string, string> = {
    "Sun": "Sol",
    "Moon": "Luna",
    "Mercury": "Mercurio",
    "Venus": "Venus",
    "Mars": "Marte",
    "Jupiter": "Júpiter",
    "Saturn": "Saturno",
    "Uranus": "Urano",
    "Neptune": "Neptuno",
    "Pluto": "Plutón",
    "True North Node": "Nodo Norte Verdadero"
  };

  return translations[planet] || planet;
}

/**
 * Traduce tipos de aspectos astrológicos del inglés al español
 *
 * @param aspect - Nombre del aspecto en inglés
 * @returns Nombre del aspecto en español
 */
export function translateAspect(aspect: string): string {
  const translations: Record<string, string> = {
    "conjunction": "conjunción",
    "opposition": "oposición",
    "trine": "trígono",
    "square": "cuadratura",
    "sextile": "sextil"
  };

  return translations[aspect] || aspect;
}
