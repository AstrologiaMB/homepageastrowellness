import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email-service";

// Esquema de validación para el formulario
const horariaFormSchema = {
  firstName: { type: "string", minLength: 1 },
  lastName: { type: "string", minLength: 1 },
  email: { type: "string", format: "email" },
  country: { type: "string", minLength: 1 },
  acceptSingleQuestion: { type: "string", enum: ["Si", "no"] },
  isFirstTime: { type: "string", enum: ["Si", "no"] },
  questionCategory: { type: "string", minLength: 1 },
  acceptConsiderations: { type: "boolean" },
  question: { type: "string", minLength: 5 },
  context: { type: "string" },
};

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Obtener datos del formulario
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      country,
      acceptSingleQuestion,
      isFirstTime,
      questionCategory,
      acceptConsiderations,
      question,
      context,
    } = body;

    // Validación básica
    if (!firstName || !lastName || !email || !country || !questionCategory || !question) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    if (!acceptConsiderations) {
      return NextResponse.json(
        { success: false, error: "Debes aceptar las consideraciones" },
        { status: 400 }
      );
    }

    if (acceptSingleQuestion !== "Si") {
      return NextResponse.json(
        { success: false, error: "Debes aceptar que la carta horaria responde una sola pregunta" },
        { status: 400 }
      );
    }

    if (isFirstTime !== "Si") {
      return NextResponse.json(
        { success: false, error: "La pregunta debe ser formulada por primera vez" },
        { status: 400 }
      );
    }

    // Verificar que el usuario tenga datos completos
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        birthDate: true,
        birthCity: true,
        residenceCity: true,
        birthCountry: true,
      },
    });

    if (!user || !user.birthDate || !user.birthCity || !user.residenceCity) {
      return NextResponse.json(
        { success: false, error: "Debes completar tus datos personales antes de solicitar una carta horaria" },
        { status: 400 }
      );
    }

    // Crear la solicitud de carta horaria en la base de datos
    const horariaRequest = await prisma.horariaRequest.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
        email,
        country,
        acceptSingleQuestion,
        isFirstTime,
        questionCategory,
        question,
        context: context || "",
        status: "pending",
        createdAt: new Date(),
      },
    });

    // Enviar emails de notificación
    // 1. Email al Administrador (María)
    try {
      await sendEmail({
        to: "info@mariablaquier.com",
        subject: `[Desde astrochat] Consulta Horaria: ${questionCategory} - ${firstName} ${lastName}`,
        html: `
          <h2>Nueva Solicitud de Carta Horaria</h2>
          <p><strong>Usuario:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>País:</strong> ${country}</p>
          <p><strong>Categoría:</strong> ${questionCategory}</p>
          <p><strong>Pregunta:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">${question}</blockquote>
          <p><strong>Contexto:</strong></p>
          <p>${context || "Sin contexto"}</p>
          <br/>
          <p><strong>Aceptó condiciones:</strong> Sí</p>
          <p><strong>Es primera vez:</strong> ${isFirstTime}</p>
        `
      });

      // 2. Email de Confirmación al Usuario
      await sendEmail({
        to: email,
        subject: "Hemos recibido tu consulta de Carta Horaria - Astrochat",
        html: `
          <h2>Hola ${firstName},</h2>
          <p>Hemos recibido correctamente tu solicitud de Carta Horaria.</p>
          <p><strong>Tu pregunta:</strong> "${question}"</p>
          <p>Nuestro equipo analizará si la carta es radical (viable para ser respondida). De ser así, te contactaremos para enviarte el link de pago y proceder con la respuesta.</p>
          <p>Gracias por confiar en nosotros.</p>
          <br/>
          <p><em>El equipo de Astrochat</em></p>
        `
      });
    } catch (emailError) {
      console.error("Error al enviar notificaciones de email:", emailError);
      // No bloqueamos la respuesta exitosa si falla el email, pero lo registramos
    }

    return NextResponse.json({
      success: true,
      message: "Solicitud de carta horaria enviada correctamente",
      requestId: horariaRequest.id,
    });

  } catch (error) {
    console.error("Error al procesar solicitud de carta horaria:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Método GET para obtener solicitudes del usuario (opcional)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener solicitudes del usuario
    const requests = await prisma.horariaRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        questionCategory: true,
        question: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      requests,
    });

  } catch (error) {
    console.error("Error al obtener solicitudes de carta horaria:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
