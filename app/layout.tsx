// app/layout.tsx
"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DynamicBreadcrumb } from "@/components/breadcrumb-dynamic"
import "@/styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  return (
    <html lang="es">
      <body>
        <SidebarProvider defaultOpen={isHomepage}>
          <AppSidebar isHomepage={isHomepage} />
          <SidebarInset>
            <header className="flex h-16 items-center gap-2 px-4 border-b">
              {!isHomepage && <SidebarTrigger />}
              {!isHomepage && <Separator orientation="vertical" className="h-6 mx-2" />}
              {!isHomepage && <DynamicBreadcrumb />}
            </header>

            <main className="flex-1 p-4 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
