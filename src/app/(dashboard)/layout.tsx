import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Briefcase, FileText, User, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  // Get profile to determine role
  const [workerProfile, customerProfile] = await Promise.all([
    db.workerProfile.findUnique({ where: { userId: session.user.id } }),
    db.customerProfile.findUnique({ where: { userId: session.user.id } }),
  ]);

  const role = workerProfile ? "WORKER" : customerProfile ? "CUSTOMER" : null;

  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { 
      label: role === "WORKER" ? "Assigned Jobs" : "My Posted Jobs", 
      href: "/dashboard/jobs", 
      icon: Briefcase 
    },
    { 
      label: role === "WORKER" ? "My Quotes" : "Received Quotes", 
      href: "/dashboard/quotes", 
      icon: FileText 
    },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <span className="font-display font-bold text-xs text-accent-foreground">B</span>
              </div>
              <span className="font-display font-bold text-lg group-data-[collapsible=icon]:hidden">
                Baas<span className="text-secondary">.lk</span>
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Home">
                  <Link href="/">
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                {role === "WORKER" ? "Worker Portal" : "Customer Portal"}
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {session.user.name?.[0] || session.user.email?.[0] || "U"}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
