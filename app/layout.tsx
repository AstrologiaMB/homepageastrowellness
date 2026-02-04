// app/layout.tsx
import "@/styles/globals.css"
import { ClientLayout } from "@/components/client-layout"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@/components/google-analytics"
import { Inter } from "next/font/google"
import Script from "next/script"

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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5K4T053G4V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5K4T053G4V');
          `}
        </Script>
      </head>
      <body>
        <GoogleAnalytics />
        <ClientLayout>
          {children}
        </ClientLayout>
        <SonnerToaster />
      </body>
    </html>
  )
}
