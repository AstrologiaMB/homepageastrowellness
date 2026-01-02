'use client'

import { useState, useEffect, useRef } from 'react'

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

  // Ref para controlar el polling y evitar duplicados/memory leaks
  const pollingRef = useRef<NodeJS.Timeout | null>(null)
  const isMounted = useRef(true)

  // Limpiar timeout y flag al desmontar
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      if (pollingRef.current) {
        clearTimeout(pollingRef.current)
      }
    }
  }, [])

  const fetchInterpretaciones = async (isPolling: boolean = false) => {
    if (!cartaNatalData) return

    if (!isPolling) {
      setLoading(true)
      setError(null)
    }

    try {
      if (!isPolling) console.log(`🔄 Solicitando interpretaciones (${tipo})...`)

      const response = await fetch('/api/interpretaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartaNatalData,
          tipo,
          skipCache: false // Nunca skippear cache en polling para ver si ya terminó
        }),
      })

      // Caso 202: Procesando (Async) -> Iniciar Polling
      if (response.status === 202) {
        if (!isMounted.current) return

        console.log('⏳ Interpretación en proceso (202 Accepted). Reintentando en 5s...')

        // Configurar próximo poll
        if (pollingRef.current) clearTimeout(pollingRef.current)
        pollingRef.current = setTimeout(() => {
          if (isMounted.current) fetchInterpretaciones(true)
        }, 5000)

        return // Mantener loading = true
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al obtener interpretaciones')
      }

      // Caso 200: Completado
      const data: InterpretacionData = await response.json()

      if (!isMounted.current) return

      console.log(`✅ Interpretaciones obtenidas ${data.desde_cache ? 'desde cache' : 'generadas'} en ${data.tiempo_generacion.toFixed(2)}s`)

      setInterpretaciones(data)
      setLoading(false) // Detener loading
      if (pollingRef.current) clearTimeout(pollingRef.current)

    } catch (err) {
      if (!isMounted.current) return

      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      console.error('❌ Error al obtener interpretaciones:', errorMessage)

      // Si falla en polling, mostramos error
      setError(errorMessage)
      setLoading(false)
      if (pollingRef.current) clearTimeout(pollingRef.current)
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

      // Refetch después de limpiar cache (iniciará proceso async nuevo)
      // timeout pequeño para asegurar consistencia DB
      setTimeout(() => fetchInterpretaciones(false), 500)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al limpiar cache'
      console.error('❌ Error al limpiar cache:', errorMessage)
      setError(errorMessage)
    }
  }

  const refetch = () => {
    if (pollingRef.current) clearTimeout(pollingRef.current)
    fetchInterpretaciones(false)
  }

  // Auto-fetch cuando cambian los datos de carta natal
  useEffect(() => {
    if (cartaNatalData) {
      if (pollingRef.current) clearTimeout(pollingRef.current)
      fetchInterpretaciones(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartaNatalData, tipo])

  return {
    interpretaciones,
    loading,
    error,
    refetch,
    clearCache
  }
}
