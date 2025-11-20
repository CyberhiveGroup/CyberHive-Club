
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ImageAsset } from '@/lib/types';
import Image from 'next/image';
import { PlusCircle, Trash2 } from 'lucide-react';
import { transformGoogleDriveUrl } from '@/lib/utils';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

export default function AdminAboutPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;

    const handleAboutTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                [name]: value,
            }
        }));
    };
    
    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    }
    
    const handleCarouselImageChange = (index: number, field: keyof ImageAsset, value: string) => {
        const newCarouselImages = [...(content.images?.aboutCarousel || [])];
        (newCarouselImages[index] as any)[field] = value;
        setContent(prev => ({
            ...prev,
            images: {
                ...prev.images,
                aboutCarousel: newCarouselImages,
            }
        }));
    };

    const addCarouselImage = () => {
        const newImage: ImageAsset = {
            url: `https://picsum.photos/seed/new${Math.random()}/600/300`,
            alt: 'New carousel image',
            hint: 'description'
        };
        const newCarouselImages = [...(content.images?.aboutCarousel || []), newImage];
        setContent(prev => ({
            ...prev,
            images: { ...prev.images, aboutCarousel: newCarouselImages }
        }));
    };

    const deleteCarouselImage = (index: number) => {
        const newCarouselImages = (content.images?.aboutCarousel || []).filter((_, i) => i !== index);
        setContent(prev => ({
            ...prev,
            images: { ...prev.images, aboutCarousel: newCarouselImages }
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage About Page</h1>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader><CardTitle>About Page Content</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={content.about.title} onChange={handleAboutTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Textarea id="subtitle" name="subtitle" value={content.about.subtitle} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="missionTitle">Mission Title</Label>
                        <Input id="missionTitle" name="missionTitle" value={content.about.missionTitle} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="missionParagraph">Mission Paragraph</Label>
                        <Textarea id="missionParagraph" name="missionParagraph" value={content.about.missionParagraph} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="teamTitle">Team Section Title</Label>
                        <Input id="teamTitle" name="teamTitle" value={content.about.teamTitle} onChange={handleAboutTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="teamSubtitle">Team Section Subtitle</Label>
                        <Textarea id="teamSubtitle" name="teamSubtitle" value={content.about.teamSubtitle} onChange={handleAboutTextChange} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About Page Carousel</CardTitle>
                    <CardDescription>Images for the carousel on the About page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {(content.images?.aboutCarousel || []).map((image, index) => (
                        <div key={index} className="p-4 border rounded-lg flex flex-col md:flex-row gap-6 items-start">
                             <Image key={image.url} src={transformGoogleDriveUrl(image.url)} alt={image.alt} width={240} height={160} className="rounded-md object-cover aspect-video bg-muted"/>
                             <div className="flex-grow w-full space-y-4">
                                 <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input value={image.url} onChange={(e) => handleCarouselImageChange(index, 'url', e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Alt Text</Label>
                                    <Input value={image.alt} onChange={(e) => handleCarouselImageChange(index, 'alt', e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>AI Hint</Label>
                                    <Input value={image.hint} onChange={(e) => handleCarouselImageChange(index, 'hint', e.target.value)} />
                                </div>
                            </div>
                            <DeleteConfirmationDialog onConfirm={() => deleteCarouselImage(index)}>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </DeleteConfirmationDialog>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addCarouselImage}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Carousel Image
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
