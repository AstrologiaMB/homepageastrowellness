import React from 'react';
import { AstroSymbol } from '@/components/astro-symbol';

/**
 * Mapeo de símbolos de la fuente Astronomicon a nombres de planetas/signos
 */
const symbolToName: Record<string, { type: string; name: string }> = {
  // Planetas
  Q: { type: 'planet', name: 'Sun' },
  R: { type: 'planet', name: 'Moon' },
  S: { type: 'planet', name: 'Mercury' },
  T: { type: 'planet', name: 'Venus' },
  U: { type: 'planet', name: 'Mars' },
  V: { type: 'planet', name: 'Jupiter' },
  W: { type: 'planet', name: 'Saturn' },
  X: { type: 'planet', name: 'Uranus' },
  Y: { type: 'planet', name: 'Neptune' },
  Z: { type: 'planet', name: 'Pluto' },

  // Signos zodiacales
  A: { type: 'sign', name: 'Aries' },
  B: { type: 'sign', name: 'Taurus' },
  C: { type: 'sign', name: 'Gemini' },
  D: { type: 'sign', name: 'Cancer' },
  E: { type: 'sign', name: 'Leo' },
  F: { type: 'sign', name: 'Virgo' },
  G: { type: 'sign', name: 'Libra' },
  H: { type: 'sign', name: 'Scorpio' },
  I: { type: 'sign', name: 'Sagittarius' },
  J: { type: 'sign', name: 'Capricorn' },
  K: { type: 'sign', name: 'Aquarius' },
  L: { type: 'sign', name: 'Pisces' },

  // Ángulos
  c: { type: 'angle', name: 'ASC' },
  d: { type: 'angle', name: 'MC' },
  e: { type: 'angle', name: 'IC' },
  f: { type: 'angle', name: 'DSC' },

  // Puntos lunares
  g: { type: 'lunar', name: 'NNode' },
  i: { type: 'lunar', name: 'SNode' },
  '>': { type: 'lunar', name: 'Lilith' },

  // Asteroides
  q: { type: 'asteroid', name: 'Chiron' },

  // Aspectos
  '!': { type: 'aspect', name: 'Conjunction' },
  '#': { type: 'aspect', name: 'Square' },
  '%': { type: 'aspect', name: 'Sextile' },
  $: { type: 'aspect', name: 'Trine' },
  '"': { type: 'aspect', name: 'Opposition' },
};

/**
 * Mapeo de nombres en español a inglés para compatibilidad
 */
const _spanishToEnglish: Record<string, string> = {
  Sol: 'Sun',
  Luna: 'Moon',
  Mercurio: 'Mercury',
  Venus: 'Venus',
  Marte: 'Mars',
  Júpiter: 'Jupiter',
  Saturno: 'Saturn',
  Urano: 'Uranus',
  Neptuno: 'Neptune',
  Plutón: 'Pluto',
  Aries: 'Aries',
  Tauro: 'Taurus',
  Géminis: 'Gemini',
  Cáncer: 'Cancer',
  Leo: 'Leo',
  Virgo: 'Virgo',
  Libra: 'Libra',
  Escorpio: 'Scorpio',
  Sagitario: 'Sagittarius',
  Capricornio: 'Capricorn',
  Acuario: 'Aquarius',
  Piscis: 'Pisces',
};

/**
 * Parsea texto que contiene símbolos astrológicos y los convierte en componentes React
 *
 * @param text - Texto que puede contener símbolos astrológicos
 * @returns Array de elementos React (texto y componentes AstroSymbol)
 */
export function parseAstroText(text: string): React.ReactNode[] {
  if (!text) return [text];

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  // Patrón para detectar símbolos seguidos de nombres
  // Busca: [Símbolo] [Espacio opcional] [Nombre en español/inglés]
  const symbolPattern = /([QRSTUVWXYZABCDEFGHIJKL>cdefgiq!#%$"])\s*([A-Za-záéíóúñÑ]+)/g;

  let match;
  while ((match = symbolPattern.exec(text)) !== null) {
    const [fullMatch, symbol, name] = match;
    const symbolInfo = symbolToName[symbol];

    if (symbolInfo) {
      // Agregar texto antes del símbolo
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }

      // Agregar el componente AstroSymbol
      result.push(
        <span key={`astro-${keyCounter++}`} className="inline-flex items-center">
          <AstroSymbol type={symbolInfo.type as any} name={symbolInfo.name} />
          <span className="ml-1">{name}</span>
        </span>
      );

      lastIndex = match.index + fullMatch.length;
    }
  }

  // Agregar texto restante
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? result : [text];
}

/**
 * Componente que renderiza texto con símbolos astrológicos parseados
 */
interface AstroTextProps {
  children: string;
  className?: string;
}

export function AstroText({ children, className = '' }: AstroTextProps) {
  const parsedContent = parseAstroText(children);

  return <span className={className}>{parsedContent}</span>;
}
