
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ArrowLeft, Instagram, Phone } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { notFound } from 'next/navigation';
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function TeamDetailPage() {
  const { content, isLoading } = useContent();
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading team details...</div>;
  }
  
  const { teams } = content;
  const team = teams.find(t => t.id === parseInt(teamId, 10));

  if (!team) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold uppercase tracking-wider text-primary sm:text-5xl">{team.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{team.description}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
            {team.members.length > 0 ? (
                team.members.map((member) => (
                    <Card 
                        key={member.id}
                        className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-primary/20"
                    >
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-start gap-8">
                            <Avatar className="h-40 w-40 border-4 border-secondary flex-shrink-0 bg-muted">
                                <AvatarImage src={transformGoogleDriveUrl(member.imageUrl)} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3 text-center md:text-left">
                                <div className="mb-2 -mt-2">
                                    <h2 className="text-2xl font-headline font-bold text-primary -mb-1">{member.name}</h2>
                                    <p className="font-semibold text-foreground/80">{member.role}</p>
                                </div>
                                <p className="text-sm text-muted-foreground pt-2 max-w-prose mx-auto md:mx-0 line-clamp-3">{member.bio}</p>
                                <div className="flex justify-center md:justify-start items-center gap-4 pt-2">
                                    <a href={`mailto:${member.contact.email}`} className="text-muted-foreground hover:text-primary"><Mail className="h-6 w-6" /></a>
                                    {member.contact.phone && <a href={`tel:${member.contact.phone}`} className="text-muted-foreground hover:text-primary"><Phone className="h-6 w-6" /></a>}
                                    <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-6 w-6" /></a>
                                    <a href={member.contact.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github className="h-6 w-6" /></a>
                                    {member.contact.instagram && <a href={member.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></a>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-muted-foreground">This team doesn't have any members yet.</p>
                    </CardContent>
                </Card>
             )}
        </div>

         <div className="text-center mt-12">
             <Button asChild variant="outline">
                <Link href="/about#team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to About Page</Link>
            </Button>
         </div>
    </div>
  );
}
