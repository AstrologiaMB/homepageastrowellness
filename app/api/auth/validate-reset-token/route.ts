import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    console.log('🔍 VALIDATE TOKEN - Inicio de validación')
    console.log('Token recibido:', token ? 'Presente' : 'Ausente')

    // Validaciones básicas
    if (!token || !token.trim()) {
      console.log('❌ Token vacío o nulo')
      return NextResponse.json(
        { error: 'Token es requerido' },
        { status: 400 }
      )
    }

    // Verificar y decodificar el token
    let decodedToken: any
    try {
      console.log('🔐 Intentando verificar JWT...')
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
      console.log('✅ JWT verificado correctamente')
      console.log('Datos decodificados:', {
        userId: decodedToken.userId,
        email: decodedToken.email,
        iat: new Date(decodedToken.iat * 1000).toLocaleString(),
        exp: new Date(decodedToken.exp * 1000).toLocaleString()
      })
    } catch (error) {
      console.error('❌ Error verifying token:', error instanceof Error ? error.message : String(error))
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 400 }
      )
    }

    const { userId, email } = decodedToken

    // Buscar usuario por ID y email para seguridad adicional
    console.log('👤 Buscando usuario en BD...')
    console.log('UserId:', userId)
    console.log('Email:', email)

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        email: email,
      }
    })

    if (!user) {
      console.log('❌ Usuario no encontrado en BD')
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    console.log('✅ Usuario encontrado:', user.name, user.email)

    // Verificar que el usuario tenga un token de reset válido
    console.log('🔍 Verificando token de reset en BD...')
    console.log('Token en BD:', user.resetToken ? 'Presente' : 'Ausente')
    console.log('Token recibido === Token en BD:', user.resetToken === token)

    if (!user.resetToken || user.resetToken !== token) {
      console.log('❌ Token de reset no coincide o no existe')
      return NextResponse.json(
        { error: 'Token de reset inválido' },
        { status: 400 }
      )
    }

    // Verificar que el token no haya expirado
    console.log('⏰ Verificando expiración...')
    const now = new Date()
    const expiry = user.resetTokenExpiry
    console.log('Ahora:', now.toISOString())
    console.log('Expira:', expiry?.toISOString())
    console.log('¿Expirado?', expiry ? expiry < now : 'Sin fecha de expiración')

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      console.log('❌ Token de reset expirado')
      return NextResponse.json(
        { error: 'Token de reset expirado' },
        { status: 400 }
      )
    }

    console.log('✅ Token válido - Todas las validaciones pasaron')

    // Si todo está bien, devolver éxito
    return NextResponse.json({
      valid: true,
      message: 'Token válido',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('❌ Error en validate-reset-token:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
