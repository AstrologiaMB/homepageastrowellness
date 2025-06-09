'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface InterpretacionItem {
  titulo: string
  tipo: string
  interpretacion: string
  planeta?: string
  signo?: string
  casa?: string
  aspecto?: string
  planeta1?: string
  planeta2?: string
  grados?: string
}

interface InterpretacionesIndividualesProps {
  interpretaciones: InterpretacionItem[] | null
  loading: boolean
  error: string | null
}

function InterpretacionItemCard({ item }: { item: InterpretacionItem }) {
  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'PlanetaEnSigno':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'PlanetaEnCasa':
        return 'bg-green-50 border-green-200 text-green-700'
      case 'Aspecto':
        return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'CasaEnSigno':
        return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'PlanetaRetrogrado':
        return 'bg-red-50 border-red-200 text-red-700'
      case 'AspectoComplejo':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'PlanetaEnSigno':
        return 'Planeta en Signo'
      case 'PlanetaEnCasa':
        return 'Planeta en Casa'
      case 'Aspecto':
        return 'Aspecto'
      case 'CasaEnSigno':
        return 'Casa en Signo'
      case 'PlanetaRetrogrado':
        return 'Retrógrado'
      case 'AspectoComplejo':
        return 'Aspecto Complejo'
      default:
        return tipo
    }
  }

  return (
    <Card className={`w-full transition-all duration-200 hover:shadow-md ${getTypeColor(item.tipo)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base leading-tight">
            {item.titulo}
          </CardTitle>
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
        <div className="text-sm leading-relaxed text-gray-700">
          {item.interpretacion.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null
            
            return (
              <p key={index} className="mb-2 last:mb-0">
                {paragraph.trim()}
              </p>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
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
  )
}

export function InterpretacionesIndividuales({ 
  interpretaciones, 
  loading, 
  error 
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
    )
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Error al cargar interpretaciones individuales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!interpretaciones || interpretaciones.length === 0) {
    return null
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
  )
}
