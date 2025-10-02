
'use client';

import React, { createContext, useState, useEffect } from 'react';
import type { Team, CSLClass, Event, Resource, FooterContent } from '@/lib/types';
import { teamData, cslClasses, upcomingEvents, pastEvents, resources, footerContent } from '@/lib/data';

interface AppContent {
    home: any;
    about: any;
    aboutImages: any;
    contact: any;
    teams: Team[];
    cslClasses: CSLClass[];
    upcomingEvents: Event[];
    pastEvents: Event[];
    resources: Resource[];
    footer: FooterContent;
}

export interface ContentContextType {
  content: AppContent;
  isLoading: boolean;
  error: string | null;
}

const defaultContent: AppContent = {
    home: {
        heroTitle: "CyberHive",
        heroSubtitle: "Your Gateway to the World of Cybersecurity. Learn, Collaborate, and Conquer.",
        centralTitle: "Explore the Hive",
        centralSubtitle: "Navigate through our core sections. Whether you're here to learn, compete, or connect, you'll find your place in the hive.",
        eventsTitle: "Upcoming Events",
        eventsSubtitle: "Stay ahead of the curve. Join our workshops, talks, and competitions.",
        aboutTitle: "Who We Are",
        aboutParagraph: "CyberHive is a student-run organization dedicated to fostering a vibrant cybersecurity community. We aim to provide a platform for students to learn, share knowledge, and develop practical skills in the ever-evolving field of cybersecurity. Our mission is to bridge the gap between theoretical knowledge and real-world application.",
        cslTitle: "Cyber Siksha Lab (CSL)",
        cslParagraph: "Our Cyber Siksha Lab offers a structured learning path with hands-on classes. From foundational concepts to advanced techniques, CSL is designed to build your skills from the ground up. Join our classes to gain practical experience and prepare for a career in cybersecurity."
    },
    about: {
        title: "About CyberHive",
        subtitle: "We are a passionate community of cybersecurity enthusiasts, dedicated to learning, collaboration, and innovation.",
        missionTitle: "Our Mission",
        missionParagraph: "To cultivate a dynamic and inclusive environment where students can explore the vast field of cybersecurity. We empower our members with hands-on learning, mentorship from peers and professionals, and opportunities to compete and network. We strive to be the central hub for aspiring cybersecurity experts, bridging academic knowledge with practical, real-world skills.",
        teamTitle: "Meet the Hive Mind",
        teamSubtitle: "The dedicated individuals leading the charge and keeping the hive buzzing with activity.",
    },
    aboutImages: {
        missionImageUrl: 'https://picsum.photos/seed/mission/600/400',
        carouselUrls: [
            { url: 'https://picsum.photos/seed/about1/600/300', alt: 'Team working together', hint: 'collaboration students' },
            { url: 'https://picsum.photos/seed/about2/600/300', alt: 'Cybersecurity workshop', hint: 'tech workshop' },
            { url: 'https://picsum.photos/seed/about3/600/300', alt: 'Student presentation', hint: 'student presentation' },
        ],
    },
    contact: {
        title: "Get in Touch",
        subtitle: "Have questions, suggestions, or want to collaborate? We'd love to hear from you. Reach out through any of our channels.",
        email: "cyberhive@ggits.org",
        address: "Gyan Ganga Institute of Technology & Sciences, Jabalpur, Madhya Pradesh, India",
    },
    teams: teamData,
    cslClasses: cslClasses,
    upcomingEvents: upcomingEvents,
    pastEvents: pastEvents,
    resources: resources,
    footer: footerContent
};


export const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  isLoading: true,
  error: null,
});

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<AppContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      try {
        setContent(defaultContent);
        setIsLoading(false);
      } catch (e) {
        setError('Failed to load content.');
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <ContentContext.Provider value={{ content, isLoading, error }}>
      {children}
    </ContentContext.Provider>
  );
};
