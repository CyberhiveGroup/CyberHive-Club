
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface AdminContextType {
  isAdmin: boolean;
  isCheckingAdminStatus: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Define your admin user IDs here
const ADMIN_USER_IDS = [
    process.env.NEXT_PUBLIC_ADMIN_USER_ID || '',
].filter(Boolean);


export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdminStatus, setIsCheckingAdminStatus] = useState(true);

  useEffect(() => {
    const isLoaded = isAuthLoaded && isUserLoaded;
    if (isLoaded) {
        const userIsAdmin = !!(isSignedIn && user && ADMIN_USER_IDS.includes(user.id));
        setIsAdmin(userIsAdmin);
        setIsCheckingAdminStatus(false);
    }
  }, [isSignedIn, user, isAuthLoaded, isUserLoaded]);

  const value = { isAdmin, isCheckingAdminStatus };

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
