import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AstrogematriaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // 1. Check Login
    if (!session?.user?.email) {
        redirect("/auth/login?callbackUrl=/astrogematria");
    }

    // 2. Check Entitlement
    // Note: user.entitlements is populated in authOptions callbacks
    const entitlements = (session.user as any).entitlements || {};

    if (!entitlements.hasAstrogematria) {
        // Redirect to upgrade page with a clear reason (optional: add query param)
        redirect("/upgrade");
    }

    return <>{children}</>;
}
