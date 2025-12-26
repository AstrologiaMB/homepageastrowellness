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
        {/* Opción Email/Password */}
        <Button
          variant="outline"
          onClick={() => router.push('/auth/login')}
          className="w-full justify-start group"
          title={state === "collapsed" ? "Ingresar con Email o contraseña" : undefined}
        >
          <User className="h-4 w-4" />
          <span className={state === "collapsed" ? "sr-only" : "group-data-[collapsible=icon]:hidden"}>
            Ingresar
          </span>
          <span className={state === "collapsed" ? "inline" : "hidden"}>
            Ingresar
          </span>
        </Button>



        {/* Link a registro (solo cuando está expandido) */}
        {state === "expanded" && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-primary hover:underline"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>
    )
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("No se pudo obtener la URL del portal");
      }
    } catch (error) {
      console.error("Error al redirigir al portal:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              {session.user.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium truncate">
                {session.user.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {session.user.email}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
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
