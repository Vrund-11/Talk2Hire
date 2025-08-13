import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSideBar';

export const DashboardProvider = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div>
          {children}
        </div>
      </SidebarProvider>
    </>
  )
}

