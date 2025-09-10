
'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function AdminAboutPage() {
    const { isAdmin } = useAdmin();
    const router = useRouter();
    const { content, setContent, isLoading } = useContent();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        if (!isAdmin && process.env.NODE_ENV === 'production') {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    const handleTextChange = (page: 'about', field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [field]: value,
            }
        }));
    };
    
    const handleCarouselChange = (index: number, field: 'url' | 'alt' | 'hint', value: string) => {
        setContent(prev => {
            const newCarouselUrls = [...prev.aboutImages.carouselUrls];
            newCarouselUrls[index] = { ...newCarouselUrls[index], [field]: value };
            return { ...prev, aboutImages: { ...prev.aboutImages, carouselUrls: newCarouselUrls }};
        })
    }
    
    const addCarouselItem = () => {
        setContent(prev => ({
            ...prev,
            aboutImages: {
                ...prev.aboutImages,
                carouselUrls: [
                    ...prev.aboutImages.carouselUrls,
                    { url: 'https://picsum.photos/800/600', alt: 'New Image', hint: 'new image' }
                ]
            }
        }))
    }
    
    const removeCarouselItem = (index: number) => {
        setContent(prev => ({
            ...prev,
            aboutImages: {
                ...prev.aboutImages,
                carouselUrls: prev.aboutImages.carouselUrls.filter((_, i) => i !== index)
            }
        }))
    }

     const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            toast({
                title: "Content Saved",
                description: "Your changes to the about page have been saved successfully.",
            });
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">About Page Content</h1>
                    <p className="text-muted-foreground">Edit the text and images for the about page.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                    <CardDescription>Edit the title, subtitle, and mission statement.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {Object.entries(content.about).map(([key, value]) => (
                        <div key={key} className="grid gap-2">
                            <Label htmlFor={`about-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                            {String(value).length > 100 ? (
                                <Textarea id={`about-${key}`} value={value as string} onChange={e => handleTextChange('about', key, e.target.value)} rows={4}/>
                            ): (
                                <Input id={`about-${key}`} value={value as string} onChange={e => handleTextChange('about', key, e.target.value)} />
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mission Section Carousel</CardTitle>
                    <CardDescription>Manage the images in the sliding carousel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {content.aboutImages.carouselUrls.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
                             <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeCarouselItem(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="grid gap-2">
                                <Label htmlFor={`carousel-url-${index}`}>Image URL</Label>
                                <Input id={`carousel-url-${index}`} value={item.url} onChange={e => handleCarouselChange(index, 'url', e.target.value)} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor={`carousel-alt-${index}`}>Alt Text</Label>
                                <Input id={`carousel-alt-${index}`} value={item.alt} onChange={e => handleCarouselChange(index, 'alt', e.target.value)} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor={`carousel-hint-${index}`}>AI Hint</Label>
                                <Input id={`carousel-hint-${index}`} value={item.hint} onChange={e => handleCarouselChange(index, 'hint', e.target.value)} />
                            </div>
                        </div>
                    ))}
                     <Button variant="outline" onClick={addCarouselItem}>Add Image to Carousel</Button>
                </CardContent>
            </Card>
        </div>
    );
}
