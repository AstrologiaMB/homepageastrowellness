'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/auth/auth-provider'
import { useRouter } from 'next/navigation'

interface RequireCompletedDataProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export const RequireCompletedData: React.FC<RequireCompletedDataProps> = ({
  children,
  fallback,
  redirectTo = '/completar-datos',
}) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      if (!user?.hasCompletedData) {
        setIsChecking(false)
        router.replace(redirectTo)
        return
      }
      setIsChecking(false)
    }
  }, [isLoading, user, router, redirectTo])

  if (isLoading || isChecking) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border mx-auto mb-4" />
          <p>Cargando...</p>
        </div>
      )
    )
  }

  if (!user?.hasCompletedData) {
    return null
  }

  return <>{children}</>
}
