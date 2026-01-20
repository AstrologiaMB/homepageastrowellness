'use client';

import { AuthProvider } from '@/auth/auth-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { DynamicBreadcrumb } from '@/components/breadcrumb-dynamic';
import { ThemeProvider } from '@/components/theme-provider';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  const isHomepage = pathname === '/';
  const isUnauthenticated = status === 'unauthenticated' || status === 'loading';

  // For homepage: render Landing Layout (no sidebar) if unauthenticated OR loading
  // This prevents flash of authenticated content during session check
  if (isHomepage && isUnauthenticated) {
    return <>{children}</>;
  }

  // Otherwise (Logged in OR on internal pages OR loading), render Dashboard Layout
  return (
    <SidebarProvider defaultOpen={!isHomepage}>
      <AppSidebar isHomepage={isHomepage} />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 items-center gap-2 px-3 sm:px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <DynamicBreadcrumb />
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InnerLayout>{children}</InnerLayout>
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
