import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function CalendarioLunarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/auth/login?callbackUrl=/calendario/lunar");
    }

    const entitlements = (session.user as any).entitlements || {};

    // Requirement: Lunar Add-on
    if (!entitlements.hasLunarCalendar) {
        redirect("/upgrade");
    }

    // Verificar si el usuario tiene datos completos
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { birthDate: true, birthCity: true, residenceCity: true }
    });

    const missingData = !user?.birthDate || !user?.birthCity || !user?.residenceCity;

    if (missingData) {
        redirect("/completar-datos?callbackUrl=/calendario/lunar");
    }

    return <>{children}</>;
}
