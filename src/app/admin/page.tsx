
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

export default function AdminPage() {
    const { isAdmin, login } = useAdmin();
    const router = useRouter();
    const { toast } = useToast();

    const handleActivate = () => {
        login(); // No password needed anymore
        toast({
            title: "Admin Mode Activated",
            description: "You now have administrative privileges. Redirecting...",
        });
        setTimeout(() => router.push('/'), 1500);
    };
    
    if (isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] bg-background">
                <Card className="w-full max-w-sm">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <KeyRound className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-headline">Admin Mode is Active</CardTitle>
                        <CardDescription>You can now see editing controls across the site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button onClick={() => router.push('/')} className="w-full font-bold">
                            Go to Homepage
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] bg-background">
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
