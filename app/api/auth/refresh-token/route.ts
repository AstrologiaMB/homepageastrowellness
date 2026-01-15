import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptionsSync } from "@/lib/auth-url";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(getAuthOptionsSync());
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar si el usuario tiene datos completos
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { birthDate: true, birthCity: true, residenceCity: true }
    });

    // Determinar si el usuario ha completado sus datos
    const hasCompletedData = !!(dbUser?.birthDate && dbUser?.birthCity && dbUser?.residenceCity);

    // En NextAuth v4, no podemos modificar directamente el token desde un endpoint API
    // El cliente deberá usar el método update() de useSession() después de llamar a este endpoint

    return NextResponse.json({
      success: true,
      hasCompletedData: hasCompletedData
    });
  } catch (error) {
    console.error("Error al verificar estado de datos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
