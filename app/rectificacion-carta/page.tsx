"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validación para el formulario inicial
const uncertaintyFormSchema = z.object({
  acceptUncertainty: z.enum(["yes", "no"], {
    required_error: "Debes seleccionar una opción",
  }),
});

// Esquema de validación para el formulario de consideraciones
const considerationsFormSchema = z.object({
  acceptConsiderations: z.boolean().refine(val => val === true, {
    message: "Debes aceptar las consideraciones para continuar",
  }),
});

// Esquema de validación para el formulario de eventos
const eventsFormSchema = z.object({
  events: z.array(
    z.object({
      eventType: z.enum(["sad", "happy"], {
        required_error: "Debes seleccionar el tipo de evento",
      }),
      description: z.string().min(5, {
        message: "La descripción debe tener al menos 5 caracteres",
      }),
      eventDate: z.string().refine(val => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      }, {
        message: "Fecha inválida",
      }),
      notes: z.string().optional(),
    })
  ).length(4, {
    message: "Debes proporcionar exactamente 4 eventos",
  }).refine(events => {
    const sadEvents = events.filter(event => event.eventType === "sad");
    const happyEvents = events.filter(event => event.eventType === "happy");
    return sadEvents.length === 2 && happyEvents.length === 2;
  }, {
    message: "Debes proporcionar 2 eventos tristes y 2 eventos alegres",
  }),
});

export default function RectificacionCartaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [step, setStep] = useState(1);

  // Formulario para la aceptación de incertidumbre
  const uncertaintyForm = useForm<z.infer<typeof uncertaintyFormSchema>>({
    resolver: zodResolver(uncertaintyFormSchema),
    defaultValues: {
      acceptUncertainty: undefined,
    },
  });

  // Formulario para la aceptación de consideraciones
  const considerationsForm = useForm<z.infer<typeof considerationsFormSchema>>({
    resolver: zodResolver(considerationsFormSchema),
    defaultValues: {
      acceptConsiderations: false,
    },
  });

  // Formulario para los eventos
  const eventsForm = useForm<z.infer<typeof eventsFormSchema>>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: {
      events: [
        { eventType: "sad", description: "", eventDate: "", notes: "" },
        { eventType: "sad", description: "", eventDate: "", notes: "" },
        { eventType: "happy", description: "", eventDate: "", notes: "" },
        { eventType: "happy", description: "", eventDate: "", notes: "" },
      ],
    },
  });

  // Verificar autenticación
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent("/rectificacion-carta")}`);
    }
  }, [status, router]);

  // Cargar datos del usuario
  useEffect(() => {
    async function loadUserData() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/user/profile");
          if (response.ok) {
            const data = await response.json();
            setUserData(data);

            // Verificar si el usuario ha completado sus datos (Opcional: No redirigir forzosamente)
            // if (!data.birthDate || !data.birthCity || !data.birthCountry) {
            //   router.push(`/completar-datos?callbackUrl=${encodeURIComponent("/rectificacion-carta")}`);
            // }
          }
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
        } finally {
          setLoadingData(false);
        }
      }
    }

    loadUserData();
  }, [status, session, router]);

  // Manejar envío del formulario de incertidumbre
  const onUncertaintySubmit = async (data: z.infer<typeof uncertaintyFormSchema>) => {
    try {
      // Enviar la solicitud a la API
      const response = await fetch("/api/rectification/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acceptUncertainty: data.acceptUncertainty }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Error al procesar la solicitud");
      }

      if (data.acceptUncertainty === "yes") {
        setStep(2);
      } else {
        setStep(4); // Mostrar mensaje de rechazo
      }
    } catch (error) {
      console.error("Error al enviar solicitud de rectificación:", error);
      alert("Error al procesar la solicitud. Por favor, intenta nuevamente.");
    }
  };

  // Manejar envío del formulario de consideraciones
  const onConsiderationsSubmit = (data: z.infer<typeof considerationsFormSchema>) => {
    if (data.acceptConsiderations) {
      setStep(3);
    }
  };

  // Manejar envío del formulario de eventos
  const onEventsSubmit = async (data: z.infer<typeof eventsFormSchema>) => {
    try {
      // Enviar la solicitud a la API
      const response = await fetch("/api/rectification/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Error al procesar la solicitud");
      }

      alert("¡Solicitud de rectificación enviada con éxito! Te contactaremos pronto.");
      router.push("/");
    } catch (error) {
      console.error("Error al enviar eventos de rectificación:", error);
      alert("Error al procesar la solicitud. Por favor, intenta nuevamente.");
    }
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (status === "loading" || loadingData) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  // Mostrar el formulario correspondiente según el paso actual
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Rectificación de Carta Natal</CardTitle>
            <CardDescription>
              Este servicio está diseñado para casos en los que la hora de nacimiento tiene un margen de incertidumbre de hasta dos horas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Por ejemplo, si dudas entre haber nacido a las 7 AM o a las 9 AM, el servicio es adecuado.
              Sin embargo, si la duda abarca un rango mayor, como entre las 7 AM y la 1 PM, no aplica.
            </p>

            <Form {...uncertaintyForm}>
              <form onSubmit={uncertaintyForm.handleSubmit(onUncertaintySubmit)} className="space-y-6">
                <FormField
                  control={uncertaintyForm.control}
                  name="acceptUncertainty"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        ¿Aceptas que la hora de nacimiento que propones podría tener una incertidumbre máxima de 2 horas?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Sí, la incertidumbre es de máximo 2 horas
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No, la incertidumbre es mayor a 2 horas
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Continuar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === 2 && userData && (
        <Card>
          <CardHeader>
            <CardTitle>Datos para Rectificación</CardTitle>
            <CardDescription>
              Verifica que tus datos personales sean correctos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Nombre</h3>
                  <p>{session?.user?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Correo electrónico</h3>
                  <p>{session?.user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Fecha de nacimiento</h3>
                  <p>{userData.birthDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Hora de nacimiento a rectificar</h3>
                  <p>
                    {userData.knowsBirthTime
                      ? `${String(userData.birthHour).padStart(2, '0')}:${String(userData.birthMinute).padStart(2, '0')}`
                      : "No especificada"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">País de nacimiento</h3>
                  <p>{userData.birthCountry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Ciudad de nacimiento</h3>
                  <p>{userData.birthCity}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold mb-4">Consideraciones</h2>
              <p className="mb-4">
                Para una correcta rectificación de la hora de nacimiento se precisan 4 eventos (2 tristes y 2 alegres, con día, mes y año del evento)
              </p>

              <p className="mb-4">
                Como eventos tristes, los mejores para verificar una hora natal son las muertes: la de nuestros padres, abuelos (hay que especificar si es materno o paterno) o una muerte que te haya impactado.
              </p>

              <p className="mb-4">
                A veces un accidente califica como algo triste, o la pérdida de un empleo, mudanza de país, etc.
              </p>

              <p className="mb-4">
                Los eventos alegres más recomendados son la fecha de la boda y el nacimiento del PRIMER hijo, el resto de los nacimientos no cuentan.
              </p>

              <p className="mb-4">
                Otros eventos posibles: fecha de graduación de la universidad, el inicio de una relación, la firma de la escritura de una propiedad, etc. La adopción de una mascota también es posible.
              </p>

              <Form {...considerationsForm}>
                <form onSubmit={considerationsForm.handleSubmit(onConsiderationsSubmit)} className="space-y-6">
                  <FormField
                    control={considerationsForm.control}
                    name="acceptConsiderations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            He leído y entendido las consideraciones
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Continuar</Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Eventos para Rectificación</CardTitle>
            <CardDescription>
              Ingresa 4 eventos importantes (2 tristes y 2 alegres)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...eventsForm}>
              <form onSubmit={eventsForm.handleSubmit(onEventsSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Eventos Tristes (2)</h3>

                  {/* Evento Triste 1 */}
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-4">Evento Triste 1</h4>
                    <div className="space-y-4">
                      <FormField
                        control={eventsForm.control}
                        name={`events.0.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Fallecimiento de mi abuelo paterno" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.0.eventDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha del evento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.0.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notas adicionales (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Detalles adicionales sobre el evento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <input type="hidden" {...eventsForm.register(`events.0.eventType`)} value="sad" />
                    </div>
                  </div>

                  {/* Evento Triste 2 */}
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-4">Evento Triste 2</h4>
                    <div className="space-y-4">
                      <FormField
                        control={eventsForm.control}
                        name={`events.1.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Accidente de auto" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.1.eventDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha del evento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.1.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notas adicionales (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Detalles adicionales sobre el evento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <input type="hidden" {...eventsForm.register(`events.1.eventType`)} value="sad" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Eventos Alegres (2)</h3>

                  {/* Evento Alegre 1 */}
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-4">Evento Alegre 1</h4>
                    <div className="space-y-4">
                      <FormField
                        control={eventsForm.control}
                        name={`events.2.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Mi boda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.2.eventDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha del evento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.2.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notas adicionales (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Detalles adicionales sobre el evento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <input type="hidden" {...eventsForm.register(`events.2.eventType`)} value="happy" />
                    </div>
                  </div>

                  {/* Evento Alegre 2 */}
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-4">Evento Alegre 2</h4>
                    <div className="space-y-4">
                      <FormField
                        control={eventsForm.control}
                        name={`events.3.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Nacimiento de mi primer hijo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.3.eventDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha del evento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventsForm.control}
                        name={`events.3.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notas adicionales (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Detalles adicionales sobre el evento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <input type="hidden" {...eventsForm.register(`events.3.eventType`)} value="happy" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Volver
                  </Button>
                  <Button type="submit">Enviar solicitud</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>No cumples los requisitos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Estimado {session?.user?.name}, lamentablemente no podemos rectificar tu carta natal,
              dado que no cumples los requisitos previos necesarios.
            </p>
            <Button onClick={() => router.push("/")}>Volver al inicio</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
