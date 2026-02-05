import { ArrowRight, Home, Moon, Orbit, Star } from 'lucide-react';

export const getEventStyle = (tipoEvento: string) => {
  const tipo = tipoEvento.toLowerCase();

  if (tipo.includes('aspecto')) {
    return {
      icon: Orbit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      badgeColor:
        'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30',
    };
  }

  if (tipo.includes('ingreso') || tipo.includes('signo')) {
    return {
      icon: ArrowRight,
      iconColor: 'text-primary dark:text-primary',
      iconBg: 'bg-primary/10 dark:bg-primary/20',
      badgeColor:
        'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30',
    };
  }

  if (tipo.includes('luna')) {
    return {
      icon: Moon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      badgeColor:
        'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/30',
    };
  }

  if (tipo.includes('casa')) {
    return {
      icon: Home,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      badgeColor:
        'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30',
    };
  }

  // Default style
  return {
    icon: Star,
    iconColor: 'text-muted-foreground',
    iconBg: 'bg-muted/50',
    badgeColor: 'bg-muted text-muted-foreground hover:bg-muted/70',
  };
};
