'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es requerido')
      return false
    }
    if (!formData.email.trim()) {
      setError('El email es requerido')
      return false
    }
    if (!formData.password) {
      setError('La contraseña es requerida')
      return false
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    if (!formData.termsAccepted) {
      setError('Debes aceptar los términos y condiciones')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          termsAccepted: formData.termsAccepted
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/auth/login?message=Cuenta creada exitosamente. Ahora puedes iniciar sesión.')
      } else {
        setError(data.error || 'Error al crear la cuenta')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
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

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-black/80 dark:text-white/80" strokeWidth={1.5} />
          <h1 className="text-2xl font-light tracking-wide text-black dark:text-white">
            Astrowellness
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Únete a tu camino astrológico
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-4 rounded-sm">
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre completo
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-white/10 transition-all h-12 rounded-sm"
                required
              />
            </div>

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
                className="w-full bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-white/10 transition-all h-12 rounded-sm"
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
                placeholder="Contraseña (mínimo 8 caracteres)"
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

            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-white/10 transition-all h-12 rounded-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
              disabled={isLoading}
              className="mt-0.5 border-black/20 dark:border-white/20 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:text-white dark:data-[state=checked]:text-black"
            />
            <label htmlFor="terms" className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
              Acepto los{' '}
              <Link href="/legal" className="text-black dark:text-white underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black/80 dark:hover:text-white/80 transition-colors">
                Términos y Condiciones
              </Link>
              {' '}y la{' '}
              <Link href="/legal" className="text-black dark:text-white underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black/80 dark:hover:text-white/80 transition-colors">
                Política de Privacidad
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.termsAccepted}
            className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all h-12 rounded-sm font-light tracking-wide disabled:opacity-50"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>

        {/* Links */}
        <div className="space-y-4 text-center">
          <div className="text-sm">
            <span className="text-black/60 dark:text-white/60">¿Ya tienes cuenta? </span>
            <Link
              href="/auth/login"
              className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4"
            >
              Inicia sesión
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
