import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener datos del usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        birthDate: true,
        birthCity: true,
        birthCountry: true,
        birthHour: true,
        birthMinute: true,
        knowsBirthTime: true,
        gender: true,
        residenceCity: true,
        residenceCountry: true,
        birthDataChangeCount: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Formatear la fecha para el input type="date" (usando métodos UTC)
    let formattedBirthDate = null;
    if (user.birthDate) {
      const date = new Date(user.birthDate);
      // Usar métodos UTC para evitar conversión de timezone
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      formattedBirthDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    }

    return NextResponse.json({
      ...user,
      birthDate: formattedBirthDate,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
