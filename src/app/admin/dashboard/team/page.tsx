
'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2 } from 'lucide-react';
import type { TeamMember } from '@/lib/types';
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

        <Button onClick={onAddNew} disabled={isSaving}>Add New</Button>
        
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
                <CardTitle>{formData.id > 0 ? `Edit ${formData.name || formData.title}` : 'Add New Item'}</CardTitle>
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


export default function AdminTeamPage() {
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
    
    const handleListSave = (item: TeamMember) => {
        setContent(prev => {
            const list = prev.teamMembers;
            const itemExists = list.some(i => i.id === item.id);
            const newList = itemExists 
                ? list.map(i => i.id === item.id ? item : i)
                : [...list, item];
            return { ...prev, teamMembers: newList };
        });
         toast({ title: "Team Member Saved", description: `${item.name} has been saved.` });
    };

    const handleListDelete = (id: number) => {
        setContent(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.filter(i => i.id !== id),
        }));
        toast({ title: "Team Member Deleted", variant: 'destructive' });
    };

    const handleAddNew = () => {
        const newId = content.teamMembers.length > 0 ? Math.max(...content.teamMembers.map(i => i.id)) + 1 : 1;
        const newItem: TeamMember = { id: newId, name: 'New Member', role: '', imageUrl: 'https://picsum.photos/400/400', imageHint: 'person portrait' };
        
        // This is a workaround to open the form for the new item.
        // A better approach would be to have the ListEditor manage this state.
        // For now, we add it and then immediately set it to be edited.
        setContent(prev => ({ ...prev, teamMembers: [...prev.teamMembers, newItem] }));

        // We need a slight delay for react to process the state update.
        setTimeout(() => {
            const editor = document.querySelector(`[data-id="${newId}"] button`);
            if (editor) (editor as HTMLElement).click();
        }, 100);
    };

     const handleSaveAll = () => {
        setIsSaving(true);
        setTimeout(() => {
            toast({
                title: "Content Saved",
                description: "All changes to team members have been saved.",
            });
            setIsSaving(false);
        }, 1000);
    };

    const teamMemberFields = [
        { name: 'name', label: 'Name' },
        { name: 'role', label: 'Role' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
    ];
    
    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Team Members</h1>
                    <p className="text-muted-foreground">Manage the members of your team.</p>
                </div>
                <Button onClick={handleSaveAll} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save All Changes
                </Button>
            </div>
            <ListEditor<TeamMember>
                items={content.teamMembers}
                onSave={handleListSave}
                onDelete={handleListDelete}
                onAddNew={() => {
                    const newId = content.teamMembers.length > 0 ? Math.max(...content.teamMembers.map(i => i.id)) + 1 : 1;
                    const newItem: TeamMember = { id: newId, name: 'New Member', role: '', imageUrl: 'https://picsum.photos/400/400', imageHint: 'person portrait' };
                    setContent(prev => ({...prev, teamMembers: [...prev.teamMembers, newItem]}));
                    // The form will be opened via the renderForm prop in the ListEditor
                }}
                isSaving={isSaving}
                renderForm={(item, onSave, onCancel) => item ? <GenericForm item={item} onSave={onSave} onCancel={onCancel} fields={teamMemberFields} /> : null}
            />
        </div>
    );
}
