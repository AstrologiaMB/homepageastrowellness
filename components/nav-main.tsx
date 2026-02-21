'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { state, openMobile, setOpenMobile, isMobile } = useSidebar();
  const router = useRouter();
  // On mobile the sidebar renders as a full-width sheet drawer, so we never
  // want icon-collapse behaviour regardless of the persisted desktop state.
  const isSidebarCollapsed = state === 'collapsed' && !isMobile;

  // Close sidebar on mobile after navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (isMobile && openMobile) {
      e.preventDefault();
      setOpenMobile(false);
      // Navigate after a short delay to allow the sidebar animation
      setTimeout(() => {
        router.push(url);
      }, 150);
    }
  };

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
                      className="group/menu-item hover:bg-sidebar-accent/50 transition-colors data-[active=true]:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    >
                      {item.icon && (
                        <item.icon
                          className="transition-opacity group-hover/menu-item:opacity-70"
                          strokeWidth={1.5}
                        />
                      )}
                      <span className="font-light">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" strokeWidth={1.5} />
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
                                <Link
                                  href={subItem.url}
                                  className="font-light"
                                  onClick={(e) => handleNavigation(e, subItem.url)}
                                >
                                  <span>{subItem.title}</span>
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
                  className="group/menu-item hover:bg-sidebar-accent/50 transition-colors data-[active=true]:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-2"
                    onClick={(e) => handleNavigation(e, item.url)}
                  >
                    {item.icon && (
                      <item.icon
                        className="transition-opacity group-hover/menu-item:opacity-70"
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="font-light">{item.title}</span>
                    <ChevronRight className="ml-auto" strokeWidth={1.5} />
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
