import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import prisma from '@/lib/prisma'

// Configurar SES
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validaciones básicas
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'El email es requerido' },
        { status: 400 }
      )
    }

    // Verificar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    })

    // No revelar si el usuario existe o no por seguridad
    // Siempre devolver el mismo mensaje
    if (!user) {
      return NextResponse.json({
        message: 'Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.'
      })
    }

    // Solo procesar si el usuario tiene una contraseña (no es solo Google OAuth)
    if (!user.password) {
      return NextResponse.json({
        message: 'Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.'
      })
    }

    // Generar token de reset (expira en 1 hora)
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: 60 * 60 } // 1 hora en segundos
    )

    // Guardar token en la base de datos
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // Enviar email con SES
    try {
      await sendResetPasswordEmail(user.email, user.name || 'Usuario', resetToken)
    } catch (emailError) {
      console.error('Error enviando email de reset:', emailError)
      // No fallar la petición por error de email
    }

    return NextResponse.json({
      message: 'Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.'
    })

  } catch (error) {
    console.error('Error en forgot-password:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

async function sendResetPasswordEmail(email: string, name: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`

  const params = {
    Source: process.env.FROM_EMAIL || 'noreply@astrowellness.com',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Restablece tu contraseña - Astrowellness',
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333; text-align: center;">Restablece tu contraseña</h1>

              <p style="color: #666; line-height: 1.6;">
                Hola ${name},
              </p>

              <p style="color: #666; line-height: 1.6;">
                Hemos recibido una solicitud para restablecer tu contraseña en Astrowellness.
                Si no solicitaste este cambio, puedes ignorar este email.
              </p>

              <p style="color: #666; line-height: 1.6;">
                Para restablecer tu contraseña, haz click en el siguiente enlace:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}"
                   style="background-color: #007bff; color: white; padding: 12px 24px;
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                  Restablecer Contraseña
                </a>
              </div>

              <p style="color: #666; line-height: 1.6;">
                Este enlace expirará en 1 hora por seguridad.
              </p>

              <p style="color: #666; line-height: 1.6;">
                Si el botón no funciona, copia y pega esta URL en tu navegador:
                <br>
                <span style="word-break: break-all; color: #007bff;">${resetUrl}</span>
              </p>

              <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
                Si no solicitaste este cambio, tu contraseña permanecerá sin cambios.
              </p>
            </div>
          `,
        },
        Text: {
          Data: `
Hola ${name},

Hemos recibido una solicitud para restablecer tu contraseña en Astrowellness.

Para restablecer tu contraseña, visita: ${resetUrl}

Este enlace expirará en 1 hora.

Si no solicitaste este cambio, ignora este email.
          `,
        },
      },
    },
  }

  await sesClient.send(new SendEmailCommand(params))
}
