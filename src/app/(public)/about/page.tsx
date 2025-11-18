
'use client';

import * as React from 'react';
import Image from "next/image";
import { useContent } from '@/hooks/use-content';
import { TeamCarousel } from '@/components/team-carousel';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function AboutPage() {
    const { content, isLoading } = useContent();
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading content...</div>;
    }

    const { about: textContent, images } = content;
    
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
            <Carousel 
                className="w-full"
                plugins={[plugin.current]}
                opts={{ loop: true }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.aboutCarousel.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-[2/1] items-center justify-center p-0 rounded-lg overflow-hidden">
                                <Image
                                    src={transformGoogleDriveUrl(img.url)}
                                    alt={img.alt}
                                    width={600}
                                    height={300}
                                    data-ai-hint={img.hint}
                                    className="object-cover w-full h-full"
                                />
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
            </Carousel>
        </div>
      </section>

      <section id="team" className="mt-20">
        <div className="text-center">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">{textContent.teamTitle}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{textContent.teamSubtitle}</p>
        </div>

        <TeamCarousel />
      </section>
    </div>
  );
}
