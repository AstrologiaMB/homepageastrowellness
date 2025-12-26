import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación y permisos de admin
    const session = await getServerSession(authOptions)

    if (!session || session.user?.email !== 'info@astrochat.online') {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requieren permisos de administrador.' },
        { status: 403 }
      )
    }

    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') // 'free', 'premium', or empty for all

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}

    if (search) {
      const searchConditions = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]

      if (!where.AND) where.AND = []
      where.AND.push({ OR: searchConditions })
    }

    if (status) {
      if (!where.AND) where.AND = []

      if (status === 'premium') {
        where.AND.push({
          subscription: {
            status: { in: ['active', 'trialing'] }
          }
        })
      } else {
        // 'free' or other
        where.AND.push({
          OR: [
            { subscription: null },
            { subscription: { status: { notIn: ['active', 'trialing'] } } }
          ]
        })
      }
    }

    // Obtener usuarios con paginación
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          // subscriptionStatus removed
          // subscriptionExpiresAt removed
          birthDataChangeCount: true,
          birthDate: true,
          birthCity: true,
          birthCountry: true,
          createdAt: true,
          updatedAt: true,
          subscription: {
            select: {
              status: true,
              hasBaseBundle: true,
              stripeCurrentPeriodEnd: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where })
    ])

    const formattedUsers = users.map((user: any) => {
      let displayStatus = 'free';
      let expiresAt = null;

      // Override with Stripe status if available
      if (user.subscription) {
        if (user.subscription.status === 'active' || user.subscription.status === 'trialing') {
          displayStatus = 'premium';
        } else {
          displayStatus = user.subscription.status;
        }

        // Map expiration date
        if (user.subscription.stripeCurrentPeriodEnd) {
          expiresAt = user.subscription.stripeCurrentPeriodEnd;
        }
      }

      return {
        ...user,
        subscriptionStatus: displayStatus,
        subscriptionExpiresAt: expiresAt
      };
    });

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1,
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
