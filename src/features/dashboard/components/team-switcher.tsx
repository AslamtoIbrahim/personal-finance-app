"use client"


import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/features/dashboard/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/features/dashboard/components/ui/sidebar"

export function TeamSwitcher(

) {


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src="src/assets/images/logo-small.svg" alt="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h1 className="text-start px-2 text-3xl font-black">Finance</h1>
              </div>

            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
