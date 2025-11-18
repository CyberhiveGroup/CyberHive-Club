
'use client';
import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from "@/components/ui/toaster";
import { ContentProvider } from '@/context/ContentContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Logo } from '@/components/logo';
import { Home, Settings, FileText, Briefcase, Calendar, Users, Shield, Mail, ArrowLeft } from 'lucide-react';


const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home, tooltip: 'Dashboard' },
  { href: '/admin/home', label: 'Home Page', icon: FileText, tooltip: 'Home Page' },
  { href: '/admin/about', label: 'About Page', icon: Users, tooltip: 'About Page' },
  { href: '/admin/teams', label: 'Manage Teams', icon: Users, tooltip: 'Manage Teams' },
  { href: '/admin/contact', label: 'Contact Page', icon: Mail, tooltip: 'Contact Page' },
  { href: '/admin/events', label: 'Events', icon: Calendar, tooltip: 'Events' },
  { href: '/admin/csl-classes', label: 'CSL Classes', icon: Briefcase, tooltip: 'CSL Classes' },
  { href: '/admin/resources', label: 'Resources', icon: Shield, tooltip: 'Resources' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
];

function AdminSidebarNav() {
    return (
        <>
            <SidebarHeader>
                 <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {adminNavItems.map((item) => (
                         <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton href={item.href} tooltip={item.tooltip}>
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/" tooltip="Back to Site">
                            <ArrowLeft />
                            <span>Back to Site</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    )
}

function AdminLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen>
            <Sidebar>
                <AdminSidebarNav />
            </Sidebar>
            <SidebarInset>
                <main className="flex-1 p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold font-headline">Admin Panel</h1>
                    </div>
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        <div className="p-2">
                            {children}
                        </div>
                    </ScrollArea>
                </main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <ContentProvider>
                <AdminLayoutContent>{children}</AdminLayoutContent>
            </ContentProvider>
    );
}
