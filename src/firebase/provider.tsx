
'use client';
import React, { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { firebaseApp, firebaseAuth, firestoreDB } from './index';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface FirebaseContextType {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  // This component provides the core Firebase instances (app, auth, firestore)
  // to the rest of the application via React context. It ensures that these
  // instances are initialized once and are available to any component that
  // needs them, avoiding prop-drilling and re-initialization issues.
  const instances = {
    app: firebaseApp,
    auth: firebaseAuth,
    firestore: firestoreDB,
  };

  return (
    <FirebaseContext.Provider value={instances}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

// Hook to access the full Firebase context. Throws an error if used outside a provider.
export const useFirebase = (): FirebaseContextType => {
    const context = useContext(FirebaseContext);
    if (context === null) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

// Convenience hooks to get specific Firebase service instances directly.
export const useFirebaseApp = (): FirebaseApp => useFirebase().app;
export const useFirestore = (): Firestore => useFirebase().firestore;
export const useAuth = (): Auth => useFirebase().auth;
