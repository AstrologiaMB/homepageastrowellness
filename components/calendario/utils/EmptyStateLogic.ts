/**
 * Lógica para generar estados vacíos contextuales en el calendario astrológico.
 *
 * Este módulo contiene funciones para determinar qué mensaje mostrar cuando
 * un día no tiene eventos astrológicos, considerando contexto como:
 * - Día de la semana
 * - Día del mes (para rotación)
 * - Mes del año
 * - Temas astrológicos específicos (fin de año, eclipses próximos, etc.)
 */

export interface EmptyStateData {
  icon: string;
  title: string;
  subtitle?: string;
  context: 'daily' | 'weekly' | 'monthly' | 'eclipse' | 'reflection' | 'activity';
}

// Mapa de mensajes contextuales por día del mes (rotación para evitar repetición)
const ROTATION_MESSAGES: Record<number, { title: string; subtitle?: string }> = {
  1: { title: "🌅 Nuevo mes, nuevas energías", subtitle: "Momento ideal para plantear intenciones" },
  2: { title: "⭐ Comienzo de mes tranquilo", subtitle: "Configura tus intenciones astrológicas" },
  3: { title: "🌙 Día de adaptación energética", subtitle: "Las lunas nuevas requieren silencio interior" },
  4: { title: "🔮 Tiempo de preparación cósmica", subtitle: "El universo está tomando aliento" },
  5: { title: "🌀 Desarrollo interno sutil", subtitle: "Los cambios importantes son internos primero" },
  6: { title: "🌿 Trepando hacia el clímax semanal", subtitle: "¿Qué semillas plantamos esta mañana?" },
  7: { title: "⚡ Día de descanso planetario", subtitle: "Los astros también necesitan regenerarse" },
  8: { title: "📈 Construcción de energía lenta", subtitle: "Cada día agrega al ciclo lunar" },
  9: { title: "🌈 Día de potencial latente", subtitle: "¿Qué colores trae tu intuición hoy?" },
  10: { title: "⚖️ Equilibrio cósmico establecido", subtitle: "Día de encontrar el centro astrológico" },
  11: { title: "🚀 Preparación para transformación", subtitle: "Los números maestros traen cambios profundos" },
  12: { title: "⭐ Día de concreción espiritual", subtitle: "12 como manifestación, tiempo de acción" },
  13: { title: "🔄 Regeneración y reciclaje", subtitle: "Después viene el 13 lunar transformador" },
  14: { title: "🌙 Clímax lunar cercano", subtitle: "Gran luna llena se aproxima - sientes la tensión?" },
  15: { title: "🏔️ Día de estabilidad astrológica", subtitle: "Centro del mes, tiempo de consolidar" },
  16: { title: "🌌 Día de expansión cósmica", subtitle: "¿Qué limita tu expansión planetaria?" },
  17: { title: "⚡ Energía revolucionaria del 17", subtitle: "Día de tomar decisiones importantes" },
  18: { title: "🌟 Vísperas del clímax mensual", subtitle: "18 precede al gran final del mes" },
  19: { title: "🌀 Día de transformación interna", subtitle: "19 como katún maya de recapitulación" },
  20: { title: "⭐ Día poderoso de manifestación", subtitle: "20 destapa la creatividad universal" },
  21: { title: "🌅 Víspera de eclipse posible", subtitle: "¿Sientes la energía hiperalta preparándose?" },
  22: { title: "🔮 Día maestro del despertar", subtitle: "22 como claridad y visión superior" },
  23: { title: "🌀 Día de transformación final", subtitle: "23 precede al descanso del 24 lunar" },
  24: { title: "🌙 Día de descanso luengo", subtitle: "Descanso cósmico antes del nuevo mes" },
  25: { title: "🌟 Día de gratitud lunar" },
  26: { title: "🌀 Últimos coletazos del mes", subtitle: "Aprovecha la energía que queda" },
  27: { title: "🌿 Día de cierre armónico", subtitle: "Últimas fases del ciclo se integran" },
  28: { title: "⚡ Día de síntesis mental", subtitle: "30 menos 2: tiempo de abrigos finales" },
  29: { title: "🌙 Día colérico si existe", subtitle: "Luna negra intensa si el mes lo permite" },
  30: { title: "🌅 Transferencia de poder lunar", subtitle: "Cierre completo de ciclo" },
  31: { title: "⭐ fin de mes excepcional", subtitle: "Raros pero potentes días finales" },
};

// Mensajes especiales por mes
const MONTHLY_CONTEXT: Record<number, { title: string; subtitle: string }> = {
  0: { title: "❄️ Invierno cósmicamente activo", subtitle: "Enero polariza y enseña" },
  1: { title: "💝 Febrero romántico-interno", subtitle: "¿Qué patrones románticos se activan?" },
  2: { title: "🌱 Marzo de sembrar semillas", subtitle: "Plantando intenciones equinocciales" },
  3: { title: "🔥 Abril fogoso-estable", subtitle: "Energías taurinas de manifestación" },
  4: { title: "🌸 Mayo floreciente", subtitle: "Geminis comunica asuntos taúricos" },
  5: { title: "☀️ Junio vibrante de emociones", subtitle: "Cáncer prepara el clímax del año" },
  6: { title: "🏖️ Julio creativo-intenso", subtitle: "León expande mientras llega el eclipse" },
  7: { title: "🌾 Agosto cosechando riquezas", subtitle: "Virgo purifica antes del equinoccio" },
  8: { title: "⚖️ Setiembre balanceado-justo", subtitle: "Libra busca equilibrio equinoccial" },
  9: { title: "🦂 Octubre plutónico-misterioso", subtitle: "Escorpio profundiza transformaciones" },
  10: { title: "🦃 Noviembre expresivo-abundante", subtitle: "Sagitario expande en abundancia" },
  11: { title: "🎄 Diciembre concluyente", subtitle: "Capricornio finaliza ciclos importantes" },
};

// Días especiales del año (para sobrescribir mensajes normales)
const SPECIAL_DAYS: Record<string, EmptyStateData> = {
  "12-21": { icon: "⭐", title: "🌅 Víspera del solsticio invernal", subtitle: "La energía más baja del año - descanso profundo", context: "eclipse" },
  "12-22": { icon: "🌟", title: "☽ Solsticio invernal comienza", subtitle: "Día cero astrológico - portal de reinicio", context: "eclipse" },
  "12-23": { icon: "🔮", title: "🌀 Análisis post-solsticio", subtitle: "¿Qué reveló el portal energético?", context: "reflection" },
  "12-31": { icon: "🌅", title: "🔥 Último día del ciclo", subtitle: "Preparación integral para transformación 2026", context: "eclipse" },
  "01-01": { icon: "🌟", title: "⭐ Nuevo ciclo completo", subtitle: "Año astrológico reiniciado - ¡bienvenido!", context: "activity" }
};

/**
 * Determina el estado vacío apropiado para una fecha específica
 *
 * @param day - Fecha a analizar
 * @param currentWeek - Array de fechas de la semana actual (para contexto)
 * @returns EmptyStateData con icono, título y subtítulo contextuales
 */
export function generateEmptyState(day: Date, currentWeek: Date[] = []): EmptyStateData {

  // 1. Verificar días especiales primero (alta prioridad)
  const monthDayKey = `${day.getMonth() + 1}-${day.getDate()}`;
  if (SPECIAL_DAYS[monthDayKey]) {
    return SPECIAL_DAYS[monthDayKey];
  }

  // 2. Analizar contexto mensual (prioridad media)
  const monthContext = MONTHLY_CONTEXT[day.getMonth()];
  if (monthContext && Math.random() < 0.3) { // 30% de chance de usar contexto mensual
    return {
      ...monthContext,
      icon: getIconForMonth(day.getMonth()),
      context: 'monthly'
    };
  }

  // 3. Usar rotación basada en día del mes (por defecto)
  const dayOfMonth = day.getDate();
  const rotationMessage = ROTATION_MESSAGES[dayOfMonth] || ROTATION_MESSAGES[1];

  return {
    ...rotationMessage,
    icon: getIconForDay(day.getDay(), dayOfMonth),
    context: 'daily'
  };
}

/**
 * Determina el icono apropiado basado en día de la semana y día del mes
 */
function getIconForDay(dayOfWeek: number, dayOfMonth: number): string {
  // Iconos base por día de la semana
  const weeklyIcons = ['🌙', '🔮', '⭐', '🌿', '🌀', '⚡', '🌅'];

  // Modificadores especiales por día del mes
  if (dayOfMonth >= 28) return '🌗'; // Finales de mes = luna menguante
  if (dayOfMonth <= 7) return '🌑';  // Principios = luna nueva
  if (dayOfMonth >= 12 && dayOfMonth <= 18) return '🌕'; // Mediados = luna llena
  if (dayOfMonth >= 21 && dayOfMonth <= 27) return '🌘'; // Finales primera mitad

  // Por defecto usar icono semanal
  return weeklyIcons[dayOfWeek] || '🌙';
}

/**
 * Determina el icono apropiado para contexto mensual
 */
function getIconForMonth(month: number): string {
  const monthlyIcons = [
    '❄️', // Enero - Invierno
    '💝', // Febrero - Amor
    '🌱', // Marzo - Semillas
    '🔥', // Abril - Fuego
    '🌸', // Mayo - Flores
    '☀️', // Junio - Sol
    '🏖️', // Julio - Playa
    '🌾', // Agosto - Cosecha
    '⚖️', // Setiembre - Balanza
    '🦂', // Octubre - Escorpio
    '🦃', // Noviembre - Gracias
    '🎄'  // Diciembre - Árbol
  ];

  return monthlyIcons[month] || '🌙';
}
