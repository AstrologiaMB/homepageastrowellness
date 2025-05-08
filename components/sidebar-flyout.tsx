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
  items: {
    label: string
    href: string
  }[]
  isCollapsed: boolean
}

export function SidebarFlyout({ icon, label, items, isCollapsed }: SidebarFlyoutProps) {
  const [open, setOpen] = useState(false)

  // Si el sidebar no está colapsado o no hay ítems, no renderizar nada
  if (!isCollapsed || !items.length) return null

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
            className="h-10 w-10 hover:bg-muted"
            aria-label={label}
          >
            {icon}
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        className="w-48 p-2"
        sideOffset={4}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="text-xs font-medium text-muted-foreground px-1 mb-2">
          {label}
        </div>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
