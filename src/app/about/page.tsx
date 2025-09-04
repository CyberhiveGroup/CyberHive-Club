import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers } from "@/lib/data";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
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
        <div>
          <Image
            src="https://picsum.photos/800/600?random=20"
            alt="CyberHive team working together"
            width={800}
            height={600}
            data-ai-hint="team collaboration"
            className="rounded-lg object-cover shadow-lg"
          />
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
