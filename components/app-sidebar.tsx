"use client"

import type * as React from "react"
import {
  Bot,
  Calendar,
  ClipboardEdit,
  Hourglass,
  Star,
  Target,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { ThemeToggle } from "./theme-toggle"
import { AstroSymbol } from "./astro-symbol"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useSubscription } from "@/hooks/use-subscription"
import { HelpSheet } from "@/components/help/help-sheet"


// Navigation data with premium indicators
const getNavigationData = (isPremium: boolean) => ({
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
          isPremium: false,
        },
        {
          title: "Personal",
          url: "/calendario/personal",
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
        },
        {
          title: "Planificador Lunar",
          url: "/calendario/lunar",
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
        },
      ],
    },
    {
      title: "Cartas",
      url: "/cartas",
      icon: Star,
      tooltip: "Cartas astrológicas: natal, horaria, trópica, dracónica",
      items: [
        {
          title: "Carta Horaria",
          url: "/cartas/horaria",
          isPremium: false,
        },
        {
          title: "Carta Trópica",
          url: "/cartas/tropica",
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
        },
        {
          title: "Carta Dracónica",
          url: "/cartas/draconica",
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
        },
      ],
    },
    {
      title: "Buenos Momentos",
      url: "/carta-electiva",
      icon: Target,
      tooltip: "Búsqueda de momentos astrológicos óptimos",
      isPremium: true,
      premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
      items: [],
    },
    {
      title: "Rectificacion Carta",
      url: "/rectificacion-carta",
      icon: ClipboardEdit,
      tooltip: "Herramientas para rectificar y ajustar cartas astrológicas",
      isPremium: false,
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
          isPremium: false,
        },
        {
          title: "Interpretaciones",
          url: "/astrogematria/interpretaciones",
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-yellow-500 ml-1" />,
        },

      ],
    },
  ],
})

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isHomepage: boolean; // Add isHomepage prop
}

export function AppSidebar({ isHomepage, ...props }: AppSidebarProps) {
  const { isPremium } = useSubscription()
  const navigationData = getNavigationData(isPremium)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* TeamSwitcher removed - component was unused */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <HelpSheet />
          </div>
          <NavUser />
        </div>
      </SidebarFooter>
      {/* Removed the conditionally rendered SidebarTrigger */}
      <SidebarRail />
    </Sidebar>
  )
}
