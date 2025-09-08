
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
import { Loader2 } from 'lucide-react';
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
        <div className="space-y-8">
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
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <div className="grid gap-2">
                        <Label htmlFor="about-missionImage">Mission Image URL</Label>
                        <Input id="about-missionImage" value={content.aboutImages.missionImageUrl} onChange={e => setContent(prev => ({...prev, aboutImages: { ...prev.aboutImages, missionImageUrl: e.target.value }}))}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
