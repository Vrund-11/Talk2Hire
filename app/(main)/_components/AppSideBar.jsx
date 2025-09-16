'use client'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants"
import { Plus, LogOut, User, Bell, X, PanelLeftClose } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'

export function AppSidebar() {
  const path = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const { setOpenMobile, toggleSidebar } = useSidebar()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const handleCreateInterview = () => {
    router.push('/dashboard/interview/create')
  }

  const handleCloseSidebar = () => {
    setOpenMobile(false)
    toggleSidebar()
  }

  const filteredSidebarOptions = SidebarOptions.filter(option => option.name !== 'Settings')

  return (
    <Sidebar className="border-r border-gray-200 bg-white flex flex-col h-full shadow-xl shadow-black/10">
      
      {/* Clean Header with Light Purple Accents */}
      <SidebarHeader className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-violet-50/50">
        <div className="flex items-center justify-between mb-4">
          {/* Modern Logo with Light Purple */}
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-violet-500 rounded-lg flex items-center justify-center shadow-lg border border-violet-300 group-hover:border-violet-400 transition-all duration-200">
              <span className="text-white font-bold text-lg">T2H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-black">
                Talk2Hire
              </span>
              <span className="text-xs text-violet-600 font-medium">AI Interview Platform</span>
            </div>
          </div>

          {/* Clean Close Buttons */}
          <button 
            onClick={handleCloseSidebar}
            className="p-2 rounded-lg text-gray-600 hover:text-black hover:bg-violet-100 
                       active:bg-violet-200 transition-all duration-200
                       lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 hover:text-black hover:bg-violet-100 
                       active:bg-violet-200 transition-all duration-200
                       hidden lg:block"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Elegant Create Button */}
        <button 
          onClick={handleCreateInterview}
          className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 text-white font-medium 
                     py-3 px-4 rounded-lg text-sm border border-violet-400 hover:border-violet-300
                     hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200
                     flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Interview</span>
        </button>
      </SidebarHeader>

      {/* Clean Navigation */}
      <SidebarContent className="px-3 py-4 flex-1 overflow-y-auto bg-white">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {filteredSidebarOptions.map((option, index) => {
              const isActive = path === option.path
              
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="w-full p-0 h-auto">
                    <Link 
                      href={option.path} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                                 transition-all duration-200 w-full border
                                 ${isActive 
                                   ? 'bg-gradient-to-r from-violet-100 to-violet-50 text-black border-violet-300 shadow-sm' 
                                   : 'text-gray-700 hover:text-black hover:bg-violet-50 hover:border-violet-200 border-transparent'
                                 }`}
                      onClick={() => setOpenMobile(false)}
                    >
                      {/* Clean Active Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r" />
                      )}
                      
                      {/* Icon */}
                      <div className={`transition-colors duration-200 ${isActive ? 'text-violet-600' : 'text-gray-500 group-hover:text-violet-600'}`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      
                      {/* Text */}
                      <span className="flex-1">
                        {option.name}
                      </span>
                      
                      {/* Clean Badges */}
                      {option.name === 'Interview Scheduled' && (
                        <div className="ml-auto px-2 py-0.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs rounded-full font-medium transition-colors duration-200">
                          3
                        </div>
                      )}
                      
                      {option.name === 'Your Interviews' && (
                        <div className="ml-auto px-2 py-0.5 bg-violet-500 hover:bg-violet-400 text-white text-xs rounded-full font-medium transition-colors duration-200">
                          12
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Clean Footer */}
      <SidebarFooter className="px-3 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-violet-25">
        {/* User Profile */}
        {user && (
          <div className="mb-3">
            <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-violet-50 to-white rounded-lg border border-violet-200
                           hover:from-violet-100 hover:to-violet-50 hover:border-violet-300 transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center border border-violet-400">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-black text-sm font-medium truncate">
                  {user.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-violet-600 text-xs truncate">{user.email}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-violet-100 transition-colors duration-200">
                <Bell className="w-4 h-4 text-gray-600 hover:text-violet-600" />
              </button>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button 
          className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium rounded-lg
                     text-gray-700 hover:text-black bg-gradient-to-r from-white to-violet-50 hover:from-violet-100 hover:to-violet-50
                     border border-gray-200 hover:border-violet-300
                     transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        {/* Version Info */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-medium">Talk2Hire v2.1.0</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
