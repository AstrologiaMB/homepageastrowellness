'use client'

import { CalendarioPersonal } from "@/components/calendario-personal"
import { PremiumGate } from "@/components/premium-gate"

export function CalendarioPersonalWrapper() {
  return (
    <PremiumGate
      title="Calendario Personal"
      description="Accede a eventos astrológicos personalizados basados en tu carta natal"
    >
      <CalendarioPersonal />
    </PremiumGate>
  )
}
