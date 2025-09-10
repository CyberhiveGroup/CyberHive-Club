
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
import { useToast } from '@/hooks/use-toast';


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

    const handleTextChange = (page: 'contact', field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [field]: value,
            }
        }));
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
            <Card>
                <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                    <CardDescription>Edit the title, subtitle, and contact details.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
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
        </div>
    );
}
