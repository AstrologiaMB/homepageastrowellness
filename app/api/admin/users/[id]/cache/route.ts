
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { getAuthOptionsSync } from '@/lib/auth-url'
import prisma from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(getAuthOptionsSync())

        // 1. Verificación estricta de Admin
        if (!session || session.user?.email !== 'info@astrochat.online') {
            return NextResponse.json(
                { error: 'No autorizado. Se requieren privilegios de administrador.' },
                { status: 403 }
            )
        }

        const userId = params.id

        if (!userId) {
            return NextResponse.json(
                { error: 'ID de usuario requerido' },
                { status: 400 }
            )
        }

        // 2. Ejecutar borrado de caché
        const result = await prisma.interpretacionCache.deleteMany({
            where: {
                userId: userId,
            },
        })

        console.log(`[Admin] Caché limpiada para usuario ${userId}. Registros eliminados: ${result.count}`)

        return NextResponse.json({
            message: 'Caché de interpretaciones limpiada exitosamente',
            deletedCount: result.count
        })

    } catch (error) {
        console.error('Error al limpiar caché de interpretaciones:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor al limpiar la caché' },
            { status: 500 }
        )
    }
}
