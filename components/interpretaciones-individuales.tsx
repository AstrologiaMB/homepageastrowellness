'use client';

import ReactMarkdown from 'react-markdown';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface InterpretacionItem {
  titulo: string;
  tipo: string;
  interpretacion: string;
  planeta?: string;
  signo?: string;
  casa?: string;
  aspecto?: string;
  planeta1?: string;
  planeta2?: string;
  grados?: string;
}

interface InterpretacionesIndividualesProps {
  interpretaciones: InterpretacionItem[] | null;
  loading: boolean;
  error: string | null;
}

function InterpretacionItemCard({ item }: { item: InterpretacionItem }) {
  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'PlanetaEnSigno':
        return 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/10 dark:to-cyan-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300';
      case 'PlanetaEnCasa':
        return 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-500/10 dark:to-teal-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300';
      case 'Aspecto':
        return 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/10 dark:to-pink-500/10 border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300';
      case 'CasaEnSigno':
        return 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300';
      case 'PlanetaRetrogrado':
        return 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-500/10 dark:to-rose-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300';
      case 'AspectoComplejo':
        return 'bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-500/10 dark:to-violet-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300';
      default:
        return 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-500/10 dark:to-slate-500/10 border-gray-200 dark:border-gray-500/30 text-gray-700 dark:text-gray-300';
    }
  };

  const getTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'PlanetaEnSigno':
        return 'Planeta en Signo';
      case 'PlanetaEnCasa':
        return 'Planeta en Casa';
      case 'Aspecto':
        return 'Aspecto';
      case 'CasaEnSigno':
        return 'Casa en Signo';
      case 'PlanetaRetrogrado':
        return 'Retrógrado';
      case 'AspectoComplejo':
        return 'Aspecto Complejo';
      default:
        return tipo;
    }
  };

  return (
    <Card
      className={`w-full transition-all duration-200 hover:shadow-md border ${getTypeColor(item.tipo)}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base leading-tight">{item.titulo}</CardTitle>
          <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
            {getTypeLabel(item.tipo)}
          </Badge>
        </div>

        {/* Información astrológica en texto simple */}
        <div className="text-xs text-muted-foreground mt-2">
          {item.planeta && item.signo && `${item.planeta} en ${item.signo}`}
          {item.grados && ` ${item.grados}`}
          {item.casa && ` • Casa ${item.casa}`}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="prose prose-stone prose-sm max-w-none text-gray-700 dark:text-gray-300">
          <ReactMarkdown
            components={{
              p: ({ ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
              strong: ({ ...props }) => <strong className="font-bold dark:text-blue-300" {...props} />,
            }}
          >
            {item.interpretacion}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}

function InterpretacionItemSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

export function InterpretacionesIndividuales({
  interpretaciones,
  loading,
  error,
}: InterpretacionesIndividualesProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <InterpretacionItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">
            Error al cargar interpretaciones individuales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!interpretaciones || interpretaciones.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Interpretaciones Detalladas</h3>
        <Badge variant="outline" className="text-xs">
          {interpretaciones.length} elementos
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interpretaciones.map((item, index) => (
          <InterpretacionItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
