import { useSession } from "next-auth/react"
import { CalendarioPersonal } from "@/components/calendario-personal"
import { PremiumGate } from "@/components/premium-gate"
import { isFeatureEnabled } from "@/lib/features"
import { Clock } from "lucide-react"

export function CalendarioPersonalWrapper() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email
  const isEnabled = isFeatureEnabled('enablePersonalCalendar', userEmail)

  if (!isEnabled) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold">Próximamente</h2>
        <p className="text-muted-foreground max-w-md">
          Estamos afinando los últimos detalles del Calendario Personal.
          Pronto podrás ver tus tránsitos personalizados aquí.
        </p>
      </div>
    )
  }

  return (
    <PremiumGate
      title="Calendario Personal"
      description="Accede a eventos astrológicos personalizados basados en tu carta natal"
    >
      <CalendarioPersonal />
    </PremiumGate>
  )
}
