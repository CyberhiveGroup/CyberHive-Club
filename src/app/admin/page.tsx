
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
    const { isAdmin, login } = useAdmin();
    const router = useRouter();
    const { toast } = useToast();

    React.useEffect(() => {
        if(isAdmin) {
            router.push('/admin/dashboard');
        }
    }, [isAdmin, router]);

    const handleActivate = () => {
        login();
        toast({
            title: "Admin Mode Activated",
            description: "You now have administrative privileges. Redirecting to dashboard...",
        });
        router.push('/admin/dashboard');
    };
    
    if (isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] bg-background">
                <Card className="w-full max-w-sm text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <ShieldCheck className="h-10 w-10 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Admin Mode is Active</CardTitle>
                         <CardDescription>Redirecting you to the dashboard...</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground">If you are not redirected, click below.</p>
                        <Button onClick={() => router.push('/admin/dashboard')} className="w-full font-bold mt-4">
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <KeyRound className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Administrator Access</CardTitle>
                    <CardDescription>Activate admin mode to manage site content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={handleActivate} className="w-full font-bold">
                        Activate Admin Mode
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
