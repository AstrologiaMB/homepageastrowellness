'use client';

import { useState, useCallback } from 'react';
import { AuthProvider } from '@/auth/auth-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { DynamicBreadcrumb } from '@/components/breadcrumb-dynamic';
import { EdgeSwipeIndicator } from '@/components/edge-swipe-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEdgeSwipe } from '@/hooks/use-edge-swipe';
import { useHaptic } from '@/hooks/use-haptic';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

/**
 * Inner layout component with sidebar and edge swipe support.
 * Must be rendered within SidebarProvider context.
 */
function DashboardLayout({
  children,
  isHomepage,
}: {
  children: React.ReactNode;
  isHomepage: boolean;
}) {
  const isMobile = useIsMobile();
  const { toggleSidebar, openMobile } = useSidebar();
  const { trigger: haptic } = useHaptic();

  // State for edge swipe indicator
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Edge swipe to open on mobile
  const edgeSwipeHandler = useCallback(() => {
    if (isMobile && !openMobile) {
      haptic('light');
      toggleSidebar();
    }
  }, [isMobile, openMobile, haptic, toggleSidebar]);

  useEdgeSwipe({
    onSwipe: edgeSwipeHandler,
    onProgress: setSwipeProgress,
    disabled: !isMobile || openMobile, // Disable when sidebar is already open
  });

  return (
    <>
      {/* Edge swipe indicator - mobile only */}
      <EdgeSwipeIndicator progress={swipeProgress} />
      <AppSidebar isHomepage={isHomepage} />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 items-center gap-2 px-3 sm:px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <DynamicBreadcrumb />
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      </SidebarInset>
    </>
  );
}

/**
 * Inner layout component that handles routing between landing and dashboard layouts.
 *
 * `★ Insight ─────────────────────────────────────`
 * Edge swipe integration:
 * - Only active on mobile (< 768px)
 * - Detects swipe from left edge (within 20px)
 * - Shows visual indicator during swipe
 * - Triggers haptic feedback on threshold met
 * - Respects safe areas on notched devices
 * `─────────────────────────────────────────────────`
 */
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
      <DashboardLayout isHomepage={isHomepage}>{children}</DashboardLayout>
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
