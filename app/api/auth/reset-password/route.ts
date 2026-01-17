import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { token, password } = body;

    // Validaciones básicas
    if (!token || !password) {
      return NextResponse.json({ error: 'Token y contraseña son requeridos' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Verificar y decodificar el token
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 });
    }

    const { userId, email } = decodedToken;

    // Buscar usuario por ID y email para seguridad adicional
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar que el usuario tenga un token de reset válido
    if (!user.resetToken || user.resetToken !== token) {
      return NextResponse.json({ error: 'Token de reset inválido' }, { status: 400 });
    }

    // Verificar que el token no haya expirado
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return NextResponse.json({ error: 'Token de reset expirado' }, { status: 400 });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Actualizar usuario: nueva contraseña y limpiar tokens
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      message: 'Contraseña restablecida exitosamente',
    });
  } catch (error) {
    console.error('Error en reset-password:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
