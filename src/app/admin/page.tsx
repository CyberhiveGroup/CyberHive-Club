'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn) {
            router.push('/admin/dashboard');
        } else {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
}
