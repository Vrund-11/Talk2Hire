import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Pencil, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashbaord',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'All Interviews',
        icon: List,
        path: '/all-interviews'
    },
    {
        name: 'Scheduled Interviews',
        icon: Calendar,
        path: '/scheduled-interviews'
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

export const TypeOfInterview = [
    {
        name: 'Aptitude',
        icon: Pencil,
        path: '/dashboard'
    },
    {
        name: 'Problem Solving',
        icon: Puzzle,
        path: '/all-interviews'
    },
    {
        name: 'Behavioral',
        icon: User2Icon,
        path: '/scheduled-interviews'
    },
    {
        name: 'Experience',
        icon: BriefcaseBusinessIcon,
        path: '/settings'
    },
    {
        name: 'Technical',
        icon: Code2Icon,
        path: '/billing'
    }
]