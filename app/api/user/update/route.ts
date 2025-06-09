import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener datos del formulario
    const data = await req.json()
    console.log("Datos recibidos:", data)
    
    // Actualizar usuario sin geocodificación
    try {
      // Construir un objeto DateTime completo para birthDate
      let birthDateFormatted = null;
      if (data.birthDate) {
        const dateStr = data.birthDate as string;
        const hour = data.knowsBirthTime && data.birthHour !== null ? Number(data.birthHour) : 0;
        const minute = data.knowsBirthTime && data.birthMinute !== null ? Number(data.birthMinute) : 0;
        
        // Crear fecha manteniendo la zona horaria local (sin conversión UTC)
        const [year, month, day] = dateStr.split('-').map(Number);
        birthDateFormatted = new Date(year, month - 1, day, hour, minute, 0, 0);
        console.log("Fecha original:", dateStr, "Hora:", hour, "Minuto:", minute);
        console.log("Fecha formateada (local):", birthDateFormatted.toISOString());
      }

      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          birthDate: birthDateFormatted,
          birthCity: data.birthCity as string,
          birthCountry: data.birthCountry as string,
          birthHour: data.knowsBirthTime ? Number(data.birthHour) : null,
          birthMinute: data.knowsBirthTime ? Number(data.birthMinute) : null,
          knowsBirthTime: Boolean(data.knowsBirthTime),
          gender: data.gender as string,
          residenceCity: data.residenceCity as string,
          residenceCountry: data.residenceCountry as string,
          // Omitimos timezone por ahora
        }
      })
      
      console.log("Usuario actualizado:", updatedUser)
      
      // Verificar si el usuario tiene todos los datos necesarios
      const hasCompletedData = !!(
        updatedUser.birthDate && 
        updatedUser.birthCity && 
        updatedUser.residenceCity
      )
      
      // Devolver una respuesta que indique si el usuario ha completado sus datos
      return NextResponse.json({ 
        success: true, 
        hasCompletedData: hasCompletedData 
      })
    } catch (dbError) {
      console.error("Error al actualizar usuario:", dbError)
      return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error general:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
