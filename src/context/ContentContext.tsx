
'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, Firestore } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Team, CSLClass, Event, Resource, FooterContent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
  saveContent: (newContent: AppContent) => Promise<void>;
  setContent: React.Dispatch<React.SetStateAction<AppContent>>;
}

const defaultContent: AppContent = {
  "home": {
    "heroTitle": "CyberHive",
    "heroSubtitle": "Your Gateway to the World of Cybersecurity. Learn, Collaborate, and Conquer.",
    "centralTitle": "Explore the Hive",
    "centralSubtitle": "Navigate through our core sections. Whether you're here to learn, compete, or connect, you'll find your place in the hive.",
    "eventsTitle": "Upcoming Events",
    "eventsSubtitle": "Stay ahead of the curve. Join our workshops, talks, and competitions.",
    "aboutTitle": "Who We Are",
    "aboutParagraph": "CyberHive is a student-run organization dedicated to fostering a vibrant cybersecurity community. We aim to provide a platform for students to learn, share knowledge, and develop practical skills in the ever-evolving field of cybersecurity. Our mission is to bridge the gap between theoretical knowledge and real-world application.",
    "cslTitle": "Cyber Siksha Lab (CSL)",
    "cslParagraph": "Our Cyber Siksha Lab offers a structured learning path with hands-on classes. From foundational concepts to advanced techniques, CSL is designed to build your skills from the ground up. Join our classes to gain practical experience and prepare for a career in cybersecurity.",
    "cslImageUrl": "https://picsum.photos/seed/csl/600/400"
  },
  "about": {
    "title": "About CyberHive",
    "subtitle": "We are a passionate community of cybersecurity enthusiasts, dedicated to learning, collaboration, and innovation.",
    "missionTitle": "Our Mission",
    "missionParagraph": "To cultivate a dynamic and inclusive environment where students can explore the vast field of cybersecurity. We empower our members with hands-on learning, mentorship from peers and professionals, and opportunities to compete and network. We strive to be the central hub for aspiring cybersecurity experts, bridging academic knowledge with practical, real-world skills.",
    "teamTitle": "Meet the Hive Mind",
    "teamSubtitle": "The dedicated individuals leading the charge and keeping the hive buzzing with activity."
  },
  "aboutImages": {
    "missionImageUrl": "https://picsum.photos/seed/mission/600/400",
    "carouselUrls": [
      { "url": "https://picsum.photos/seed/about1/600/300", "alt": "Team working together", "hint": "collaboration students" },
      { "url": "https://picsum.photos/seed/about2/600/300", "alt": "Cybersecurity workshop", "hint": "tech workshop" },
      { "url": "https://picsum.photos/seed/about3/600/300", "alt": "Student presentation", "hint": "student presentation" }
    ]
  },
  "contact": {
    "title": "Get in Touch",
    "subtitle": "Have questions, suggestions, or want to collaborate? We'd love to hear from you. Reach out through any of our channels.",
    "email": "cyberhive@ggits.org",
    "address": "Gyan Ganga Institute of Technology & Sciences, Jabalpur, Madhya Pradesh, India"
  },
  "teams": [],
  "cslClasses": [],
  "upcomingEvents": [],
  "pastEvents": [],
  "resources": [],
  "footer": {
    "tagline": "Building the next generation of cybersecurity experts.",
    "copyright": "© {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.",
    "quickLinks": [],
    "socialLinks": []
  }
};


export const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  isLoading: true,
  error: null,
  saveContent: async () => {},
  setContent: () => {},
});

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<AppContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    setIsLoading(true);
    const contentRef = doc(firestore, 'content', 'site');

    const unsubscribe = onSnapshot(
      contentRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          setContent(docSnap.data() as AppContent);
        } else {
          // No need to create the document here, rely on security rules and manual setup.
          console.warn("Content document does not exist. Please create it in the Firebase console.");
          setContent(defaultContent);
        }
        setError(null);
        setIsLoading(false);
      },
      (err: any) => {
        console.error("Firestore snapshot error:", err);
        setError('Could not load site content in real-time. Displaying last known content.');
        toast({
          title: "Real-time Update Error",
          description: err.message || 'Could not connect for real-time updates.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, toast]);
  
  const saveContent = useCallback(async (newContent: AppContent) => {
    if (!firestore) {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Firestore is not available.",
        });
        return;
    }
    const contentRef = doc(firestore, 'content', 'site');
    
    setDoc(contentRef, newContent, { merge: true }).then(() => {
      toast({
          title: "Success!",
          description: "Your changes have been saved.",
      });
    }).catch(async (serverError: any) => {
      const permissionError = new FirestorePermissionError({
          path: contentRef.path,
          operation: 'update',
          requestResourceData: newContent,
      });

      errorEmitter.emit('permission-error', permissionError);
    });
  }, [firestore, toast]);


  return (
    <ContentContext.Provider value={{ content, setContent, isLoading, error, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
};
