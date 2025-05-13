import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import cartaNatalData from '@/data/cartas/carta_natal_ejemplo.json';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";

export default async function CartasTropicaPage() {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carta Natal Trópica</h1>
      <CartaNatalWrapper chartData={cartaNatalData} />
    </div>
  );
}
