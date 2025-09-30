
'use client';
import { AdminProvider } from "@/context/AdminContext";
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";


export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                'min-h-screen bg-background font-body antialiased',
                )}
            >
                <AdminProvider>
                    {children}
                    <Toaster />
                </AdminProvider>
            </body>
        </html>
    )
}

    
