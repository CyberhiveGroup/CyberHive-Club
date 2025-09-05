
'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers as initialTeamMembers } from "@/lib/data";
import Image from "next/image";
import type { TeamMember } from '@/lib/types';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const TEAM_MEMBERS_STORAGE_KEY = 'teamMembers';
const ABOUT_IMAGES_STORAGE_KEY = 'aboutImages';

function MemberImageDialog({ member, onSave, onOpenChange, open, children }: { member: TeamMember, onSave: (member: TeamMember) => void, onOpenChange: (open: boolean) => void, open: boolean, children: React.ReactNode }) {
    const [imageUrl, setImageUrl] = React.useState(member.imageUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setImageUrl(member.imageUrl);
    }, [member]);

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
        onSave({ ...member, imageUrl });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Avatar for {member.name}</DialogTitle>
                    <DialogDescription>Select a new image from your device.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex justify-center">
                         <Avatar className="h-44 w-44 hexagon">
                            <AvatarImage src={imageUrl} alt={member.name} className="hexagon object-cover" />
                            <AvatarFallback className="hexagon">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image</Label>
                        <div className="col-span-3 space-y-2">
                             <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
                             <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select from Device</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function SectionImageDialog({ imageUrl, onSave, onOpenChange, open, children }: { imageUrl: string, onSave: (newUrl: string) => void, onOpenChange: (open: boolean) => void, open: boolean, children: React.ReactNode }) {
    const [newImageUrl, setNewImageUrl] = React.useState(imageUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

     React.useEffect(() => {
        setNewImageUrl(imageUrl);
    }, [imageUrl]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Section Image</DialogTitle>
                    <DialogDescription>Select a new image from your device.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex justify-center">
                         <Image
                            src={newImageUrl}
                            alt="New section image preview"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover shadow-lg"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image</Label>
                        <div className="col-span-3 space-y-2">
                             <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
                             <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select from Device</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(newImageUrl)}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function AboutPage() {
    const { isAdmin } = useAdmin();
    const { toast } = useToast();
    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(initialTeamMembers);
    const [missionImageUrl, setMissionImageUrl] = React.useState("https://picsum.photos/800/600?random=20");
    const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null);
    const [isSectionImageDialogOpen, setIsSectionImageDialogOpen] = React.useState(false);

    React.useEffect(() => {
        try {
            const savedMembers = localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY);
            if (savedMembers) {
                setTeamMembers(JSON.parse(savedMembers));
            }

            const savedImages = localStorage.getItem(ABOUT_IMAGES_STORAGE_KEY);
             if (savedImages) {
                const images = JSON.parse(savedImages);
                setMissionImageUrl(images.missionImageUrl);
            }
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
        }
    }, []);

    const handleMemberImageSave = (updatedMember: TeamMember) => {
        const updatedMembers = teamMembers.map(m => m.id === updatedMember.id ? updatedMember : m);
        setTeamMembers(updatedMembers);
        localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(updatedMembers));
        setEditingMember(null);
        toast({ title: 'Avatar Updated!', description: `The avatar for ${updatedMember.name} has been updated.` });
    };

    const handleSectionImageSave = (newUrl: string) => {
        setMissionImageUrl(newUrl);
        localStorage.setItem(ABOUT_IMAGES_STORAGE_KEY, JSON.stringify({ missionImageUrl: newUrl }));
        setIsSectionImageDialogOpen(false);
        toast({ title: 'Image Updated!', description: 'The section image has been updated.' });
    };


  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      {editingMember && (
         <MemberImageDialog
            member={editingMember}
            onSave={handleMemberImageSave}
            open={!!editingMember}
            onOpenChange={(isOpen) => !isOpen && setEditingMember(null)}
        >
            <span />
        </MemberImageDialog>
      )}

       <SectionImageDialog
            imageUrl={missionImageUrl}
            onSave={handleSectionImageSave}
            open={isSectionImageDialogOpen}
            onOpenChange={setIsSectionImageDialogOpen}
        >
            <span />
       </SectionImageDialog>


      <section className="text-center">
        <h1 className="text-4xl font-headline font-bold uppercase tracking-wider text-primary sm:text-5xl md:text-6xl">
          About CyberHive
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          We are more than just a club; we are a community united by a passion for cybersecurity.
        </p>
      </section>

      <section className="mt-16 grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-bold text-primary uppercase">Our Mission</h2>
          <p className="text-muted-foreground">
            CyberHive is dedicated to fostering a collaborative environment for students to explore the vast field of cybersecurity. We aim to bridge the gap between academic knowledge and real-world application by providing hands-on training, hosting competitive events, and connecting members with industry professionals. Our goal is to empower the next generation of cybersecurity leaders with the skills, knowledge, and network to succeed.
          </p>
        </div>
        <div className="relative group">
          <Image
            src={missionImageUrl}
            alt="CyberHive team working together"
            width={800}
            height={600}
            data-ai-hint="team collaboration"
            className="rounded-lg object-cover shadow-lg"
          />
           {isAdmin && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" onClick={() => setIsSectionImageDialogOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Change Image
                </Button>
              </div>
            )}
        </div>
      </section>

      <section className="mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-headline font-bold uppercase tracking-wider sm:text-4xl md:text-5xl">Meet the Team</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">The leadership behind the hive mind.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:[&>*:nth-child(even)]:mt-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative w-48 h-56 mx-auto hexagon bg-card flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                 <Avatar className="h-44 w-44 hexagon">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} className="hexagon object-cover" />
                  <AvatarFallback className="hexagon">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isAdmin && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hexagon">
                        <Button variant="ghost" size="icon" onClick={() => setEditingMember(member)}>
                            <Edit className="h-6 w-6 text-white" />
                        </Button>
                    </div>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold font-headline uppercase">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

    