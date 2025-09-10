
'use client';

import * as React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function TeamMemberPage({ params }: { params: { memberId: string } }) {
  const { content, isLoading } = useContent();
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading member details...</div>;
  }
  
  const member = content.teamMembers.find(m => m.id === parseInt(params.memberId));

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative aspect-[3/4]">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                data-ai-hint={member.imageHint}
                className="object-cover"
              />
            </div>
          </Card>
          <div className="space-y-4">
             <h3 className="font-headline text-2xl font-bold uppercase tracking-wider text-primary">Contact</h3>
             <div className="space-y-2">
                <a href={`mailto:${member.contact.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                    <span>{member.contact.email}</span>
                </a>
                 <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                </a>
                 <a href={member.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                </a>
             </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-headline font-bold uppercase tracking-wider text-primary sm:text-5xl">{member.name}</h1>
            <p className="text-2xl font-semibold text-foreground/80 mt-1">{member.role}</p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
             <h3 className="font-headline text-2xl font-bold uppercase tracking-wider text-primary">About</h3>
            <p className="text-muted-foreground">{member.bio}</p>
          </div>

          <Button asChild className="mt-6">
            <Link href="/about#team">Back to Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
