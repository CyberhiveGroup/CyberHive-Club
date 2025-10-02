
'use client';
import * as React from 'react';
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Trash2, PlusCircle } from 'lucide-react';
import type { Team, TeamMember } from '@/lib/types';
import Image from 'next/image';

export default function AdminAboutPage() {
    const { content, isLoading, saveContent, setContent } = useContent();
    const [isSaving, setIsSaving] = React.useState(false);

    if (isLoading) return <div>Loading...</div>;

    const handleAboutTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                [name]: value,
            }
        }));
    };
    
    const handleTeamChange = (teamIndex: number, field: keyof Team, value: string) => {
        const newTeams = [...content.teams];
        newTeams[teamIndex] = { ...newTeams[teamIndex], [field]: value };
        setContent(prev => ({ ...prev, teams: newTeams }));
    };

    const handleMemberChange = (teamIndex: number, memberIndex: number, field: keyof TeamMember, value: string | object) => {
         const newTeams = [...content.teams];
         if (typeof value === 'object') {
             newTeams[teamIndex].members[memberIndex] = { ...newTeams[teamIndex].members[memberIndex], [field]: { ...newTeams[teamIndex].members[memberIndex][field as keyof TeamMember] as object, ...value as object } };
         } else {
            newTeams[teamIndex].members[memberIndex] = { ...newTeams[teamIndex].members[memberIndex], [field]: value };
         }
        
        setContent(prev => ({ ...prev, teams: newTeams }));
    };
    
    const addNewTeam = () => {
        const newTeam: Team = {
            id: content.teams.length > 0 ? Math.max(...content.teams.map(t => t.id)) + 1 : 1,
            name: 'New Team',
            description: 'A brief description of the new team.',
            members: [],
        };
        setContent(prev => ({ ...prev, teams: [...prev.teams, newTeam] }));
    };
    
    const deleteTeam = (teamIndex: number) => {
        const newTeams = content.teams.filter((_, i) => i !== teamIndex);
        setContent(prev => ({ ...prev, teams: newTeams }));
    };

    const addNewMember = (teamIndex: number) => {
        const newMember: TeamMember = {
            id: Math.random(), // Temporary ID
            name: 'New Member',
            role: 'Role',
            imageUrl: 'https://picsum.photos/400/400?random=' + Math.random(),
            imageHint: 'person portrait',
            bio: '',
            contact: { email: '', linkedin: '', github: '' },
        };
        const newTeams = [...content.teams];
        newTeams[teamIndex].members.push(newMember);
        setContent(prev => ({ ...prev, teams: newTeams }));
    }

    const deleteMember = (teamIndex: number, memberIndex: number) => {
        const newTeams = [...content.teams];
        newTeams[teamIndex].members = newTeams[teamIndex].members.filter((_, i) => i !== memberIndex);
        setContent(prev => ({ ...prev, teams: newTeams }));
    }
    
    const handleSaveChanges = async () => {
        setIsSaving(true);
        await saveContent(content);
        setIsSaving(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline">Manage About Page</h1>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            
            <Card>
                <CardHeader><CardTitle>About Page Content</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={content.about.title} onChange={handleAboutTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Textarea id="subtitle" name="subtitle" value={content.about.subtitle} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="missionTitle">Mission Title</Label>
                        <Input id="missionTitle" name="missionTitle" value={content.about.missionTitle} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="missionParagraph">Mission Paragraph</Label>
                        <Textarea id="missionParagraph" name="missionParagraph" value={content.about.missionParagraph} onChange={handleAboutTextChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="teamTitle">Team Section Title</Label>
                        <Input id="teamTitle" name="teamTitle" value={content.about.teamTitle} onChange={handleAboutTextChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="teamSubtitle">Team Section Subtitle</Label>
                        <Textarea id="teamSubtitle" name="teamSubtitle" value={content.about.teamSubtitle} onChange={handleAboutTextChange} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Manage Teams</CardTitle>
                    <Button variant="outline" size="sm" onClick={addNewTeam}><PlusCircle className="mr-2 h-4 w-4"/>Add Team</Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {content.teams.map((team, teamIndex) => (
                        <Card key={team.id} className="p-4 bg-muted/20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">{team.name}</h3>
                                <Button variant="destructive" size="icon" onClick={() => deleteTeam(teamIndex)}><Trash2 className="h-4 w-4"/></Button>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Team Name</Label>
                                    <Input value={team.name} onChange={(e) => handleTeamChange(teamIndex, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Team Description</Label>
                                    <Textarea value={team.description} onChange={(e) => handleTeamChange(teamIndex, 'description', e.target.value)} />
                                </div>
                                
                                <h4 className="font-semibold pt-4">Members</h4>
                                <div className="space-y-4">
                                    {team.members.map((member, memberIndex) => (
                                        <Card key={member.id} className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                                    <div className="flex items-center gap-4">
                                                        <Image src={member.imageUrl} alt={member.name} width={80} height={80} className="rounded-full" />
                                                        <div className="space-y-2 flex-1">
                                                            <Label>Name</Label>
                                                            <Input value={member.name} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'name', e.target.value)} />
                                                            <Label>Role</Label>
                                                            <Input value={member.role} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'role', e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Bio</Label>
                                                        <Textarea value={member.bio} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'bio', e.target.value)} rows={4} />
                                                        <Label>Image URL</Label>
                                                        <Input value={member.imageUrl} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'imageUrl', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                         <h5 className="font-semibold pt-2">Contact Info</h5>
                                                         <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Email</Label>
                                                                <Input value={member.contact.email} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'contact', { email: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>LinkedIn</Label>
                                                                <Input value={member.contact.linkedin} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'contact', { linkedin: e.target.value })} />
                                                            </div>
                                                             <div className="space-y-2">
                                                                <Label>GitHub</Label>
                                                                <Input value={member.contact.github} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'contact', { github: e.target.value })} />
                                                            </div>
                                                             <div className="space-y-2">
                                                                <Label>Instagram (Optional)</Label>
                                                                <Input value={member.contact.instagram || ''} onChange={(e) => handleMemberChange(teamIndex, memberIndex, 'contact', { instagram: e.target.value })} />
                                                            </div>
                                                         </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="ml-4" onClick={() => deleteMember(teamIndex, memberIndex)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => addNewMember(teamIndex)}>
                                    <PlusCircle className="mr-2 h-4 w-4"/>Add Member to {team.name}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
