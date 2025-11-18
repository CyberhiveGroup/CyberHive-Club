
'use client';
import * as React from 'react';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

function LoginPageContent() {
    const auth = useAuth();
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [isSigningIn, setIsSigningIn] = React.useState(true);

    React.useEffect(() => {
        if (!auth) {
            setIsSigningIn(false);
            return;
        }

        if (user) {
            router.push('/admin/dashboard');
            return;
        }
        
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    router.push('/admin/dashboard');
                } else {
                    setIsSigningIn(false);
                }
            })
            .catch((error) => {
                console.error('Error getting redirect result', error);
                setIsSigningIn(false);
            });
    }, [auth, user, router]);

    const handleGoogleSignIn = async () => {
        if (!auth) {
            console.error("Authentication service is not available.");
            return;
        }
        setIsSigningIn(true);
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    };

    const handleSignOut = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
            // The useUser hook will update the state, and the UI will re-render.
        } catch (error) {
            console.error('Error signing out', error);
        }
    };
    
    if (isLoading || isSigningIn) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {user ? `Welcome, ${user.displayName}` : 'Admin Access'}
                    </CardTitle>
                    <CardDescription>
                        {user ? 'You are now logged in.' : 'Sign in to access the admin panel.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <div className="space-y-4">
                             <Button onClick={() => router.push('/admin/dashboard')} className="w-full">
                                Go to Dashboard
                            </Button>
                            <Button onClick={handleSignOut} variant="outline" className="w-full">
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleGoogleSignIn} className="w-full" disabled={isSigningIn}>
                            <GoogleIcon /> {isSigningIn ? 'Signing In...' : 'Sign In with Google'}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}


export default function LoginPage() {
    return (
        <FirebaseClientProvider>
            <LoginPageContent />
        </FirebaseClientProvider>
    )
}
