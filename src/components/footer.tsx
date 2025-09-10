
'use client';
import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useContent } from '@/hooks/use-content';

const socialIcons = {
    email: <Mail className="h-6 w-6" />,
    whatsapp: <MessageCircle className="h-6 w-6" />,
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
            {footer.socialLinks.map((link) => (
                 <a
                    key={link.id}
                    href={link.href}
                    aria-label={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                    className="text-muted-foreground transition-colors hover:text-primary"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                    {getSocialIcon(link.platform)}
                </a>
            ))}
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
