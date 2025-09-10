
'use client';

import * as React from 'react';
import { Mail, MapPin, Github, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/hooks/use-content';

export default function ContactPage() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading content...</div>;
    }

    const { contact: textContent, footer: footerContent } = content;

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
                {footerContent.socialLinks.map(link => (
                    <Link key={link.id} href={link.href} aria-label={link.platform} className="text-muted-foreground transition-colors hover:text-primary">
                        {
                            {
                                email: <Mail className="h-8 w-8" />,
                                whatsapp: <MessageCircle className="h-8 w-8" />,
                                instagram: <Instagram className="h-8 w-8" />,
                                twitter: <Twitter className="h-8 w-8" />,
                                github: <Github className="h-8 w-8" />,
                                linkedin: <Linkedin className="h-8 w-8" />
                            }[link.platform]
                        }
                    </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
