import { ArrowRight, Home, Moon, Orbit, Star } from 'lucide-react';

export const getEventStyle = (tipoEvento: string, planeta?: string | null) => {
  const tipo = tipoEvento.toLowerCase();

  // 1. Manejo Especial de Planetas Lentos (Personal Hero Cards)
  if (planeta) {
    const p = planeta.toLowerCase();

    // Plutón (Transformación / Lava)
    if (p === 'plutón' || p === 'pluton') {
      return {
        icon: Orbit,
        iconColor: 'text-rose-600 dark:text-rose-400',
        iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
        badgeColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/30',
        heroGradient: 'bg-gradient-to-br from-rose-100 via-red-50 to-zinc-100 dark:from-rose-950/30 dark:via-red-950/20 dark:to-zinc-900/40 border-rose-400/30'
      };
    }
    // Neptuno (Inspiración / Océano)
    if (p === 'neptuno') {
      return {
        icon: Orbit,
        iconColor: 'text-teal-600 dark:text-teal-400',
        iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
        badgeColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:hover:bg-teal-500/30',
        heroGradient: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950/20 dark:via-cyan-950/20 dark:to-blue-950/20 border-teal-300/30'
      };
    }
    // Urano (Innovación / Eléctrico)
    if (p === 'urano') {
      return {
        icon: Orbit,
        iconColor: 'text-cyan-600 dark:text-cyan-400',
        iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        badgeColor: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:hover:bg-cyan-500/30',
        heroGradient: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-white dark:from-cyan-950/30 dark:via-sky-950/20 dark:to-slate-900/40 border-cyan-400/30'
      };
    }
    // Saturno (Estructura / Acero)
    if (p === 'saturno') {
      return {
        icon: Orbit,
        iconColor: 'text-slate-600 dark:text-slate-400',
        iconBg: 'bg-slate-500/10 dark:bg-slate-500/20',
        badgeColor: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-500/20 dark:text-slate-300 dark:hover:bg-slate-500/30',
        heroGradient: 'bg-gradient-to-br from-slate-100 via-gray-50 to-indigo-50 dark:from-slate-900/40 dark:via-gray-900/30 dark:to-indigo-950/20 border-slate-400/30'
      };
    }
    // Júpiter (Expansión / Oro)
    if (p === 'júpiter' || p === 'jupiter') {
      return {
        icon: Orbit,
        iconColor: 'text-amber-600 dark:text-amber-400',
        iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
        badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30',
        heroGradient: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/20 border-amber-300/40'
      };
    }
  }

  // 2. Manejo de Eventos Estándar (Fallback)
  if (tipo.includes('aspecto')) {
    return {
      icon: Orbit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      badgeColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30',
      heroGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20'
    };
  }

  if (tipo.includes('eclipse')) {
    return {
      icon: Moon,
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
      badgeColor: 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:hover:bg-orange-500/30',
      heroGradient: 'bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-orange-950/30 border-orange-500/50'
    };
  }

  if (tipo.includes('ingreso') || tipo.includes('signo')) {
    return {
      icon: ArrowRight,
      iconColor: 'text-primary dark:text-primary',
      iconBg: 'bg-primary/10 dark:bg-primary/20',
      badgeColor: 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30',
    };
  }

  if (tipo.includes('luna nueva') || tipo.includes('luna llena')) {
    return {
      icon: Moon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      badgeColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30',
      heroGradient: tipo.includes('nueva')
        ? 'bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 dark:from-slate-900/40 dark:via-indigo-950/30 dark:to-slate-900/40 border-indigo-400/30'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-slate-900/40 dark:to-blue-950/20 border-blue-300/30'
    };
  }

  if (tipo.includes('luna')) {
    return {
      icon: Moon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      badgeColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30',
    };
  }

  if (tipo.includes('casa')) {
    return {
      icon: Home,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      badgeColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30',
    };
  }

  // Default style
  return {
    icon: Star,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted/50',
    badgeColor: 'bg-muted text-muted-foreground hover:bg-muted/70',
    heroGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10'
  };
};
