"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { getApiUrl } from "@/lib/api-config";

function CompletarDatosForm() {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [knowsBirthTime, setKnowsBirthTime] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationOptions, setLocationOptions] = useState<any[]>([]);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
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
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();

  // Capturar la URL de redirección si existe
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setKnowsBirthTime(data.knowsBirthTime || false);
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      } finally {
        setLoadingData(false);
      }
    }

    loadUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckingLocation(true);

    const formData = new FormData(e.currentTarget);
    const birthCity = formData.get("birthCity") as string;
    const birthCountry = formData.get("birthCountry") as string;

    try {
      // Verificar ubicación con el nuevo endpoint
      const apiUrl = getApiUrl('CALCULOS');
      const geoResponse = await fetch(`${apiUrl}/geocode/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: birthCity,
          country: birthCountry
        })
      });

      if (!geoResponse.ok) {
        throw new Error("Error verificando ubicación");
      }

      const geoResult = await geoResponse.json();

      if (!geoResult.success || !geoResult.data) {
        throw new Error("Ubicación no encontrada");
      }

      // Caso 1: Solo una opción - proceder directamente
      if (geoResult.data.single) {
        await saveUserData(formData, geoResult.data);
      }
      // Caso 2: Múltiples opciones - mostrar modal
      else if (geoResult.data.multiple) {
        setPendingFormData(formData);
        setLocationOptions(geoResult.data.options);
        setShowLocationModal(true);
        setCheckingLocation(false);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error al verificar la ubicación. Por favor, intenta nuevamente.");
      setCheckingLocation(false);
    }
  };

  const saveUserData = async (formData: FormData, locationData: any) => {
    setLoading(true);
    setCheckingLocation(false);

    const data = {
      birthDate: formData.get("birthDate"),
      birthCity: formData.get("birthCity"),
      birthCountry: formData.get("birthCountry"),
      birthHour: knowsBirthTime ? Number(formData.get("birthHour")) : null,
      birthMinute: knowsBirthTime ? Number(formData.get("birthMinute")) : null,
      knowsBirthTime: knowsBirthTime,
      gender: formData.get("gender"),
      residenceCity: formData.get("residenceCity"),
      residenceCountry: formData.get("residenceCountry"),
      // Agregar coordenadas y timezone
      birthLat: locationData.lat,
      birthLon: locationData.lon,
      birthTimezone: locationData.timezone
    };

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Error al guardar datos");
      }

      // Verificar el estado de los datos
      const refreshResponse = await fetch("/api/auth/refresh-token");
      const refreshResult = await refreshResponse.json();

      if (!refreshResult.success) {
        console.warn("No se pudo verificar el estado de los datos");
      }

      // Actualizar la sesión
      await update();

      // Redirigir a la página de procesamiento (intermedia) con el callbackUrl original
      const targetUrl = `/procesando-datos?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      router.push(targetUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar datos. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    if (pendingFormData) {
      saveUserData(pendingFormData, location);
      setShowLocationModal(false);
    }
  };

  if (loadingData) {
    return <div className="max-w-xl mx-auto mt-10 p-6 text-center">Cargando datos...</div>;
  }

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-6">Completar Datos Personales</h1>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Importante: Precisión requerida</AlertTitle>
          <AlertDescription className="text-blue-700 mt-2">
            Por favor completa tus datos personales para poder hacer los cálculos necesarios. Ten cuidado al completar tus datos, sobre todo hora y lugar de nacimiento.
            <br />
            <strong>Solo tienes 3 oportunidades</strong> para colocar los datos correctamente, de lo contrario tendrás que contactar al administrador.
          </AlertDescription>
        </Alert>

        {userData.birthDataChangeCount > 0 && (
          <Alert variant={userData.birthDataChangeCount >= 3 ? "destructive" : "default"} className={`mb-6 ${userData.birthDataChangeCount < 3 ? "border-yellow-500 bg-yellow-50" : ""}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {userData.birthDataChangeCount >= 3
                ? "Límite de cambios alcanzado"
                : "Aviso importante sobre cambios de datos"}
            </AlertTitle>
            <AlertDescription>
              {userData.birthDataChangeCount >= 3
                ? "Has alcanzado el límite máximo de 3 cambios en tus datos de nacimiento. Por motivos de seguridad y consistencia, no puedes realizar más modificaciones. Contacta a soporte si necesitas ayuda."
                : `Te quedan ${3 - userData.birthDataChangeCount} cambios disponibles en tus datos de nacimiento. Asegúrate de que la información sea correcta.`}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset disabled={userData.birthDataChangeCount >= 3} className="space-y-4">
            <div>
              <label className="block mb-2">Fecha de nacimiento</label>
              <input
                type="date"
                name="birthDate"
                className="w-full p-2 border rounded"
                required
                defaultValue={userData.birthDate}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="knowsBirthTime"
                  name="knowsBirthTime"
                  className="mr-2"
                  onChange={(e) => setKnowsBirthTime(e.target.checked)}
                  checked={knowsBirthTime}
                />
                <label htmlFor="knowsBirthTime">Conozco mi hora exacta de nacimiento</label>
              </div>

              {knowsBirthTime && (
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block mb-2">Hora</label>
                    <select
                      name="birthHour"
                      className="w-full p-2 border rounded"
                      required={knowsBirthTime}
                      defaultValue={userData.birthHour || 0}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2">Minuto</label>
                    <select
                      name="birthMinute"
                      className="w-full p-2 border rounded"
                      required={knowsBirthTime}
                      defaultValue={userData.birthMinute || 0}
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2">Ciudad de nacimiento</label>
              <input
                type="text"
                name="birthCity"
                className="w-full p-2 border rounded"
                required
                defaultValue={userData.birthCity || ""}
              />
            </div>

            <div>
              <label className="block mb-2">País de nacimiento</label>
              <input
                type="text"
                name="birthCountry"
                className="w-full p-2 border rounded"
                required
                defaultValue={userData.birthCountry || ""}
              />
            </div>

            <div>
              <label className="block mb-2">Género</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="masculino"
                    className="mr-2"
                    required
                    defaultChecked={userData.gender === "masculino"}
                  />
                  Masculino
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="femenino"
                    className="mr-2"
                    required
                    defaultChecked={userData.gender === "femenino"}
                  />
                  Femenino
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2">Ciudad de residencia</label>
              <input
                type="text"
                name="residenceCity"
                className="w-full p-2 border rounded"
                required
                defaultValue={userData.residenceCity || ""}
              />
            </div>

            <div>
              <label className="block mb-2">País de residencia</label>
              <input
                type="text"
                name="residenceCountry"
                className="w-full p-2 border rounded"
                required
                defaultValue={userData.residenceCountry || ""}
              />
            </div>

          </fieldset>

          <Button type="submit" disabled={loading || checkingLocation} className="w-full mt-4">
            {checkingLocation ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando ubicación...
              </>
            ) : loading ? (
              "Guardando..."
            ) : (
              "Guardar y continuar"
            )}
          </Button>
          {userData.birthDataChangeCount >= 3 && (
            <p className="text-sm text-red-500 mt-2 text-center">
              No puedes guardar más cambios en tus datos de nacimiento.
            </p>
          )}
        </form>
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
  );
}

export default function CompletarDatosPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto mt-10 p-6 text-center">Cargando...</div>}>
      <CompletarDatosForm />
    </Suspense>
  );
}
