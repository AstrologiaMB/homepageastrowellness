'use client';

import type * as React from 'react';
import { Bot, Calendar, Handshake, Star, Target, Sparkles } from 'lucide-react';

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
import { cn } from '@/lib/utils';



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isHomepage: boolean;
}

import { useSession } from "next-auth/react";
import { isFeatureEnabled } from "@/lib/features";

export function AppSidebar(props: AppSidebarProps) {
  const { isHomepage: _isHomepage, ...restProps } = props;
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const navigationData = {
    user: {
      name: session?.user?.name || 'Usuario',
      email: session?.user?.email || '',
      avatar: session?.user?.image || '',
    },
    navMain: [
      {
        title: 'Calendario',
        url: '/calendario',
        icon: Calendar,
        isActive: true, // Esto podría ser dinámico basado en pathname
        tooltip: 'Calendario astrológico con eventos planetarios y tránsitos',
        items: [
          {
            title: 'General',
            url: '/calendario/general',
            enabled: true
          },
          {
            title: 'Personal',
            url: '/calendario/personal',
            enabled: isFeatureEnabled('enablePersonalCalendar', userEmail)
          },
          {
            title: 'Planificador Lunar',
            url: '/calendario/lunar',
            enabled: isFeatureEnabled('enableLunarCalendar', userEmail)
          },
        ].filter(item => item.enabled),
      },
      {
        title: 'Cartas',
        url: '/cartas',
        icon: Star,
        tooltip: 'Cartas astrológicas: natal, trópica, dracónica',
        items: [
          {
            title: 'Carta Trópica',
            url: '/cartas/tropica',
            enabled: isFeatureEnabled('enableTropicalChart', userEmail)
          },
          {
            title: 'Carta Dracónica',
            url: '/cartas/draconica',
            enabled: isFeatureEnabled('enableDraconicChart', userEmail)
          },
        ].filter(item => item.enabled),
      },
      {
        title: 'Buenos Momentos',
        url: '/carta-electiva',
        icon: Target,
        tooltip: 'Búsqueda de momentos astrológicos óptimos',
        enabled: isFeatureEnabled('enableElectional', userEmail)
      },
      {
        title: 'Servicios',
        url: '#',
        icon: Handshake,
        tooltip: 'Servicios con revisión personalizada por astrólogos',
        items: [
          {
            title: 'Carta Horaria',
            url: '/cartas/horaria',
            enabled: true // Siempre visible por ahora?
          },
          {
            title: 'Rectificación de Carta',
            url: '/rectificacion-carta',
            enabled: true
          },
        ].filter(item => item.enabled),
        enabled: true
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
            enabled: true
          },
          {
            title: 'Interpretaciones',
            url: '/astrogematria/interpretaciones',
            enabled: true
          },
        ].filter(item => item.enabled),
        enabled: isFeatureEnabled('enableAstrogematria', userEmail)
      },
    ].filter(section => section.enabled !== false && (!section.items || section.items.length > 0)),
  };

  return (
    <Sidebar collapsible="icon" {...restProps}>
      <SidebarHeader>
        <div className={cn(
          "flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:px-2",
          // Add safe area top padding for notched devices
          "pt-[calc(theme(spacing.4)+env(safe-area-inset-top))]"
        )}>
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
        <div className={cn(
          "flex flex-col items-center gap-3 p-2",
          // Add safe area bottom padding for notched devices
          "pb-[calc(theme(spacing.2)+env(safe-area-inset-bottom))]"
        )}>
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
