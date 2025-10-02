
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { SocialLink } from '@/lib/types';

export default function AdminContactPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);
    
    if (isLoading) return <div>Loading...</div>;

    const handleContactTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [name]: value,
            }
        }));
    };
    
    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            footer: {
                ...prev.footer,
                [name]: value,
            }
        }));
    };
    
    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
        const newLinks = [...content.footer.socialLinks];
        (newLinks[index] as any)[field] = value;
        setContent(prev => ({ ...prev, footer: { ...prev.footer, socialLinks: newLinks } }));
    };

    const addSocialLink = () => {
        const newLink: SocialLink = {
            id: content.footer.socialLinks.length > 0 ? Math.max(...content.footer.socialLinks.map(l => l.id)) + 1 : 1,
            platform: 'twitter',
            href: 'https://',
        };
        setContent(prev => ({ ...prev, footer: { ...prev.footer, socialLinks: [...prev.footer.socialLinks, newLink] }}));
    };
    
    const deleteSocialLink = (index: number) => {
        const newLinks = content.footer.socialLinks.filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, footer: { ...prev.footer, socialLinks: newLinks }}));
    }

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    }
    
    const socialPlatforms: SocialLink['platform'][] = ['email', 'whatsapp', 'instagram', 'twitter', 'github', 'linkedin'];


    return (
         <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage Contact & Footer</h1>
                 <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader><CardTitle>Contact Page Content</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={content.contact.title} onChange={handleContactTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Textarea id="subtitle" name="subtitle" value={content.contact.subtitle} onChange={handleContactTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" name="email" type="email" value={content.contact.email} onChange={handleContactTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" value={content.contact.address} onChange={handleContactTextChange} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Footer Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input id="tagline" name="tagline" value={content.footer.tagline} onChange={handleFooterChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="copyright">Copyright Text</Label>
                        <Input id="copyright" name="copyright" value={content.footer.copyright} onChange={handleFooterChange} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Social Links (Footer & Contact)</CardTitle>
                    <Button variant="outline" size="sm" onClick={addSocialLink}><PlusCircle className="mr-2 h-4 w-4" />Add Link</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {content.footer.socialLinks.map((link, index) => (
                        <div key={link.id} className="flex items-end gap-4 p-4 border rounded-lg">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                <div className="space-y-2">
                                    <Label>Platform</Label>
                                    <select
                                        value={link.platform}
                                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {socialPlatforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>URL / Link</Label>
                                    <Input value={link.href} onChange={(e) => handleSocialLinkChange(index, 'href', e.target.value)} />
                                </div>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => deleteSocialLink(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
