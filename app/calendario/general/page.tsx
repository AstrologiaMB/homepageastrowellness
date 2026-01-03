"use client";

import { CalendarioGeneral } from "@/components/calendario-general";
import { ProtectedPage } from "@/components/protected-page";

export default function CalendarioGeneralPage() {
  // La protección de rutas y validación de datos completos
  // está manejada por el middleware.ts y los componentes internos.

  return (
    <ProtectedPage>
      <div className="p-4">
        <CalendarioGeneral />
      </div>
    </ProtectedPage>
  );
}
