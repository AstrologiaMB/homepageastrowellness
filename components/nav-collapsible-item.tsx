'use client';

import type * as React from 'react';
import Link from 'next/link'; // Assuming next/link is used for navigation
import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavCollapsibleItemProps {
  item: NavItem;
  isSidebarCollapsed: boolean;
}

export function NavCollapsibleItem({ item, isSidebarCollapsed }: NavCollapsibleItemProps) {
  // If the item has no sub-items, render a standard menu item (or nothing, depending on desired behavior)
  if (!item.items || item.items.length === 0) {
    // For now, just return null or a simple link if needed, as the focus is on items with sub-options
    return null; // Or render a simple link if items without sub-options should also be handled here
  }

  // Render DropdownMenu when sidebar is collapsed
  if (isSidebarCollapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {' '}
            {/* Use SidebarMenuButton for styling */}
            {item.icon && <item.icon />}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="min-w-40">
          {' '}
          {/* Adjust width as needed */}
          {item.items.map((subItem) => (
            <DropdownMenuItem key={subItem.title} asChild>
              <Link href={subItem.url}>{subItem.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Render Collapsible when sidebar is expanded
  return (
    <Collapsible defaultOpen={item.isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
