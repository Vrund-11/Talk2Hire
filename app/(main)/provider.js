import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSideBar';
import WelcomeMessage from './dashboard/_components/WelcomeMessage';
import { Menu } from 'lucide-react';

export const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header with Sidebar Trigger */}
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60">
            <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
              {/* Sidebar Open Button */}
              <SidebarTrigger className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 hover:scale-105 active:scale-95 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-600">
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </SidebarTrigger>
              
              {/* Welcome Message in Header */}
              <div className="flex-1">
                <WelcomeMessage />
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
