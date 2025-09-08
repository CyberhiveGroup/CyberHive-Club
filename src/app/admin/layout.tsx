
'use client';
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function AdminLayout({
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
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/" target="_blank">View Site</Link>
                    </Button>
                     {isAdmin && (
                        <Button onClick={handleLogout}>Logout</Button>
                    )}
                </div>
            </div>
        </header>
      <main>{children}</main>
    </div>
  );
}
