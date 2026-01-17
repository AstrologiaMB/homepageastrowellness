"use client";

import { CalendarioPersonalWrapper } from "./CalendarioPersonalWrapper";
import { ProtectedPage } from "@/components/protected-page";
import { RequireCompletedData } from "@/components/require-completed-data";
import { AstroBackButtonInline } from "@/components/navigation/astro-back-button";
import { Calendar } from "lucide-react";

export default function CalendarioPersonalPage() {
  return (
    <RequireCompletedData>
      <ProtectedPage>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <AstroBackButtonInline href="/calendario" />
          </div>

          {/* Page Header */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-l-primary">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Calendar className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-light tracking-tight gradient-primary">
                  Calendario Personal
                </h1>
                <p className="text-muted-foreground">
                  Tus eventos astrológicos personalizados basados en tu carta natal
                </p>
              </div>
            </div>
          </div>

          <CalendarioPersonalWrapper />
        </div>
      </ProtectedPage>
    </RequireCompletedData>
  );
}