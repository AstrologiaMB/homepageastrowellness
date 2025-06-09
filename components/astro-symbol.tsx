"use client";

/**
 * Componente para mostrar símbolos astrológicos utilizando la fuente Astronomicon.
 * 
 * Este componente mapea nombres de planetas y signos zodiacales a los caracteres
 * correspondientes en la fuente Astronomicon.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

/**
 * Interfaz para las propiedades del componente AstroSymbol.
 * 
 * @property {string} type - Tipo de símbolo ('planet', 'sign', 'angle', 'aspect', 'lunar', 'asteroid', 'dwarf', 'uranian' o 'point').
 * @property {string} name - Nombre del planeta, signo, ángulo, etc.
 */
interface AstroSymbolProps {
  type: 'planet' | 'sign' | 'angle' | 'aspect' | 'lunar' | 'asteroid' | 'dwarf' | 'uranian' | 'point';
  name: string;
}

// Mapeo de nombres de planetas a sus símbolos en la fuente Astronomicon
const planetMap: Record<string, string> = {
  "Sun": "Q",     // Sol
  "Moon": "R",    // Luna
  "Mercury": "S", // Mercurio
  "Venus": "T",   // Venus
  "Mars": "U",    // Marte
  "Jupiter": "V", // Júpiter
  "Saturn": "W",  // Saturno
  "Uranus": "X",  // Urano
  "Neptune": "Y", // Neptuno
  "Pluto": "Z"    // Plutón
};

// Mapeo de nombres de signos zodiacales a sus símbolos en la fuente Astronomicon
const signMap: Record<string, string> = {
  "Aries": "A",
  "Taurus": "B",
  "Gemini": "C",
  "Cancer": "D",
  "Leo": "E",
  "Virgo": "F",
  "Libra": "G",
  "Scorpio": "H",
  "Sagittarius": "I",
  "Capricorn": "J",
  "Aquarius": "K",
  "Pisces": "L"
};

// Mapeo de ángulos astrológicos a sus símbolos en la fuente Astronomicon
const angleMap: Record<string, string> = {
  "ASC": "c", // Ascendente
  "MC": "d",  // Medium Coeli (Medio Cielo)
  "DSC": "f", // Descendente
  "IC": "e"   // Imum Coeli (Fondo del Cielo)
};

// Mapeo de puntos lunares y Lilith a sus símbolos en la fuente Astronomicon
const lunarMap: Record<string, string> = {
  "NNode": "g", // Nodo Norte
  "SNode": "i", // Nodo Sur
  "Lilith": ">" // Luna Negra
};

// Mapeo de asteroides principales a sus símbolos en la fuente Astronomicon
const asteroidMap: Record<string, string> = {
  "Ceres": "l",   // Ceres
  "Pallas": "m",  // Pallas
  "Juno": "n",    // Juno
  "Vesta": "o",   // Vesta
  "Hygiea": "p",  // Hygiea
  "Chiron": "q",  // Quirón
  "Pholus": "r"   // Pholus
};

// Mapeo de planetas enanos a sus símbolos en la fuente Astronomicon
const dwarfMap: Record<string, string> = {
  "Eris": "s",      // Eris
  "Haumea": "t",    // Haumea
  "Makemake": "u",  // Makemake
  "Gonggong": "v",  // Gonggong
  "Quaoar": "w",    // Quaoar
  "Sedna": "x",     // Sedna
  "Orcus": "y"      // Orcus
};

// Mapeo de puntos uranianos a sus símbolos en la fuente Astronomicon
const uranianMap: Record<string, string> = {
  "Cupido": "¡",    // Cupido
  "Hades": "¢",     // Hades
  "Zeus": "£",      // Zeus
  "Kronos": "¤",    // Kronos
  "Apollon": "¥",   // Apollon
  "Admetos": "¦",   // Admetos
  "Vulcanus": "§",  // Vulcanus
  "Poseidon": "¨"   // Poseidón
};

// Mapeo de aspectos astrológicos a sus símbolos en la fuente Astronomicon
const aspectMap: Record<string, string> = {
  "Conjunction": "!",       // Conjunción
  "Square": "#",            // Cuadratura
  "Sextile": "%",           // Sextil
  "Trine": "$",             // Trígono
  "Opposition": "\"",       // Oposición
  "Quincunx": "&",          // Quincuncio
  "Semisextile": "'",       // Semisextil
  "Semisquare": "(",        // Semicuadratura
  "Sesquisquare": ")",      // Sesquicuadratura
  "Quintile": "·",          // Quintil
  "Biquintile": "*",        // Biquintil
  "Semiquintile": ",",      // Semiquintil
  "Quindecile": "¸"         // Quindecil
};

// Mapeo de puntos y subíndices a sus símbolos en la fuente Astronomicon
const pointMap: Record<string, string> = {
  "East": "j",        // Punto Este
  "Vertex": "k",      // Vértice
  "Radix": "M",       // Radix/Subíndice
  "Retrograde": "N",  // Retrógrado
  "Transit": "O",     // Tránsito
  "Progressed": "P"   // Progresado
};

/**
 * Componente AstroSymbol que muestra símbolos astrológicos usando la fuente Astronomicon.
 * 
 * @param {AstroSymbolProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que contiene el símbolo astrológico.
 */
export function AstroSymbol({ type, name }: AstroSymbolProps) {
  
  // Seleccionar el mapa adecuado según el tipo
  let map: Record<string, string>;
  switch (type) {
    case 'planet':
      map = planetMap;
      break;
    case 'sign':
      map = signMap;
      break;
    case 'angle':
      map = angleMap;
      break;
    case 'lunar':
      map = lunarMap;
      break;
    case 'asteroid':
      map = asteroidMap;
      break;
    case 'dwarf':
      map = dwarfMap;
      break;
    case 'uranian':
      map = uranianMap;
      break;
    case 'aspect':
      map = aspectMap;
      break;
    case 'point':
      map = pointMap;
      break;
    default:
      map = planetMap;
  }
  
  // Obtener el símbolo correspondiente o usar el nombre como fallback
  const symbol = map[name] || name;
  
  return (
    <span className="font-astronomicon text-lg leading-none inline-block">
      {symbol}
    </span>
  );
}
