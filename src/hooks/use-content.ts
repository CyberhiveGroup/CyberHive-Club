
'use client';

import * as React from 'react';
import {
    teamData as initialTeamData,
    cslClasses as initialCslClasses,
    upcomingEvents as initialUpcomingEvents,
    pastEvents as initialPastEvents,
    resources as initialResources,
    footerContent as initialFooterContent,
} from '@/lib/data';
import { useToast } from './use-toast';

const initialTextContent = {
    home: {
        heroTitle: 'Welcome to CyberHive',
        heroSubtitle: 'The premier cybersecurity club for students. We are a community of aspiring security professionals, learning, sharing, and building the future of digital defense.',
        centralTitle: 'CyberHive Central',
        centralSubtitle: 'Click the hive to explore.',
        eventsTitle: 'Upcoming Events',
        eventsSubtitle: 'Don\'t miss out on our next big thing. See what\'s on the horizon.',
        aboutTitle: 'About The Hive',
        aboutParagraph: 'CyberHive is more than a club; it\'s a community united by a passion for cybersecurity. We bridge the gap between academic theory and real-world application by providing hands-on training, competitive events, and connections with industry professionals.',
        cslTitle: 'CSL Classes',
        cslParagraph: 'Our Cybersecurity Leadership (CSL) classes are designed to level up your skills. From beginner to advanced, our comprehensive curriculum covers everything from ethical hacking and network defense to malware analysis and web security.'
    },
    about: {
        title: 'About CyberHive',
        subtitle: 'We are more than just a club; we are a community united by a passion for cybersecurity.',
        missionTitle: 'Our Mission',
        missionParagraph: "CyberHive is dedicated to fostering a collaborative environment for students to explore the vast field of cybersecurity. We aim to bridge the gap between academic knowledge and real-world application by providing hands-on training, hosting competitive events, and connecting members with industry professionals. Our goal is to empower the next generation of cybersecurity leaders with the skills, knowledge, and network to succeed.",
        teamTitle: 'Meet the Teams',
        teamSubtitle: 'The specialized groups that make up the hive mind.'
    },
    contact: {
        title: 'Get In Touch',
        subtitle: "Have a question, suggestion, or want to partner with us? We'd love to hear from you.",
        email: "cyberhive@ggits.org",
        address: "Gyan Ganga Institute of Technology and Sciences, Jabalpur M.P., India"
    }
};

const initialImages = {
    aboutImages: {
        missionImageUrl: "https://picsum.photos/800/600?random=20",
        carouselUrls: [
            { url: "https://picsum.photos/seed/ch-about1/800/600", alt: "CyberHive team working together", hint: "team collaboration" },
            { url: "https://picsum.photos/seed/ch-about2/800/600", alt: "Students in a workshop", hint: "learning workshop" },
            { url: "https://picsum.photos/seed/ch-about3/800/600", alt: "Cybersecurity competition event", hint: "hacking competition" },
            { url: "https://picsum.photos/seed/ch-about4/800/600", alt: "Networking with professionals", hint: "professional networking" },
        ]
    }
};


export const initialContent = {
    teams: initialTeamData,
    cslClasses: initialCslClasses,
    upcomingEvents: initialUpcomingEvents,
    pastEvents: initialPastEvents,
    resources: initialResources,
    footer: initialFooterContent,
    ...initialTextContent,
    ...initialImages
};

type ContentType = typeof initialContent;

export function useContent() {
    const [content, setContentState] = React.useState<ContentType>(initialContent);
    const [isLoading, setIsLoading] = React.useState(true);
    const { toast } = useToast();

    const setContent = React.useCallback((newContent: ContentType | ((prevState: ContentType) => ContentType)) => {
        setContentState(prev => {
            const updatedContent = typeof newContent === 'function' ? newContent(prev) : newContent;
            
            // Debounced save
            const timer = setTimeout(() => {
                fetch('/api/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedContent),
                }).then(res => res.json()).then(data => {
                    if (data.success) {
                       // Silently succeed
                    } else {
                        toast({
                            title: "Save Error",
                            description: "There was an error saving your changes.",
                            variant: "destructive"
                        })
                    }
                }).catch(() => {
                    toast({
                        title: "Network Error",
                        description: "Could not connect to the server to save changes.",
                        variant: "destructive"
                    })
                });
            }, 1000); // 1-second debounce

            // Clear previous timer to debounce
            const oldTimer = (window as any).saveContentTimer;
            if (oldTimer) {
                clearTimeout(oldTimer);
            }
            (window as any).saveContentTimer = timer;

            return updatedContent;
        });

    }, [toast]);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                     const mergedContent = {
                        ...initialContent,
                        ...data,
                        home: { ...initialContent.home, ...data.home },
                        about: { ...initialContent.about, ...data.about },
                        contact: { ...initialContent.contact, ...data.contact },
                        aboutImages: { ...initialContent.aboutImages, ...data.aboutImages },
                        footer: { ...initialContent.footer, ...data.footer },
                    };
                    setContentState(mergedContent);
                } else {
                    setContentState(initialContent);
                }
            })
            .catch(error => {
                console.error("Failed to fetch content from API", error);
                setContentState(initialContent); // Fallback to initial content
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { content, setContent, isLoading, initialContent };
}
