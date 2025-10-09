"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Botón flotante para móvil cuando NO hay sesión */}
      {isMobile && !session && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            size="sm"
            className="shadow-lg px-3 py-2 text-sm"
            onClick={() => router.push('/auth/login')}
          >
            Ingresar
          </Button>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/5">
        <Card className="mx-auto max-w-lg text-center shadow-xl border border-accent/30 bg-card/98 backdrop-blur-sm">
          <CardContent className="p-14">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground drop-shadow-sm">
                  Astrochat
                </h1>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full"></div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Tu app personal de astrología
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/25 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent/40 to-accent/20 shadow-sm"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
