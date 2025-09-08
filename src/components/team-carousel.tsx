
'use client';

import * as React from 'react';
import Image from 'next/image';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { TeamMember } from '@/lib/types';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <Card className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-primary/20">
            <div className="relative aspect-[3/4]">
                <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    data-ai-hint={member.imageHint}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-headline text-3xl font-bold uppercase">{member.name}</h3>
                    <p className="text-primary text-lg">{member.role}</p>
                </div>
            </div>
        </Card>
    );
};


export function TeamCarousel() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="text-center py-10">Loading team...</div>;
    }
    
    const { teamMembers } = content;

    return (
        <div className="mt-16">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {teamMembers.map((member) => (
                        <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3">
                           <div className="p-1">
                                <TeamMemberCard member={member} />
                           </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-14" />
                <CarouselNext className="mr-14" />
            </Carousel>
        </div>
    )
}
