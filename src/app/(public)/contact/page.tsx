
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
        className={className}
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <title>Discord</title>
        <path d="M20.317 4.36981C18.8824 3.78044 17.3821 3.34521 15.8228 3.07477C15.7971 3.12044 15.7725 3.16694 15.7468 3.21261C14.7346 3.68412 13.7954 4.09934 12.7753 4.54922C11.3094 3.99622 9.80376 3.51381 8.24354 3.07477C8.20194 2.98394 8.16118 2.89312 8.11958 2.80229C6.41701 3.20812 4.82361 3.86877 3.3767 4.70297C1.43343 6.64337 0.359013 9.22274 0 11.9441C0.525543 12.5699 1.12423 13.161 1.76454 13.6934C2.06222 13.5042 2.34861 13.2982 2.62265 13.0768C2.3926 12.8488 2.1749 12.6083 1.96853 12.367C1.93325 12.3323 1.89797 12.2968 1.86353 12.2622C4.01354 14.1958 6.57864 15.6247 9.42695 16.321C9.99222 15.9328 10.5318 15.5108 11.0346 15.048C10.4542 14.8318 9.90793 14.5818 9.38801 14.2982C9.33649 14.2721 9.28581 14.2443 9.23513 14.2165C6.91572 12.9356 5.42907 10.9383 5.37365 8.73022C5.36523 8.38434 5.41507 8.03847 5.52292 7.70243C6.73294 6.43431 8.42337 5.48594 10.2295 5.05312C10.2553 5.09879 10.2802 5.14447 10.3051 5.19014C11.0233 5.56212 11.691 5.99252 12.327 6.46403C12.3528 6.48188 12.3794 6.49889 12.4052 6.51675C13.514 5.79429 14.7342 5.23438 16.0352 4.8624C16.143 5.10284 16.2385 5.35571 16.3172 5.61901C18.6657 7.04953 20.0156 9.34444 19.9869 11.9441C19.9573 13.0641 19.6405 14.1504 19.0601 15.1118C19.553 15.523 20.0123 15.9014 20.446 16.2546C22.6133 14.0114 23.9519 11.0494 24 7.86581C22.8859 6.57351 21.6575 5.41951 20.317 4.36981ZM8.02025 10.3331C7.1261 10.3331 6.39191 9.65218 6.39191 8.82512C6.39191 7.99805 7.1261 7.31718 8.02025 7.31718C8.91441 7.31718 9.64859 7.99805 9.64859 8.82512C9.64859 9.65218 8.91441 10.3331 8.02025 10.3331ZM15.9937 10.3331C15.0995 10.3331 14.3653 9.65218 14.3653 8.82512C14.3653 7.99805 15.0995 7.31718 15.9937 7.31718C16.8878 7.31718 17.622 7.99805 17.622 8.82512C17.622 9.65218 16.8878 10.3331 15.9937 10.3331Z"/>
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

    

    

    