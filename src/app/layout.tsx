
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AdminProvider } from '@/context/AdminContext';
import { ClerkProvider } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: 'CyberHive Hub',
  description: 'The official website for the CyberHive cybersecurity club.',
  icons: {
    icon: '/favicon.ico?v=2',
  },
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
                {children}
            </AdminProvider>
        </body>
        </html>
    </ClerkProvider>
  );
}
