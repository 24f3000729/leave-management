import { SidebarProvider } from "@/components/ui/sidebar";
import ManagerSidebar from "@/components/manager/Sidebar";

export default function ManagerLayout({ children }) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}