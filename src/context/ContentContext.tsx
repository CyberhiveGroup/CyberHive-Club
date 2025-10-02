
'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Team, CSLClass, Event, Resource, FooterContent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import staticContent from '@/lib/data.json';

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

const defaultContent: AppContent = staticContent;


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
    const loadContent = async () => {
        if (!firestore) return;
        setIsLoading(true);
        try {
            const contentRef = doc(firestore, 'content', 'site');
            const docSnap = await getDoc(contentRef);

            if (docSnap.exists()) {
                setContent(docSnap.data() as AppContent);
            } else {
                // If the document doesn't exist, create it with default content from data.json
                await setDoc(contentRef, defaultContent);
                setContent(defaultContent);
                 toast({
                    title: "Content Initialized",
                    description: "Your website content has been saved to the database.",
                });
            }
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError('Could not load site content. Please try again later.');
            toast({
                title: "Error Loading Content",
                description: err.message || 'Could not load site content. Displaying default content.',
                variant: 'destructive'
            });
            // Fallback to static content on error
            setContent(defaultContent);
        } finally {
            setIsLoading(false);
        }
    };
    loadContent();
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
    
    setDoc(contentRef, newContent, { merge: true })
      .then(() => {
        toast({
            title: "Success!",
            description: "Your changes have been saved.",
        });
        // Optimistically update the state
        setContent(newContent);
      })
      .catch((serverError) => {
        console.error(serverError);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: serverError.message || "Could not save changes.",
        });
        errorEmitter.emit('permission-error', {
          path: contentRef.path,
          operation: 'update',
          requestResourceData: newContent,
        });
      });
  }, [firestore, toast]);


  return (
    <ContentContext.Provider value={{ content, setContent, isLoading, error, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
};
