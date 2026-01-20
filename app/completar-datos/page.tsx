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
import { toast } from "sonner"
import {
  MapLocationPicker,
  type LocationData,
} from "@/components/location-picker"

// Schema for the user data form (extended with conditional fields)
const completarDatosSchema = z.object({
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  birthCity: z.string().optional(),
  birthCountry: z.string().optional(),
  knowsBirthTime: z.boolean().default(false),
  birthHour: z.coerce.number().int().min(0).max(23).optional(),
  birthMinute: z.coerce.number().int().min(0).max(59).optional(),
  gender: z.enum(['masculino', 'femenino'], {
    required_error: 'Selecciona una opción',
  }),
  residenceCity: z.string().optional(),
  residenceCountry: z.string().optional(),
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
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [locationType, setLocationType] = useState<'birth' | 'residence'>('birth')
  const [birthLocation, setBirthLocation] = useState<{
    lat: number
    lng: number
    timezone: string
  } | null>(null)
  const [residenceLocation, setResidenceLocation] = useState<{
    lat: number
    lng: number
    timezone: string
  } | null>(null)
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
    birthLat: null as number | null,
    birthLon: null as number | null,
    timezone: null as string | null,
    residenceLat: null as number | null,
    residenceLon: null as number | null,
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

          // Load existing location data into state
          if (data.birthLat && data.birthLon) {
            setBirthLocation({
              lat: data.birthLat,
              lng: data.birthLon,
              timezone: data.timezone || 'UTC',
            })
          }
          if (data.residenceLat && data.residenceLon) {
            setResidenceLocation({
              lat: data.residenceLat,
              lng: data.residenceLon,
              timezone: 'UTC', // Residence timezone not stored separately
            })
          }
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
    // Validate that birth location has been selected via map
    if (!birthLocation) {
      toast.error("Por favor selecciona tu ubicación de nacimiento usando el botón 'Mapa'")
      form.setError('birthCity', { type: 'manual', message: 'Usa el botón "Mapa" para seleccionar tu ubicación' })
      return
    }

    setIsLoading(true)

    const requestData = {
      birthDate: data.birthDate,
      birthCity: data.birthCity,
      birthCountry: data.birthCountry,
      birthHour: data.knowsBirthTime ? data.birthHour : null,
      birthMinute: data.knowsBirthTime ? data.birthMinute : null,
      knowsBirthTime: data.knowsBirthTime,
      gender: data.gender,
      residenceCity: data.residenceCity,
      residenceCountry: data.residenceCountry,
      birthLat: birthLocation.lat,
      birthLon: birthLocation.lng,
      birthTimezone: birthLocation.timezone,
      residenceLat: residenceLocation?.lat || null,
      residenceLon: residenceLocation?.lng || null,
    }

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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

      // Mostrar toast de éxito
      toast.success("¡Datos guardados correctamente!")

      // Redirigir directamente al Dashboard
      router.push(callbackUrl)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error al guardar datos. Intenta nuevamente.")
      form.setError('root', { type: 'manual', message: 'Error al guardar datos. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMapLocationSelect = (location: LocationData) => {
    if (locationType === 'birth') {
      setBirthLocation({
        lat: location.lat,
        lng: location.lng,
        timezone: location.timezone,
      })
    } else {
      setResidenceLocation({
        lat: location.lat,
        lng: location.lng,
        timezone: location.timezone,
      })
    }
    setShowMapPicker(false)

    // Extract city and country from address
    const addressParts = location.address.split(',').map((p) => p.trim())
    const city = addressParts[0] || location.address
    const country = addressParts[addressParts.length - 1] || ""

    form.setValue(locationType === 'birth' ? 'birthCity' : 'residenceCity', city)
    form.setValue(locationType === 'birth' ? 'birthCountry' : 'residenceCountry', country)

    toast.success(
      locationType === 'birth'
        ? `Ubicación de nacimiento: ${city}`
        : `Ubicación de residencia: ${city}`
    )
  }

  const handleOpenMapPicker = (type: 'birth' | 'residence') => {
    setLocationType(type)
    setShowMapPicker(true)
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

                {/* Birth Location - Map Button Only */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Ubicación de nacimiento
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOpenMapPicker('birth')}
                      className="shrink-0"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {birthLocation ? 'Cambiar ubicación' : 'Seleccionar en mapa'}
                    </Button>
                  </div>
                  {birthLocation ? (
                    <div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                        <span className="text-green-500">✓</span>
                        <span className="font-medium">Ubicación seleccionada</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Coordenadas: {birthLocation.lat.toFixed(4)}, {birthLocation.lng.toFixed(4)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Zona horaria: {birthLocation.timezone}
                      </p>
                    </div>
                  ) : (
                    <FormDescription className="text-xs">
                      Haz clic en "Seleccionar en mapa" para elegir tu ubicación de nacimiento
                    </FormDescription>
                  )}
                </div>

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

                {/* Residence Location - Map Button Only */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Ubicación de residencia
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOpenMapPicker('residence')}
                      className="shrink-0"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {residenceLocation ? 'Cambiar ubicación' : 'Seleccionar en mapa'}
                    </Button>
                  </div>
                  {residenceLocation ? (
                    <div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                        <span className="text-green-500">✓</span>
                        <span className="font-medium">Ubicación seleccionada</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Coordenadas: {residenceLocation.lat.toFixed(4)}, {residenceLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  ) : (
                    <FormDescription className="text-xs">
                      Haz clic en "Seleccionar en mapa" para elegir tu ubicación de residencia (opcional)
                    </FormDescription>
                  )}
                </div>
              </fieldset>

              {/* Root form error */}
              {form.formState.errors.root && (
                <FormStatus variant="error">
                  {form.formState.errors.root.message}
                </FormStatus>
              )}

              <Button
                type="submit"
                disabled={isLoading || isLocked}
                className="w-full"
              >
                {isLoading ? (
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

      {/* Map Location Picker Dialog */}
      <MapLocationPicker
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        initialQuery={locationType === 'birth' ? form.getValues('birthCity') : form.getValues('residenceCity')}
        locationType={locationType}
        onLocationSelect={handleMapLocationSelect}
        onCancel={() => setShowMapPicker(false)}
        isOpen={showMapPicker}
      />
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
