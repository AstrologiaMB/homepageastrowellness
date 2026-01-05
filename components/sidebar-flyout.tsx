"use client"

import { useState } from "react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SidebarFlyoutProps {
  icon: ReactNode
  label: string
  tooltip?: string
  items: {
    label: string
    href: string
  }[]
  isCollapsed: boolean
}

export function SidebarFlyout({ icon, label, tooltip, items, isCollapsed }: SidebarFlyoutProps) {
  const [open, setOpen] = useState(false)

  // Si el sidebar no está colapsado o no hay ítems, no renderizar nada
  if (!isCollapsed || !Array.isArray(items) || !items.length) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="w-full flex justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-violet-500/10 transition-all duration-300 group"
            aria-label={label}
          >
            <div className="transition-all duration-300 group-hover:scale-110 group-hover:text-purple-500">
              {icon}
            </div>
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        className="w-52 p-3 border-2 border-sidebar-border/50 bg-sidebar/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10"
        sideOffset={8}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="text-xs font-bold text-purple-600 px-1 mb-3 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-purple-500 animate-pulse"></div>
          {tooltip || label}
        </div>
        <div className="flex flex-col gap-1">
          {Array.isArray(items) && items.map((item, index) => (
            item && item.href && item.label ? (
              <Link
                key={`${item.href}-${item.label}-${index}`}
                href={item.href}
                className={cn(
                  "text-sm px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-violet-500/10 transition-all duration-200 font-medium group/item hover:translate-x-1"
                )}
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover/item:w-full"></span>
                </span>
              </Link>
            ) : null
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
