import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cslClasses } from "@/lib/data";
import Image from "next/image";

export default function CSLClassesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Cybersecurity Leadership (CSL) Classes
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Level up your skills with our comprehensive CSL curriculum. From beginner to advanced, we have a class for you.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cslClasses.map((cslClass) => (
          <Card key={cslClass.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
            <Image
              src={cslClass.imageUrl}
              alt={cslClass.title}
              width={600}
              height={400}
              data-ai-hint={cslClass.imageHint}
              className="h-48 w-full object-cover"
            />
            <CardHeader>
              <CardTitle className="font-headline text-xl">{cslClass.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{cslClass.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold">Register Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
