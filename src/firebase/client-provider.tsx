
'use client';
import React, { useEffect, useState } from 'react';
import { getRedirectResult, type Auth } from 'firebase/auth';
import { useAuth } from './provider';

function AuthHandler({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to handle the redirect result from Google Sign-In.
    getRedirectResult(auth)
      .catch((error) => {
        console.error('Error getting redirect result:', error);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  }, [auth]);

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-foreground">Verifying authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}


export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  return (
      <AuthHandler>
        {children}
      </AuthHandler>
  );
}
