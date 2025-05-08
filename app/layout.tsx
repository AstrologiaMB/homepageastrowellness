// app/layout.tsx
import "@/styles/globals.css"
import { ClientLayout } from "@/components/client-layout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
