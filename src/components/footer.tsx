import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center md:items-start">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground text-center md:text-left">
            Building the next generation of cybersecurity experts.
          </p>
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="font-headline font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2">
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
              href="mailto:general@cyberhive.com"
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
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
