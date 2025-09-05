
'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Calendar, Users, HomeIcon, BookOpen, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { upcomingEvents } from "@/lib/data";
import { RoamingBee } from "@/components/roaming-bee";
import { InteractiveHexagon, type HexagonItem } from "@/components/interactive-hexagon";
import { HoneycombBackground } from "@/components/honeycomb-background";
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

const navItems: HexagonItem[] = [
    { href: "/about", icon: <Users />, title: "About Us" },
    { href: "/events", icon: <Calendar />, title: "Events" },
    { href: "/csl-classes", icon: <BookOpen />, title: "CSL" },
    { href: "/resources", icon: <Shield />, title: "Resources" },
    { href: "/contact", icon: <Mail />, title: "Contact" },
    { href: "#", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M6.5 8.5c.9-1.2 2.1-2 3.5-2s2.6.8 3.5 2"/><path d="m14 14-2 2-2-2"/><path d="M14 18H9a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.5 15.5-1-1"/><path d="m18.5 14.5-1 1"/></svg>, title: "Join" },
];


export default function Home() {
  const [isRevealed, setIsRevealed] = React.useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };
  
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
              <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl hover:animate-buzz">
                Welcome to CyberHive
              </h1>
              <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                The premier cybersecurity club for students. We are a community of aspiring security professionals, learning, sharing, and building the future of digital defense.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold uppercase tracking-wider">
                  <Link href="/csl-classes">Explore CSL Classes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hexagonal Navigation Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">CyberHive Central</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Click the hive to explore.
              </p>
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
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Don't miss out on our next big thing. See what's on the horizon.
              </p>
            </div>
            <div className="text-center text-2xl font-headline text-muted-foreground">
              Coming Soon
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="uppercase tracking-wider">
                <Link href="/events">View Past Events <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us & CSL Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl text-primary">About The Hive</h2>
                <p className="text-muted-foreground">
                  CyberHive is more than a club; it's a community united by a passion for cybersecurity. We bridge the gap between academic theory and real-world application by providing hands-on training, competitive events, and connections with industry professionals.
                </p>
                <Button asChild size="lg" variant="secondary" className="uppercase tracking-wider">
                  <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl text-primary">CSL Classes</h2>
                <p className="text-muted-foreground">
                  Our Cybersecurity Leadership (CSL) classes are designed to level up your skills. From beginner to advanced, our comprehensive curriculum covers everything from ethical hacking and network defense to malware analysis and web security.
                </p>
                 <Button asChild size="lg" className="uppercase tracking-wider">
                  <Link href="/csl-classes">Explore CSL Classes <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
