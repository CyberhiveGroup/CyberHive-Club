
'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useContent } from '@/hooks/use-content';

export default function AboutPage() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading content...</div>;
    }

    const { teamMembers, about: textContent, aboutImages } = content;
    
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center">
         <h1 className="text-4xl font-headline font-bold uppercase tracking-wider text-primary sm:text-5xl md:text-6xl">{textContent.title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">{textContent.subtitle}</p>
      </section>

      <section className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
           <h2 className="text-3xl font-headline font-bold text-primary uppercase">{textContent.missionTitle}</h2>
          <p className="text-muted-foreground">{textContent.missionParagraph}</p>
        </div>
        <div className="relative group">
          <Image
            src={aboutImages.missionImageUrl}
            alt="CyberHive team working together"
            width={800}
            height={600}
            data-ai-hint="team collaboration"
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="mt-20">
        <div className="text-center">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">{textContent.teamTitle}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{textContent.teamSubtitle}</p>
        </div>

        <div className="mt-16 relative">
          <div className="honeycomb-team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="honeycomb-cell-team group">
                <div className="honeycomb-cell-team-inner">
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name}
                    width={300}
                    height={350}
                    data-ai-hint={member.imageHint}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                    <h3 className="font-headline text-xl font-bold uppercase">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
