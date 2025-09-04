import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Building the next generation of cybersecurity experts.
          </p>
        </div>
        <div className="flex items-center gap-4">
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
      <div className="border-t border-border/40 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
