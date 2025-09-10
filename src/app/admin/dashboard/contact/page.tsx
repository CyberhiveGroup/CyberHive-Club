
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
import { useToast } from '@/hooks/use-toast';
import type { SocialLink } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function ListEditor<T extends { id: number; label?: string, platform?: string }>({
  items,
  renderForm,
  onSave,
  onDelete,
  onAddNew,
  isSaving,
}: {
  items: T[];
  renderForm: (item: T | null, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
  onSave: (item: T) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
  isSaving: boolean;
}) {
  const [editingItem, setEditingItem] = React.useState<T | null>(null);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const handleSave = (item: T) => {
    onSave(item);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };
  
  const confirmDelete = () => {
    if (deletingId) {
        onDelete(deletingId);
    }
    setDeletingId(null);
  };
  
  const handleAddNewClick = () => {
    setEditingItem({ id: 0 } as T);
  }

  return (
    <>
        <div className="mb-4 border rounded-md bg-card">
            {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <span className="font-medium">{item.label || item.platform}</span>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(item)} disabled={isSaving}>Edit</Button>
                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => setDeletingId(item.id)} disabled={isSaving}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                </div>
            ))}
            {items.length === 0 && <p className="p-4 text-center text-muted-foreground">No items to display.</p>}
        </div>

        <Button onClick={handleAddNewClick} disabled={isSaving}>Add New</Button>
        
        {editingItem && renderForm(editingItem, handleSave, handleCancel)}

        <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this item.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeletingId(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
}

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
                <CardTitle>{item.id > 0 ? `Edit ${item.label || item.platform}` : 'Add New Item'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field.name} className="grid gap-2">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            <Input id={field.name} value={formData[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} />
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

export default function AdminContactPage() {
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

    const getNewId = (list: any[]) => (list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1);

    const handleTextChange = (page: 'contact', field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [field]: value,
            }
        }));
    };
    
    const handleSocialLinkSave = (item: SocialLink) => {
        const newItem = { ...item };
        if (newItem.id === 0) {
            newItem.id = getNewId(content.footer.socialLinks);
        }
        setContent(prev => ({ ...prev, footer: { ...prev.footer, socialLinks: prev.footer.socialLinks.some(l => l.id === newItem.id) ? prev.footer.socialLinks.map(l => l.id === newItem.id ? newItem : l) : [...prev.footer.socialLinks, newItem] } }));
        toast({ title: "Social Link Saved" });
    };

    const handleSocialLinkDelete = (id: number) => {
        setContent(prev => ({ ...prev, footer: { ...prev.footer, socialLinks: prev.footer.socialLinks.filter(l => l.id !== id) } }));
        toast({ title: "Social Link Deleted", variant: 'destructive' });
    };


     const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            toast({
                title: "Content Saved",
                description: "Your changes to the contact page have been saved successfully.",
            });
            setIsSaving(false);
        }, 1000);
    };

    const socialLinkFields = [{ name: 'platform', label: 'Platform (e.g., twitter)' }, { name: 'href', label: 'URL' }];

    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Contact Page Content</h1>
                    <p className="text-muted-foreground">Edit the text and information for the contact page.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Page Content</CardTitle>
                        <CardDescription>Edit the title, subtitle, and contact details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Object.entries(content.contact).map(([key, value]) => (
                            <div key={key} className="grid gap-2">
                                <Label htmlFor={`contact-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                                {String(value).length > 100 ? (
                                    <Textarea id={`contact-${key}`} value={value as string} onChange={e => handleTextChange('contact', key, e.target.value)} rows={4}/>
                                ): (
                                    <Input id={`contact-${key}`} value={value as string} onChange={e => handleTextChange('contact', key, e.target.value)} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Follow Us Section</CardTitle>
                        <CardDescription>Manage the social media links that appear on the contact page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ListEditor<SocialLink>
                            items={content.footer.socialLinks}
                            onSave={handleSocialLinkSave}
                            onDelete={handleSocialLinkDelete}
                            onAddNew={() => {}}
                            isSaving={isSaving}
                            renderForm={(item, onSave, onCancel) => {
                                const formItem = item?.id === 0 ? { id: 0, platform: '', href: '#' } : item;
                                return formItem ? <GenericForm item={formItem} onSave={onSave} onCancel={onCancel} fields={socialLinkFields} /> : null
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    