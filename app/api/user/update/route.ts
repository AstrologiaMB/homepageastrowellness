import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/email-service"

const MAX_BIRTH_DATA_CHANGES = 3

export async function POST(req: Request) {
  try {
    // 1. Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // 2. Obtener datos del formulario
    const data = await req.json()
    console.log("Datos recibidos para actualización:", data.email || session.user.email) // Log seguro

    // 3. Obtener usuario actual para comparación
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cartasNatales: { select: { id: true } } } // Solo necesitamos saber si existen para invalidar
    })

    if (!currentUser) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    // 4. Preparar nuevos datos
    let birthDateFormatted = null;
    if (data.birthDate) {
      const dateStr = data.birthDate as string;
      const [year, month, day] = dateStr.split('-').map(Number);
      // UTC solo fecha
      birthDateFormatted = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }

    const newKnowsBirthTime = Boolean(data.knowsBirthTime)
    const newBirthHour = newKnowsBirthTime ? Number(data.birthHour) : null
    const newBirthMinute = newKnowsBirthTime ? Number(data.birthMinute) : null
    const newBirthCity = data.birthCity as string
    const newBirthCountry = data.birthCountry as string

    // 5. Detectar cambios en datos de nacimiento (CRÍTICOS)
    // Comparamos valores primitivos. Para fechas, usamos getTime()
    const isDateChanged = currentUser.birthDate?.getTime() !== birthDateFormatted?.getTime()
    const isTimeChanged = currentUser.birthHour !== newBirthHour || currentUser.birthMinute !== newBirthMinute
    // Comparamos strings normalizados por si acaso (trim)
    const isCityChanged = currentUser.birthCity?.trim() !== newBirthCity?.trim()
    const isCountryChanged = currentUser.birthCountry?.trim() !== newBirthCountry?.trim()

    const isBirthDataChanged = isDateChanged || isTimeChanged || isCityChanged || isCountryChanged

    // 6. Lógica de Restricción
    let shouldIncrementCounter = false
    let currentCount = currentUser.birthDataChangeCount

    // Si hay cambios en datos de nacimiento
    if (isBirthDataChanged) {
      // Verificar si es la primera vez (si todos los campos estaban vacíos, no cuenta como cambio, es "carga inicial")
      const isFirstLoad = !currentUser.birthDate && !currentUser.birthCity

      if (!isFirstLoad) {
        // Es una modificación real
        if (currentCount >= MAX_BIRTH_DATA_CHANGES) {
          // Admin override check (hardcoded users for safety/simplicity per request)
          const isAdmin = ["info@astrochat.online", "info@mariablaquier.com"].includes(session.user.email)

          if (!isAdmin) {
            console.warn(`Usuario ${session.user.email} intentó exceder el límite de cambios.`)
            return NextResponse.json({
              error: "Has alcanzado el límite de 3 cambios en tus datos de nacimiento. Por favor contacta a info@astrochat.online para solicitar ayuda."
            }, { status: 403 })
          }
        }

        // Si no excedió, marcaremos para incrementar
        shouldIncrementCounter = true
      }
    }

    // 7. Actualizar Base de Datos
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        birthDate: birthDateFormatted,
        birthCity: newBirthCity,
        birthCountry: newBirthCountry,
        birthHour: newBirthHour,
        birthMinute: newBirthMinute,
        knowsBirthTime: newKnowsBirthTime,
        gender: data.gender as string,
        residenceCity: data.residenceCity as string,
        residenceCountry: data.residenceCountry as string,
        // Incrementamos contador atomicamente si corresponde
        birthDataChangeCount: shouldIncrementCounter ? { increment: 1 } : undefined
      }
    })

    // 8. Post-Procesamiento (Cache y Emails)
    if (isBirthDataChanged) {
      // INVALIDAR CACHE: Eliminar cartas natales antiguas
      if (currentUser.cartasNatales.length > 0) {
        await prisma.cartaNatal.deleteMany({
          where: { userId: currentUser.id }
        })
        console.log(`Cache de cartas invalidado para usuario ${currentUser.email}`)
      }

      // ENVIAR EMAIL DE NOTIFICACIÓN
      if (shouldIncrementCounter) {
        const remaining = MAX_BIRTH_DATA_CHANGES - (currentCount + 1)

        await sendEmail({
          to: session.user.email,
          subject: "Actualización de Datos de Nacimiento - Astrowellness",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Has actualizado tus datos de nacimiento</h2>
              <p>Hola ${updatedUser.name || 'Usuario'},</p>
              <p>Detectamos un cambio en tus datos de nacimiento (Fecha, Hora o Lugar).</p>
              <p>Por seguridad y consistencia, solo permitimos un número limitado de correcciones.</p>
              <div style="background-color: #f8f9fa; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Te quedan <strong>${remaining}</strong> cambios disponibles.</p>
              </div>
              <p>Si necesitas ayuda adicional, contacta a info@astrochat.online.</p>
            </div>
          `,
          text: `Has actualizado tus datos de nacimiento. Te quedan ${remaining} cambios disponibles.`
        })
      }
    }

    // 9. Retorno exitoso
    const hasCompletedData = !!(
      updatedUser.birthDate &&
      updatedUser.birthCity &&
      updatedUser.residenceCity
    )

    return NextResponse.json({
      success: true,
      hasCompletedData: hasCompletedData,
      changesLeft: MAX_BIRTH_DATA_CHANGES - updatedUser.birthDataChangeCount
    })

  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
