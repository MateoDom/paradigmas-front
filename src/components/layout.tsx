import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex-col p-8 min-h-screen">
        <h1 className="text-3xl font-bold mt-8">
          Sistema de Gestión de Biblioteca
        </h1>

        <Outlet />
        <Toaster  />
      </main>
    </SidebarProvider>
  );
}
