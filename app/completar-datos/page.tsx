"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function CompletarDatosPage() {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [knowsBirthTime, setKnowsBirthTime] = useState(false);
  const [userData, setUserData] = useState({
    birthDate: "",
    birthCity: "",
    birthCountry: "",
    birthHour: 0,
    birthMinute: 0,
    knowsBirthTime: false,
    residenceCity: "",
    residenceCountry: "",
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
    setLoading(true);
    
    // Obtener los datos del formulario
    const formData = new FormData(e.currentTarget);
    const data = {
      birthDate: formData.get("birthDate"),
      birthCity: formData.get("birthCity"),
      birthCountry: formData.get("birthCountry"),
      birthHour: knowsBirthTime ? Number(formData.get("birthHour")) : null,
      birthMinute: knowsBirthTime ? Number(formData.get("birthMinute")) : null,
      knowsBirthTime: knowsBirthTime,
      residenceCity: formData.get("residenceCity"),
      residenceCountry: formData.get("residenceCountry"),
    };
    
    try {
      console.log("Enviando datos:", data);
      
      // Enviar datos a la API
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
      
      console.log("Datos guardados correctamente");
      
      // Verificar el estado de los datos
      const refreshResponse = await fetch("/api/auth/refresh-token");
      const refreshResult = await refreshResponse.json();
      
      if (!refreshResult.success) {
        console.warn("No se pudo verificar el estado de los datos");
      }
      
      // Actualizar la sesión para reflejar los cambios
      await update();
      console.log("Sesión actualizada");
      
      // Redirigir al usuario
      router.push(callbackUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar datos. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  
  if (loadingData) {
    return <div className="max-w-xl mx-auto mt-10 p-6 text-center">Cargando datos...</div>;
  }
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6">Completar Datos Personales</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? "Guardando..." : "Guardar y continuar"}
        </Button>
      </form>
    </div>
  );
}
