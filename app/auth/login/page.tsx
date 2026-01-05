'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useAuth } from '@/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Sparkles } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setSuccessMessage(message)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Email y contraseña son requeridos')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      })

      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      setError('Email o contraseña incorrectos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Error:', error)
      setError('Error al iniciar sesión con Google')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background stars */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-white/80" strokeWidth={1.5} />
          <h1 className="text-2xl font-light tracking-wide text-white">
            Astrowellness
          </h1>
          <p className="text-sm text-white/60">
            Accede a tu cuenta
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-4 rounded-sm">
            <p className="text-sm text-white/80 text-center">
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-4 rounded-sm">
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 transition-all h-12 rounded-sm"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 transition-all h-12 rounded-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-white/90 transition-all h-12 rounded-sm font-light tracking-wide"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-4 text-white/40 tracking-wider">
              O
            </span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all h-12 rounded-sm font-light tracking-wide"
        >
          Continuar con Google
        </Button>

        {/* Links */}
        <div className="space-y-4 text-center">
          <Link
            href="/auth/forgot-password"
            className="block text-sm text-white/60 hover:text-white/80 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="text-sm">
            <span className="text-white/60">¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-white hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-4"
            >
              Regístrate aquí
            </Link>
          </div>

          <Link
            href="/"
            className="block text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/60">Cargando...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
