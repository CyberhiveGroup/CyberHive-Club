
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function AdminHomePage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        setContent(prev => {
            const newState = { ...prev };
            let current: any = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]] = { ...current[keys[i]] };
            }
            current[keys[keys.length - 1]] = value;
            return newState;
        });
    }

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage Home Page</h1>
                 <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="home.heroTitle">Hero Title</Label>
                        <Input 
                            id="home.heroTitle"
                            name="home.heroTitle"
                            value={content.home.heroTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="home.heroSubtitle">Hero Subtitle</Label>
                        <Textarea 
                            id="home.heroSubtitle"
                            name="home.heroSubtitle"
                            value={content.home.heroSubtitle}
                            onChange={handleInputChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Central Navigation Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="home.centralTitle">Title</Label>
                        <Input 
                            id="home.centralTitle"
                            name="home.centralTitle"
                            value={content.home.centralTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="home.centralSubtitle">Subtitle</Label>
                        <Textarea 
                            id="home.centralSubtitle"
                            name="home.centralSubtitle"
                            value={content.home.centralSubtitle}
                            onChange={handleInputChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Upcoming Events Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="home.eventsTitle">Title</Label>
                        <Input 
                            id="home.eventsTitle"
                            name="home.eventsTitle"
                            value={content.home.eventsTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="home.eventsSubtitle">Subtitle</Label>
                        <Textarea 
                            id="home.eventsSubtitle"
                            name="home.eventsSubtitle"
                            value={content.home.eventsSubtitle}
                            onChange={handleInputChange}
                        />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle>About & CSL Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="home.aboutTitle">About Title</Label>
                        <Input 
                            id="home.aboutTitle"
                            name="home.aboutTitle"
                            value={content.home.aboutTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="home.aboutParagraph">About Paragraph</Label>
                        <Textarea 
                            id="home.aboutParagraph"
                            name="home.aboutParagraph"
                            value={content.home.aboutParagraph}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="images.aboutSection.url">About Section Image URL</Label>
                        <div className="flex items-center gap-4">
                            <Image key={content.images?.aboutSection?.url} src={transformGoogleDriveUrl(content.images?.aboutSection?.url || 'https://placehold.co/600x400')} alt={content.images?.aboutSection?.alt || ''} width={120} height={80} className="rounded-md object-cover aspect-video bg-muted"/>
                            <Input 
                                id="images.aboutSection.url"
                                name="images.aboutSection.url"
                                value={content.images?.aboutSection?.url || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="space-y-2">
                        <Label htmlFor="home.cslTitle">CSL Title</Label>
                        <Input 
                            id="home.cslTitle"
                            name="home.cslTitle"
                            value={content.home.cslTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="home.cslParagraph">CSL Paragraph</Label>
                        <Textarea 
                            id="home.cslParagraph"
                            name="home.cslParagraph"
                            value={content.home.cslParagraph}
                            onChange={handleInputChange}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="images.cslSection.url">CSL Section Image URL</Label>
                        <div className="flex items-center gap-4">
                            <Image key={content.images?.cslSection?.url} src={transformGoogleDriveUrl(content.images?.cslSection?.url || 'https://placehold.co/600x400')} alt={content.images?.cslSection?.alt || ''} width={120} height={80} className="rounded-md object-cover aspect-video bg-muted"/>
                            <Input 
                                id="images.cslSection.url"
                                name="images.cslSection.url"
                                value={content.images?.cslSection?.url || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
