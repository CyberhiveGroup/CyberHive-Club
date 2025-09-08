
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

// A generic component to edit a list of items
function ListEditor<T extends { id: number; title: string }>({
  title,
  items,
  renderForm,
  onSave,
  onDelete,
}: {
  title: string;
  items: T[];
  renderForm: (item: T | null, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
  onSave: (item: T) => void;
  onDelete: (id: number) => void;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Manage your {title.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 border-b">
              <span>{item.title}</span>
              <div>
                <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}>Edit</Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsAdding(true)}>Add New</Button>
        
        {(isAdding || editingItem) && renderForm(
            isAdding ? null : editingItem,
            handleSave,
            handleCancel
        )}
      </CardContent>
    </Card>
  );
}


export default function AdminDashboardPage() {
    const { isAdmin } = useAdmin();
    const router = useRouter();
    const { content, setContent, isLoading, initialContent } = useContent();

    React.useEffect(() => {
        if (!isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    const handleTextChange = (page: keyof typeof content, field: string, value: string) => {
        const pageContent = content[page];
        if (typeof pageContent === 'object' && pageContent !== null && 'title' in pageContent) {
             setContent(prev => ({
                ...prev,
                [page]: {
                    ...prev[page],
                    [field]: value,
                }
             }));
        }
    };

    const handleResetToDefaults = () => {
        if (window.confirm('Are you sure you want to reset all content to the original defaults? This cannot be undone.')) {
            setContent(initialContent);
        }
    };


    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
                 <Button variant="destructive" onClick={handleResetToDefaults}>Reset All Content</Button>
            </div>
           
            <div className="grid gap-8">
                {/* Home Page Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>Home Page Content</CardTitle>
                        <CardDescription>Edit the text content for the main landing page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(content.home).map(([key, value]) => (
                             <div key={key} className="grid gap-2">
                                <Label htmlFor={`home-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                {value.length > 100 ? (
                                    <Textarea id={`home-${key}`} value={value} onChange={e => handleTextChange('home', key, e.target.value)} rows={4}/>
                                ): (
                                    <Input id={`home-${key}`} value={value} onChange={e => handleTextChange('home', key, e.target.value)} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 {/* About Page Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>About Page Content</CardTitle>
                        <CardDescription>Edit the text and images for the about page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {Object.entries(content.about).map(([key, value]) => (
                             <div key={key} className="grid gap-2">
                                <Label htmlFor={`about-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                {value.length > 100 ? (
                                    <Textarea id={`about-${key}`} value={value} onChange={e => handleTextChange('about', key, e.target.value)} rows={4}/>
                                ): (
                                    <Input id={`about-${key}`} value={value} onChange={e => handleTextChange('about', key, e.target.value)} />
                                )}
                            </div>
                        ))}
                        <div className="grid gap-2">
                            <Label htmlFor="about-missionImage">Mission Image URL</Label>
                            <Input id="about-missionImage" value={content.aboutImages.missionImageUrl} onChange={e => setContent(prev => ({...prev, aboutImages: { missionImageUrl: e.target.value }}))}/>
                        </div>
                    </CardContent>
                </Card>
                 {/* Here you would add the ListEditor components for teamMembers, cslClasses, etc. */}
            </div>
        </div>
    );
}

