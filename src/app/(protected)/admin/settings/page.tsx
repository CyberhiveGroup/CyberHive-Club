'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';

export default function AdminSettingsPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;
    
    const handleCarouselUrlChange = (index: number, field: 'url' | 'alt' | 'hint', value: string) => {
        const newUrls = [...(content.aboutImages.carouselUrls || [])];
        newUrls[index] = { ...newUrls[index], [field]: value };
        setContent(prev => ({ ...prev, aboutImages: { ...prev.aboutImages, carouselUrls: newUrls } }));
    };
    
    const addCarouselUrl = () => {
        const newUrl = { url: 'https://picsum.photos/seed/new' + Math.random() + '/600/300', alt: 'New Image', hint: '' };
        const newUrls = [...(content.aboutImages.carouselUrls || []), newUrl];
        setContent(prev => ({ ...prev, aboutImages: { ...prev.aboutImages, carouselUrls: newUrls } }));
    }

    const deleteCarouselUrl = (index: number) => {
        const newUrls = content.aboutImages.carouselUrls.filter((_: any, i: number) => i !== index);
        setContent(prev => ({ ...prev, aboutImages: { ...prev.aboutImages, carouselUrls: newUrls } }));
    }
    
    const handleMissionImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(prev => ({ ...prev, aboutImages: { ...prev.aboutImages, missionImageUrl: e.target.value }}));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Site Settings</h1>
                 <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>About Page Images</CardTitle>
                    <CardDescription>Manage the images that appear on the About Us page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="missionImageUrl">Mission Section Image URL</Label>
                        <Input 
                            id="missionImageUrl" 
                            name="missionImageUrl" 
                            value={content.aboutImages.missionImageUrl}
                            onChange={handleMissionImageUrlChange}
                        />
                    </div>
                    
                    <div>
                        <div className="flex items-center justify-between mb-2">
                           <Label>Image Carousel URLs</Label>
                           <Button variant="outline" size="sm" onClick={addCarouselUrl}><PlusCircle className="mr-2 h-4 w-4" /> Add Image</Button>
                        </div>
                        <div className="space-y-4">
                        {(content.aboutImages.carouselUrls || []).map((img: any, index: number) => (
                             <div key={index} className="flex items-end gap-2 p-2 border rounded-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                                    <div className="space-y-1">
                                        <Label className="text-xs">URL</Label>
                                        <Input value={img.url} onChange={(e) => handleCarouselUrlChange(index, 'url', e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Alt Text</Label>
                                        <Input value={img.alt} onChange={(e) => handleCarouselUrlChange(index, 'alt', e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">AI Hint</Label>
                                        <Input value={img.hint} onChange={(e) => handleCarouselUrlChange(index, 'hint', e.target.value)} />
                                    </div>
                                </div>
                                <Button variant="destructive" size="icon" onClick={() => deleteCarouselUrl(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Theme</CardTitle>
                     <CardDescription>Customize the look and feel of the website. (Coming Soon)</CardDescription>
                </CardHeader>
                 <CardContent>
                    <p className="text-muted-foreground">Theme customization options will be available here in a future update.</p>
                </CardContent>
            </Card>
        </div>
    )
}
