import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DraconicaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/auth/login?callbackUrl=/cartas/draconica");
    }

    const entitlements = (session.user as any).entitlements || {};

    // Requirement: Draconic Access
    if (!entitlements.hasDraconicAccess) {
        redirect("/upgrade");
    }

    return <>{children}</>;
}
