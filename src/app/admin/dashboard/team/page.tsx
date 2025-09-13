
'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2, Plus, Pencil } from 'lucide-react';
import type { Team, TeamMember } from '@/lib/types';
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
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const MemberForm = ({ item, onSave, onCancel, teamId }: { item: Partial<TeamMember>, onSave: (item: TeamMember) => void, onCancel: () => void, teamId: number }) => {
    const [formData, setFormData] = React.useState({
      ...item,
      contact: item.contact || { email: '', linkedin: '', github: '', instagram: '' },
    });

    const handleChange = (field: string, value: any) => {
        if (field.startsWith('contact.')) {
            const contactField = field.split('.')[1];
            setFormData(prev => ({
                ...prev,
                contact: { ...(prev.contact || { email: '', linkedin: '', github: '', instagram: '' }), [contactField]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as TeamMember);
    };
    
    const fields = [
        { name: 'name', label: 'Name' },
        { name: 'role', label: 'Role' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'imageHint', label: 'Image Hint' },
        { name: 'bio', label: 'Biography', type: 'textarea' },
        { name: 'contact.email', label: 'Email' },
        { name: 'contact.linkedin', label: 'LinkedIn URL' },
        { name: 'contact.github', label: 'GitHub URL' },
        { name: 'contact.instagram', label: 'Instagram URL' },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                 <CardHeader>
                    <CardTitle>{item.id ? 'Edit Member' : 'Add New Member'}</CardTitle>
                </CardHeader>
                <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map(field => (
                            <div key={field.name} className="grid gap-2">
                                <Label htmlFor={field.name}>{field.label}</Label>
                                {field.type === 'textarea' ? (
                                    <Textarea id={field.name} value={(formData as any)[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} />
                                ) : (
                                    <Input id={field.name} value={field.name.startsWith('contact.') ? formData.contact?.[field.name.split('.')[1] as keyof typeof formData.contact] ?? '' : (formData as any)[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                            <Button type="submit">Save Member</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

const TeamForm = ({ item, onSave, onCancel }: { item: Partial<Team>, onSave: (item: Team) => void, onCancel: () => void }) => {
    const [formData, setFormData] = React.useState(item);

    const handleChange = (field: keyof Team, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Team);
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>{item.id ? 'Edit Team' : 'Add New Team'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Team Name</Label>
                            <Input id="name" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Team Description</Label>
                            <Textarea id="description" value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                            <Button type="submit">Save Team</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


export default function AdminTeamPage() {
    const { isAdmin } = useAdmin();
    const router = useRouter();
    const { content, setContent, isLoading } = useContent();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = React.useState(false);
    
    const [editingTeam, setEditingTeam] = React.useState<Partial<Team> | null>(null);
    const [deletingTeamId, setDeletingTeamId] = React.useState<number | null>(null);

    const [editingMember, setEditingMember] = React.useState<{ teamId: number, member: Partial<TeamMember> } | null>(null);
    const [deletingMember, setDeletingMember] = React.useState<{ teamId: number, memberId: number } | null>(null);

    React.useEffect(() => {
        if (!isAdmin && process.env.NODE_ENV === 'production') {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    const getNewId = (list: {id: number}[]) => list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;
    const getNewMemberId = (teams: Team[]) => {
        const allMemberIds = teams.flatMap(t => t.members.map(m => m.id));
        return allMemberIds.length > 0 ? Math.max(...allMemberIds) + 1 : 1;
    }
    
    // Team Handlers
    const handleTeamSave = (teamToSave: Team) => {
        const isNew = !teamToSave.id;
        const newTeam = isNew ? { ...teamToSave, id: getNewId(content.teams), members: [] } : teamToSave;

        setContent(prev => ({
            ...prev,
            teams: isNew ? [...prev.teams, newTeam] : prev.teams.map(t => t.id === newTeam..id ? newTeam : t),
        }));
        toast({ title: isNew ? "Team Added" : "Team Updated" });
        setEditingTeam(null);
    };

    const handleTeamDelete = () => {
        if (deletingTeamId === null) return;
        setContent(prev => ({
            ...prev,
            teams: prev.teams.filter(t => t.id !== deletingTeamId),
        }));
        toast({ title: "Team Deleted", variant: 'destructive' });
        setDeletingTeamId(null);
    };

    // Member Handlers
    const handleMemberSave = (memberToSave: TeamMember) => {
        if (!editingMember) return;
        const { teamId } = editingMember;
        const isNew = !memberToSave.id;
        const newMember = isNew ? { ...memberToSave, id: getNewMemberId(content.teams) } : memberToSave;
        
        setContent(prev => ({
            ...prev,
            teams: prev.teams.map(team => {
                if (team.id === teamId) {
                    const members = isNew 
                        ? [...team.members, newMember]
                        : team.members.map(m => m.id === newMember.id ? newMember : m);
                    return { ...team, members };
                }
                return team;
            })
        }));

        toast({ title: isNew ? "Member Added" : "Member Updated" });
        setEditingMember(null);
    };

    const handleMemberDelete = () => {
        if (!deletingMember) return;
        const { teamId, memberId } = deletingMember;
        setContent(prev => ({
            ...prev,
            teams: prev.teams.map(team => {
                if (team.id === teamId) {
                    return { ...team, members: team.members.filter(m => m.id !== memberId) };
                }
                return team;
            })
        }));
        toast({ title: "Member Deleted", variant: 'destructive' });
        setDeletingMember(null);
    };

    const handleSaveAll = () => {
        setIsSaving(true);
        setTimeout(() => {
            toast({ title: "Content Saved", description: "All team changes have been saved." });
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Manage Teams</h1>
                    <p className="text-muted-foreground">Add, edit, and manage your organization's teams and members.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setEditingTeam({})} disabled={isSaving}><Plus className="mr-2 h-4 w-4" /> Add Team</Button>
                    <Button onClick={handleSaveAll} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save All Changes
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {content.teams.map(team => (
                    <Card key={team.id}>
                        <CardHeader className="flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>{team.name}</CardTitle>
                                <CardDescription>{team.description}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setEditingTeam(team)}><Pencil className="mr-2 h-4 w-4" /> Edit Team</Button>
                                <Button variant="destructive" size="sm" onClick={() => setDeletingTeamId(team.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete Team</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <Button variant="outline" className="w-full mb-4">
                                        Show / Hide Members ({team.members.length})
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-4">
                                    {team.members.map(member => (
                                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={member.imageUrl} alt={member.name} />
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setEditingMember({ teamId: team.id, member })}><Pencil className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => setDeletingMember({ teamId: team.id, memberId: member.id })}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                    {team.members.length === 0 && <p className="text-center text-muted-foreground py-4">No members in this team yet.</p>}
                                     <Button onClick={() => setEditingMember({ teamId: team.id, member: { name: 'New Member', role: '', imageUrl: 'https://picsum.photos/400/400', imageHint: 'person portrait', bio: '', contact: { email: '', linkedin: '', github: '', instagram: '' } } })} className="w-full mt-4"><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modals and Dialogs */}
            {editingTeam && <TeamForm item={editingTeam} onSave={handleTeamSave} onCancel={() => setEditingTeam(null)} />}

            {editingMember && <MemberForm item={editingMember.member} onSave={handleMemberSave} onCancel={() => setEditingMember(null)} teamId={editingMember.teamId} />}
            
            <AlertDialog open={deletingTeamId !== null} onOpenChange={(open) => !open && setDeletingTeamId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Team?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete the team and all its members. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingTeamId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleTeamDelete}>Delete Team</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <AlertDialog open={deletingMember !== null} onOpenChange={(open) => !open && setDeletingMember(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Member?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this team member. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingMember(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleMemberDelete}>Delete Member</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
