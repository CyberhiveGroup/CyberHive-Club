
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

export default function AdminPage() {
    const { login } = useAdmin();
    const router = useRouter();
    const { toast } = useToast();
    const [password, setPassword] = React.useState('');
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = () => {
        setIsLoggingIn(true);
        if (login(password)) {
            toast({
                title: "Admin Mode Activated",
                description: "You now have administrative privileges. Redirecting...",
            });
            setTimeout(() => router.push('/'), 1500);
        } else {
            toast({
                title: "Incorrect Password",
                variant: "destructive",
            });
            setIsLoggingIn(false);
        }
        setPassword('');
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <KeyRound className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Administrator Access</CardTitle>
                    <CardDescription>Enter the password to manage site content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            disabled={isLoggingIn}
                        />
                    </div>
                    <Button onClick={handleLogin} className="w-full font-bold" disabled={isLoggingIn}>
                        {isLoggingIn ? "Logging In..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
