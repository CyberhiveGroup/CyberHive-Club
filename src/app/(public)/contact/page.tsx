
'use client';

import * as React from 'react';
import { Mail, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/hooks/use-content';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-.816-.52.05-.67.05-.371.025-1.04.516-.767.767-1.04 1.04c-.273.273-.546.57-.546 1.04s.273 1.213.323 1.288c.05.075.248.371.744.867.497.497 1.213 1.016 2.059 1.498.845.482 1.498.606 2.059.606.561 0 1.04-.05 1.547-.323.508-.273.867-.767.992-1.04.125-.273.125-.52.075-.67s-.173-.248-.273-.323z M12.04 2A10 10 0 0 0 2 12.04c0 3.313 1.705 6.22 4.314 7.973L2 22l2.12-4.144A9.94 9.94 0 0 0 12.04 22 10 10 0 0 0 12.04 2z"/>
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
                                {React.cloneElement(socialIcon, { className: "h-8 w-8" })}
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
                             {React.cloneElement(socialIcon, { className: "h-8 w-8" })}
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

    