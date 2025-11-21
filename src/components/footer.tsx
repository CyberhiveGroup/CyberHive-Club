
'use client';
import { Logo } from '@/components/logo';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
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
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <title>Discord</title>
        <path d="M14.5 10.5c-.8 0-1.5.7-1.5 1.5v1c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5h-1zM9.5 10.5c-.8 0-1.5.7-1.5 1.5v1c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5h-1z"/>
        <path d="M5.5 17.5c-1.5 0-2-1.5-2-2.5v-6c0-1.5.5-2.5 2-2.5h13c1.5 0 2 1.5 2 2.5v6c0 .5-.5 1-1 1.5a1.5 1.5 0 0 1-1.5 1H10l-3.5 3-1.5-3h-2z"/>
    </svg>
);


export function Footer() {
    const { content, isLoading } = useContent();
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const { footer: textContent } = content;
    
    const socialIcons = {
        email: <Mail className="h-6 w-6" />,
        whatsapp: <WhatsAppIcon className="h-6 w-6" />,
        instagram: <Instagram className="h-6 w-6" />,
        discord: <DiscordIcon className="h-6 w-6" />,
        github: <Github className="h-6 w-6" />,
        linkedin: <Linkedin className="h-6 w-6" />
    };

    return (
        <footer className="bg-card border-t">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 text-center md:grid-cols-3 md:text-left md:px-6">
                <div className="flex flex-col items-center md:items-start">
                    <Logo />
                    {isLoading ? (
                        <div className="mt-4 w-48 h-4 bg-muted/50 rounded animate-pulse" />
                    ) : (
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">{textContent.tagline}</p>
                    )}
                </div>

                <div />

                <div className="flex flex-col items-center md:items-end">
                    <h3 className="font-headline text-lg font-semibold uppercase tracking-wider">Connect With Us</h3>
                    <div className="mt-4 flex items-center justify-center gap-4 md:justify-end">
                        {isLoading ? (
                            Array.from({length: 4}).map((_, i) => <div key={i} className="h-6 w-6 bg-muted/50 rounded-full animate-pulse" />)
                        ) : (
                            textContent.socialLinks.map(link => {
                                const socialIcon = socialIcons[link.platform as keyof typeof socialIcons];
                                const linkLabel = link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
                                const href = link.platform === 'email' ? `mailto:${link.href}` : link.href;

                                return(
                                    <a key={link.id} href={href} aria-label={linkLabel} className="text-muted-foreground transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
                                        {socialIcon}
                                    </a>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-card/50">
                 <div className="container mx-auto flex flex-col items-center justify-between px-4 py-4 sm:flex-row md:px-6">
                    <p className="text-center text-sm text-muted-foreground">&copy; {year} CyberHive Hub. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

    

    
