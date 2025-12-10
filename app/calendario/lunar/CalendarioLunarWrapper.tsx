'use client'

import { CalendarioLunar } from "@/components/calendario-lunar"
import { PremiumGate } from "@/components/premium-gate"

export function CalendarioLunarWrapper() {
    return (
        <PremiumGate
            title="Calendario Lunar"
            description="Explora las fases lunares y eclipses conectados con tu carta natal"
        >
            <CalendarioLunar />
        </PremiumGate>
    )
}
