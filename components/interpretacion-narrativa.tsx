'use client'

import ReactMarkdown from 'react-markdown'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles } from "lucide-react"

interface InterpretacionNarrativaProps {
  interpretacion: string | null
  loading: boolean
  error: string | null
  tiempoGeneracion?: number
  desdeCache?: boolean
}

export function InterpretacionNarrativa({
  interpretacion,
  loading,
  error,
  tiempoGeneracion,
  desdeCache
}: InterpretacionNarrativaProps) {
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
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
    )
  }

  if (!interpretacion) {
    return null
  }

  return (
    <Card className="w-full">
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
        <div className="prose prose-stone prose-sm max-w-none text-gray-700">
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p className="mb-4 last:mb-0 leading-relaxed" {...props} />
              ),
            }}
          >
            {interpretacion}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}
