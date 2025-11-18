
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { CSLClass, CSLLink, ImageAsset } from '@/lib/types';
import Image from 'next/image';
import { transformGoogleDriveUrl } from '@/lib/utils';

export default function AdminCslClassesPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;

    const handleClassChange = (index: number, field: keyof CSLClass, value: string) => {
        const newClasses = [...content.cslClasses];
        (newClasses[index] as any)[field] = value;
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };
    
    const handleGalleryChange = (classIndex: number, galleryIndex: number, field: keyof ImageAsset, value: string) => {
        const newClasses = [...content.cslClasses];
        if (!newClasses[classIndex].gallery) newClasses[classIndex].gallery = [];
        (newClasses[classIndex].gallery![galleryIndex] as any)[field] = value;
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };

    const addGalleryItem = (classIndex: number) => {
        const newClasses = [...content.cslClasses];
        if (!newClasses[classIndex].gallery) newClasses[classIndex].gallery = [];
        newClasses[classIndex].gallery!.push({ url: 'https://picsum.photos/800/600?random=' + Math.random(), alt: 'Gallery image', hint: 'class photo' });
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };
    
    const deleteGalleryItem = (classIndex: number, galleryIndex: number) => {
        const newClasses = [...content.cslClasses];
        newClasses[classIndex].gallery = newClasses[classIndex].gallery?.filter((_, i) => i !== galleryIndex);
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };
    
    const handleLinkChange = (classIndex: number, linkIndex: number, field: keyof CSLLink, value: string) => {
        const newClasses = [...content.cslClasses];
        if (!newClasses[classIndex].links) newClasses[classIndex].links = [];
        (newClasses[classIndex].links![linkIndex] as any)[field] = value;
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };

    const addLink = (classIndex: number) => {
        const newClasses = [...content.cslClasses];
        if (!newClasses[classIndex].links) newClasses[classIndex].links = [];
        newClasses[classIndex].links!.push({ id: Math.random(), title: 'New Link', href: '#' });
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };
    
    const deleteLink = (classIndex: number, linkIndex: number) => {
        const newClasses = [...content.cslClasses];
        newClasses[classIndex].links = newClasses[classIndex].links?.filter((_, i) => i !== linkIndex);
        setContent(prev => ({ ...prev, cslClasses: newClasses }));
    };

    const addClass = () => {
        const newClass: CSLClass = {
            id: content.cslClasses.length > 0 ? Math.max(...content.cslClasses.map(c => c.id)) + 1 : 1,
            title: 'New CSL Class',
            description: 'A brief description of the new class.',
            longDescription: 'A more detailed description that will appear on the class detail page.',
            imageUrl: 'https://picsum.photos/600/400?random=' + Math.random(),
            imageHint: 'tech class',
            gallery: [],
            links: [],
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
                                <div className="flex-1 space-y-4">
                                     <div className="flex items-start gap-4">
                                        <Image src={transformGoogleDriveUrl(cslClass.imageUrl)} alt={cslClass.title} width={120} height={80} className="rounded-md object-cover aspect-video bg-muted"/>
                                        <div className="flex-1 space-y-2">
                                            <Label>Title</Label>
                                            <Input value={cslClass.title} onChange={(e) => handleClassChange(index, 'title', e.target.value)} />
                                            <Label>Image URL</Label>
                                            <Input value={cslClass.imageUrl} onChange={(e) => handleClassChange(index, 'imageUrl', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Short Description (for card)</Label>
                                        <Textarea value={cslClass.description} onChange={(e) => handleClassChange(index, 'description', e.target.value)} />
                                    </div>
                                     <div className="space-y-2">
                                        <Label>Long Description (for detail page)</Label>
                                        <Textarea value={cslClass.longDescription} onChange={(e) => handleClassChange(index, 'longDescription', e.target.value)} rows={5}/>
                                    </div>
                                    
                                    {/* Gallery Management */}
                                    <div>
                                         <h4 className="font-semibold pt-4 text-lg">Image Gallery</h4>
                                         <CardDescription>Images for the carousel on the detail page.</CardDescription>
                                         <div className="space-y-4 mt-2">
                                            {(cslClass.gallery || []).map((item, gIndex) => (
                                                <div key={gIndex} className="flex items-end gap-2 p-2 border rounded-lg">
                                                    <Image src={transformGoogleDriveUrl(item.url)} alt={item.alt} width={60} height={60} className="rounded-md object-cover aspect-square" />
                                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                                        <Input placeholder="Image URL" value={item.url} onChange={(e) => handleGalleryChange(index, gIndex, 'url', e.target.value)} />
                                                        <Input placeholder="Alt Text" value={item.alt} onChange={(e) => handleGalleryChange(index, gIndex, 'alt', e.target.value)} />
                                                    </div>
                                                    <Button size="icon" variant="ghost" onClick={() => deleteGalleryItem(index, gIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                </div>
                                            ))}
                                             <Button size="sm" variant="outline" onClick={() => addGalleryItem(index)}><PlusCircle className="h-4 w-4 mr-2" />Add Gallery Item</Button>
                                         </div>
                                    </div>
                                    
                                     {/* Link Management */}
                                    <div>
                                         <h4 className="font-semibold pt-4 text-lg">Related Links</h4>
                                         <CardDescription>Links for registration, resources, etc.</CardDescription>
                                         <div className="space-y-4 mt-2">
                                            {(cslClass.links || []).map((link, lIndex) => (
                                                <div key={lIndex} className="flex items-end gap-2 p-2 border rounded-lg">
                                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                                        <Input placeholder="Link Title" value={link.title} onChange={(e) => handleLinkChange(index, lIndex, 'title', e.target.value)} />
                                                        <Input placeholder="Link URL" value={link.href} onChange={(e) => handleLinkChange(index, lIndex, 'href', e.target.value)} />
                                                    </div>
                                                    <Button size="icon" variant="ghost" onClick={() => deleteLink(index, lIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                </div>
                                            ))}
                                             <Button size="sm" variant="outline" onClick={() => addLink(index)}><PlusCircle className="h-4 w-4 mr-2" />Add Link</Button>
                                         </div>
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
