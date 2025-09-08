
'use client';
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminProvider } from "@/context/AdminContext";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";


function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
                    <DropdownMenuItem asChild><Link href="/" target="_blank">View Site</Link></DropdownMenuItem>
                     {isAdmin && (
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    )}
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
            <body>
                <AdminProvider>
                    <AdminLayoutContent>{children}</AdminLayoutContent>
                    <Toaster />
                </AdminProvider>
            </body>
        </html>
    )
}
