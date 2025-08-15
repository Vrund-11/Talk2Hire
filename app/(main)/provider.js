import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSideBar';
import WelcomeMessage from './dashboard/_components/WelcomeMessage';

export const DashboardProvider = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <div className='w-full  p-6'>
          <WelcomeMessage />
          {children}
        </div>
      </SidebarProvider>
    </>
  )
}

