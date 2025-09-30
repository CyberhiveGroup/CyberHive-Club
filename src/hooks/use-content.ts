
'use client';

import * as React from 'react';
import type { Team, CSLClass, Event, Resource, FooterContent } from '@/lib/types';
import { useToast } from './use-toast';

// Define the shape of the entire content object
interface ContentShape {
    teams: Team[];
    cslClasses: CSLClass[];
    upcomingEvents: Event[];
    pastEvents: Event[];
    resources: Resource[];
    footer: FooterContent;
    home: { [key: string]: string };
    about: { [key: string]: string };
    contact: { [key: string]: string };
    aboutImages: {
        missionImageUrl: string;
        carouselUrls: { url: string; alt: string; hint: string }[];
    };
}


const CONTENT_STORAGE_KEY = 'siteContent';

type ContentType = ContentShape | null;

export function useContent() {
    const { toast } = useToast();
    const [content, setContent] = React.useState<ContentType>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Fetch content from the API on mount
    React.useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content');
                if (!response.ok) {
                    throw new Error('Failed to fetch content');
                }
                const data = await response.json();
                setContent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                toast({
                    title: "Error Loading Content",
                    description: "Could not load site content. Please try again later.",
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [toast]);

    const saveContent = React.useCallback(async (newContent: ContentType) => {
        if (!newContent) return;
        
        // Optimistic update
        const previousContent = content;
        setContent(newContent);

        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContent),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save content');
            }
            
            toast({
                title: "Content Saved",
                description: "Your changes have been saved successfully.",
            });

        } catch (err) {
            // Revert on failure
            setContent(previousContent);
            toast({
                title: "Error Saving Content",
                description: err instanceof Error ? err.message : 'An unknown error occurred',
                variant: 'destructive',
            });
        }
    }, [content, toast]);


    return { content, setContent: saveContent, isLoading, error };
}
