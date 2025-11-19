
'use client';

import * as React from 'react';
import { Mail, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
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

const DiscordIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M8 12.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5S10.328 11 9.5 11 8 11.672 8 12.5z" />
    <path d="M14.5 11c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
    <path d="M8.5 17.5s.5-1 2-1.5c1.5-.5 3-.5 4.5 0s2 1.5 2 1.5" />
  </svg>
);


export default function ContactPage() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading content...</div>;
    }

    const { contact: textContent, footer: footerContent } = content;
    
    const socialIcons = {
        email: <Mail className="h-8 w-8" />,
        whatsapp: <WhatsAppIcon className="h-8 w-8" />,
        instagram: <Instagram className="h-8 w-8" />,
        discord: <DiscordIcon className="h-8 w-8" />,
        github: <Github className="h-8 w-8" />,
        linkedin: <Linkedin className="h-8 w-8" />
    };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          {textContent.title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          {textContent.subtitle}
        </p>
      </section>

      <div className="max-w-lg mx-auto bg-card p-8 rounded-lg shadow-lg">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6 text-center">Contact Information</h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">Email</span>
                  <a href={`mailto:${textContent.email}`} className="hover:text-primary transition-colors">{textContent.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                 <div className="flex flex-col">
                    <span className="font-semibold text-foreground">Address</span>
                    <span>{textContent.address}</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6 text-center pt-6 border-t">Follow Us</h2>
            <div className="flex items-center justify-center gap-6">
                {footerContent.socialLinks.map(link => {
                    const socialIcon = socialIcons[link.platform as keyof typeof socialIcons];
                    const linkLabel = link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
                    const href = link.platform === 'email' ? `mailto:${link.href}` : link.href;
                    const isExternal = href.startsWith('http') || href.startsWith('mailto:');

                    if (isExternal) {
                        return (
                             <a 
                                key={link.id} 
                                href={href} 
                                aria-label={linkLabel}
                                className="text-muted-foreground transition-colors hover:text-primary"
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {socialIcon}
                            </a>
                        )
                    }
                    return (
                        <Link
                            key={link.id}
                            href={href}
                            aria-label={linkLabel}
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                             {socialIcon}
                        </Link>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
