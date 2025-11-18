
'use client';
import React from 'react';

// This provider is kept for potential future use but is currently a passthrough.
export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
