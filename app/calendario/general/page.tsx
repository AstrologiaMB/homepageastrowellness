"use client";

import { CalendarioGeneral } from "@/components/calendario-general";
import { AstroBackButtonInline } from "@/components/navigation/astro-back-button";
import { ProtectedPage } from "@/components/protected-page";
import { Globe } from "lucide-react";

export default function CalendarioGeneralPage() {
  return (
    <ProtectedPage>
      <div className="px-3 py-4 md:p-6 max-w-7xl mx-auto overflow-x-hidden">
        {/* Navigation */}
        <div className="mb-6">
          <AstroBackButtonInline href="/calendario" />
        </div>

        {/* Page Header */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-l-primary">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Globe className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-light tracking-tight gradient-primary">
                Calendario General
              </h1>
              <p className="text-muted-foreground">
                Calendario astrológico general con aspectos planetarios
              </p>
            </div>
          </div>
        </div>

        <CalendarioGeneral />
      </div>
    </ProtectedPage>
  );
}
