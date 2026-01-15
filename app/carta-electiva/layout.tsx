import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAuthOptionsSync } from "@/lib/auth-url";

export default async function CartaElectivaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(getAuthOptionsSync());

    if (!session?.user?.email) {
        redirect("/auth/login?callbackUrl=/carta-electiva");
    }

    const entitlements = (session.user as any).entitlements || {};

    // Requirement: Elective Add-on
    if (!entitlements.hasElectiveChart) {
        redirect("/upgrade");
    }

    return <>{children}</>;
}
