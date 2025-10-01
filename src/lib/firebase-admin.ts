// IMPORTANT:
// To deploy this, you will need to set the following environment variables in your Vercel project:
// 1. FIREBASE_PROJECT_ID: Your Firebase project ID.
// 2. FIREBASE_CLIENT_EMAIL: The client email from your Firebase service account JSON file.
// 3. FIREBASE_PRIVATE_KEY: The private key from your Firebase service account JSON file.
//    (Remember to replace newline characters `\n` with `\\n` in the private key value).

import admin from 'firebase-admin';

const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const db = admin.firestore();
