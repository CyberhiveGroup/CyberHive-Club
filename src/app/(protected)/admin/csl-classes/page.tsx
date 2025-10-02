'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { CSLClass } from '@/lib/types';
import Image from 'next/image';

export default function AdminCslClassesPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;

    const handleClassChange = (index: number, field: keyof CSLClass, value: string) => {
        const newClasses = [...content.cslClasses];
        (newClasses[index] as any)[field] = value;
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };

    const addClass = () => {
        const newClass: CSLClass = {
            id: content.cslClasses.length > 0 ? Math.max(...content.cslClasses.map(c => c.id)) + 1 : 1,
            title: 'New CSL Class',
            description: 'A brief description of the new class.',
            imageUrl: 'https://picsum.photos/600/400?random=' + Math.random(),
            imageHint: 'tech class',
        };
        setContent(prev => ({ ...prev, cslClasses: [...prev.cslClasses, newClass] }));
    };

    const deleteClass = (index: number) => {
        const newClasses = content.cslClasses.filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage CSL Classes</h1>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>CSL Class List</CardTitle>
                    <Button variant="outline" size="sm" onClick={addClass}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Class
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {content.cslClasses.map((cslClass, index) => (
                        <Card key={cslClass.id} className="p-4">
                            <div className="flex items-start gap-6">
                                <Image src={cslClass.imageUrl} alt={cslClass.title} width={120} height={80} className="rounded-md object-cover aspect-video"/>
                                <div className="flex-1 space-y-3">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input value={cslClass.title} onChange={(e) => handleClassChange(index, 'title', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea value={cslClass.description} onChange={(e) => handleClassChange(index, 'description', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image URL</Label>
                                        <Input value={cslClass.imageUrl} onChange={(e) => handleClassChange(index, 'imageUrl', e.target.value)} />
                                    </div>
                                </div>
                                <Button variant="destructive" size="icon" onClick={() => deleteClass(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
