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
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Subtle animated background stars */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-150" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-primary" strokeWidth={1.5} />
          <h1 className="text-2xl font-light tracking-wide text-black dark:text-white">
            Astrochat
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Accede a tu cuenta
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="border border-green-500/20 bg-green-500/5 backdrop-blur-sm p-4 rounded-sm">
            <p className="text-sm text-green-600 dark:text-white/80 text-center">
              {successMessage}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-4 rounded-sm">
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
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
                className="w-full bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-white/10 transition-all h-10 sm:h-12 rounded-sm"
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
                className="w-full bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-white/10 transition-all h-12 rounded-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60 transition-colors"
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
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-12 rounded-sm font-light tracking-wide"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-4 text-black/40 dark:text-white/40 tracking-wider">
              O
            </span>
          </div>
        </div>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all h-12 rounded-sm font-light tracking-wide"
        >
          Continuar con Google
        </Button>

        {/* Links */}
        <div className="space-y-3 sm:space-y-4 text-center px-2">
          <Link
            href="/auth/forgot-password"
            className="block py-1 sm:py-0 text-sm text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="text-sm">
            <span className="text-black/60 dark:text-white/60">¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4"
            >
              Regístrate aquí
            </Link>
          </div>

          <Link
            href="/"
            className="block text-sm text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60 transition-colors"
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-black/60 dark:text-white/60">Cargando...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
