import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import ManagerSidebar from "@/components/manager/Sidebar";

export default function ManagerLayout({ children }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 h-14 px-4 border-b md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-semibold">Manager Panel</span>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}