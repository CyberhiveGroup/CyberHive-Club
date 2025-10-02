
'use client';

import * as React from 'react';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function AdminHomePage() {
    const { content, setContent, isLoading } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading || !content) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }


    const handleTextChange = (field: string, value: string) => {
        setContent(prev => {
            if (!prev) return null;
            return {
                ...prev,
                home: {
                    ...prev.home,
                    [field]: value,
                }
            }
        });
    };
    
    const handleSave = async () => {
        setIsSaving(true);
        await setContent(content);
        setIsSaving(false);
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Home Page Content</h1>
                    <p className="text-muted-foreground">Edit the text content for the main landing page.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Section</CardTitle>
                        <CardDescription>The main title and subtitle on the landing page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(content.home).filter(([key]) => key.toLowerCase().includes('hero')).map(([key, value]) => (
                            <div key={key} className="grid gap-2">
                                <Label htmlFor={`home-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                {String(value).length > 100 ? (
                                    <Textarea id={`home-${key}`} value={value as string} onChange={e => handleTextChange(key, e.target.value)} rows={4}/>
                                ): (
                                    <Input id={`home-${key}`} value={value as string} onChange={e => handleTextChange(key, e.target.value)} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Other Sections</CardTitle>
                         <CardDescription>Content for the other sections of the home page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(content.home).filter(([key]) => !key.toLowerCase().includes('hero')).map(([key, value]) => (
                            <div key={key} className="grid gap-2">
                                <Label htmlFor={`home-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                {String(value).length > 100 ? (
                                    <Textarea id={`home-${key}`} value={value as string} onChange={e => handleTextChange(key, e.target.value)} rows={4}/>
                                ): (
                                    <Input id={`home-${key}`} value={value as string} onChange={e => handleTextChange(key, e.target.value)} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
