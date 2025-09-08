
'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Trash2 } from 'lucide-react';
import type { CSLClass } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
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

// Reusable ListEditor for managing any list of items with CRUD
function ListEditor<T extends { id: number; title?: string, name?: string }>({
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

  const handleAddNewClick = () => {
    onAddNew();
    // A bit of a hack: assumes onAddNew creates a new item and we can find it to edit.
    // A better implementation would have onAddNew return the new item.
    // For now, this relies on parent component logic to create and then set editing.
    // This is brittle. A better way would be to create a new item state here.
    // For now, let's create a placeholder new item to trigger the form.
    setEditingItem({id: 0} as T);
  }

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

  return (
    <>
        <div className="mb-4 border rounded-md bg-card">
            {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <span className="font-medium">{item.title || item.name}</span>
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

        <Button onClick={() => setEditingItem({id: 0} as T)} disabled={isSaving}>Add New</Button>
        
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
                <CardTitle>{item.id > 0 ? `Edit ${item.title}` : 'Add New Item'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field.name} className="grid gap-2">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            {field.type === 'textarea' ? (
                                <Textarea id={field.name} value={formData[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} rows={4} />
                            ) : (
                                <Input id={field.name} value={formData[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} />
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

export default function AdminCSLPage() {
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
    
    const handleListSave = (item: CSLClass) => {
        const newItem = { ...item };
        if (newItem.id === 0) { // It's a new item
            newItem.id = getNewId(content.cslClasses);
        }

        setContent(prev => {
            const list = prev.cslClasses;
            const itemExists = list.some(i => i.id === newItem.id);
            const newList = itemExists 
                ? list.map(i => i.id === newItem.id ? newItem : i)
                : [...list, newItem];
            return { ...prev, cslClasses: newList };
        });
        toast({ title: "CSL Class Saved", description: `${item.title} has been saved.` });
    };

    const handleListDelete = (id: number) => {
        setContent(prev => ({
            ...prev,
            cslClasses: prev.cslClasses.filter(i => i.id !== id),
        }));
        toast({ title: "CSL Class Deleted", variant: 'destructive' });
    };

    const handleAddNew = () => {
        // This function is now just a placeholder as the form opening is handled inside ListEditor
    };

    const handleSaveAll = () => {
        setIsSaving(true);
        setTimeout(() => {
            toast({
                title: "Content Saved",
                description: "All changes to CSL classes have been saved.",
            });
            setIsSaving(false);
        }, 1000);
    };

    const cslClassFields = [
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
    ];
    
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">CSL Classes</h1>
                    <p className="text-muted-foreground">Manage your CSL (Cyber Siksha Lab) classes.</p>
                </div>
                 <Button onClick={handleSaveAll} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save All Changes
                </Button>
            </div>
            <ListEditor<CSLClass>
                items={content.cslClasses}
                onSave={handleListSave}
                onDelete={handleListDelete}
                onAddNew={handleAddNew}
                isSaving={isSaving}
                renderForm={(item, onSave, onCancel) => {
                    const formItem = item?.id === 0 
                      ? { id: 0, title: '', description: '', imageUrl: 'https://picsum.photos/600/400', imageHint: '' }
                      : item;
                    return formItem ? <GenericForm item={formItem} onSave={onSave} onCancel={onCancel} fields={cslClassFields} /> : null
                }}
            />
        </div>
    );
}
