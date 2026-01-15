import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CartaElectivaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

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
