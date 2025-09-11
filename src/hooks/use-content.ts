
'use client';

import * as React from 'react';
import {
    leadershipTeam as initialLeadershipTeam,
    teamMembers as initialTeamMembers,
    cslClasses as initialCslClasses,
    upcomingEvents as initialUpcomingEvents,
    pastEvents as initialPastEvents,
    resources as initialResources,
    footerContent as initialFooterContent,
} from '@/lib/data';

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
        teamTitle: 'Meet the Team',
        teamSubtitle: 'The leadership behind the hive mind.'
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
    leadershipTeam: initialLeadershipTeam,
    teamMembers: initialTeamMembers,
    cslClasses: initialCslClasses,
    upcomingEvents: initialUpcomingEvents,
    pastEvents: initialPastEvents,
    resources: initialResources,
    footer: initialFooterContent,
    ...initialTextContent,
    ...initialImages
};

const CONTENT_STORAGE_KEY = 'siteContent';

type ContentType = typeof initialContent;

export function useContent() {
    const [content, setContent] = React.useState<ContentType>(initialContent);
    const [isLoading, setIsLoading] = React.useState(true);

    // Load content from localStorage on mount
    React.useEffect(() => {
        try {
            const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
            if (savedContent) {
                // Deep merge to handle cases where new fields are added to initialContent
                const parsed = JSON.parse(savedContent);
                const mergedContent = {
                    ...initialContent,
                    ...parsed,
                    home: { ...initialContent.home, ...parsed.home },
                    about: { ...initialContent.about, ...parsed.about },
                    contact: { ...initialContent.contact, ...parsed.contact },
                    aboutImages: { ...initialContent.aboutImages, ...parsed.aboutImages },
                    footer: { ...initialContent.footer, ...parsed.footer },
                };
                setContent(mergedContent);
            }
        } catch (error) {
            console.error("Failed to parse content from localStorage", error);
            // Fallback to initial content if parsing fails
            setContent(initialContent);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save content to localStorage whenever it changes
    React.useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
            } catch (error) {
                console.error("Failed to save content to localStorage", error);
            }
        }
    }, [content, isLoading]);

    return { content, setContent, isLoading, initialContent };
}
