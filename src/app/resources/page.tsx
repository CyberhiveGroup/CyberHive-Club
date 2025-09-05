
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Download, Edit, PlusCircle, Trash2 } from "lucide-react";
import Link from 'next/link';
import { resources as initialResources } from '@/lib/data';
import type { Resource } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LOCAL_STORAGE_KEY = 'resources';
const resourceTypes = ['PDF', 'Link', 'External Link'];

function ResourceFormDialog({ resource, onSave, onOpenChange, open, children }: { resource: Partial<Resource> | null, onSave: (resource: Resource) => void, onOpenChange: (open: boolean) => void, open: boolean, children: React.ReactNode }) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [type, setType] = React.useState<Resource['type']>('Link');
    const [href, setHref] = React.useState('#');

    React.useEffect(() => {
        if (resource) {
            setTitle(resource.title || '');
            setDescription(resource.description || '');
            setType(resource.type || 'Link');
            setHref(resource.href || '#');
        } else {
            setTitle('');
            setDescription('');
            setType('Link');
            setHref('#');
        }
    }, [resource]);

    const handleSave = () => {
        const newResource: Resource = {
            id: resource?.id || Date.now(),
            title,
            description,
            type,
            href,
        };
        onSave(newResource);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{resource?.id ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
                    <DialogDescription>
                        {resource?.id ? 'Make changes to your resource here.' : 'Add a new resource to your list.'} Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type</Label>
                        <Select value={type} onValueChange={(value: Resource['type']) => setType(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {resourceTypes.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="href" className="text-right">URL</Label>
                        <Input id="href" value={href} onChange={(e) => setHref(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ResourceCard({ resource, isAdmin, onEdit, onDelete }: { resource: Resource, isAdmin: boolean, onEdit: (resource: Resource) => void, onDelete: (resourceId: number) => void }) {
    const Icon = resource.type.includes('PDF') ? FileText : LinkIcon;
    return (
        <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-shrink-0"><Icon className="h-6 w-6 text-primary" /></div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                    <Link href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-primary hover:underline">
                        {resource.type.includes('Link') ? 'Visit Link' : 'Download'}
                        <Download className="ml-2 h-4 w-4" />
                    </Link>
                    {isAdmin && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => onEdit(resource)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit Resource</span>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete Resource</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this resource.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(resource.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default function ResourcesPage() {
    const { isAdmin } = useAdmin();
    const [resources, setResources] = React.useState<Resource[]>([]);
    const [editingResource, setEditingResource] = React.useState<Partial<Resource> | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const { toast } = useToast();

    React.useEffect(() => {
        try {
            const savedResources = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedResources) {
                setResources(JSON.parse(savedResources));
            } else {
                setResources(initialResources);
            }
        } catch (error) {
            console.error("Failed to parse resources from localStorage", error);
            setResources(initialResources);
        }
    }, []);

    const persistResources = (updatedResources: Resource[]) => {
        setResources(updatedResources);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResources));
    };

    const handleAdd = () => {
        setEditingResource(null);
        setIsFormOpen(true);
    };

    const handleEdit = (resource: Resource) => {
        setEditingResource(resource);
        setIsFormOpen(true);
    };

    const handleDelete = (resourceId: number) => {
        const resourceToDelete = resources.find(r => r.id === resourceId);
        if (!resourceToDelete) return;

        const updatedResources = resources.filter(r => r.id !== resourceId);
        persistResources(updatedResources);

        toast({
            title: "Resource Deleted",
            description: `'${resourceToDelete.title}' has been removed.`,
            action: <Button variant="secondary" onClick={() => handleRestore(resourceToDelete)}>Undo</Button>
        });
    };

    const handleRestore = (resource: Resource) => {
        const restoredResources = [...resources, resource].sort((a, b) => a.id - b.id);
        persistResources(restoredResources);
        toast({
            title: "Resource Restored",
            description: `'${resource.title}' has been restored.`,
        });
    };

    const handleSave = (resource: Resource) => {
        let updatedResources;
        if (editingResource?.id) { // Editing
            updatedResources = resources.map(r => r.id === resource.id ? resource : r);
            toast({ title: 'Resource Updated!', description: `'${resource.title}' has been successfully updated.` });
        } else { // Adding
            updatedResources = [...resources, resource];
            toast({ title: 'Resource Added!', description: `'${resource.title}' has been successfully created.` });
        }
        persistResources(updatedResources);
        setIsFormOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
            <ResourceFormDialog
                resource={editingResource}
                onSave={handleSave}
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
            >
                <span />
            </ResourceFormDialog>

            <section className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                    Resources
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
                    A curated collection of tools, guides, and links to aid your cybersecurity journey.
                </p>
            </section>

            <div className="flex justify-end items-center mb-8">
                {isAdmin && (
                    <Button onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
