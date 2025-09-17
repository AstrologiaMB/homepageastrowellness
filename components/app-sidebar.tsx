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
      url: "/calendario",
      icon: Calendar,
      isActive: true,
      tooltip: "Calendario astrológico con eventos planetarios y tránsitos",
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
      url: "/cartas",
      icon: Star,
      tooltip: "Cartas astrológicas: natal, horaria, trópica y dracónica",
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
      tooltip: "Herramientas para rectificar y ajustar cartas astrológicas",
      items: [],
    },
    {
      title: "Astrogematria",
      url: "#",
      icon: Bot,
      tooltip: "Cálculos numéricos y análisis astrogemátrico",
      items: [
        {
          title: "Cálculos",
          url: "/astrogematria/calculos",
        },
        {
          title: "Interpretaciones",
          url: "/astrogematria/interpretaciones",
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
      tooltip: "Sistema de horas planetarias y cronobiología astrológica",
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
