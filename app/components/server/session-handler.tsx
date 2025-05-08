import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

// Solución más simple: no verificar datos en la página /completar-datos
// Creamos un componente específico para la página /completar-datos
export function CompletarDatosSessionHandler({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default async function SessionHandler({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { birthDate: true, birthCity: true, residenceCity: true }
    })

    const missingData = !user?.birthDate || !user?.birthCity || !user?.residenceCity

    if (missingData) {
      redirect("/completar-datos")
    }
  }

  return <>{children}</>
}
