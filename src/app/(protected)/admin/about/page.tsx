
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        </div>
    )
}
