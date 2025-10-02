'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, FileText, Briefcase, Calendar, Users, Shield, Mail, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from "@/components/ui/toaster"
import { ContentProvider } from '@/context/ContentContext';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/home', label: 'Home Page', icon: FileText },
  { href: '/admin/about', label: 'About Page', icon: Users },
  { href: '/admin/contact', label: 'Contact Page', icon: Mail },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/csl-classes', label: 'CSL Classes', icon: Briefcase },
  { href: '/admin/resources', label: 'Resources', icon: Shield },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminSidebar() {
    const pathname = usePathname();
    return (
        <aside className="w-64 flex flex-col border-r bg-background">
            <div className="p-4 border-b">
                <h2 className="text-2xl font-bold font-headline text-primary">Admin Panel</h2>
            </div>
            <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-4">
                {adminNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    ))}
                </nav>
            </ScrollArea>
             <div className="p-4 border-t">
                <Button asChild variant="outline" className="w-full">
                    <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Site</Link>
                </Button>
            </div>
        </aside>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <ContentProvider>
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <ScrollArea className="h-full">
                    <div className="p-2">
                     {children}
                    </div>
                </ScrollArea>
            </main>
            <Toaster />
        </div>
    </ContentProvider>
  );
}
