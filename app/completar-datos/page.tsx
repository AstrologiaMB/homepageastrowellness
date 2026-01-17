"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar, MapPin, Home, User, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormStatus, FormWarning } from "@/components/ui/form-status"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getApiUrl } from "@/lib/api-config"

// Schema for the user data form (extended with conditional fields)
const completarDatosSchema = z.object({
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  birthCity: z.string().min(1, 'La ciudad de nacimiento es requerida'),
  birthCountry: z.string().min(1, 'El país de nacimiento es requerido'),
  knowsBirthTime: z.boolean().default(false),
  birthHour: z.coerce.number().int().min(0).max(23).optional(),
  birthMinute: z.coerce.number().int().min(0).max(59).optional(),
  gender: z.enum(['masculino', 'femenino'], {
    required_error: 'Selecciona una opción',
  }),
  residenceCity: z.string().min(1, 'La ciudad de residencia es requerida'),
  residenceCountry: z.string().min(1, 'El país de residencia es requerido'),
}).refine((data) => {
  // If knowsBirthTime is true, hour and minute are required
  if (data.knowsBirthTime) {
    return data.birthHour !== undefined && data.birthMinute !== undefined
  }
  return true
}, {
  message: 'La hora y minuto son requeridos cuando conoces tu hora de nacimiento',
  path: ['birthHour'],
})

type CompletarDatosFormData = z.infer<typeof completarDatosSchema>

function CompletarDatosForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [checkingLocation, setCheckingLocation] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationOptions, setLocationOptions] = useState<any[]>([])
  const [pendingFormData, setPendingFormData] = useState<CompletarDatosFormData | null>(null)
  const [userData, setUserData] = useState({
    birthDate: "",
    birthCity: "",
    birthCountry: "",
    birthHour: 0,
    birthMinute: 0,
    knowsBirthTime: false,
    gender: "",
    residenceCity: "",
    residenceCountry: "",
    birthDataChangeCount: 0,
  })

  // Capturar la URL de redirección si existe
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const form = useForm<CompletarDatosFormData>({
    resolver: zodResolver(completarDatosSchema),
    defaultValues: {
      birthDate: "",
      birthCity: "",
      birthCountry: "",
      knowsBirthTime: false,
      birthHour: 0,
      birthMinute: 0,
      gender: undefined,
      residenceCity: "",
      residenceCountry: "",
    },
  })

  const knowsBirthTime = form.watch('knowsBirthTime')

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await fetch("/api/user/profile")
        if (response.ok) {
          const data = await response.json()
          setUserData(data)

          // Pre-llenar campos con datos del usuario
          form.setValue('birthDate', data.birthDate || '')
          form.setValue('birthCity', data.birthCity || '')
          form.setValue('birthCountry', data.birthCountry || '')
          form.setValue('knowsBirthTime', data.knowsBirthTime || false)
          form.setValue('birthHour', data.birthHour || 0)
          form.setValue('birthMinute', data.birthMinute || 0)
          form.setValue('gender', data.gender || undefined)
          form.setValue('residenceCity', data.residenceCity || '')
          form.setValue('residenceCountry', data.residenceCountry || '')
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error)
      } finally {
        setLoadingData(false)
      }
    }

    loadUserData()
  }, [form])

  const handleSubmit = async (data: CompletarDatosFormData) => {
    setCheckingLocation(true)

    try {
      // Verificar ubicación con el nuevo endpoint
      const apiUrl = getApiUrl('CALCULOS')
      const geoResponse = await fetch(`${apiUrl}/geocode/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: data.birthCity,
          country: data.birthCountry
        })
      })

      if (!geoResponse.ok) {
        throw new Error("Error verificando ubicación")
      }

      const geoResult = await geoResponse.json()

      if (!geoResult.success || !geoResult.data) {
        throw new Error("Ubicación no encontrada")
      }

      // Caso 1: Solo una opción - proceder directamente
      if (geoResult.data.single) {
        await saveUserData(data, geoResult.data)
      }
      // Caso 2: Múltiples opciones - mostrar modal
      else if (geoResult.data.multiple) {
        setPendingFormData(data)
        setLocationOptions(geoResult.data.options)
        setShowLocationModal(true)
        setCheckingLocation(false)
      }

    } catch (error) {
      console.error("Error:", error)
      form.setError('birthCity', { type: 'manual', message: 'Error al verificar la ubicación. Intenta nuevamente.' })
      setCheckingLocation(false)
    }
  }

  const saveUserData = async (formData: CompletarDatosFormData, locationData: any) => {
    setIsLoading(true)
    setCheckingLocation(false)

    const data = {
      birthDate: formData.birthDate,
      birthCity: formData.birthCity,
      birthCountry: formData.birthCountry,
      birthHour: formData.knowsBirthTime ? formData.birthHour : null,
      birthMinute: formData.knowsBirthTime ? formData.birthMinute : null,
      knowsBirthTime: formData.knowsBirthTime,
      gender: formData.gender,
      residenceCity: formData.residenceCity,
      residenceCountry: formData.residenceCountry,
      birthLat: locationData.lat,
      birthLon: locationData.lon,
      birthTimezone: locationData.timezone
    }

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Error al guardar datos")
      }

      // Verificar el estado de los datos
      const refreshResponse = await fetch("/api/auth/refresh-token")
      const refreshResult = await refreshResponse.json()

      if (!refreshResult.success) {
        console.warn("No se pudo verificar el estado de los datos")
      }

      // Actualizar la sesión
      await update()

      // Redirigir directamente al Dashboard
      router.push(callbackUrl)
    } catch (error) {
      console.error("Error:", error)
      form.setError('root', { type: 'manual', message: 'Error al guardar datos. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationSelect = (location: any) => {
    if (pendingFormData) {
      saveUserData(pendingFormData, location)
      setShowLocationModal(false)
    }
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    )
  }

  const isLocked = userData.birthDataChangeCount >= 3

  return (
    <>
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-foreground">Completar Datos Personales</h1>
            <p className="text-muted-foreground mt-2">Completa tu información para los cálculos astrológicos</p>
          </div>

          {/* Important notice */}
          <FormWarning className="mb-6">
            <strong>Precisión requerida:</strong> Por favor completa tus datos personales
            para poder hacer los cálculos necesarios. Ten cuidado al completar tus datos,
            sobre todo hora y lugar de nacimiento. <br />
            <strong>Solo tienes 3 oportunidades</strong> para colocar los datos correctamente.
          </FormWarning>

          {/* Warning about remaining changes */}
          {userData.birthDataChangeCount > 0 && (
            <FormStatus
              variant={userData.birthDataChangeCount >= 3 ? "error" : "warning"}
              className="mb-6"
            >
              <strong>
                {userData.birthDataChangeCount >= 3
                  ? "Límite de cambios alcanzado"
                  : `Aviso: Te quedan ${3 - userData.birthDataChangeCount} cambios disponibles`}
              </strong>
              {userData.birthDataChangeCount >= 3
                ? ". Has alcanzado el límite máximo de 3 cambios en tus datos de nacimiento. Por motivos de seguridad y consistencia, no puedes realizar más modificaciones."
                : ". Asegúrate de que la información sea correcta antes de guardar."}
            </FormStatus>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <fieldset disabled={isLocked} className="space-y-6">
                {/* Birth Date */}
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Fecha de nacimiento
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Knows Birth Time */}
                <FormField
                  control={form.control}
                  name="knowsBirthTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Conozco mi hora exacta de nacimiento
                        </FormLabel>
                        <FormDescription>
                          Marca esta casilla si conoces la hora exacta de tu nacimiento
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Birth Hour and Minute (conditional) */}
                {knowsBirthTime && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="birthHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora</FormLabel>
                          <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minuto</FormLabel>
                          <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Minuto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Birth City */}
                <FormField
                  control={form.control}
                  name="birthCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Ciudad de nacimiento
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Buenos Aires" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birth Country */}
                <FormField
                  control={form.control}
                  name="birthCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País de nacimiento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Argentina" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Género
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Residence City */}
                <FormField
                  control={form.control}
                  name="residenceCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Ciudad de residencia
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Buenos Aires" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Residence Country */}
                <FormField
                  control={form.control}
                  name="residenceCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País de residencia</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Argentina" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>

              {/* Root form error */}
              {form.formState.errors.root && (
                <FormStatus variant="error">
                  {form.formState.errors.root.message}
                </FormStatus>
              )}

              <Button
                type="submit"
                disabled={isLoading || checkingLocation || isLocked}
                className="w-full"
              >
                {checkingLocation ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando ubicación...
                  </>
                ) : isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar y continuar"
                )}
              </Button>

              {isLocked && (
                <p className="text-sm text-destructive text-center">
                  No puedes guardar más cambios en tus datos de nacimiento.
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Modal de selección de ubicación */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Selecciona tu ubicación exacta</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              Encontramos múltiples ubicaciones. Por favor selecciona la correcta:
            </p>
            {locationOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(option)}
                type="button"
                className="w-full p-4 text-left border rounded-lg hover:bg-accent hover:border-primary transition-colors"
              >
                <div className="font-medium">{option.address}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Coordenadas: {option.lat.toFixed(4)}, {option.lon.toFixed(4)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Zona horaria: {option.timezone}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function CompletarDatosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    }>
      <CompletarDatosForm />
    </Suspense>
  )
}
