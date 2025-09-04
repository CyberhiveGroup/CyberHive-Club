import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Calendar, Users } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { upcomingEvents } from "@/lib/data";
import { RoamingBee } from "@/components/roaming-bee";
import { HexagonFeature } from "@/components/hexagon-feature";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
           <RoamingBee />
          <div className="absolute inset-0 bg-background overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-50" style={{clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'}}></div>
            <div className="honeycomb-container">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="honeycomb-cell"></div>
              ))}
            </div>
          </div>
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-primary uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to CyberHive
              </h1>
              <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                The premier cybersecurity club for students. We are a community of aspiring security professionals, learning, sharing, and building the future of digital defense.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold uppercase tracking-wider">
                  <Link href="/csl-classes">Explore CSL Classes</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="font-bold uppercase tracking-wider">
                  <Link href="/about">About The Club <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
             <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">Our Core Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Click on a cell to learn more about our hive.
              </p>
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 w-full max-w-4xl mx-auto">
                <HexagonFeature
                  icon={<ShieldCheck />}
                  title="Hands-On Learning"
                  description="Engage in practical workshops and CSL classes designed to build real-world cybersecurity skills."
                  className="md:-mr-8"
                />
                <HexagonFeature
                  icon={<Calendar />}
                  title="Exciting Events"
                  description="Participate in competitions, talks from industry experts, and networking events."
                  className="md:-ml-8 md:mt-32"
                   />
                <HexagonFeature
                  icon={<Users />}
                  title="Community-Driven"
                  description="Join a vibrant community of peers and mentors passionate about cybersecurity."
                   className="md:-mr-8 md:mt-64"
                />
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="w-full py-12 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Don't miss out on our next big thing. See what's on the horizon.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <Card key={event.id} className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 bg-background">
                  <Link href="/events" className="group">
                    <div className="overflow-hidden">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        width={600}
                        height={400}
                        data-ai-hint={event.imageHint}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline uppercase">{event.title}</CardTitle>
                      <CardDescription>{event.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="uppercase tracking-wider">
                <Link href="/events">View All Events <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
