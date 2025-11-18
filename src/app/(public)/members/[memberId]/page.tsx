
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ArrowLeft, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { notFound } from 'next/navigation';
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function MemberDetailPage() {
  const { content, isLoading } = useContent();
  const params = useParams();
  const router = useRouter();
  const memberId = params.memberId as string;
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading member details...</div>;
  }
  
  const { teams } = content;
  const member = teams.flatMap(t => t.members).find(m => m.id === parseInt(memberId, 10));
  const team = teams.find(t => t.members.some(m => m.id === parseInt(memberId, 10)));

  if (!member) {
    return notFound();
  }

  const transformedImageUrl = member.imageUrl ? transformGoogleDriveUrl(member.imageUrl) : '';

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 h-32" />
            <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-8 -mt-20">
                <Avatar className="h-40 w-40 border-4 border-background flex-shrink-0 bg-background">
                    {transformedImageUrl && <AvatarImage src={transformedImageUrl} alt={member.name} />}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4 text-center md:text-left pt-4">
                    <div>
                        <h1 className="text-4xl font-headline font-bold text-primary">{member.name}</h1>
                        <p className="text-xl font-semibold text-foreground/80">{member.role}</p>
                        {team && <p className="text-md text-muted-foreground">Part of the {team.name}</p>}
                    </div>
                    <p className="text-muted-foreground pt-2">{member.bio}</p>
                    <div className="space-y-2 pt-2 flex flex-col items-center md:items-start">
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
                         {member.contact.instagram && (
                            <a href={member.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-4 w-4" />
                                <span>Instagram Profile</span>
                            </a>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <div className="text-center mt-12">
            <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
        </div>
      </div>
    </div>
  );
}
