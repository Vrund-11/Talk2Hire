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
import { Link, Plus } from "lucide-react"
import Image from 'next/image'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center -mt-13 ">
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

        <SidebarGroup className = 'mt-5'>
          <SidebarContent>
            <SidebarMenu className = 'w-full'>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={option.path}>
                      <option.icon /> {option.name}
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