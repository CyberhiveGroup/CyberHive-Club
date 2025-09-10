
'use client';
import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useContent } from '@/hooks/use-content';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const socialIcons = {
    email: <Mail className="h-6 w-6" />,
    whatsapp: <WhatsAppIcon className="h-6 w-6" />,
    instagram: <Instagram className="h-6 w-6" />,
    twitter: <Twitter className="h-6 w-6" />,
    github: <Github className="h-6 w-6" />,
    linkedin: <Linkedin className="h-6 w-6" />,
}

export function Footer() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <footer className="w-full border-t border-border/40 bg-background/95 py-10 text-center">Loading...</footer>;
    }

    const { footer } = content;

    const getSocialIcon = (platform: keyof typeof socialIcons) => {
        return socialIcons[platform] || null;
    }
    
    const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('mailto:');


  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center md:items-start">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground text-center md:text-left">
            {footer.tagline}
          </p>
        </div>
        
        <div className="text-center">
          <h3 className="font-headline font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footer.quickLinks.map((link) => (
                <li key={link.id}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
           <h3 className="font-headline font-bold mb-4 uppercase tracking-wider">Connect</h3>
          <div className="flex items-center gap-4">
            {footer.socialLinks.map((link) => {
                const linkLabel = link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
                if (isExternalLink(link.href)) {
                    return (
                        <a
                            key={link.id}
                            href={link.href}
                            aria-label={linkLabel}
                            className="text-muted-foreground transition-colors hover:text-primary"
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            {getSocialIcon(link.platform)}
                        </a>
                    )
                }
                return (
                    <Link
                        key={link.id}
                        href={link.href}
                        aria-label={linkLabel}
                        className="text-muted-foreground transition-colors hover:text-primary"
                    >
                        {getSocialIcon(link.platform)}
                    </Link>
                )
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-4 px-4 text-sm text-muted-foreground md:px-6">
            <span>{footer.copyright.replace('{new Date().getFullYear()}', String(new Date().getFullYear()))}</span>
        </div>
      </div>
    </footer>
  );
}
