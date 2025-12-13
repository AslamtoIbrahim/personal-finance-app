import { AppSidebar } from '@/features/dashboard/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/features/dashboard/components/ui/breadcrumb'
import { Separator } from '@/features/dashboard/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/features/dashboard/components/ui/sidebar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { fetchData } from '../lib/financer/financeSlicer'
import type { AppDispatch } from '@/store/store'

export default function Dashboard() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('useEffect 🧧');
    dispatch(fetchData())
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className='capitalize'>
                    {decodeURIComponent(pathname.slice(1))}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 md:p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
