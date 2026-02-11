'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Circle,
  UserCircle,
  AlertTriangle,
  Clock,
  Heart,
  HeartCrack,
} from 'lucide-react';
import { AstroBackButtonInline } from '@/components/navigation/astro-back-button';

// --- SCHEMAS ---

const rectificationSchema = z.object({
  // Section 1: Uncertainty
  acceptUncertainty: z.enum(['yes', 'no'], {
    required_error: 'Debes seleccionar una opción',
  }),

  // Section 2: Considerations & Data
  acceptConsiderations: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar las consideraciones',
  }),

  // Section 3: Events
  events: z
    .array(
      z.object({
        eventType: z.enum(['sad', 'happy']),
        description: z.string().min(5, {
          message: 'La descripción debe tener al menos 5 caracteres',
        }),
        eventDate: z.string().refine(
          (val) => {
            if (!val) return false;
            const date = new Date(val);
            return !isNaN(date.getTime());
          },
          { message: 'Fecha requerida' }
        ),
        notes: z.string().optional(),
      })
    )
    .length(4)
    .refine(
      (events) => {
        const sadEvents = events.filter((e) => e.eventType === 'sad');
        const happyEvents = events.filter((e) => e.eventType === 'happy');
        return sadEvents.length === 2 && happyEvents.length === 2;
      },
      { message: 'Debes proporcionar 2 eventos tristes y 2 eventos alegres' }
    ),
});

type RectificationFormData = z.infer<typeof rectificationSchema>;

// Sections configuration for markers
const FORM_SECTIONS = [
  { key: 'uncertainty', title: 'Incertidumbre', fields: ['acceptUncertainty'] },
  { key: 'personal', title: 'Datos y Acuerdos', fields: ['acceptConsiderations'] },
  { key: 'events', title: 'Eventos de Vida', fields: ['events'] },
];

export default function RectificacionCartaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<RectificationFormData>({
    resolver: zodResolver(rectificationSchema),
    defaultValues: {
      acceptUncertainty: undefined,
      acceptConsiderations: false,
      events: [
        { eventType: 'sad', description: '', eventDate: '', notes: '' },
        { eventType: 'sad', description: '', eventDate: '', notes: '' },
        { eventType: 'happy', description: '', eventDate: '', notes: '' },
        { eventType: 'happy', description: '', eventDate: '', notes: '' },
      ],
    },
  });

  // Auth Check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent('/rectificacion-carta')}`);
    }
  }, [status, router]);

  // Load User Data
  useEffect(() => {
    async function loadUserData() {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/user/profile');
          if (response.ok) {
            const data = await response.json();
            setUserData(data);

            // Redirect if profile incomplete (optional, based on logic)
            if (!data.birthDate || !data.birthCity || !data.birthCountry) {
              toast.message('Perfil incompleto', { description: 'Por favor completa tus datos de nacimiento primero.' });
              router.push(`/completar-datos?callbackUrl=${encodeURIComponent("/rectificacion-carta")}`);
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setLoadingData(false);
        }
      }
    }
    loadUserData();
  }, [status, session, router]);

  // Helper: Section Completion
  const getSectionCompletion = useCallback(() => {
    const values = form.getValues();

    return FORM_SECTIONS.reduce((acc, section) => {
      // Logic: Section is complete if no errors in its fields AND fields interpretively "filled"
      // Simplification: Check if fields involved have values and no errors.
      let isComplete = true;

      if (section.key === 'uncertainty') {
        isComplete = values.acceptUncertainty === 'yes';
      } else if (section.key === 'personal') {
        isComplete = values.acceptConsiderations === true;
      } else if (section.key === 'events') {
        // Check deeply if all events are filled
        const evs = values.events || [];
        isComplete = evs.every(e => e.description.length >= 5 && e.eventDate);
      }

      acc[section.key] = isComplete;
      return acc;
    }, {} as Record<string, boolean>);
  }, [form]);

  // Watch for changes to update UI pills
  const watchedValues = form.watch();
  const completedSteps = getSectionCompletion();


  // --- HANDLERS ---

  const onSubmit = async (data: RectificationFormData) => {
    if (data.acceptUncertainty !== 'yes') {
      toast.error('Requisito no cumplido', {
        description: 'La incertidumbre debe ser menor a 2 horas para este servicio.'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send Request (Uncertainty acceptance)
      // We assume this endpoint logs the request start or similar
      const reqResponse = await fetch('/api/rectification/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acceptUncertainty: data.acceptUncertainty }),
      });

      if (!reqResponse.ok) throw new Error('Error al iniciar solicitud');

      // 2. Send Events
      const eventsResponse = await fetch('/api/rectification/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: data.events }),
      });

      const result = await eventsResponse.json();
      if (!result.success) throw new Error(result.error || 'Error al guardar eventos');

      toast.success('¡Solicitud enviada con éxito!', {
        description: 'Te contactaremos pronto con el análisis.'
      });
      router.push('/');

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error al procesar la solicitud', {
        description: 'Por favor intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = useCallback((errors: any) => {
    toast.error('Faltan campos por completar', {
      description: 'Por favor revisa los campos marcados en rojo.',
      duration: 4000,
    });

    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      // Simple logic to find element
      setTimeout(() => {
        const element = document.querySelector(`[name="${firstErrorKey}"]`) as HTMLElement;
        // If error is in array (events), name might be "events.0.description"
        // react-hook-form names are usually consistent.
        // If element not found directly, try finding by partial match or ID? 
        // RHF registers standard names.
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        } else {
          // Fallback for complex fields (like RadioGroup which might not have name on container)
          // Try finding by generic error class or accordion
          const firstErrElement = document.querySelector('.text-destructive');
          if (firstErrElement) {
            firstErrElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    }
  }, []);

  // Loading State
  if (status === 'loading' || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-blue-50/30 dark:from-purple-950/30 dark:via-background dark:to-blue-950/20 flex items-center justify-center p-6">
        <div className="glass-card-strong rounded-2xl p-8 text-center max-w-md">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-blue-50/30 dark:from-purple-950/30 dark:via-background dark:to-blue-950/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex items-center gap-4">
          <AstroBackButtonInline href="/" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="lg:col-span-7 space-y-6">

            {/* Hero */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                Rectificación de <span className="gradient-primary font-medium">Carta Natal</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                La rectificación de tu carta natal te permite determinar la hora exacta de tu nacimiento.
              </p>
            </div>

            {/* Importance */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-light text-foreground">La importancia de rectificar</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Muchas veces ocurre que no tenemos la hora exacta de nacimiento. Al momento de querer hacer predicciones con tu carta natal, una hora de nacimiento rectificada toma una importancia fundamental.
                </p>
                <p>
                  A través de este servicio te ofrecemos la posibilidad de determinar la hora exacta de tu nacimiento, utilizando la técnica de los <strong>Atacires</strong>. Para ello precisaremos cuatro eventos fundamentales de tu vida, que los dividimos en dos momentos alegres y dos momentos tristes.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-medium text-foreground">¿Cómo solicito mi rectificación de hora?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { step: 1, text: 'Completa el formulario' },
                  { step: 2, text: 'Recibe la confirmación' },
                  { step: 3, text: 'Paga el servicio' },
                  { step: 4, text: 'Recibe la hora rectificada' }
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {item.step}
                    </span>
                    <span className="text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Guarantee */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4 border-l-4 border-l-primary/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10 mt-1">
                  <UserCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-medium text-foreground">Servicio Personalizado</h2>
                  <p className="text-muted-foreground">
                    Este servicio será revisado personalmente por un astrólogo. Te contactaremos por correo electrónico una vez que hayamos analizado tu solicitud de rectificación.
                  </p>
                </div>
              </div>
            </div>

            {/* Consideration Guide (Moved from Form) */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-medium text-foreground">Guía de Eventos</h2>
              <p className="text-muted-foreground text-sm">
                Para una correcta rectificación se precisan 4 eventos (2 tristes y 2 alegres) con fecha exacta.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-500 font-medium">
                    <HeartCrack className="w-4 h-4" />
                    <span>Eventos Tristes</span>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Muertes significativas (padres, abuelos impactantes).</li>
                    <li>Accidentes graves.</li>
                    <li>Pérdida de empleo importante.</li>
                    <li>Mudanza forzada o migración difícil.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 font-medium">
                    <Heart className="w-4 h-4" />
                    <span>Eventos Alegres</span>
                  </div>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Boda / Matrimonio.</li>
                    <li>Nacimiento del <strong>PRIMER</strong> hijo (otros no).</li>
                    <li>Graduación universitaria.</li>
                    <li>Firma de escritura / Compra casa.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing / Transparency */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-1">Valor e Inversión</h3>
                  <p className="text-3xl font-semibold gradient-primary">USD 75</p>
                </div>
                <div className="text-sm text-muted-foreground md:text-right max-w-sm">
                  <p className="font-medium text-foreground mb-1 flex items-center md:justify-end gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    Garantía de transparencia
                  </p>
                  <p>No realizas ningún pago por adelantado. Solo abonas una vez que hayamos confirmado que tu consulta puede ser respondida.</p>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-6">

              <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-t-4 border-t-primary shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Solicitud</h2>
                  <p className="text-sm text-muted-foreground">Completa los pasos para evaluar tu caso.</p>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {FORM_SECTIONS.map((section) => {
                    const isComplete = completedSteps[section.key];
                    return (
                      <Badge
                        key={section.key}
                        variant={isComplete ? 'default' : 'outline'}
                        className={isComplete ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                      >
                        {isComplete ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Circle className="w-3 h-3 mr-1" />}
                        {section.title}
                      </Badge>
                    );
                  })}
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                    <Accordion type="single" collapsible defaultValue="uncertainty" className="space-y-4">

                      {/* 1. Uncertainty */}
                      <AccordionItem value="uncertainty" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold">1</span>
                            <span className="font-semibold text-foreground">Incertidumbre</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Este servicio aplica solo si tu duda sobre la hora de nacimiento es de <strong>máximo 2 horas</strong>. (Ej: Entre las 14:00 y las 16:00).
                          </p>
                          <FormField
                            control={form.control}
                            name="acceptUncertainty"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-2"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer flex-1">
                                        Sí, mi duda está dentro de ese rango.
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer flex-1">
                                        No, la incertidumbre es mayor a 2 horas.
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                {field.value === 'no' && (
                                  <div className="mt-3 p-3 bg-destructive/10 text-destructive rounded-lg text-sm flex gap-2 items-start">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <p>Lo sentimos. Si la incertidumbre es mayor a 2 horas, no podemos ofrecer este servicio actualmente.</p>
                                  </div>
                                )}
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 2. Personal Data & Considerations */}
                      <AccordionItem value="personal" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold">2</span>
                            <span className="font-semibold text-foreground">Tus Datos</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-4">
                          {userData && (
                            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-muted-foreground block text-xs">Nombre</span> {session?.user?.name}</div>
                                <div><span className="text-muted-foreground block text-xs">Email</span> {session?.user?.email}</div>
                                <div><span className="text-muted-foreground block text-xs">Fecha Nac.</span> {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : 'No definida'}</div>
                                <div><span className="text-muted-foreground block text-xs">Ciudad</span> {userData.birthCity}</div>
                              </div>
                            </div>
                          )}

                          <FormField
                            control={form.control}
                            name="acceptConsiderations"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="cursor-pointer">
                                    He leído la información sobre los eventos requeridos y confirmo que puedo proveer 2 eventos tristes y 2 alegres.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* 3. Events */}
                      <AccordionItem value="events" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold">3</span>
                            <span className="font-semibold text-foreground">Eventos</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-6">
                          <p className="text-xs text-muted-foreground">Ingresa fechas exactas y descripción breve.</p>

                          {/* Sad Events Group */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-rose-500">
                              <HeartCrack className="w-4 h-4" /> 2 Eventos Tristes
                            </h4>
                            {form.getValues().events.slice(0, 2).map((event, index) => (
                              <div key={`sad-${index}`} className="p-3 border border-border/40 rounded-lg bg-background/50 space-y-3">
                                <FormField
                                  control={form.control}
                                  name={`events.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder={`Evento Triste #${index + 1} (Ej: Fallecimiento abuelo)`} {...field} className="h-9" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`events.${index}.eventDate`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input type="date" {...field} className="h-9 w-full" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Happy Events Group */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium flex items-center gap-2 text-emerald-500">
                              <Heart className="w-4 h-4" /> 2 Eventos Alegres
                            </h4>
                            {form.getValues().events.slice(2, 4).map((event, index) => (
                              <div key={`happy-${index}`} className="p-3 border border-border/40 rounded-lg bg-background/50 space-y-3">
                                <FormField
                                  control={form.control}
                                  name={`events.${index + 2}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder={`Evento Alegre #${index + 1} (Ej: Boda)`} {...field} className="h-9" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`events.${index + 2}.eventDate`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input type="date" {...field} className="h-9 w-full" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            ))}
                          </div>

                        </AccordionContent>
                      </AccordionItem>

                    </Accordion>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-elegant-lg py-6 rounded-xl"
                        disabled={isSubmitting || watchedValues.acceptUncertainty === 'no'}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </span>
                        ) : (
                          'Solicitar Rectificación'
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Revisaremos tu caso antes de solicitar el pago.
                      </p>
                    </div>

                  </form>
                </Form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
