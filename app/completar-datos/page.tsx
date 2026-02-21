'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Home, Loader2, MapPin, Sparkles, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { MapLocationPicker, type LocationData } from '@/components/location-picker';
import { ProtectedPage } from '@/components/protected-page';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormStatus, FormWarning } from '@/components/ui/form-status';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

/**
 * Celestial-themed background with subtle animated gradient
 * Creates depth and serenity appropriate for an astrology app
 */

// Schema for the user data form (extended with conditional fields)
const completarDatosSchema = z
  .object({
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
  })
  .refine(
    (data) => {
      // If knowsBirthTime is true, hour and minute are required
      if (data.knowsBirthTime) {
        return data.birthHour !== undefined && data.birthMinute !== undefined;
      }
      return true;
    },
    {
      message: 'La hora y minuto son requeridos cuando conoces tu hora de nacimiento',
      path: ['birthHour'],
    }
  );

type CompletarDatosFormData = z.infer<typeof completarDatosSchema>;

function CompletarDatosForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [locationType, setLocationType] = useState<'birth' | 'residence'>('birth');
  const [birthLocation, setBirthLocation] = useState<{
    lat: number;
    lng: number;
    timezone: string;
  } | null>(null);
  const [residenceLocation, setResidenceLocation] = useState<{
    lat: number;
    lng: number;
    timezone: string;
  } | null>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    birthDate: '',
    birthCity: '',
    birthCountry: '',
    birthHour: 0,
    birthMinute: 0,
    knowsBirthTime: false,
    gender: '',
    residenceCity: '',
    residenceCountry: '',
    birthDataChangeCount: 0,
    birthLat: null as number | null,
    birthLon: null as number | null,
    timezone: null as string | null,
    residenceLat: null as number | null,
    residenceLon: null as number | null,
  });

  // Capturar la URL de redirección si existe
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const isPostpago = searchParams.get('postpago') === 'true';

  // Fetch Google Maps API key from server
  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch('/api/google-maps/config');
        if (response.ok) {
          const data = await response.json();
          setGoogleMapsApiKey(data.apiKey);
        } else {
          console.error('Failed to fetch Google Maps API key');
        }
      } catch (error) {
        console.error('Error fetching Google Maps API key:', error);
      }
    }
    fetchApiKey();
  }, []);

  const form = useForm<CompletarDatosFormData>({
    resolver: zodResolver(completarDatosSchema),
    defaultValues: {
      birthDate: '',
      birthCity: '',
      birthCountry: '',
      knowsBirthTime: false,
      birthHour: 0,
      birthMinute: 0,
      gender: undefined,
      residenceCity: '',
      residenceCountry: '',
    },
  });

  const knowsBirthTime = form.watch('knowsBirthTime');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);

          // Pre-llenar campos con datos del usuario
          form.setValue('birthDate', data.birthDate || '');
          form.setValue('birthCity', data.birthCity || '');
          form.setValue('birthCountry', data.birthCountry || '');
          form.setValue('knowsBirthTime', data.knowsBirthTime || false);
          form.setValue('birthHour', data.birthHour || 0);
          form.setValue('birthMinute', data.birthMinute || 0);
          form.setValue('gender', data.gender || undefined);
          form.setValue('residenceCity', data.residenceCity || '');
          form.setValue('residenceCountry', data.residenceCountry || '');

          // Load existing location data into state
          if (data.birthLat != null && data.birthLon != null) {
            setBirthLocation({
              lat: data.birthLat,
              lng: data.birthLon,
              timezone: data.timezone || 'UTC',
            });
          }
          if (data.residenceLat != null && data.residenceLon != null) {
            setResidenceLocation({
              lat: data.residenceLat,
              lng: data.residenceLon,
              timezone: 'UTC', // Residence timezone not stored separately
            });
          }
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      } finally {
        setLoadingData(false);
      }
    }

    loadUserData();
  }, [form]);

  const handleSubmit = async (data: CompletarDatosFormData) => {
    // Validate that birth location has been selected via map
    if (!birthLocation) {
      toast.error("Por favor selecciona tu ubicación de nacimiento usando el botón 'Mapa'");
      form.setError('birthCity', {
        type: 'manual',
        message: 'Usa el botón "Mapa" para seleccionar tu ubicación',
      });
      return;
    }

    setIsLoading(true);

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
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error al guardar datos');
      }

      // Verificar el estado de los datos
      const refreshResponse = await fetch('/api/auth/refresh-token');
      const refreshResult = await refreshResponse.json();

      if (!refreshResult.success) {
        console.warn('No se pudo verificar el estado de los datos');
      }

      // Actualizar la sesión
      await update();

      // Mostrar toast de éxito
      toast.success('¡Datos guardados correctamente!');

      // Redirigir: si viene del flujo post-pago ir al calendario personal, sino al callbackUrl
      router.push(isPostpago ? '/calendario/personal' : callbackUrl);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar datos. Intenta nuevamente.');
      form.setError('root', {
        type: 'manual',
        message: 'Error al guardar datos. Intenta nuevamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapLocationSelect = (location: LocationData) => {
    if (locationType === 'birth') {
      setBirthLocation({
        lat: location.lat,
        lng: location.lng,
        timezone: location.timezone,
      });
    } else {
      setResidenceLocation({
        lat: location.lat,
        lng: location.lng,
        timezone: location.timezone,
      });
    }
    setShowMapPicker(false);

    // Extract city and country from address
    const addressParts = location.address.split(',').map((p) => p.trim());
    const city = addressParts[0] || location.address;
    const country = addressParts[addressParts.length - 1] || '';

    form.setValue(locationType === 'birth' ? 'birthCity' : 'residenceCity', city);
    form.setValue(locationType === 'birth' ? 'birthCountry' : 'residenceCountry', country);

    toast.success(
      locationType === 'birth'
        ? `Ubicación de nacimiento: ${city}`
        : `Ubicación de residencia: ${city}`
    );
  };

  const handleOpenMapPicker = (type: 'birth' | 'residence') => {
    setLocationType(type);
    setShowMapPicker(true);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Subtle animated background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-background to-background opacity-40" />

        {/* Animated subtle starry effect */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        <div className="relative text-center">
          <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
            <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-pulse" />
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin absolute text-primary" />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Cargando tus datos cósmicos...
          </p>
        </div>
      </div>
    );
  }

  const isLocked = userData.birthDataChangeCount >= 3;

  return (
    <>
      {/* Main container with celestial gradient background */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Subtle animated background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-background to-background opacity-40" />

        {/* Animated subtle starry effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-[15%] left-[20%] w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          />
          <div
            className="absolute top-[25%] right-[15%] w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          />
          <div
            className="absolute top-[45%] left-[10%] w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '2.5s' }}
          />
          <div
            className="absolute bottom-[30%] right-[20%] w-0.5 h-0.5 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}
          />
          <div
            className="absolute top-[60%] left-[60%] w-[2px] h-[2px] bg-primary/60 rounded-full animate-pulse"
            style={{ animationDelay: '1.5s', animationDuration: '5s' }}
          />
          <div
            className="absolute bottom-[20%] left-[30%] w-1 h-1 bg-primary/50 rounded-full animate-pulse"
            style={{ animationDelay: '2.5s', animationDuration: '4s' }}
          />
        </div>

        {/* Responsive content container */}
        <div className="relative z-10 py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4">
          <div className="max-w-2xl sm:max-w-2xl md:max-w-3xl mx-auto">
            {/* Elevated card with shadow and border */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl shadow-lg shadow-primary/5 p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="mb-5 sm:mb-6 md:mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    Completar Datos Personales
                  </h1>
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Completa tu información para los cálculos astrológicos precisos
                </p>
              </div>

              {/* Post-payment welcome banner */}
              {isPostpago && (
                <div className="mb-4 sm:mb-5 md:mb-6 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>¡Suscripción activada!</strong> Ahora completa tus datos de nacimiento
                    para acceder a tus cartas astrológicas personalizadas.
                  </span>
                </div>
              )}

              {/* Important notice with forced word wrap */}
              <FormWarning className="mb-4 sm:mb-5 md:mb-6 break-words">
                <span className="break-words">
                  <strong>Precisión requerida:</strong> Por favor completa tus datos personales para
                  poder hacer los cálculos necesarios. Ten cuidado al completar tus datos, sobre
                  todo hora y lugar de nacimiento. <br />
                  <strong>Solo tienes 3 oportunidades</strong> para colocar los datos correctamente.
                </span>
              </FormWarning>

              {/* Warning about remaining changes with word wrap */}
              {userData.birthDataChangeCount > 0 && (
                <FormStatus
                  variant={userData.birthDataChangeCount >= 3 ? 'error' : 'warning'}
                  className="mb-4 sm:mb-5 md:mb-6 break-words"
                >
                  <span className="break-words">
                    <strong className="whitespace-normal">
                      {userData.birthDataChangeCount >= 3
                        ? 'Límite de cambios alcanzado'
                        : `Aviso: Te quedan ${3 - userData.birthDataChangeCount} cambios disponibles`}
                    </strong>
                    <span className="whitespace-normal">
                      {userData.birthDataChangeCount >= 3
                        ? ' Has alcanzado el límite máximo de 3 cambios en tus datos de nacimiento. Por motivos de seguridad y consistencia, no puedes realizar más modificaciones.'
                        : ' Asegúrate de que la información sea correcta antes de guardar.'}
                    </span>
                  </span>
                </FormStatus>
              )}

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <fieldset disabled={isLocked} className="space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Birth Date */}
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <Calendar className="h-4 w-4 text-primary" />
                            Fecha de nacimiento
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="h-11 sm:h-12 min-h-[44px]" />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Knows Birth Time */}
                    <FormField
                      control={form.control}
                      name="knowsBirthTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 h-5 w-5 min-h-[20px] min-w-[20px]"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer text-sm sm:text-base font-normal">
                              Conozco mi hora exacta de nacimiento
                            </FormLabel>
                            <FormDescription className="text-xs sm:text-sm">
                              Marca esta casilla si conoces la hora exacta de tu nacimiento
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Birth Hour and Minute (conditional) with responsive grid */}
                    {knowsBirthTime && (
                      <div className="grid grid-cols-[minmax(0,140px)] min-[380px]:grid-cols-2 gap-3 sm:gap-4">
                        <FormField
                          control={form.control}
                          name="birthHour"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Hora</FormLabel>
                              <Select
                                onValueChange={(val) => field.onChange(parseInt(val))}
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-11 sm:h-12 min-h-[44px]">
                                    <SelectValue placeholder="Hora" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 24 }, (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={i.toString()}
                                      className="text-sm sm:text-base"
                                    >
                                      {i.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs sm:text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="birthMinute"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Minuto</FormLabel>
                              <Select
                                onValueChange={(val) => field.onChange(parseInt(val))}
                                defaultValue={field.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-11 sm:h-12 min-h-[44px]">
                                    <SelectValue placeholder="Minuto" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Array.from({ length: 60 }, (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={i.toString()}
                                      className="text-sm sm:text-base"
                                    >
                                      {i.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs sm:text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Birth Location - Map Button Only */}
                    <div className="space-y-2.5 sm:space-y-3">
                      <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                        <MapPin className="h-4 w-4 text-primary" />
                        Ubicación de nacimiento
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenMapPicker('birth')}
                        className="w-full h-11 sm:h-12 min-h-[44px] justify-start text-left"
                      >
                        <MapPin className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">
                          {birthLocation ? 'Cambiar ubicación' : 'Seleccionar en mapa'}
                        </span>
                      </Button>
                      {birthLocation ? (
                        <div className="bg-muted/50 border border-border/50 rounded-lg p-3 sm:p-4 text-sm">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1.5">
                            <span className="text-green-500 shrink-0">✓</span>
                            <span className="font-medium text-xs sm:text-sm">
                              Ubicación seleccionada
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground break-all">
                            Coordenadas: {birthLocation.lat.toFixed(4)},{' '}
                            {birthLocation.lng.toFixed(4)}
                          </p>
                          <p className="text-xs text-muted-foreground break-all">
                            Zona horaria: {birthLocation.timezone}
                          </p>
                        </div>
                      ) : (
                        <FormDescription className="text-xs sm:text-sm break-words">
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
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <User className="h-4 w-4 text-primary" />
                            Género
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-11 sm:h-12 min-h-[44px]">
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="masculino" className="text-sm sm:text-base">
                                  Masculino
                                </SelectItem>
                                <SelectItem value="femenino" className="text-sm sm:text-base">
                                  Femenino
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Residence Location - Map Button Only */}
                    <div className="space-y-2.5 sm:space-y-3">
                      <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                        <Home className="h-4 w-4 text-primary" />
                        Ubicación de residencia
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenMapPicker('residence')}
                        className="w-full h-11 sm:h-12 min-h-[44px] justify-start text-left"
                      >
                        <MapPin className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">
                          {residenceLocation ? 'Cambiar ubicación' : 'Seleccionar en mapa'}
                        </span>
                      </Button>
                      {residenceLocation ? (
                        <div className="bg-muted/50 border border-border/50 rounded-lg p-3 sm:p-4 text-sm">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1.5">
                            <span className="text-green-500 shrink-0">✓</span>
                            <span className="font-medium text-xs sm:text-sm">
                              Ubicación seleccionada
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground break-all">
                            Coordenadas: {residenceLocation.lat.toFixed(4)},{' '}
                            {residenceLocation.lng.toFixed(4)}
                          </p>
                        </div>
                      ) : (
                        <FormDescription className="text-xs sm:text-sm break-words">
                          Haz clic en "Seleccionar en mapa" para elegir tu ubicación de residencia
                          (opcional)
                        </FormDescription>
                      )}
                    </div>
                  </fieldset>

                  {/* Root form error with word wrap */}
                  {form.formState.errors.root && (
                    <FormStatus variant="error" className="break-words">
                      <span className="break-words">{form.formState.errors.root.message}</span>
                    </FormStatus>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || isLocked}
                    className="w-full h-12 sm:h-13 min-h-[48px] text-base sm:text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span className="text-sm sm:text-base">Guardando...</span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base">Guardar y continuar</span>
                    )}
                  </Button>

                  {isLocked && (
                    <p className="text-xs sm:text-sm text-destructive text-center break-words px-2">
                      No puedes guardar más cambios en tus datos de nacimiento.
                    </p>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Location Picker Dialog - only render after user data has loaded */}
      {googleMapsApiKey && !loadingData && (
        <MapLocationPicker
          apiKey={googleMapsApiKey}
          initialQuery={
            locationType === 'birth' ? form.getValues('birthCity') : form.getValues('residenceCity')
          }
          initialLat={locationType === 'birth' ? birthLocation?.lat : residenceLocation?.lat}
          initialLng={locationType === 'birth' ? birthLocation?.lng : residenceLocation?.lng}
          locationType={locationType}
          onLocationSelect={handleMapLocationSelect}
          onCancel={() => setShowMapPicker(false)}
          isOpen={showMapPicker}
        />
      )}
    </>
  );
}

export default function CompletarDatosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-background to-background opacity-40" />

          {/* Animated subtle starry effect */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <p className="relative text-sm sm:text-base text-muted-foreground">Cargando...</p>
        </div>
      }
    >
      <ProtectedPage>
        <CompletarDatosForm />
      </ProtectedPage>
    </Suspense>
  );
}
