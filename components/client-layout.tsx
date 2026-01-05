"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DynamicBreadcrumb } from "@/components/breadcrumb-dynamic"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={isHomepage}>
          <AppSidebar isHomepage={isHomepage} />
          <SidebarInset>
            <header className="flex h-14 sm:h-16 items-center gap-2 px-3 sm:px-4 lg:px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {!isHomepage && <SidebarTrigger />}
              {!isHomepage && <Separator orientation="vertical" className="h-4 sm:h-6 mx-1 sm:mx-2" />}
              {!isHomepage && <DynamicBreadcrumb />}
            </header>

            <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
