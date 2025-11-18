
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function EventDetailPage() {
  const { content, isLoading } = useContent();
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

   const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading event details...</div>;
  }

  const { upcomingEvents, pastEvents } = content;
  const event = [...upcomingEvents, ...pastEvents].find(e => e.id === parseInt(eventId, 10));

  if (!event) {
    return notFound();
  }
  
  const isPastEvent = pastEvents.some(e => e.id === event?.id);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <Button onClick={() => router.back()} variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
                <h1 className="text-4xl font-headline font-bold text-primary sm:text-5xl">{event.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    <span>{event.category}</span>
                    </div>
                </div>
                <p className="text-lg text-foreground/80 mt-8 whitespace-pre-wrap">{event.description}</p>
            </div>
            
            <div>
                {(isPastEvent && event.gallery && event.gallery.length > 0) ? (
                <div>
                    <h2 className="text-3xl font-headline font-bold mb-6 text-primary">Gallery</h2>
                     <Carousel
                        className="w-full"
                        plugins={[plugin.current]}
                        opts={{ loop: true }}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {event.gallery.map((image, index) => (
                                <CarouselItem key={index}>
                                     <Card className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <Image
                                                src={transformGoogleDriveUrl(image.url)}
                                                alt={image.alt}
                                                width={600}
                                                height={400}
                                                data-ai-hint={image.hint}
                                                className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4" />
                        <CarouselNext className="absolute right-4" />
                    </Carousel>
                </div>
                ) : (
                    <Card className="flex aspect-video items-center justify-center p-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                            src={transformGoogleDriveUrl(event.imageUrl)}
                            alt={event.title}
                            width={600}
                            height={400}
                            data-ai-hint={event.imageHint}
                            className="object-cover w-full h-full"
                        />
                    </Card>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
