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
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    React.useEffect(() => {
        if (!isCheckingAdminStatus) {
            if (isAdmin) {
                setIsAuthorized(true);
            } else {
                router.push('/admin');
            }
        }
    }, [isAdmin, isCheckingAdminStatus, router]);

    if (!isAuthorized) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}