'use client';

import type * as React from 'react';
import { Bot, Calendar, ClipboardEdit, Star, Target, Sparkles } from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { ThemeToggle } from './theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { HelpSheet } from '@/components/help/help-sheet';

// Navigation data with premium indicators
const getNavigationData = () => ({
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Calendario',
      url: '/calendario',
      icon: Calendar,
      isActive: true,
      tooltip: 'Calendario astrológico con eventos planetarios y tránsitos',
      items: [
        {
          title: 'General',
          url: '/calendario/general',
          isPremium: false,
        },
        {
          title: 'Personal',
          url: '/calendario/personal',
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
        },
        {
          title: 'Planificador Lunar',
          url: '/calendario/lunar',
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
        },
      ],
    },
    {
      title: 'Cartas',
      url: '/cartas',
      icon: Star,
      tooltip: 'Cartas astrológicas: natal, horaria, trópica, dracónica',
      items: [
        {
          title: 'Carta Horaria',
          url: '/cartas/horaria',
          isPremium: false,
        },
        {
          title: 'Carta Trópica',
          url: '/cartas/tropica',
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
        },
        {
          title: 'Carta Dracónica',
          url: '/cartas/draconica',
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
        },
      ],
    },
    {
      title: 'Buenos Momentos',
      url: '/carta-electiva',
      icon: Target,
      tooltip: 'Búsqueda de momentos astrológicos óptimos',
      isPremium: true,
      premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
      items: [],
    },
    {
      title: 'Rectificacion Carta',
      url: '/rectificacion-carta',
      icon: ClipboardEdit,
      tooltip: 'Herramientas para rectificar y ajustar cartas astrológicas',
      isPremium: false,
      items: [],
    },
    {
      title: 'Astrogematria',
      url: '#',
      icon: Bot,
      tooltip: 'Cálculos numéricos y análisis astrogemátrico',
      items: [
        {
          title: 'Cálculos',
          url: '/astrogematria/calculos',
          isPremium: false,
        },
        {
          title: 'Interpretaciones',
          url: '/astrogematria/interpretaciones',
          isPremium: true,
          premiumIcon: <Star className="h-3 w-3 text-muted-foreground/40 ml-1" />,
        },
      ],
    },
  ],
});

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isHomepage: boolean;
}

export function AppSidebar(props: AppSidebarProps) {
  const { isHomepage: _isHomepage, ...restProps } = props;
  const navigationData = getNavigationData();

  return (
    <Sidebar collapsible="icon" {...restProps}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2">
          <div className="flex h-10 w-10 items-center justify-center group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
            <Sparkles
              className="h-5 w-5 text-sidebar-primary group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-light tracking-wide text-sidebar-foreground">
              Astrochat
            </span>
            <span className="text-[10px] text-sidebar-foreground/50 font-light tracking-wider uppercase">
              Professional Astrology
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center gap-3 p-2">
          <div className="flex items-center gap-2 w-full justify-center group-data-[collapsible=icon]:flex-col">
            <ThemeToggle />
            <HelpSheet />
          </div>
          <div className="w-full border-t border-sidebar-border/50 pt-2">
            <NavUser />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
