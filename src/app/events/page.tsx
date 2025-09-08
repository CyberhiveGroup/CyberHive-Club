
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { useContent } from '@/hooks/use-content';


const eventCategories = ['Workshop', 'Competition', 'Talk', 'Social'];

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
    </Card>
  );
}


function EventsPageContent() {
  const { content, isLoading } = useContent();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'past' ? 'past' : 'upcoming';
  
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [sortOrder, setSortOrder] = React.useState('desc');

  const { upcomingEvents, pastEvents } = content;

  const filteredUpcomingEvents = React.useMemo(() => {
    if (!upcomingEvents) return [];
    return upcomingEvents
      .filter((event) => category === 'All' || event.category === category)
      .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [category, searchTerm, upcomingEvents]);

  const sortedPastEvents = React.useMemo(() => {
    if (!pastEvents) return [];
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

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 text-center">Loading events...</div>;
  }
  
  const currentEvents = activeTab === 'upcoming' ? filteredUpcomingEvents : sortedPastEvents;
  const showNoEventsMessage = currentEvents.length === 0;

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
              {currentEvents.map((event) => <EventCard key={event.id} event={event} />)}
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
              {currentEvents.map((event) => <EventCard key={event.id} event={event} />)}
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
