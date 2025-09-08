
'use client';
import { AdminProvider } from "@/context/AdminContext";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
        <header className="bg-background border-b sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/admin/dashboard" className="font-headline text-xl font-bold">CMS Dashboard</Link>
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
      <main>{children}</main>
    </div>
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
