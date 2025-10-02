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

export const useFirebase = (): FirebaseContextType => {
    const context = useContext(FirebaseContext);
    if (context === null) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export const useFirebaseApp = (): FirebaseApp => useFirebase().app;
export const useFirestore = (): Firestore => useFirebase().firestore;
export const useAuth = (): Auth => useFirebase().auth;
