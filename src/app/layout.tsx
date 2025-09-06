import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { AdminProvider } from '@/context/AdminContext';
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'CyberHive Hub',
  description: 'The official website for the CyberHive cybersecurity club.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;700;800&display=swap" rel="stylesheet" />
        </head>
        <body
          className={cn(
            'min-h-screen bg-background font-body antialiased',
          )}
        >
          <AdminProvider>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AdminProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
