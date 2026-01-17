'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormStatus, FormSuccess } from '@/components/ui/form-status'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/form-schemas'
import { Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successEmail, setSuccessEmail] = useState('')

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setServerError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessEmail(data.email)
      } else {
        setServerError(result.error || 'Error al procesar la solicitud')
      }
    } catch (error) {
      console.error('Error:', error)
      setServerError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (successEmail) {
    return (
      <div className="h-dvh bg-white dark:bg-black flex flex-col relative overflow-hidden transition-colors duration-300">
        {/* Subtle animated background stars */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-150" />
        </div>

        {/* Fixed Header */}
        <div className="flex-shrink-0 text-center space-y-0.5 pt-6 pb-3 px-4 relative z-10">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-xl font-light tracking-wide text-black dark:text-white uppercase">
            Email Enviado
          </h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 relative z-10">
          <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-3 py-2 pb-6">
            <FormSuccess>
              Si el email <strong>{successEmail}</strong> existe en nuestro sistema,
              recibirás instrucciones para restablecer tu contraseña en los próximos minutos.
            </FormSuccess>

            <div className="space-y-3">
              <p className="text-sm text-center text-black/60 dark:text-white/60">
                ¿No recibiste el email? Revisa tu carpeta de spam o{' '}
                <button
                  onClick={() => {
                    setSuccessEmail('')
                    form.reset()
                  }}
                  className="text-primary hover:underline ml-1"
                >
                  intenta de nuevo
                </button>
              </p>

              <Button
                onClick={() => router.push('/auth/login')}
                className="w-full"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Login
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60 transition-colors"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-dvh bg-white dark:bg-black flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Subtle animated background stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-black dark:bg-white rounded-full animate-pulse delay-150" />
      </div>

      {/* Fixed Header */}
      <div className="flex-shrink-0 text-center space-y-0.5 pt-6 pb-3 px-4 relative z-10">
        <Sparkles className="w-7 h-7 mx-auto text-primary" strokeWidth={1.5} />
        <h1 className="text-xl font-light tracking-wide text-black dark:text-white uppercase">
          Astrochat
        </h1>
        <p className="text-xs text-black/60 dark:text-white/60 uppercase tracking-wide">
          Restablecer Contraseña
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 relative z-10">
        <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-2 sm:space-y-2.5 py-2 pb-6">
          {/* Error Message */}
          {serverError && (
            <FormStatus variant="error" dismissible onDismiss={() => setServerError('')}>
              {serverError}
            </FormStatus>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      type="email"
                      leftIcon={<Mail className="h-4 w-4" />}
                      inputSize="lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-12 rounded-sm font-light tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Instrucciones
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Links */}
        <div className="space-y-1.5 text-center">
          <div className="text-sm">
            <span className="text-black/60 dark:text-white/60">¿Recordaste tu contraseña? </span>
            <Link
              href="/auth/login"
              className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4"
            >
              Inicia sesión
            </Link>
          </div>

          <div className="text-sm">
            <span className="text-black/60 dark:text-white/60">¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors underline decoration-black/20 dark:decoration-white/20 underline-offset-4"
            >
              Regístrate
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
    </div>
  )
}
