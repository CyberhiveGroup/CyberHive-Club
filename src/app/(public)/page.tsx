
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Users, Calendar, BookOpen, Shield, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { RoamingBee } from "@/components/roaming-bee";
import { InteractiveHexagon, type HexagonItem } from "@/components/interactive-hexagon";
import { HoneycombBackground } from "@/components/honeycomb-background";
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/use-content';
import { transformGoogleDriveUrl } from '@/lib/utils';
import type { Event } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const navItems: HexagonItem[] = [
    { href: "/about", icon: <Users />, title: "About Us" },
    { href: "/events", icon: <Calendar />, title: "Events" },
    { href: "/csl-classes", icon: <BookOpen />, title: "CSL" },
    { href: "/resources", icon: <Shield />, title: "Resources" },
    { href: "/contact", icon: <Mail />, title: "Contact" },
    { href: "#", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M6.5 8.5c.9-1.2 2.1-2 3.5-2s2.6.8 3.5 2"/><path d="m14 14-2 2-2-2"/><path d="M14 18H9a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.5 15.5-1-1"/><path d="m18.5 14.5-1 1"/></svg>, title: "Join" },
];


function EventCard({ event }: { event: Event }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 h-full w-full max-w-sm">
    <Image
        src={transformGoogleDriveUrl(event.imageUrl)}
        alt={event.title}
        width={600}
        height={400}
        data-ai-hint={event.imageHint}
        className="h-48 w-full object-cover"
    />
    <CardHeader>
        <div className="flex justify-between items-start">
        <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
        <Badge variant="secondary">{event.category}</Badge>
        </div>
        <CardDescription>{event.date}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
    </CardContent>
     <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full">
            <Button className="w-full font-bold">
                View Details <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </Link>
    </CardFooter>
    </Card>
  );
}


export default function Home() {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const { content, isLoading } = useContent();

  const handleReveal = () => {
    setIsRevealed(true);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { home: textContent, images, upcomingEvents } = content;
  const eventsToShow = upcomingEvents.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-20 md:pt-32 lg:pt-40 overflow-hidden" onClick={handleReveal}>
           <RoamingBee isRevealed={isRevealed} />
          <HoneycombBackground isRevealed={isRevealed} />
          <div 
            className={cn(
              "absolute inset-0 z-20 transition-opacity duration-1000",
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
            style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 1cm, hsl(var(--background)) 250px)'
            }}
          ></div>
          <div className="container relative mx-auto px-4 md:px-6 text-center z-10 pb-20 md:pb-32 lg:pb-40">
            <div className="max-w-3xl mx-auto">
               <h1
                className="text-4xl font-headline font-extrabold tracking-tighter text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl hover:animate-buzz"
              >
                {textContent.heroTitle}
              </h1>
               <p
                className="mt-4 text-lg text-foreground/80 md:text-xl"
              >
                {textContent.heroSubtitle}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold uppercase tracking-wider">
                  <Link href="/csl-classes">Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hexagonal Navigation Section */}
        <section className="w-full py-12 md:py-24 bg-dot-pattern bg-gradient-to-b from-background to-background relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-16">
               <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">{textContent.centralTitle}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">{textContent.centralSubtitle}</p>
            </div>
            
            <div className="relative w-full flex justify-center items-center h-96">
                <InteractiveHexagon items={navItems} />
            </div>
          </div>
        </section>


        {/* Upcoming Events Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
               <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">{textContent.eventsTitle}</h2>
               <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">{textContent.eventsSubtitle}</p>
            </div>
            
            {eventsToShow.length > 0 ? (
                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                    eventsToShow.length === 1 && "flex justify-center"
                )}>
                    {eventsToShow.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <p className="text-xl">No upcoming events right now. Check back soon!</p>
                </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="uppercase tracking-wider">
                <Link href="/events">View All Events <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us & CSL Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <Card className="flex flex-col">
                <CardHeader>
                  <Image src={transformGoogleDriveUrl(images?.aboutSection?.url || 'https://placehold.co/600x400')} alt={images?.aboutSection?.alt || 'About the hive'} width={600} height={400} data-ai-hint={images?.aboutSection?.hint} className="rounded-lg object-cover aspect-video" />
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter text-primary">{textContent.aboutTitle}</h2>
                  <p className="text-muted-foreground">{textContent.aboutParagraph}</p>
                </CardContent>
                <CardFooter>
                   <Button asChild size="lg" className="uppercase tracking-wider w-full">
                    <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                   <Image src={transformGoogleDriveUrl(images?.cslSection?.url || 'https://placehold.co/600x400')} alt={images?.cslSection?.alt || 'CSL Classes'} width={600} height={400} data-ai-hint={images?.cslSection?.hint} className="rounded-lg object-cover aspect-video" />
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                   <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter text-primary">{textContent.cslTitle}</h2>
                   <p className="text-muted-foreground">{textContent.cslParagraph}</p>
                </CardContent>
                <CardFooter>
                   <Button asChild size="lg" className="uppercase tracking-wider w-full">
                    <Link href="/csl-classes">Explore CSL Classes <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
