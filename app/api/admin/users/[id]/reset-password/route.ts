import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Helper para generar contraseña segura aleatoria
function generateSecurePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verificar Autenticación y Permisos de Admin
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== 'info@astrochat.online') {
      return NextResponse.json(
        { error: 'No autorizado. Se requieren permisos de administrador.' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // 2. Verificar que el usuario exista
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // 3. Generar nueva contraseña temporal
    // Usamos un prefijo legible "Astro" + caracteres aleatorios para facilitar la copia
    const randomSuffix = generateSecurePassword(8);
    const newPassword = `Astro${randomSuffix}`;

    // 4. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 5. Actualizar en la base de datos
    await prisma.user.update({
      where: { id: id },
      data: {
        password: hashedPassword,
        // Opcional: Podríamos marcar que debe cambiarla, pero por ahora simple
      },
    });

    // 6. Retornar la contraseña PLANA al admin (solo esta vez)
    return NextResponse.json({
      success: true,
      message: 'Contraseña restablecida correctamente',
      tempPassword: newPassword, // CRÍTICO: Devolverla para mostrarla en el frontend
      userEmail: user.email,
    });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
