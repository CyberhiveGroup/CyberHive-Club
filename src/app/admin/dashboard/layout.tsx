'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAdmin, isCheckingAdminStatus } = useAdmin();
    const router = useRouter();

    React.useEffect(() => {
        if (!isCheckingAdminStatus && !isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, isCheckingAdminStatus, router]);

    if (isCheckingAdminStatus) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="mt-2 text-muted-foreground">Verifying admin status...</p>
                </div>
            </div>
        );
    }
    
    if (!isAdmin) {
        // This is a fallback while the redirect is in progress.
        return null;
    }

    return <>{children}</>;
}
