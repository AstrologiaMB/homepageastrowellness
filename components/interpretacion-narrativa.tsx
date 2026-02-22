'use client';

import ReactMarkdown from 'react-markdown';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Clock, Sparkles, Loader2 } from 'lucide-react';

interface InterpretacionNarrativaProps {
  interpretacion: string | null;
  loading: boolean;
  error: string | null;
  tiempoGeneracion?: number;
  desdeCache?: boolean;
  loadingMessage?: string;
}

export function InterpretacionNarrativa({
  interpretacion,
  loading,
  error,
  tiempoGeneracion,
  desdeCache,
  loadingMessage,
}: InterpretacionNarrativaProps) {
  if (loading) {
    return (
      <Card className="w-full border border-violet-200 dark:border-violet-500/30
        bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-500/5 dark:to-fuchsia-500/5
        hover:shadow-md transition-all duration-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {loadingMessage && (
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-800 flex items-center gap-3">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              <p>{loadingMessage}</p>
            </div>
          )}
          {!loadingMessage && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {loadingMessage && (
            <div className="space-y-3 opacity-50">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border border-red-200 dark:border-red-500/30
        bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-500/5 dark:to-rose-500/5
        hover:shadow-md transition-all duration-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-700">Error al generar interpretación</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!interpretacion) {
    return null;
  }

  return (
    <Card className="w-full border border-violet-200 dark:border-violet-500/30
      bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-500/5 dark:to-fuchsia-500/5
      hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-xl">Tu Interpretación Astrológica</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {desdeCache && (
              <Badge variant="secondary" className="text-xs">
                Desde cache
              </Badge>
            )}
            {tiempoGeneracion && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{tiempoGeneracion.toFixed(1)}s</span>
              </div>
            )}
          </div>
        </div>
        <CardDescription>
          Una interpretación personalizada de tu carta natal basada en la sabiduría astrológica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-stone prose-sm max-w-none text-gray-700 dark:text-gray-300">
          <ReactMarkdown
            components={{
              p: ({ ...props }) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
              strong: ({ ...props }) => <strong className="font-bold dark:text-blue-300" {...props} />,
            }}
          >
            {interpretacion}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
