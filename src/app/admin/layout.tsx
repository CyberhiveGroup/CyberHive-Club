
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
