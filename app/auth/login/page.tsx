'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useAuth } from '@/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Sparkles, Lock } from 'lucide-react'

import { StarField } from '@/components/auth/star-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { FormStatus, FormSuccess } from '@/components/ui/form-status'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { loginSchema, type LoginFormData } from '@/lib/form-schemas'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setSuccessMessage(message)
    }
  }, [searchParams])

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setServerError('')

    try {
      await login({
        email: data.email,
        password: data.password,
      })

      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      setServerError('Email o contraseña incorrectos')
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
      setServerError('Error al iniciar sesión con Google')
      setIsLoading(false)
    }
  }

  return (
    <div className="h-dvh bg-white dark:bg-black flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      <StarField />

      <div className="px-4 relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="text-center space-y-0.5 pb-6">
          <Sparkles className="w-7 h-7 mx-auto text-primary" strokeWidth={1.5} />
          <h1 className="text-xl font-light tracking-wide text-black dark:text-white uppercase">
            Astrochat
          </h1>
          <p className="text-xs text-black/60 dark:text-white/60 uppercase tracking-wide">
            Accede a tu cuenta
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-2 sm:space-y-2.5">
          {/* Success Message */}
          {successMessage && (
            <FormSuccess dismissible onDismiss={() => setSuccessMessage('')}>
              {successMessage}
            </FormSuccess>
          )}

          {/* Error Message */}
          {serverError && (
            <FormStatus variant="error" dismissible onDismiss={() => setServerError('')}>
              {serverError}
            </FormStatus>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        leftIcon={<Mail className="h-4 w-4" />}
                        inputSize="lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="sr-only">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Contraseña"
                        inputSize="lg"
                        leftIcon={<Lock className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-12 rounded-sm font-light tracking-wide"
              >
                {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </Form>

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
            type="button"
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all h-12 rounded-sm font-light tracking-wide"
          >
            Continuar con Google
          </Button>

          {/* Links */}
          <div className="space-y-1.5 text-center">
            <Link
              href="/auth/forgot-password"
              className="block text-sm text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80 transition-colors"
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
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="h-dvh bg-white dark:bg-black flex items-center justify-center">
        <p className="text-black/60 dark:text-white/60">Cargando...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
