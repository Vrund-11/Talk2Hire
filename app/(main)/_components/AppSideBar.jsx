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
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import {usePathname} from 'next/navigation' 

export function AppSidebar() {

  const path = usePathname() ;

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center -mt-13 ">
        <Image
          src="/talk2hire-photos/Logo-talk2hire.png"
          alt="Talk2Hire Logo"
          width={300}
          height={150}
        />
        <Button className='w-full bg-blue-400 -mt-5'>
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup className='mt-5'>
          <SidebarContent >
            <SidebarMenu className=''>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className = {`  ${path === option.path ? 'bg-blue-100 font-semibold' : ''}`}>
                    <Link href={option.path} className="flex items-center gap-3 mt-2.5 ">
                      <option.icon className={` ${path === option.path ? 'text-emerald-600' : ''}`}/>
                    <span className={`text-[16px]  ${path === option.path ? 'underline decoration-sky-500 text-teal-600' : ''}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
