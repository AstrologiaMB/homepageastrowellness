"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Clock,
  ClipboardEdit,
  Command,
  GalleryVerticalEnd,
  Hourglass,
  Star,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { ThemeToggle } from "./theme-toggle"
import { AstroSymbol } from "./astro-symbol"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar" // Removed SidebarTrigger import


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Calendario",
      url: "/calendario", // Parent item URL (optional, can be # if not a clickable link itself)
      icon: Calendar,
      isActive: true, // Assuming Calendario is the active section initially
      items: [
        {
          title: "General",
          url: "/calendario/general",
        },
        {
          title: "Personal",
          url: "/calendario/personal",
        },
      ],
    },
    {
      title: "Cartas",
      url: "/cartas", // Parent item URL (optional)
      icon: Star, // Icono más apropiado para cartas astrológicas
      items: [
        {
          title: "Carta Horaria",
          url: "/cartas/horaria",
        },
        {
          title: "Carta Trópica",
          url: "/cartas/tropica",
        },
        {
          title: "Carta Dracónica",
          url: "/cartas/draconica",
        },
      ],
    },
    {
      title: "Rectificacion Carta",
      url: "/rectificacion-carta",
      icon: ClipboardEdit,
      items: [], // Sin submenús
    },
    {
      title: "Astrogematria",
      url: "#",
      icon: Bot, // Icono más apropiado para cálculos astrológicos
      items: [
        {
          title: "Cálculos",
          url: "/astrogematria/calculos",
        },
        {
          title: "Interpretaciones",
          url: "#",
        },
        {
          title: "Referencias",
          url: "#",
        },
      ],
    },
    {
      title: "Horas Planetarias",
      url: "#",
      icon: Hourglass,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isHomepage: boolean; // Add isHomepage prop
}

export function AppSidebar({ isHomepage, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle />
          <NavUser />
        </div>
      </SidebarFooter>
      {/* Removed the conditionally rendered SidebarTrigger */}
      <SidebarRail />
    </Sidebar>
  )
}
