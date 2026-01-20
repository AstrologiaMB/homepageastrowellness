'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { User, Mail, Sparkles, Lock } from 'lucide-react'

import { StarField } from '@/components/auth/star-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { FormStatus } from '@/components/ui/form-status'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema, type RegisterFormData } from '@/lib/form-schemas'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setServerError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          termsAccepted: data.termsAccepted
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Automatically sign in with the same credentials
        const signInResult = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (signInResult?.ok) {
          // Redirect to home page after successful login
          router.push('/')
        } else {
          // Fallback: redirect to login with helpful message
          router.push('/auth/login?message=Cuenta+creada+exitosamente.+Por+favor+inicia+sesión.')
        }
      } else {
        setServerError(result.error || 'Error al crear la cuenta')
      }
    } catch (error) {
      console.error('Error:', error)
      setServerError('Error de conexión. Inténtalo de nuevo.')
    } finally {
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
            Únete a tu camino astrológico
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-2 sm:space-y-2.5">
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
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="sr-only">Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre completo"
                        leftIcon={<User className="h-4 w-4" />}
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
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
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
                        showStrength
                        leftIcon={<Lock className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="sr-only">Confirmar contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirmar contraseña"
                        inputSize="lg"
                        leftIcon={<Lock className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="mt-0.5 border-black/20 dark:border-white/20 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:text-white dark:data-[state=checked]:text-black"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-black/60 dark:text-white/60 leading-relaxed cursor-pointer">
                        Acepto los{' '}
                        <Link href="/legal" className="text-black dark:text-white underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black/80 dark:hover:text-white/80 transition-colors">
                          Términos y Condiciones
                        </Link>
                        {' '}y la{' '}
                        <Link href="/legal" className="text-black dark:text-white underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black/80 dark:hover:text-white/80 transition-colors">
                          Política de Privacidad
                        </Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-11 rounded-sm font-light tracking-wide"
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>
          </Form>

          {/* Links */}
          <div className="space-y-1.5 text-center">
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
    </div>
  )
}
