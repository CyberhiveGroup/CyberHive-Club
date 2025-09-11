
'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function TeamMemberPage() {
  const { content, isLoading } = useContent();
  const params = useParams();
  const memberId = params.memberId as string;
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading team details...</div>;
  }
  
  const { teamMembers } = content;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold uppercase tracking-wider text-primary sm:text-5xl">Our Team</h1>
            <p className="text-lg text-muted-foreground mt-2">The dedicated members of the CyberHive community.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
            {teamMembers.map((member) => (
                <Card 
                    key={member.id} 
                    className={cn(
                        "overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20",
                        member.id === parseInt(memberId, 10) && "ring-2 ring-primary shadow-primary/20"
                    )}
                >
                    <CardContent className="p-6 flex items-center justify-start gap-8">
                        <Avatar className="h-40 w-40 border-4 border-secondary">
                             <AvatarImage src={member.imageUrl} alt={member.name} />
                             <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h2 className="text-2xl font-headline font-bold text-primary">{member.name}</h2>
                                <p className="font-semibold text-foreground/80">{member.role}</p>
                            </div>
                             <p className="text-sm text-muted-foreground pt-2">{member.bio}</p>
                            <div className="space-y-2 pt-2">
                                 <a href={`mailto:${member.contact.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-4 w-4" />
                                    <span>{member.contact.email}</span>
                                </a>
                                 <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin className="h-4 w-4" />
                                    <span>LinkedIn Profile</span>
                                </a>
                                 <a href={member.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="h-4 w-4" />
                                    <span>GitHub Profile</span>
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

         <div className="text-center mt-12">
             <Button asChild>
                <Link href="/about#team">Back to About Page</Link>
            </Button>
         </div>
    </div>
  );
}
