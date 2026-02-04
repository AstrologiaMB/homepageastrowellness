"use client"

import { useAuth } from "@/auth/auth-provider"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

export function NavUser() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { state, openMobile, setOpenMobile, isMobile } = useSidebar()

  // Close sidebar and navigate on mobile
  const handleAction = (action: () => void | Promise<void>) => {
    return () => {
      if (isMobile && openMobile) {
        setOpenMobile(false)
        // Execute action after sidebar animation
        setTimeout(() => {
          action()
        }, 150)
      } else {
        action()
      }
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="outline"
          onClick={handleAction(() => router.push('/auth/login'))}
          className="w-full justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 justify-start font-light hover:bg-sidebar-accent/50 transition-colors"
          title={state === "collapsed" ? "Iniciar sesión" : undefined}
        >
          <User className="h-4 w-4 group-data-[collapsible=icon]:mr-0" strokeWidth={1.5} />
          <span className="group-data-[collapsible=icon]:hidden">
            Iniciar sesión
          </span>
        </Button>

        {state === "expanded" && (
          <div className="text-center text-xs text-muted-foreground/60 mt-2">
            ¿No tienes cuenta?{" "}
            <button
              onClick={handleAction(() => router.push('/auth/register'))}
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
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
            <AvatarImage src={(user as any)?.image ?? ""} />
            <AvatarFallback>
              {user.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium truncate">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user.email}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 font-light">
        <DropdownMenuItem onClick={handleAction(() => router.push("/completar-datos"))}>
          Modificar datos
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAction(handleManageSubscription)}>
          Gestionar Suscripción
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAction(() => {
          logout()
          router.push("/")
        })}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
