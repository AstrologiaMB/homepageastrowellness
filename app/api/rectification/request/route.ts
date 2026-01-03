import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email-service";

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

    // Enviar notificaciones por email solo si el usuario aceptó la incertidumbre (status pending)
    if (user.rectificationStatus === "pending") {
      try {
        // 1. Email al Administrador (Cursos)
        await sendEmail({
          to: "cursos@mariablaquier.com",
          subject: `[Desde astrochat] Solicitud de Rectificación - ${session.user.email}`,
          html: `
            <h2>Nueva Solicitud de Rectificación</h2>
            <p><strong>Usuario:</strong> ${user.name || "Sin nombre"} (${user.email})</p>
            <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Estado:</strong> Pendiente de revisión</p>
            <br/>
            <h3>Datos de Nacimiento Actuales:</h3>
            <ul>
              <li><strong>Fecha:</strong> ${user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "No def."}</li>
              <li><strong>Hora:</strong> ${user.birthHour}:${user.birthMinute?.toString().padStart(2, '0') || "00"}</li>
              <li><strong>Lugar:</strong> ${user.birthCity}, ${user.birthCountry}</li>
            </ul>
            <br/>
            <p>El usuario ha aceptado que el proceso puede no ser viable si la incertidumbre es muy alta.</p>
          `
        });

        // 2. Email de Confirmación al Usuario
        if (session.user.email) {
          await sendEmail({
            to: session.user.email,
            subject: "Solicitud de Rectificación recibida - Astrochat",
            html: `
              <h2>Solicitud Recibida</h2>
              <p>Hola,</p>
              <p>Hemos registrado tu interés en rectificar tu hora de nacimiento.</p>
              <p>El equipo de María Blaquier analizará tus datos actuales para determinar si es viable realizar el proceso de rectificación. Si es posible, te contactaremos con los pasos a seguir y el link de pago correspondiente.</p>
              <br/>
              <p><em>El equipo de Astrochat</em></p>
            `
          });
        }
      } catch (emailError) {
        console.error("Error enviando notificaciones de rectificación:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      status: user.rectificationStatus,
    });
  } catch (error) {
    console.error("Error al procesar solicitud de rectificación:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
