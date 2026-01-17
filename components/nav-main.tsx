'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarFlyout } from './sidebar-flyout';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    tooltip?: string;
    isPremium?: boolean;
    premiumIcon?: React.ReactNode;
    items?: {
      title: string;
      url: string;
      isPremium?: boolean;
      premiumIcon?: React.ReactNode;
    }[];
  }[];
}) {
  const { state } = useSidebar();
  const isSidebarCollapsed = state === 'collapsed';

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          // Render SidebarFlyout if the item has sub-items AND the sidebar is collapsed
          if (
            item.items &&
            Array.isArray(item.items) &&
            item.items.length > 0 &&
            isSidebarCollapsed
          ) {
            const iconElement = item.icon ? <item.icon /> : null;

            return (
              <SidebarFlyout
                key={`${item.title}-${item.url}-${index}`}
                icon={iconElement}
                label={item.title}
                tooltip={item.tooltip}
                items={
                  Array.isArray(item.items)
                    ? (item.items
                        .map((subItem) =>
                          subItem && subItem.title && subItem.url
                            ? {
                                label: subItem.title,
                                href: subItem.url,
                              }
                            : null
                        )
                        .filter(Boolean) as { label: string; href: string }[])
                    : []
                }
                isCollapsed={isSidebarCollapsed}
              />
            );
          }

          // Render Collapsible if the item has sub-items AND the sidebar is expanded
          if (
            item.items &&
            Array.isArray(item.items) &&
            item.items.length > 0 &&
            !isSidebarCollapsed
          ) {
            return (
              <Collapsible
                key={`${item.title}-${item.url}-${index}`}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.tooltip || item.title}
                      className="group/menu-item hover:bg-sidebar-accent/50 transition-colors"
                    >
                      {item.icon && (
                        <item.icon
                          className="transition-opacity group-hover/menu-item:opacity-70"
                          strokeWidth={1.5}
                        />
                      )}
                      <span className="font-light">{item.title}</span>
                      {item.premiumIcon && <span className="ml-1">{item.premiumIcon}</span>}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all data-[state=closed]:animate-out data-[state=open]:animate-in">
                    <SidebarMenuSub>
                      {Array.isArray(item.items) &&
                        item.items.map((subItem, subIndex) =>
                          subItem && subItem.title && subItem.url ? (
                            <SidebarMenuSubItem key={`${subItem.title}-${subItem.url}-${subIndex}`}>
                              <SidebarMenuSubButton
                                asChild
                                className="group/sub-item hover:bg-sidebar-accent/30 transition-colors"
                              >
                                <Link href={subItem.url} className="font-light">
                                  <span>{subItem.title}</span>
                                  {subItem.premiumIcon && subItem.premiumIcon}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ) : null
                        )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Render a standard menu item if the item has no sub-items (regardless of collapsed state)
          if (!item.items || !Array.isArray(item.items) || item.items.length === 0) {
            return (
              <SidebarMenuItem key={`${item.title}-${item.url}-${index}`}>
                <SidebarMenuButton
                  tooltip={item.tooltip || item.title}
                  asChild
                  className="group/menu-item hover:bg-sidebar-accent/50 transition-colors"
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon && (
                      <item.icon
                        className="transition-opacity group-hover/menu-item:opacity-70"
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="font-light">{item.title}</span>
                    {item.premiumIcon && <span className="ml-auto">{item.premiumIcon}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return null;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
