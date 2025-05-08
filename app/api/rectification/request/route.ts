import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener datos del cuerpo de la solicitud
    const { acceptUncertainty } = await req.json();

    // Actualizar el estado de rectificación del usuario
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        rectificationRequested: true,
        rectificationAcceptedUncertainty: acceptUncertainty === "yes",
        rectificationStatus: acceptUncertainty === "yes" ? "pending" : "rejected",
        rectificationRequestDate: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      status: user.rectificationStatus,
    });
  } catch (error) {
    console.error("Error al procesar solicitud de rectificación:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
