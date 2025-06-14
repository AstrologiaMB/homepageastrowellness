import { NextResponse } from "next/server";
import { geocode } from "@/lib/geocode";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const country = searchParams.get('country');

    if (!city) {
      return NextResponse.json({ error: "Parámetro 'city' es requerido" }, { status: 400 });
    }

    // Si no se proporciona país, intentar extraerlo de la ciudad o usar un valor por defecto
    let cityToGeocode = city;
    let countryToGeocode = country || '';

    // Si la ciudad contiene coma, asumir que incluye el país
    if (city.includes(',') && !country) {
      const parts = city.split(',').map(part => part.trim());
      cityToGeocode = parts[0];
      countryToGeocode = parts.slice(1).join(', ');
    }

    const result = await geocode(cityToGeocode, countryToGeocode);

    if (!result) {
      return NextResponse.json({ 
        error: "No se pudieron obtener las coordenadas para la ubicación especificada" 
      }, { status: 404 });
    }

    // Determinar timezone basado en las coordenadas (simplificado)
    let timezone = 'UTC';
    
    // Mapeo básico de zonas horarias por región (esto podría mejorarse con una API de timezone)
    const { lat, lon } = result;
    
    if (lat >= -60 && lat <= -20 && lon >= -80 && lon <= -30) {
      // Sudamérica
      if (lon >= -75 && lon <= -30) {
        timezone = 'America/Argentina/Buenos_Aires';
      } else if (lon >= -80 && lon <= -65) {
        timezone = 'America/Lima';
      }
    } else if (lat >= 25 && lat <= 50 && lon >= -125 && lon <= -65) {
      // Norteamérica
      timezone = 'America/New_York';
    } else if (lat >= 35 && lat <= 70 && lon >= -10 && lon <= 40) {
      // Europa
      timezone = 'Europe/Madrid';
    }

    return NextResponse.json({
      latitude: result.lat,
      longitude: result.lon,
      city: cityToGeocode,
      country: countryToGeocode,
      timezone: timezone
    });

  } catch (error) {
    console.error("Error en geocoding:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor al obtener coordenadas" 
    }, { status: 500 });
  }
}
