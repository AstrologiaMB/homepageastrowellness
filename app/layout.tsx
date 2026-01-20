// app/layout.tsx
import "@/styles/globals.css"
import { ClientLayout } from "@/components/client-layout"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Astronomicon.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0B0F19" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        <SonnerToaster />
      </body>
    </html>
  )
}
