import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashbaord',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interviews',
        icon: Calendar,
        path: '/scheduled-interviews'
    },
    {
        name: 'All Interviews',
        icon: List,
        path: '/all-interviews'
    },
    {
        name: 'Setting',
        icon: Settings,
        path: '/settings'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    }
]