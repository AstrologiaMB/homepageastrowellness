import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptionsSync } from "@/lib/auth-url";
import prisma from "@/lib/prisma";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 1. Verificar Autenticación y Permisos de Admin
        const session = await getServerSession(getAuthOptionsSync());

        if (!session || session.user?.email !== "info@astrochat.online") {
            return NextResponse.json(
                { error: "No autorizado. Se requieren permisos de administrador." },
                { status: 403 }
            );
        }

        const { id } = await params;

        // 2. Actualizar el usuario
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                emailVerified: new Date(),
            },
            select: { email: true, emailVerified: true }
        });

        return NextResponse.json({
            success: true,
            message: `Usuario ${updatedUser.email} marcado como verificado correctamente`,
            verifiedAt: updatedUser.emailVerified
        });

    } catch (error) {
        console.error("Error al verificar email manualmente:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
