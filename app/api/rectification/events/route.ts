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

    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Verificar que el usuario haya aceptado la incertidumbre
    if (!user.rectificationAcceptedUncertainty) {
      return NextResponse.json({ 
        error: "Debes aceptar la incertidumbre de 2 horas primero" 
      }, { status: 400 });
    }

    // Obtener datos del cuerpo de la solicitud
    const { events } = await req.json();

    // Validar que se hayan enviado 4 eventos (2 tristes y 2 alegres)
    if (!events || !Array.isArray(events) || events.length !== 4) {
      return NextResponse.json({ 
        error: "Debes proporcionar exactamente 4 eventos" 
      }, { status: 400 });
    }

    const sadEvents = events.filter(event => event.eventType === "sad");
    const happyEvents = events.filter(event => event.eventType === "happy");

    if (sadEvents.length !== 2 || happyEvents.length !== 2) {
      return NextResponse.json({ 
        error: "Debes proporcionar 2 eventos tristes y 2 eventos alegres" 
      }, { status: 400 });
    }

    // Eliminar eventos anteriores si existen
    await prisma.rectificationEvent.deleteMany({
      where: { userId: user.id },
    });

    // Crear los nuevos eventos
    const createdEvents = await Promise.all(
      events.map(event => 
        prisma.rectificationEvent.create({
          data: {
            userId: user.id,
            eventType: event.eventType,
            description: event.description,
            eventDate: new Date(event.eventDate),
            notes: event.notes || null,
          },
        })
      )
    );

    // Actualizar el estado de la rectificación
    await prisma.user.update({
      where: { id: user.id },
      data: {
        rectificationStatus: "in_progress",
      },
    });

    return NextResponse.json({
      success: true,
      events: createdEvents,
    });
  } catch (error) {
    console.error("Error al guardar eventos de rectificación:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        rectificationEvents: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      events: user.rectificationEvents,
      status: user.rectificationStatus,
    });
  } catch (error) {
    console.error("Error al obtener eventos de rectificación:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
