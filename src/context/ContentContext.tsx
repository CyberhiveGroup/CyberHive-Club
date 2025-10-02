
'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, Firestore } from 'firebase/firestore';
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
    if (!firestore) return;

    setIsLoading(true);
    const contentRef = doc(firestore, 'content', 'site');

    const unsubscribe = onSnapshot(
      contentRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          setContent(docSnap.data() as AppContent);
        } else {
          // If the document doesn't exist, create it with default content
          try {
            await setDoc(contentRef, defaultContent);
            setContent(defaultContent);
            toast({
              title: "Content Initialized",
              description: "Your website content has been created in the database.",
            });
          } catch (e: any) {
             console.error("Error creating content document:", e);
             setError('Could not initialize site content.');
             toast({
                title: "Error Initializing Content",
                description: e.message || 'Could not create content document.',
                variant: 'destructive'
            });
          }
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
        // Fallback to static content on error
        setContent(defaultContent);
      }
    );

    // Cleanup subscription on unmount
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
    
    setDoc(contentRef, newContent, { merge: true })
      .then(() => {
        toast({
            title: "Success!",
            description: "Your changes have been saved.",
        });
        // No need to optimistically update state, onSnapshot will do it
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
