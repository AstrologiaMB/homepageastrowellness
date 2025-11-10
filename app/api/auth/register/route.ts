import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { Resend } from 'resend'
import prisma from '@/lib/prisma'

// Configurar servicios de email
const sesClient = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}) : null

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validaciones básicas
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta con este email' },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
        emailVerified: new Date(), // Para simplificar, marcamos como verificado
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      }
    })

    // Enviar email de bienvenida (opcional)
    try {
      await sendWelcomeEmail(email, name)
    } catch (emailError) {
      console.error('Error enviando email de bienvenida:', emailError)
      // No fallar la creación del usuario por error de email
    }

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      user
    })

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

async function sendWelcomeEmail(email: string, name: string) {
  const fromEmail = process.env.FROM_EMAIL || 'info@astrochat.online'
  const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  // Si tenemos AWS SES configurado, usar AWS SES
  if (sesClient) {
    const params = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: '¡Bienvenido a Astrowellness!',
        },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; text-align: center;">¡Bienvenido a Astrowellness, ${name}!</h1>

                <p style="color: #666; line-height: 1.6;">
                  Gracias por registrarte en Astrowellness. Tu cuenta ha sido creada exitosamente.
                </p>

                <p style="color: #666; line-height: 1.6;">
                  Ya puedes acceder a todos nuestros servicios astrológicos:
                </p>

                <ul style="color: #666; line-height: 1.6;">
                  <li>Cartas natales de alta precisión</li>
                  <li>Interpretaciones con IA</li>
                  <li>Calendarios personales</li>
                  <li>Astrogematria</li>
                </ul>

                <p style="color: #666; line-height: 1.6;">
                  ¡Comienza tu viaje astrológico ahora!
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${appUrl}"
                     style="background-color: #007bff; color: white; padding: 12px 24px;
                            text-decoration: none; border-radius: 5px; display: inline-block;">
                    Explorar Astrowellness
                  </a>
                </div>

                <p style="color: #999; font-size: 12px; text-align: center;">
                  Si no creaste esta cuenta, puedes ignorar este email.
                </p>
              </div>
            `,
          },
        },
      },
    }

    await sesClient.send(new SendEmailCommand(params))
  }
  // Si tenemos Resend configurado, usar Resend
  else if (resend) {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: '¡Bienvenido a Astrowellness!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">¡Bienvenido a Astrowellness, ${name}!</h1>

          <p style="color: #666; line-height: 1.6;">
            Gracias por registrarte en Astrowellness. Tu cuenta ha sido creada exitosamente.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Ya puedes acceder a todos nuestros servicios astrológicos:
          </p>

          <ul style="color: #666; line-height: 1.6;">
            <li>Cartas natales de alta precisión</li>
            <li>Interpretaciones con IA</li>
            <li>Calendarios personales</li>
            <li>Astrogematria</li>
          </ul>

          <p style="color: #666; line-height: 1.6;">
            ¡Comienza tu viaje astrológico ahora!
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}"
               style="background-color: #007bff; color: white; padding: 12px 24px;
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Explorar Astrowellness
            </a>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center;">
            Si no creaste esta cuenta, puedes ignorar este email.
          </p>
        </div>
      `,
    })
  }
  // Si no hay ningún servicio configurado, no enviar email pero no fallar
  else {
    console.log('No email service configured - skipping welcome email')
  }
}
