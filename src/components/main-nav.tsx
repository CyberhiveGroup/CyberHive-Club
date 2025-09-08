
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/csl-classes', label: 'CSL' },
  { href: '/resources', label: 'Resources' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function MainNav() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        {/* Mobile Nav Trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               <Link href="/" className="flex items-center" onClick={() => setIsSheetOpen(false)}>
                  <Logo />
                </Link>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav className="flex flex-col gap-4 p-4 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Desktop Nav */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary' : 'text-foreground/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Logo (centered) */}
        <div className="flex-1 flex justify-center md:hidden">
           <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        {/* This div is to balance the flexbox for mobile view, ensuring the logo is truly centered */}
        <div className="w-10 md:hidden">
        </div>

      </div>
    </header>
  );
}
