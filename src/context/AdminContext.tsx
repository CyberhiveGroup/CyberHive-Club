
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Define your admin user IDs here
const ADMIN_USER_IDS = [
    process.env.NEXT_PUBLIC_ADMIN_USER_ID,
].filter(Boolean);


export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthLoaded && isUserLoaded && isSignedIn && user) {
        const userIsAdmin = ADMIN_USER_IDS.includes(user.id);
        setIsAdmin(userIsAdmin);
    } else {
        setIsAdmin(false);
    }
  }, [isSignedIn, user, isAuthLoaded, isUserLoaded]);

  // For simplicity, we'll just expose the boolean.
  // Login/logout is handled by Clerk's components.
  const value = { isAdmin };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
