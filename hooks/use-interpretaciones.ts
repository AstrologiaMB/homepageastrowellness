'use client'

import { useState, useEffect } from 'react'

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

interface InterpretacionData {
  interpretacion_narrativa: string
  interpretaciones_individuales: InterpretacionItem[]
  tiempo_generacion: number
  desde_cache: boolean
}

interface UseInterpretacionesResult {
  interpretaciones: InterpretacionData | null
  loading: boolean
  error: string | null
  refetch: () => void
  clearCache: () => Promise<void>
}

export function useInterpretaciones(cartaNatalData: any, tipo: string = 'tropical'): UseInterpretacionesResult {
  const [interpretaciones, setInterpretaciones] = useState<InterpretacionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInterpretaciones = async () => {
    if (!cartaNatalData) return

    setLoading(true)
    setError(null)

    try {
      console.log('🔄 Solicitando interpretaciones...')
      
      const response = await fetch('/api/interpretaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartaNatalData,
          tipo
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al obtener interpretaciones')
      }

      const data: InterpretacionData = await response.json()
      
      console.log(`✅ Interpretaciones obtenidas ${data.desde_cache ? 'desde cache' : 'generadas'} en ${data.tiempo_generacion.toFixed(2)}s`)
      
      setInterpretaciones(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('❌ Error al obtener interpretaciones:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const clearCache = async () => {
    try {
      console.log('🗑️ Limpiando cache de interpretaciones...')
      
      const response = await fetch('/api/interpretaciones', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al limpiar cache')
      }

      const data = await response.json()
      console.log(`✅ ${data.message}`)
      
      // Refetch después de limpiar cache
      await fetchInterpretaciones()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al limpiar cache'
      console.error('❌ Error al limpiar cache:', errorMessage)
      setError(errorMessage)
    }
  }

  const refetch = () => {
    fetchInterpretaciones()
  }

  // Auto-fetch cuando cambian los datos de carta natal
  useEffect(() => {
    if (cartaNatalData) {
      fetchInterpretaciones()
    }
  }, [cartaNatalData, tipo])

  return {
    interpretaciones,
    loading,
    error,
    refetch,
    clearCache
  }
}
