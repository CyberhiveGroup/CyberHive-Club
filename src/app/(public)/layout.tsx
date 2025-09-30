
'use client';

import * as React from 'react';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { useContent } from '@/hooks/use-content';
import { Loader2 } from 'lucide-react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useContent();
  return (
      <div className="relative flex min-h-screen flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </>
        )}
        <Toaster />
      </div>
  );
}
