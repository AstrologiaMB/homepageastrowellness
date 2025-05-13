/**
 * Página para mostrar la carta natal trópica.
 * 
 * Esta página muestra una carta natal trópica utilizando datos de ejemplo.
 * La página está protegida y requiere autenticación y datos de usuario completos.
 * Incluye tanto la visualización gráfica como una tabla de datos.
 * 
 * @author Astrowellness Team
 * @version 1.1.0
 */

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import cartaNatalData from '@/data/cartas/carta_natal_ejemplo.json';
import { CartaNatalWrapper } from "@/components/carta-natal-wrapper";
import { CartaNatalTabla } from "@/components/carta-natal-tabla";

/**
 * Componente de página para la carta natal trópica.
 * 
 * @returns {JSX.Element} - Elemento JSX que contiene la página de carta natal trópica.
 */
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

  // Nota: En el futuro, aquí se generarán los datos de la carta natal
  // basados en los datos de nacimiento del usuario en lugar de usar datos de ejemplo.

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carta Natal Trópica</h1>
      
      {/* Visualización gráfica de la carta natal */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Gráfico</h2>
        <CartaNatalWrapper chartData={cartaNatalData} />
      </div>
      
      {/* Tabla de datos de la carta natal */}
      <CartaNatalTabla chartData={cartaNatalData} />
    </div>
  );
}
