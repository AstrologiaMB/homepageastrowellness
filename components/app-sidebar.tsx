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
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

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
      url: "#",
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Personal",
          url: "#",
        },
      ],
    },
    {
      title: "Cartas",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Carta Horaria",
          url: "#",
        },
        {
          title: "Carta Trópica",
          url: "#",
        },
        {
          title: "Carta Dracónica",
          url: "#",
        },
      ],
    },
    {
      title: "Rectificacion Carta",
      url: "#",
      icon: ClipboardEdit,
      items: [
        {
          title: "Pendientes",
          url: "#",
        },
        {
          title: "Historial",
          url: "#",
        },
      ],
    },
    {
      title: "Astrogematria",
      url: "#",
      icon: Star,
      items: [
        {
          title: "Cálculos",
          url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
