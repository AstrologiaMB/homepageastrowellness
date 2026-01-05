"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function NavUser() {
  const { data: session } = useSession()
  const router = useRouter()
  const { state } = useSidebar()

  if (!session?.user) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="outline"
          onClick={() => router.push('/auth/login')}
          className="w-full justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 justify-start font-light hover:bg-sidebar-accent/50 transition-colors"
          title={state === "collapsed" ? "Ingresar" : undefined}
        >
          <User className="h-4 w-4 group-data-[collapsible=icon]:mr-0" strokeWidth={1.5} />
          <span className="group-data-[collapsible=icon]:hidden">
            Ingresar
          </span>
        </Button>

        {state === "expanded" && (
          <div className="text-center text-xs text-muted-foreground/60 mt-2">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-sidebar-foreground hover:text-sidebar-foreground/80 underline decoration-sidebar-foreground/20 underline-offset-4 transition-colors"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>
    )
  }

  const handleManageSubscription = () => {
    router.push("/upgrade");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback className="font-light">
              {session.user.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex flex-col text-left">
              <span className="text-sm font-light truncate">
                {session.user.name}
              </span>
              <span className="text-xs text-muted-foreground/60 truncate font-light">
                {session.user.email}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 font-light">
        <DropdownMenuItem onClick={() => router.push("/completar-datos")}>
          Modificar datos
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleManageSubscription}>
          Gestionar Suscripción
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => {
          await signOut()
          router.push("/")
        }}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
