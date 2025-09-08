
'use client';
import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin, Mail, Instagram, MessageCircle, Lock, LogOut } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';


function AdminLogin() {
  const { isAdmin, login, logout } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    if (login(password)) {
      toast({
        title: "Admin Mode Activated",
        description: "You now have administrative privileges.",
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Incorrect Password",
        variant: "destructive",
      });
    }
    setPassword('');
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Admin Mode Deactivated",
    });
  }

  if (isAdmin) {
    return (
      <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
        <LogOut className="h-5 w-5 text-primary" />
        <span className="sr-only">Log Out</span>
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Admin Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Administrator Login</DialogTitle>
          <DialogDescription>
            Enter the password to enable admin mode.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-input" className="text-right">
              Password
            </Label>
            <Input
              id="password-input"
              type="password"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center md:items-start">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground text-center md:text-left">
            Building the next generation of cybersecurity experts.
          </p>
        </div>
        
        <div className="text-center">
          <h3 className="font-headline font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li><Link href="/csl-classes" className="text-sm text-muted-foreground hover:text-primary transition-colors">CSL</Link></li>
            <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resources</Link></li>
            <li><Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
           <h3 className="font-headline font-bold mb-4 uppercase tracking-wider">Connect</h3>
          <div className="flex items-center gap-4">
            <Link
              href="mailto:cyberhive@ggits.org"
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="WhatsApp"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>
             <Link
              href="#"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4">
        <div className="container mx-auto px-4 text-sm text-muted-foreground md:px-6 flex justify-between items-center">
            <span>© {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.</span>
            <AdminLogin />
        </div>
      </div>
    </footer>
  );
}
