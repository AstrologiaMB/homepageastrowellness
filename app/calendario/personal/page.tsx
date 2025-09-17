import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CalendarioPersonalWrapper } from "./CalendarioPersonalWrapper";

export default async function CalendarioPersonalPage() {
  // Verificar si el usuario está autenticado
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Verificar si el usuario necesita completar datos
  if (session.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { birthDate: true, birthCity: true, residenceCity: true }
    });

    const missingData = !user?.birthDate || !user?.birthCity || !user?.residenceCity;

    if (missingData) {
      redirect("/completar-datos");
    }
  }

  return <CalendarioPersonalWrapper />;
}
