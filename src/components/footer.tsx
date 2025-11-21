
'use client';
import { Logo } from '@/components/logo';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useContent } from '@/hooks/use-content';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={className} viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 -28.5 256 256"
      className={className}
      fill="currentColor"
    >
      <path
        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
        fillRule="nonzero"
      ></path>
    </svg>
);


export function Footer() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return (
            <footer className="bg-card">
                <div className="container mx-auto px-4 py-8 md:px-6">
                    <div className="text-center text-sm text-muted-foreground">
                        Loading footer...
                    </div>
                </div>
            </footer>
        )
    }
    
    const { footer: footerContent } = content;
    const copyrightText = footerContent.copyright.replace('{new Date().getFullYear()}', String(new Date().getFullYear()));
    
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
            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-4">
                        <Logo />
                    </div>
                    <p className="text-sm text-muted-foreground text-center sm:text-left">{footerContent.tagline}</p>
                    <div className="flex items-center gap-4">
                        {footerContent.socialLinks.map(link => {
                             const socialIcon = socialIcons[link.platform as keyof typeof socialIcons];
                             const linkLabel = link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
                             const href = link.platform === 'email' ? `mailto:${link.href}` : link.href;

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
                        })}
                    </div>
                </div>
                <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
                    {copyrightText}
                </div>
            </div>
        </footer>
    )
}

    

    