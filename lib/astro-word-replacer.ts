/**
 * Función para reemplazar palabras astrológicas completas con sus símbolos correspondientes.
 * 
 * A diferencia del AstroText parser que convertía letras individuales,
 * esta función reemplaza palabras completas para evitar conversiones incorrectas.
 * 
 * @author Astrowellness Team
 * @version 1.0.0
 */

/**
 * Mapeo de planetas en español a sus letras Astronomicon
 */
const planetSymbols: Record<string, string> = {
  'Sol': 'Q',
  'Luna': 'R', 
  'Mercurio': 'S',
  'Venus': 'T',
  'Marte': 'U',
  'Júpiter': 'V',
  'Saturno': 'W',
  'Urano': 'X',
  'Neptuno': 'Y',
  'Plutón': 'Z'
};

/**
 * Mapeo de signos zodiacales en español a sus letras Astronomicon
 */
const signSymbols: Record<string, string> = {
  'Aries': 'A',
  'Tauro': 'B',
  'Géminis': 'C',
  'Cáncer': 'D',
  'Leo': 'E',
  'Virgo': 'F',
  'Libra': 'G',
  'Escorpio': 'H',
  'Sagitario': 'I',
  'Capricornio': 'J',
  'Acuario': 'K',
  'Piscis': 'L'
};

/**
 * Reemplaza palabras astrológicas completas con sus símbolos correspondientes.
 * Solo reemplaza planetas y signos zodiacales, nada más.
 * 
 * @param text - Texto que contiene nombres de planetas y signos
 * @returns Texto con las palabras reemplazadas por letras Astronomicon
 */
export function replaceAstroWords(text: string): string {
  if (!text) return text;
  
  let result = text;
  
  // Reemplazar planetas (usar \b para límites de palabra)
  Object.entries(planetSymbols).forEach(([word, symbol]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    result = result.replace(regex, symbol);
  });
  
  // Reemplazar signos zodiacales
  Object.entries(signSymbols).forEach(([word, symbol]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    result = result.replace(regex, symbol);
  });
  
  return result;
}

/**
 * Versión que solo reemplaza planetas (para casos específicos)
 */
export function replacePlanetWords(text: string): string {
  if (!text) return text;
  
  let result = text;
  
  Object.entries(planetSymbols).forEach(([word, symbol]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    result = result.replace(regex, symbol);
  });
  
  return result;
}

/**
 * Versión que solo reemplaza signos (para casos específicos)
 */
export function replaceSignWords(text: string): string {
  if (!text) return text;
  
  let result = text;
  
  Object.entries(signSymbols).forEach(([word, symbol]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    result = result.replace(regex, symbol);
  });
  
  return result;
}
