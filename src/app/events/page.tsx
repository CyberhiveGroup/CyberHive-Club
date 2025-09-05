
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter, ArrowUpDown, Edit, Trash2, Shield, ShieldCheck, LogOut, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { upcomingEvents as initialUpcomingEvents, pastEvents as initialPastEvents } from '@/lib/data';
import type { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const eventCategories = ['Workshop', 'Competition', 'Talk', 'Social'];

function EventCard({ event, isAdmin, onEdit, onDelete }: { event: Event, isAdmin: boolean, onEdit: (event: Event) => void, onDelete: (eventId: number) => void }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10">
      <Image
        src={event.imageUrl}
        alt={event.title}
        width={600}
        height={400}
        data-ai-hint={event.imageHint}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
        <CardDescription>{event.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
       {isAdmin && (
        <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="icon" onClick={() => onEdit(event)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Event</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Event</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this event.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(event.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </CardFooter>
       )}
    </Card>
  );
}

function AdminModeToggle({ isAdmin, onAdminChange }: { isAdmin: boolean, onAdminChange: (isAdmin: boolean) => void }) {
    const [isAlertOpen, setIsAlertOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const { toast } = useToast();

    const handlePasswordSubmit = () => {
        if (password === 'iamadmin') {
            onAdminChange(true);
            setIsAlertOpen(false);
            toast({
                title: "Admin Mode Activated",
                description: "You can now add, edit, and delete events.",
            });
        } else {
            toast({
                title: "Incorrect Password",
                description: "Please try again.",
                variant: "destructive",
            });
        }
        setPassword('');
    };

    const handleLogout = () => {
        onAdminChange(false);
        toast({
            title: "Admin Mode Deactivated",
        });
    }

    if (isAdmin) {
        return (
            <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <Label htmlFor="admin-mode" className="text-primary font-medium">Admin Mode Active</Label>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Deactivate Admin Mode">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>
        )
    }

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Admin Mode</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Admin Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        To access editing features, please enter the administrator password.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePasswordSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function EventFormDialog({ event, onSave, onOpenChange, open, children }: { event: Partial<Event> | null, onSave: (event: Event, placement: 'upcoming' | 'past') => void, onOpenChange: (open: boolean) => void, open: boolean, children: React.ReactNode }) {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<Event['category']>('Workshop');
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageHint, setImageHint] = React.useState('');
  const [placement, setPlacement] = React.useState<'upcoming' | 'past'>('upcoming');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.date || '');
      setDescription(event.description || '');
      setCategory(event.category || 'Workshop');
      setImageUrl(event.imageUrl || 'https://picsum.photos/600/400');
      setImageHint(event.imageHint || '');
    } else {
      // Reset for new event
      setTitle('');
      setDate('');
      setDescription('');
      setCategory('Workshop');
      setImageUrl('https://picsum.photos/600/400');
      setImageHint('');
    }
  }, [event]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newEvent: Event = {
      id: event?.id || Date.now(),
      title,
      date,
      description,
      category,
      imageUrl,
      imageHint,
    };
    onSave(newEvent, placement);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event?.id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          <DialogDescription>
            {event?.id ? 'Make changes to your event here.' : 'Add a new event to your list.'} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3" placeholder="Month Day, Year" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select value={category} onValueChange={(value: Event['category']) => setCategory(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {eventCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image</Label>
            <div className="col-span-3 space-y-2">
                <Image src={imageUrl} alt="Event image preview" width={200} height={150} className="rounded-md object-cover" />
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Select from Device</Button>
            </div>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
            <Input id="imageHint" value={imageHint} onChange={(e) => setImageHint(e.target.value)} className="col-span-3" placeholder="e.g. 'team collaboration'"/>
          </div>
           {!event?.id && (
             <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Placement</Label>
               <RadioGroup defaultValue="upcoming" className="col-span-3 flex gap-4" onValueChange={(value: 'upcoming' | 'past') => setPlacement(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upcoming" id="r-upcoming" />
                    <Label htmlFor="r-upcoming">Upcoming</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="past" id="r-past" />
                    <Label htmlFor="r-past">Past</Label>
                  </div>
                </RadioGroup>
            </div>
           )}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const UPCOMING_EVENTS_STORAGE_KEY = 'upcomingEvents';
const PAST_EVENTS_STORAGE_KEY = 'pastEvents';

function EventsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'past' ? 'past' : 'upcoming';
  
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [upcomingEvents, setUpcomingEvents] = React.useState<Event[]>([]);
  const [pastEvents, setPastEvents] = React.useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = React.useState<Partial<Event> | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const savedUpcoming = localStorage.getItem(UPCOMING_EVENTS_STORAGE_KEY);
      const savedPast = localStorage.getItem(PAST_EVENTS_STORAGE_KEY);

      if (savedUpcoming) {
        setUpcomingEvents(JSON.parse(savedUpcoming));
      } else {
        setUpcomingEvents(initialUpcomingEvents);
      }
      if (savedPast) {
        setPastEvents(JSON.parse(savedPast));
      } else {
        setPastEvents(initialPastEvents);
      }
    } catch (error) {
      console.error("Failed to parse events from localStorage", error);
      setUpcomingEvents(initialUpcomingEvents);
      setPastEvents(initialPastEvents);
    }
  }, []);

  const persistEvents = (key: string, data: Event[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingEvent(null); // Clear any editing event
    setIsFormOpen(true);
  };
  
  const handleDelete = (eventId: number) => {
      const eventToDelete = upcomingEvents.find(e => e.id === eventId) || pastEvents.find(e => e.id === eventId);
      if (!eventToDelete) return;
      
      const isUpcoming = upcomingEvents.some(e => e.id === eventId);

      if (isUpcoming) {
        const updatedUpcoming = upcomingEvents.filter(e => e.id !== eventId);
        setUpcomingEvents(updatedUpcoming);
        persistEvents(UPCOMING_EVENTS_STORAGE_KEY, updatedUpcoming);
      } else {
        const updatedPast = pastEvents.filter(e => e.id !== eventId);
        setPastEvents(updatedPast);
        persistEvents(PAST_EVENTS_STORAGE_KEY, updatedPast);
      }

      toast({
          title: "Event Deleted",
          description: `'${eventToDelete.title}' has been removed.`,
          action: <Button variant="secondary" onClick={() => handleRestore(eventToDelete, isUpcoming ? 'upcoming' : 'past')}>Undo</Button>
      })
  };
  
  const handleRestore = (event: Event, list: 'upcoming' | 'past') => {
      if (list === 'upcoming') {
        const restored = [...upcomingEvents, event].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setUpcomingEvents(restored);
        persistEvents(UPCOMING_EVENTS_STORAGE_KEY, restored);
      } else {
        const restored = [...pastEvents, event].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPastEvents(restored);
        persistEvents(PAST_EVENTS_STORAGE_KEY, restored);
      }
       toast({
          title: "Event Restored",
          description: `'${event.title}' has been restored.`,
        })
  };

  const handleSave = (event: Event, placement: 'upcoming' | 'past') => {
    if (editingEvent?.id) { // Editing existing event
        const isUpcoming = upcomingEvents.some(e => e.id === event.id);
        if (isUpcoming) {
            const updated = upcomingEvents.map(e => e.id === event.id ? event : e);
            setUpcomingEvents(updated);
            persistEvents(UPCOMING_EVENTS_STORAGE_KEY, updated);
        } else {
            const updated = pastEvents.map(e => e.id === event.id ? event : e);
            setPastEvents(updated);
            persistEvents(PAST_EVENTS_STORAGE_KEY, updated);
        }
        toast({ title: 'Event Updated!', description: `'${event.title}' has been successfully updated.` });
    } else { // Adding new event
      if (placement === 'upcoming') {
        const updated = [...upcomingEvents, event];
        setUpcomingEvents(updated);
        persistEvents(UPCOMING_EVENTS_STORAGE_KEY, updated);
      } else {
        const updated = [...pastEvents, event];
        setPastEvents(updated);
        persistEvents(PAST_EVENTS_STORAGE_KEY, updated);
      }
      toast({ title: 'Event Added!', description: `'${event.title}' has been successfully created.` });
    }
    setIsFormOpen(false);
  };


  const filteredUpcomingEvents = React.useMemo(() => {
    return upcomingEvents
      .filter((event) => category === 'All' || event.category === category)
      .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [category, searchTerm, upcomingEvents]);

  const sortedPastEvents = React.useMemo(() => {
    const filtered = pastEvents
      .filter((event) => category === 'All' || event.category === category)
      .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder, pastEvents, category, searchTerm]);
  
  const allCategories = ['All', ...eventCategories];

  const currentEvents = activeTab === 'upcoming' ? filteredUpcomingEvents : sortedPastEvents;
  const showNoEventsMessage = currentEvents.length === 0;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <EventFormDialog
        event={editingEvent}
        onSave={handleSave}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      >
        {/* This is a placeholder for the trigger, the actual trigger is below */}
        <span />
      </EventFormDialog>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Events Hub
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Engage with the community, learn new skills, and compete with the best.
        </p>
      </section>

      <div className="flex justify-end items-center mb-4 gap-4">
        {isAdmin && (
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Event
          </Button>
        )}
        <AdminModeToggle isAdmin={isAdmin} onAdminChange={setIsAdmin} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <ListFilter className="h-5 w-5 text-muted-foreground" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             {activeTab === 'past' && (
                <div className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by date" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            )}
          </div>

        <TabsContent value="upcoming">
          {showNoEventsMessage ? (
              <div className="text-center text-muted-foreground py-16">
                  <h2 className="text-2xl font-semibold mb-2">Stay Tuned!</h2>
                  <p>There are no upcoming events at the moment. Check back soon for new announcements!</p>
              </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map((event) => <EventCard key={event.id} event={event} isAdmin={isAdmin} onEdit={handleEdit} onDelete={() => handleDelete(event.id)} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
         {showNoEventsMessage ? (
              <div className="text-center text-muted-foreground py-16">
                  <h2 className="text-2xl font-semibold mb-2">No Past Events Found</h2>
                  <p>Looks like there are no past events matching your search criteria.</p>
              </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map((event) => <EventCard key={event.id} event={event} isAdmin={isAdmin} onEdit={handleEdit} onDelete={() => handleDelete(event.id)} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function EventsPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <EventsPageContent />
    </React.Suspense>
  );
}

    
