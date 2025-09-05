
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter, ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { upcomingEvents, pastEvents } from '@/lib/data';
import type { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';

const eventCategories = ['All', 'Workshop', 'Competition', 'Talk', 'Social'];

function EventCard({ event }: { event: Event }) {
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
       <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Event</span>
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
               <span className="sr-only">Delete Event</span>
            </Button>
        </CardFooter>
    </Card>
  );
}

function EventsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'past' ? 'past' : 'upcoming';
  
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [sortOrder, setSortOrder] = React.useState('desc');

  const filteredUpcomingEvents = React.useMemo(() => {
    return upcomingEvents
      .filter((event) => category === 'All' || event.category === category)
      .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [category, searchTerm]);

  const sortedPastEvents = React.useMemo(() => {
    return [...pastEvents].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Events Hub
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Engage with the community, learn new skills, and compete with the best.
        </p>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
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
                  {eventCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpcomingEvents.length > 0 ? (
              filteredUpcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-muted-foreground col-span-full text-center">No upcoming events match your criteria.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="flex justify-end mb-8">
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
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedPastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
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
