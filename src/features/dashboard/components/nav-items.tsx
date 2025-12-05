"use client"

import {
  ChevronRightIcon,
  type LucideIcon
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/features/dashboard/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/features/dashboard/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Activity } from "react"


export function NavItems({
  navItems,
}: {
  navItems: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className={`${pathname.includes(item.url) ? 'bg-foreground/10' : ''}`}>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover={!pathname.includes(item.url)}>
                  <Activity mode={pathname.includes(item.url) ? "visible" : "hidden"}>
                    <ChevronRightIcon />
                  </Activity>
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
