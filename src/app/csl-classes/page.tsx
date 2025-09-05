
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cslClasses as initialCslClasses } from "@/lib/data";
import Image from "next/image";
import type { CSLClass } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

const LOCAL_STORAGE_KEY = 'cslClasses';

function CSLClassFormDialog({ cslClass, onSave, onOpenChange, open, children }: { cslClass: Partial<CSLClass> | null, onSave: (cslClass: CSLClass) => void, onOpenChange: (open: boolean) => void, open: boolean, children: React.ReactNode }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageHint, setImageHint] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (cslClass) {
      setTitle(cslClass.title || '');
      setDescription(cslClass.description || '');
      setImageUrl(cslClass.imageUrl || 'https://picsum.photos/600/400');
      setImageHint(cslClass.imageHint || '');
    } else {
      setTitle('');
      setDescription('');
      setImageUrl('https://picsum.photos/600/400');
      setImageHint('');
    }
  }, [cslClass]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newClass: CSLClass = {
      id: cslClass?.id || Date.now(),
      title,
      description,
      imageUrl,
      imageHint,
    };
    onSave(newClass);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{cslClass?.id ? 'Edit Class' : 'Add New Class'}</DialogTitle>
          <DialogDescription>
            {cslClass?.id ? 'Make changes to your class here.' : 'Add a new class to your list.'} Click save when you're done.
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
            <Label className="text-right">Image</Label>
            <div className="col-span-3 space-y-2">
                <Image src={imageUrl} alt="Class image preview" width={200} height={150} className="rounded-md object-cover" />
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select from Device</Button>
            </div>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
            <Input id="imageHint" value={imageHint} onChange={(e) => setImageHint(e.target.value)} className="col-span-3" placeholder="e.g. 'team collaboration'"/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CSLClassCard({ cslClass, isAdmin, onEdit, onDelete }: { cslClass: CSLClass, isAdmin: boolean, onEdit: (cslClass: CSLClass) => void, onDelete: (classId: number) => void }) {
  return (
      <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
        <Image
          src={cslClass.imageUrl}
          alt={cslClass.title}
          width={600}
          height={400}
          data-ai-hint={cslClass.imageHint}
          className="h-48 w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="font-headline text-xl">{cslClass.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{cslClass.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button className="w-full font-bold">Register Now</Button>
          {isAdmin && (
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="icon" onClick={() => onEdit(cslClass)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Class</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Class</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this class.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(cslClass.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
           )}
        </CardFooter>
      </Card>
  )
}

function CSLClassesPageContent() {
    const { isAdmin } = useAdmin();
    const [cslClasses, setCslClasses] = React.useState<CSLClass[]>([]);
    const [editingClass, setEditingClass] = React.useState<Partial<CSLClass> | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);

    const { toast } = useToast();

    React.useEffect(() => {
        try {
            const savedClasses = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedClasses) {
                setCslClasses(JSON.parse(savedClasses));
            } else {
                setCslClasses(initialCslClasses);
            }
        } catch (error) {
            console.error("Failed to parse CSL classes from localStorage", error);
            setCslClasses(initialCslClasses);
        }
    }, []);

    const persistClasses = (updatedClasses: CSLClass[]) => {
        setCslClasses(updatedClasses);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedClasses));
    }

    const handleEdit = (cslClass: CSLClass) => {
        setEditingClass(cslClass);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingClass(null);
        setIsFormOpen(true);
    };

    const handleDelete = (classId: number) => {
        const deletedClass = cslClasses.find(c => c.id === classId);
        if (!deletedClass) return;

        const updatedClasses = cslClasses.filter(c => c.id !== classId);
        persistClasses(updatedClasses);

        toast({
            title: "Class Deleted",
            description: `'${deletedClass.title}' has been removed.`,
            action: <Button variant="secondary" onClick={() => handleRestore(deletedClass)}>Undo</Button>
        });
    };

    const handleRestore = (cslClass: CSLClass) => {
        const restoredClasses = [...cslClasses, cslClass].sort((a,b) => a.id - b.id);
        persistClasses(restoredClasses);
        toast({
            title: "Class Restored",
            description: `'${cslClass.title}' has been restored.`,
        });
    };

    const handleSave = (cslClass: CSLClass) => {
        let updatedClasses;
        if (editingClass?.id) { // Editing existing class
            updatedClasses = cslClasses.map(c => c.id === cslClass.id ? cslClass : c);
            toast({ title: 'Class Updated!', description: `'${cslClass.title}' has been successfully updated.` });
        } else { // Adding new class
            updatedClasses = [...cslClasses, cslClass];
            toast({ title: 'Class Added!', description: `'${cslClass.title}' has been successfully created.` });
        }
        persistClasses(updatedClasses);
        setIsFormOpen(false);
    };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <CSLClassFormDialog
        cslClass={editingClass}
        onSave={handleSave}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      >
        <span />
      </CSLClassFormDialog>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Cyber Siksha Lab (CSL) Classes
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Level up your skills with our comprehensive CSL curriculum. From beginner to advanced, we have a class for you.
        </p>
      </section>

      <div className="flex justify-end items-center mb-4 gap-4">
        {isAdmin && (
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Class
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cslClasses.map((cslClass) => (
          <CSLClassCard 
            key={cslClass.id} 
            cslClass={cslClass} 
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}


export default function CSLClassesPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CSLClassesPageContent />
    </React.Suspense>
  );
}
