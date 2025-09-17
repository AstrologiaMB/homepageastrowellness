"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { User, Globe } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
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
            {state === "expanded" ? "Ingresar con Email" : "Login"}
          </span>
          <span className={state === "collapsed" ? "inline" : "hidden"}>
            Login
          </span>
        </Button>

        {/* Separador */}
        {state === "expanded" && (
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">o</span>
            </div>
          </div>
        )}

        {/* Opción Google */}
        <Button
          variant="outline"
          onClick={async () => {
            try {
              console.log("Iniciando autenticación con Google...");
              await signIn("google", { callbackUrl: window.location.origin });
              console.log("Autenticación iniciada correctamente");
            } catch (error) {
              console.error("Error al iniciar autenticación:", error);
              alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
            }
          }}
          className="w-full justify-start group"
          title={state === "collapsed" ? "Continuar con tu cuenta de Google" : undefined}
        >
          <Globe className="h-4 w-4" />
          <span className={state === "collapsed" ? "sr-only" : "group-data-[collapsible=icon]:hidden"}>
            {state === "expanded" ? "Continuar con Google" : "Google"}
          </span>
          <span className={state === "collapsed" ? "inline" : "hidden"}>
            Google
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
