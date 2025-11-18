
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { CSLClass } from '@/lib/types';
import { useContent } from '@/hooks/use-content';
import { transformGoogleDriveUrl } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

function CSLClassCard({ cslClass }: { cslClass: CSLClass }) {
  return (
      <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
        <Image
          src={transformGoogleDriveUrl(cslClass.imageUrl)}
          alt={cslClass.title}
          width={600}
          height={400}
          data-ai-hint={cslClass.imageHint}
          className="h-48 w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="font-headline text-xl">{cslClass.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{cslClass.description}</p>
        </CardContent>
        <CardFooter>
            <Link href={`/csl-classes/${cslClass.id}`} className="w-full">
                 <Button className="w-full font-bold">
                    View Details <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </Link>
        </CardFooter>
      </Card>
  )
}

function CSLClassesPageContent() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading classes...</div>;
    }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Cyber Siksha Lab (CSL) Classes
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Level up your skills with our comprehensive CSL curriculum. From beginner to advanced, we have a class for you.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {content.cslClasses.map((cslClass) => (
          <CSLClassCard 
            key={cslClass.id} 
            cslClass={cslClass} 
          />
        ))}
      </div>
    </div>
  );
}


export default function CSLClassesPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CSLClassesPageContent />
    </React.Suspense>
  );
}
