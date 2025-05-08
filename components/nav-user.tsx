"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
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

export function NavUser() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user) {
    return (
      <Button 
        variant="ghost" 
        onClick={async () => {
          try {
            console.log("Iniciando autenticación con Google...");
            // Especificar callbackUrl para asegurar redirección correcta
            await signIn("google", { callbackUrl: window.location.origin });
            console.log("Autenticación iniciada correctamente");
          } catch (error) {
            console.error("Error al iniciar autenticación:", error);
            alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
          }
        }} 
        className="w-full justify-start"
      >
        Ingresar / Registrarse
      </Button>
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
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium truncate">
              {session.user.name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </span>
          </div>
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
