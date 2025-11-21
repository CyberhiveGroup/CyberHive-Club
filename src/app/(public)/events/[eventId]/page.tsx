
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
  const event = [...upcomingEvents, ...pastEvents].find(e => String(e.id) === eventId);

  if (!event) {
    return notFound();
  }
  
  const eventImages = event.gallery && event.gallery.length > 0 ? event.gallery : [{ url: event.imageUrl, alt: event.title, hint: event.imageHint }];

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <Button onClick={() => router.back()} variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
                <h1 className="text-4xl font-headline font-bold text-primary sm:text-5xl">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    <span>{event.category}</span>
                    </div>
                </div>
                <p className="text-lg text-foreground/80 mt-2 whitespace-pre-wrap">{event.description}</p>
            </div>
            
            <div>
                 <Carousel
                    className="w-full"
                    plugins={[plugin.current]}
                    opts={{ loop: eventImages.length > 1 }}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {eventImages.map((image, index) => (
                            <CarouselItem key={index}>
                                 <Card className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <Image
                                            key={image.url}
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
                    {eventImages.length > 1 && <>
                        <CarouselPrevious className="absolute left-4" />
                        <CarouselNext className="absolute right-4" />
                    </>}
                </Carousel>
            </div>
        </div>
      </div>
    </div>
  );
}
