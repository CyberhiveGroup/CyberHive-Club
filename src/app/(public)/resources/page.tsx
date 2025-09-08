
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Download } from "lucide-react";
import Link from 'next/link';
import type { Resource } from '@/lib/types';
import { useContent } from '@/hooks/use-content';

function ResourceCard({ resource }: { resource: Resource }) {
    const Icon = resource.type.includes('PDF') ? FileText : LinkIcon;
    return (
        <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-shrink-0"><Icon className="h-6 w-6 text-primary" /></div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                 <Link href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-primary hover:underline">
                    {resource.type.includes('Link') ? 'Visit Link' : 'Download'}
                    <Download className="ml-2 h-4 w-4" />
                </Link>
            </CardContent>
        </Card>
    )
}

export default function ResourcesPage() {
    const { content, isLoading } = useContent();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading resources...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                    Resources
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
                    A curated collection of tools, guides, and links to aid your cybersecurity journey.
                </p>
            </section>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {content.resources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        resource={resource}
                    />
                ))}
            </div>
        </div>
    );
}
