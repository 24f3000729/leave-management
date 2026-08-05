"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  CheckCircle2,
  History,
  Settings,
  LayoutGrid,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/manager/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/manager/employees", label: "Total Staff", icon: Users, badge: "24" },
  { href: "/manager/leave-details", label: "Leave Balance", icon: CalendarClock },
  { href: "/manager/leave-requests", label: "Pending Approvals", icon: CheckCircle2, badge: "5" },
  { href: "/manager/history", label: "Leave History", icon: History },
  { href: "/manager/settings", label: "Settings", icon: Settings },
];

export default function ManagerSidebar() {
  const pathname = usePathname(); // current URL, e.g. "/manager/employees"
  const { toggleSidebar } = useSidebar();

  return (
    
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            MS
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden flex-1">
            <p className="text-sm font-semibold">Manager Panel</p>
            <p className="text-xs text-muted-foreground">Staff & Leave</p>
          </div>
        </div>
      </SidebarHeader>
      
      {/* <SidebarTrigger className="absolute -right-5 top-10 z-10 w-10 h-10 rounded-full border bg-background shadow-md hover:bg-accent group-data-[collapsible=icon]:hidden" /> */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-5 top-10 z-10 w-10 h-10 rounded-full border bg-background shadow-md hover:bg-accent flex items-center justify-center group-data-[collapsible=icon]:hidden"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <SidebarContent>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href} className='cursor-pointer'>
                    <Link href={item.href} className="flex items-center gap-3 cursor-pointer">
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label} className='cursor-pointer'>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            RS
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-medium">Rakesh Sharma</p>
            <p className="text-[11px] text-muted-foreground">Floor Manager</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}