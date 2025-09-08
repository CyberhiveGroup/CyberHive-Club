
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
import type { TeamMember, CSLClass, Event, Resource } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


function ListEditor<T extends { id: number; title?: string, name?: string }>({
  title,
  description,
  items,
  renderForm,
  onSave,
  onDelete,
  onAddNew,
}: {
  title: string;
  description: string;
  items: T[];
  renderForm: (item: T | null, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
  onSave: (item: T) => void;
  onDelete: (id: number) => void;
  onAddNew: () => T;
}) {
  const [editingItem, setEditingItem] = React.useState<T | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleSave = (item: T) => {
    onSave(item);
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };
  
  const handleAddNew = () => {
    const newItem = onAddNew();
    setEditingItem(newItem);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
            <Button onClick={handleAddNew}>Add New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 border rounded-md">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
              <span>{item.title || item.name}</span>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}>Edit</Button>
                <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
           {items.length === 0 && <p className="p-4 text-center text-muted-foreground">No items to display.</p>}
        </div>
        
        {(editingItem) && renderForm(
            editingItem,
            handleSave,
            handleCancel
        )}
      </CardContent>
    </Card>
  );
}

const eventCategories = ['Workshop', 'Competition', 'Talk', 'Social'];
const resourceTypes = ['PDF', 'Link', 'External Link'];


export default function AdminDashboardPage() {
    const { isAdmin } = useAdmin();
    const router = useRouter();
    const { content, setContent, isLoading, initialContent } = useContent();

    React.useEffect(() => {
        if (!isAdmin && process.env.NODE_ENV === 'production') {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    const handleTextChange = (page: keyof typeof content, field: string, value: string) => {
        const pageContent = content[page];
        if (typeof pageContent === 'object' && pageContent !== null && ('title' in pageContent || 'heroTitle' in pageContent)) {
             setContent(prev => ({
                ...prev,
                [page]: {
                    ...prev[page],
                    [field]: value,
                }
             }));
        }
    };
    
    type ContentArrays = Pick<typeof content, 'teamMembers' | 'cslClasses' | 'upcomingEvents' | 'pastEvents' | 'resources'>;

    const handleListSave = <T extends {id: number}>(listName: keyof ContentArrays, item: T) => {
        setContent(prev => {
            const list = prev[listName] as T[];
            const itemExists = list.some(i => i.id === item.id);
            const newList = itemExists 
                ? list.map(i => i.id === item.id ? item : i)
                : [...list, item];
            return { ...prev, [listName]: newList };
        });
    };

    const handleListDelete = (listName: keyof ContentArrays, id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setContent(prev => ({
            ...prev,
            [listName]: (prev[listName] as any[]).filter(i => i.id !== id),
        }));
    };
    

    const handleResetToDefaults = () => {
        if (window.confirm('Are you sure you want to reset all content to the original defaults? This cannot be undone.')) {
            setContent(initialContent);
        }
    };


    // Generic form component
    const GenericForm = ({ item, onSave, onCancel, fields }: { item: any, onSave: (item: any) => void, onCancel: () => void, fields: any[] }) => {
        const [formData, setFormData] = React.useState(item);
        
        React.useEffect(() => {
            setFormData(item);
        }, [item]);

        const handleChange = (field: string, value: any) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSave(formData);
        };
        
        return (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>{item.id > 0 ? 'Edit Item' : 'Add New Item'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map(field => (
                            <div key={field.name} className="grid gap-2">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                {field.type === 'textarea' ? (
                                    <Textarea id={field.name} value={formData[field.name]} onChange={e => handleChange(field.name, e.target.value)} rows={4} />
                                ) : field.type === 'select' ? (
                                     <Select value={formData[field.name]} onValueChange={value => handleChange(field.name, value)}>
                                        <SelectTrigger id={field.name}><SelectValue placeholder={field.placeholder} /></SelectTrigger>
                                        <SelectContent>
                                            {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input id={field.name} value={formData[field.name]} onChange={e => handleChange(field.name, e.target.value)} />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end gap-2">
                             <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                             <Button type="submit">Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    };

    const teamMemberFields = [
        { name: 'name', label: 'Name' },
        { name: 'role', label: 'Role' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
    ];
    
    const cslClassFields = [
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
    ];

    const eventFields = [
        { name: 'title', label: 'Title' },
        { name: 'date', label: 'Date' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'category', label: 'Category', type: 'select', options: eventCategories, placeholder: 'Select a category' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
    ];

    const resourceFields = [
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'type', label: 'Type', type: 'select', options: resourceTypes, placeholder: 'Select a type' },
        { name: 'href', label: 'Link (URL)' },
    ];
    
    const getNewId = (list: any[]) => (list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1);


    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
                 <Button variant="destructive" onClick={handleResetToDefaults}>Reset All Content</Button>
            </div>
           
            <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="csl">CSL Classes</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="home">
                    <Card>
                        <CardHeader>
                            <CardTitle>Home Page Content</CardTitle>
                            <CardDescription>Edit the text content for the main landing page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(content.home).map(([key, value]) => (
                                <div key={key} className="grid gap-2">
                                    <Label htmlFor={`home-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                    {String(value).length > 100 ? (
                                        <Textarea id={`home-${key}`} value={value as string} onChange={e => handleTextChange('home', key, e.target.value)} rows={4}/>
                                    ): (
                                        <Input id={`home-${key}`} value={value as string} onChange={e => handleTextChange('home', key, e.target.value)} />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Page Content</CardTitle>
                            <CardDescription>Edit the text and images for the about page.</CardDescription>
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
                </TabsContent>

                <TabsContent value="team">
                    <ListEditor<TeamMember>
                        title="Team Members"
                        description="Manage the members of your team."
                        items={content.teamMembers}
                        onSave={(item) => handleListSave('teamMembers', item)}
                        onDelete={(id) => handleListDelete('teamMembers', id)}
                        onAddNew={() => ({ id: getNewId(content.teamMembers), name: '', role: '', imageUrl: 'https://picsum.photos/400/400', imageHint: '' })}
                        renderForm={(item, onSave, onCancel) => <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={teamMemberFields} />}
                    />
                </TabsContent>
                
                <TabsContent value="csl">
                     <ListEditor<CSLClass>
                        title="CSL Classes"
                        description="Manage your CSL classes."
                        items={content.cslClasses}
                        onSave={(item) => handleListSave('cslClasses', item)}
                        onDelete={(id) => handleListDelete('cslClasses', id)}
                        onAddNew={() => ({ id: getNewId(content.cslClasses), title: '', description: '', imageUrl: 'https://picsum.photos/600/400', imageHint: '' })}
                        renderForm={(item, onSave, onCancel) => <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={cslClassFields} />}
                    />
                </TabsContent>
                
                <TabsContent value="events" className="space-y-8">
                     <ListEditor<Event>
                        title="Upcoming Events"
                        description="Manage your upcoming events."
                        items={content.upcomingEvents}
                        onSave={(item) => handleListSave('upcomingEvents', item)}
                        onDelete={(id) => handleListDelete('upcomingEvents', id)}
                        onAddNew={() => ({ id: getNewId(content.upcomingEvents), title: '', date: '', description: '', category: 'Workshop', imageUrl: 'https://picsum.photos/600/400', imageHint: '' })}
                        renderForm={(item, onSave, onCancel) => <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={eventFields} />}
                    />
                     <ListEditor<Event>
                        title="Past Events"
                        description="Manage your past events."
                        items={content.pastEvents}
                        onSave={(item) => handleListSave('pastEvents', item)}
                        onDelete={(id) => handleListDelete('pastEvents', id)}
                        onAddNew={() => ({ id: getNewId(content.pastEvents), title: '', date: '', description: '', category: 'Workshop', imageUrl: 'https://picsum.photos/600/400', imageHint: '' })}
                        renderForm={(item, onSave, onCancel) => <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={eventFields} />}
                    />
                </TabsContent>
                
                <TabsContent value="resources">
                     <ListEditor<Resource>
                        title="Resources"
                        description="Manage your resources."
                        items={content.resources}
                        onSave={(item) => handleListSave('resources', item)}
                        onDelete={(id) => handleListDelete('resources', id)}
                        onAddNew={() => ({ id: getNewId(content.resources), title: '', description: '', type: 'Link', href: '#' })}
                        renderForm={(item, onSave, onCancel) => <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={resourceFields} />}
                    />
                </TabsContent>

            </Tabs>
        </div>
    );
}

    