'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { useAdmin } from '@/context/AdminContext';

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
        {/* Desktop Nav */}
        <div className="hidden flex-1 items-center justify-start md:flex">
            <Logo className="mr-6" />
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

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center justify-between w-full">
            <div className="flex-1">
                 <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <SheetHeader className="p-4 border-b">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <Logo onClick={() => setIsSheetOpen(false)} />
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
                             <div className="p-4 border-t">
                                <SignedOut>
                                    <div className="flex flex-col gap-2">
                                        <SignInButton>
                                            <Button variant="secondary" className="w-full">Sign In</Button>
                                        </SignInButton>
                                        <SignUpButton>
                                            <Button className="w-full">Sign Up</Button>
                                        </SignUpButton>
                                    </div>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex-1 text-center">
                <Logo />
            </div>
             <div className="flex-1 flex justify-end">
                <div className="hidden sm:block">
                     <SignedOut>
                        <div className="flex items-center gap-2">
                        <SignInButton>
                            <Button variant="secondary" size="sm">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button size="sm">Sign Up</Button>
                        </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center justify-end gap-4">
             <SignedOut>
                <div className="flex items-center gap-2">
                <SignInButton>
                    <Button variant="secondary" size="sm">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button size="sm">Sign Up</Button>
                </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>

      </div>
    </header>
  );
}