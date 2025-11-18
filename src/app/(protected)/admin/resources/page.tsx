
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { Resource } from '@/lib/types';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';

export default function AdminResourcesPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);
    
    if (isLoading) return <div>Loading...</div>;

    const handleResourceChange = (index: number, field: keyof Resource, value: string) => {
        const newResources = [...content.resources];
        (newResources[index] as any)[field] = value;
        setContent(prev => ({ ...prev, resources: newResources }));
    };

    const addResource = () => {
        const newResource: Resource = {
            id: content.resources.length > 0 ? Math.max(...content.resources.map(r => r.id)) + 1 : 1,
            title: 'New Resource',
            description: 'A brief description of the new resource.',
            type: 'Link',
            href: '#',
        };
        setContent(prev => ({ ...prev, resources: [...prev.resources, newResource] }));
    };

    const deleteResource = (index: number) => {
        const newResources = content.resources.filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, resources: newResources }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    };

    const resourceTypes: Resource['type'][] = ['PDF', 'Link', 'External Link'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage Resources</h1>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Resource List</CardTitle>
                    <Button variant="outline" size="sm" onClick={addResource}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {content.resources.map((resource, index) => (
                        <Card key={resource.id} className="p-4">
                            <div className="flex items-end gap-4">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input value={resource.title} onChange={(e) => handleResourceChange(index, 'title', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea value={resource.description} onChange={(e) => handleResourceChange(index, 'description', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Type</Label>
                                        <select
                                            value={resource.type}
                                            onChange={(e) => handleResourceChange(index, 'type', e.target.value)}
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Link (href)</Label>
                                        <Input value={resource.href} onChange={(e) => handleResourceChange(index, 'href', e.target.value)} />
                                    </div>
                                </div>
                                <DeleteConfirmationDialog onConfirm={() => deleteResource(index)}>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </DeleteConfirmationDialog>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
