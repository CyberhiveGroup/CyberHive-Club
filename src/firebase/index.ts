'use client';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// This function initializes Firebase and returns the app, auth, and firestore instances.
// It ensures that Firebase is initialized only once.
let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
firestore = getFirestore(app);

export const firebaseApp = app;
export const firebaseAuth = auth;
export const firestoreDB = firestore;

export { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
