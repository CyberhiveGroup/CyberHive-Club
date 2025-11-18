
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { transformGoogleDriveUrl } from '@/lib/utils';

function EventEditor({ 
    event,
    onEventChange, 
    onDelete,
    onGalleryChange,
    onDeleteGalleryItem,
    onAddGalleryItem,
} : {
    event: Event,
    onEventChange: (field: keyof Event, value: string) => void,
    onDelete: () => void,
    onGalleryChange: (index: number, field: 'url' | 'alt' | 'hint', value: string) => void,
    onDeleteGalleryItem: (index: number) => void,
    onAddGalleryItem: () => void,
}) {
     const eventCategories: Event['category'][] = ['Workshop', 'Competition', 'Talk', 'Social'];
    return (
         <Card className="p-4">
            <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={event.title} onChange={(e) => onEventChange('title', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Date</Label>
                        <Input value={event.date} onChange={(e) => onEventChange('date', e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea value={event.description} onChange={(e) => onEventChange('description', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <select
                            value={event.category}
                            onChange={(e) => onEventChange('category', e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {eventCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input value={event.imageUrl} onChange={(e) => onEventChange('imageUrl', e.target.value)} />
                    </div>

                    <div className="md:col-span-2">
                         <h4 className="font-semibold pt-4 text-lg">Gallery</h4>
                         <CardDescription>Only applicable for past events.</CardDescription>
                         <div className="space-y-4 mt-2">
                            {event.gallery?.map((item, index) => (
                                <div key={index} className="flex items-end gap-2 p-2 border rounded-lg">
                                    <Image src={transformGoogleDriveUrl(item.url)} alt={item.alt} width={60} height={60} className="rounded-md object-cover aspect-square" />
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <Input placeholder="Image URL" value={item.url} onChange={(e) => onGalleryChange(index, 'url', e.target.value)} />
                                        <Input placeholder="Alt Text" value={item.alt} onChange={(e) => onGalleryChange(index, 'alt', e.target.value)} />
                                    </div>
                                    <Button size="icon" variant="ghost" onClick={() => onDeleteGalleryItem(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                </div>
                            ))}
                             <Button size="sm" variant="outline" onClick={onAddGalleryItem}><PlusCircle className="h-4 w-4 mr-2" />Add Gallery Item</Button>
                         </div>
                    </div>
                </div>
                <Button variant="destructive" size="icon" className="ml-4" onClick={onDelete}>
                    <Trash2 className="h-4 w-4"/>
                </Button>
            </div>
        </Card>
    )
}

export default function AdminEventsPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;
    
    const handleEventChange = (list: 'upcomingEvents' | 'pastEvents', index: number, field: keyof Event, value: string) => {
        const newEvents = [...content[list]];
        (newEvents[index] as any)[field] = value;
        setContent(prev => ({ ...prev, [list]: newEvents }));
    };

    const addEvent = (list: 'upcomingEvents' | 'pastEvents') => {
        const newEvent: Event = {
            id: Math.random(),
            title: "New Event",
            date: "TBA",
            description: "",
            category: "Workshop",
            imageUrl: "https://picsum.photos/600/400?random=" + Math.random(),
            imageHint: "event image",
            gallery: []
        };
        setContent(prev => ({ ...prev, [list]: [...prev[list], newEvent]}));
    }
    
    const deleteEvent = (list: 'upcomingEvents' | 'pastEvents', index: number) => {
        const newEvents = content[list].filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, [list]: newEvents }));
    }

     const handleGalleryChange = (list: 'upcomingEvents' | 'pastEvents', eventIndex: number, galleryIndex: number, field: 'url' | 'alt' | 'hint', value: string) => {
        const newEvents = [...content[list]];
        if (!newEvents[eventIndex].gallery) newEvents[eventIndex].gallery = [];
        newEvents[eventIndex].gallery![galleryIndex] = {...newEvents[eventIndex].gallery![galleryIndex], [field]: value};
        setContent(prev => ({ ...prev, [list]: newEvents }));
    };
    
    const addGalleryItem = (list: 'upcomingEvents' | 'pastEvents', eventIndex: number) => {
        const newEvents = [...content[list]];
        if (!newEvents[eventIndex].gallery) newEvents[eventIndex].gallery = [];
        newEvents[eventIndex].gallery!.push({ url: 'https://picsum.photos/800/600?random=' + Math.random(), alt: 'Gallery image', hint: 'event photo' });
        setContent(prev => ({ ...prev, [list]: newEvents }));
    };

    const deleteGalleryItem = (list: 'upcomingEvents' | 'pastEvents', eventIndex: number, galleryIndex: number) => {
        const newEvents = [...content[list]];
        newEvents[eventIndex].gallery = newEvents[eventIndex].gallery?.filter((_, i) => i !== galleryIndex);
        setContent(prev => ({ ...prev, [list]: newEvents }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        const newContent = {
            ...content,
            upcomingEvents: content.upcomingEvents.map(e => ({...e, id: e.id > 1000 ? Math.max(...content.upcomingEvents.map(ev => ev.id > 1000 ? 0 : ev.id), ...content.pastEvents.map(ev => ev.id)) + 1 + Math.random() : e.id })),
            pastEvents: content.pastEvents.map(e => ({...e, id: e.id > 1000 ? Math.max(...content.pastEvents.map(ev => ev.id > 1000 ? 0 : ev.id), ...content.upcomingEvents.map(ev => ev.id)) + 1 + Math.random(): e.id })),
        }

        await saveContent(newContent);
        // refetch content to get proper IDs
        const res = await fetch('/api/content');
        const data = await res.json();
        setContent(data);
        setIsSaving(false);
    }
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage Events</h1>
                 <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4 pt-4">
                     <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Upcoming Events</CardTitle>
                             <Button variant="outline" size="sm" onClick={() => addEvent('upcomingEvents')}><PlusCircle className="mr-2 h-4 w-4"/>Add Upcoming Event</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {content.upcomingEvents.map((event, index) => (
                                <EventEditor 
                                    key={event.id}
                                    event={event}
                                    onEventChange={(field, value) => handleEventChange('upcomingEvents', index, field, value)}
                                    onDelete={() => deleteEvent('upcomingEvents', index)}
                                    onGalleryChange={(gIndex, field, value) => handleGalleryChange('upcomingEvents', index, gIndex, field, value)}
                                    onDeleteGalleryItem={(gIndex) => deleteGalleryItem('upcomingEvents', index, gIndex)}
                                    onAddGalleryItem={() => addGalleryItem('upcomingEvents', index)}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="past" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Past Events</CardTitle>
                             <Button variant="outline" size="sm" onClick={() => addEvent('pastEvents')}><PlusCircle className="mr-2 h-4 w-4"/>Add Past Event</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {content.pastEvents.map((event, index) => (
                                <EventEditor 
                                    key={event.id}
                                    event={event}
                                    onEventChange={(field, value) => handleEventChange('pastEvents', index, field, value)}
                                    onDelete={() => deleteEvent('pastEvents', index)}
                                    onGalleryChange={(gIndex, field, value) => handleGalleryChange('pastEvents', index, gIndex, field, value)}
                                    onDeleteGalleryItem={(gIndex) => deleteGalleryItem('pastEvents', index, gIndex)}
                                    onAddGalleryItem={() => addGalleryItem('pastEvents', index)}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
