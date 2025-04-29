"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarFlyout } from "./sidebar-flyout" // Import the new SidebarFlyout component

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { state } = useSidebar();
  const isSidebarCollapsed = state === 'collapsed';

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Render SidebarFlyout if the item has sub-items AND the sidebar is collapsed
          if (item.items && item.items.length > 0 && isSidebarCollapsed) {
            return (
              <SidebarFlyout
                key={item.title}
                icon={item.icon ? <item.icon /> : null} // Pass the icon component
                label={item.title} // Pass the main item title as the flyout label
                items={item.items.map(subItem => ({ // Map sub-items to the expected format
                  label: subItem.title,
                  href: subItem.url,
                }))}
                isCollapsed={isSidebarCollapsed} // Pass the collapsed state
              />
            );
          }

          // Render Collapsible if the item has sub-items AND the sidebar is expanded
          if (item.items && item.items.length > 0 && !isSidebarCollapsed) {
             return (
               <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
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
                       {item.items?.map((subItem) => (
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


          // Render a standard menu item if the item has no sub-items (regardless of collapsed state)
          if (!item.items || item.items.length === 0) {
             return (
               <SidebarMenuItem key={item.title}>
                 <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                       {item.icon && <item.icon />}
                       <span>{item.title}</span>
                    </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
             );
          }

          return null; // Should not reach here if logic is correct
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
