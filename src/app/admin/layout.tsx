
'use client';
import { AdminProvider } from "@/context/AdminContext";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home, Users, BookOpen, Calendar, Shield, Footprints } from "lucide-react";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
            <SidebarHeader>
                 <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Home className="h-5 w-5" />
                    </div>
                    <span className="font-headline text-lg font-bold">CMS</span>
                 </Link>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard" tooltip="Dashboard">
                            <Home />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/home" tooltip="Home Page">
                            <Home />
                            <span>Home Page</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/about" tooltip="About Page">
                            <Users />
                            <span>About Page</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/team" tooltip="Team Members">
                            <Users />
                            <span>Team</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/csl" tooltip="CSL Classes">
                            <BookOpen />
                            <span>CSL Classes</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/events" tooltip="Events">
                            <Calendar />
                            <span>Events</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/resources" tooltip="Resources">
                            <Shield />
                            <span>Resources</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                         <SidebarMenuButton href="/admin/dashboard/footer" tooltip="Footer">
                            <Footprints />
                            <span>Footer</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        
        <SidebarInset>
            <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <div>
                        <SidebarTrigger />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                         <Avatar>
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}


export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;700;800&display=swap" rel="stylesheet" />
            </head>
            <body className={cn('min-h-screen bg-background font-body antialiased')}>
                <AdminProvider>
                    <AdminLayoutContent>{children}</AdminLayoutContent>
                    <Toaster />
                </AdminProvider>
            </body>
        </html>
    )
}
