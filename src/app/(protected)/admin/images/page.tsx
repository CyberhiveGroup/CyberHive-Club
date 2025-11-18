
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import type { ImageAsset } from '@/lib/types';

export default function AdminImagesPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading image assets...</div>;

    const handleImageChange = (key: keyof typeof content.images, field: keyof ImageAsset, value: string) => {
        setContent(prev => ({
            ...prev,
            images: {
                ...prev.images,
                [key]: {
                    ...prev.images[key],
                    [field]: value
                }
            }
        }));
    };

    const handleCarouselImageChange = (index: number, field: keyof ImageAsset, value: string) => {
        const newCarouselImages = [...content.images.aboutCarousel];
        (newCarouselImages[index] as any)[field] = value;
        setContent(prev => ({
            ...prev,
            images: {
                ...prev.images,
                aboutCarousel: newCarouselImages,
            }
        }));
    };
    
    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    };

    const imageKeys = Object.keys(content.images || {}).filter(k => k !== 'aboutCarousel') as (keyof typeof content.images)[];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage Site Images</h1>
                 <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Single Images</CardTitle>
                    <CardDescription>These images appear in various sections across the site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {imageKeys.map((key) => {
                        const image = content.images[key] as ImageAsset;
                        if (!image || typeof image !== 'object') return null;
                        
                        return (
                            <Card key={key} className="p-4">
                               <div className="flex items-start gap-6">
                                    <Image src={image.url} alt={image.alt} width={120} height={80} className="rounded-md object-cover aspect-video bg-muted"/>
                                    <div className="flex-1 space-y-3">
                                        <h4 className="font-semibold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>URL</Label>
                                                <Input value={image.url} onChange={(e) => handleImageChange(key, 'url', e.target.value)} />
                                            </div>
                                             <div className="space-y-2">
                                                <Label>Alt Text</Label>
                                                <Input value={image.alt} onChange={(e) => handleImageChange(key, 'alt', e.target.value)} />
                                            </div>
                                             <div className="space-y-2 sm:col-span-2">
                                                <Label>AI Hint</Label>
                                                <Input value={image.hint} onChange={(e) => handleImageChange(key, 'hint', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>About Page Carousel</CardTitle>
                    <CardDescription>Images for the carousel on the About page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {(content.images.aboutCarousel || []).map((image, index) => (
                        <Card key={index} className="p-4">
                            <div className="flex items-start gap-6">
                                <Image src={image.url} alt={image.alt} width={120} height={80} className="rounded-md object-cover aspect-video bg-muted"/>
                                 <div className="flex-1 space-y-3">
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                         <div className="space-y-2">
                                            <Label>URL</Label>
                                            <Input value={image.url} onChange={(e) => handleCarouselImageChange(index, 'url', e.target.value)} />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Alt Text</Label>
                                            <Input value={image.alt} onChange={(e) => handleCarouselImageChange(index, 'alt', e.target.value)} />
                                        </div>
                                         <div className="space-y-2 sm:col-span-2">
                                            <Label>AI Hint</Label>
                                            <Input value={image.hint} onChange={(e) => handleCarouselImageChange(index, 'hint', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>

        </div>
    )
}
