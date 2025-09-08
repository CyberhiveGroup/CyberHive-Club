
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'isAdmin';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check session storage on initial load
    const storedIsAdmin = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = () => {
    setIsAdmin(true);
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
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
