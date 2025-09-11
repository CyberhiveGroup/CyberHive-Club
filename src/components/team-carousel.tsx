
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Team } from '@/lib/types';
import { Users } from 'lucide-react';

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
    return (
        <Card className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-primary/20 h-full flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                 <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <Users className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="font-headline text-2xl uppercase">{team.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription>{team.description}</CardDescription>
            </CardContent>
        </Card>
    );
};


export function TeamCarousel() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="text-center py-10">Loading teams...</div>;
    }
    
    const { teams } = content;

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
                    {teams.map((team) => (
                        <CarouselItem key={team.id} className="md:basis-1/2 lg:basis-1/3">
                           <div className="p-1 h-full">
                                <Link href={`/team/${team.id}`}>
                                    <TeamCard team={team} />
                                </Link>
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
