
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { transformGoogleDriveUrl } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function CSLClassDetailPage() {
  const { content, isLoading } = useContent();
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading class details...</div>;
  }

  const cslClass = content.cslClasses.find(c => c.id === parseInt(classId, 10));

  if (!cslClass) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <Button onClick={() => router.back()} variant="outline" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to CSL Classes
      </Button>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary sm:text-5xl">{cslClass.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{cslClass.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-primary">About this Class</h2>
            <p className="text-lg text-foreground/80 whitespace-pre-wrap">{cslClass.longDescription}</p>
          </div>
          
          <div>
            {(cslClass.gallery && cslClass.gallery.length > 0) ? (
              <Carousel
                className="w-full"
                plugins={[plugin.current]}
                opts={{ loop: true }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {cslClass.gallery.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <Image
                            key={transformGoogleDriveUrl(image.url)}
                            src={transformGoogleDriveUrl(image.url)}
                            alt={image.alt || 'Gallery image'}
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
            ) : (
                <Card className="flex aspect-video items-center justify-center p-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                        key={transformGoogleDriveUrl(cslClass.imageUrl)}
                        src={transformGoogleDriveUrl(cslClass.imageUrl)}
                        alt={cslClass.title}
                        width={600}
                        height={400}
                        data-ai-hint={cslClass.imageHint}
                        className="object-cover w-full h-full"
                    />
                </Card>
            )}
          </div>
        </div>
        
        {(cslClass.links && cslClass.links.length > 0) && (
            <div className="mt-12">
                <Separator className="my-12" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cslClass.links.map(link => (
                        <Link key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                             <Card className="h-full group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
                                <CardHeader className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors duration-300">
                                            <LinkIcon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                        </div>
                                        <CardTitle className="text-base">{link.title}</CardTitle>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
