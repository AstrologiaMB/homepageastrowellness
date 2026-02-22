import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import prisma from '@/lib/prisma'
import { syncUserToFluentCRM } from '@/lib/fluentcrm'

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
        termsAccepted: true, // Frontend lo garantiza
        termsAcceptedAt: new Date(),
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

    // Sync to FluentCRM (non-blocking)
    syncUserToFluentCRM({
      email: email.toLowerCase(),
      name: name.trim(),
    }).catch((error) => {
      console.error('[FluentCRM] Failed to sync user:', error)
    })

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

  if (!resend) {
    console.log('No email service configured - skipping welcome email')
    return
  }

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: '¡Bienvenido a Astrochat!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">¡Bienvenido a Astrochat, ${name}!</h1>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="color: #666; line-height: 1.6;">
            Gracias por registrarte en Astrochat. Tu cuenta ha sido creada exitosamente.
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

          <div style="text-align: center; margin-top: 30px;">
            <a href="${appUrl}"
               style="background-color: #007bff; color: white; padding: 12px 24px;
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Explorar Astrochat
            </a>
          </div>
        </div>

        <p style="color: #999; font-size: 12px; text-align: center;">
          Si no creaste esta cuenta, puedes ignorar este email.
        </p>
      </div>
    `,
  })
}
