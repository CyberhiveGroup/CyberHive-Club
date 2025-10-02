'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This component is a client-side component that listens for Firestore
// permission errors and throws them to be caught by the Next.js error overlay.
// This is only active in development and will not be part of the production build.
export function FirebaseErrorListener() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      errorEmitter.on('permission-error', (error) => {
        // We throw the error here to make it visible in the Next.js error overlay.
        // This helps developers to see the context of the security rule denial.
        throw error;
      });
    }
  }, []);

  return null;
}
