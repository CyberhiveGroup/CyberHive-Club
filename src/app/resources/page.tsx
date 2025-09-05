import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Download } from "lucide-react";
import Link from 'next/link';

const resources = [
  {
    title: 'Cybersecurity Starter Guide',
    description: 'A comprehensive PDF guide for beginners covering the fundamental concepts of cybersecurity.',
    type: 'PDF',
    icon: <FileText className="h-6 w-6 text-primary" />,
    href: '#',
  },
  {
    title: 'Top 10 Pentesting Tools',
    description: 'A curated list of the most essential tools for penetration testing and ethical hacking.',
    type: 'Link',
    icon: <LinkIcon className="h-6 w-6 text-primary" />,
    href: '#',
  },
  {
    title: 'CTF Practice Arena',
    description: 'An external platform with a wide range of challenges to practice your Capture The Flag skills.',
    type: 'External Link',
    icon: <LinkIcon className="h-6 w-6 text-primary" />,
    href: '#',
  },
  {
    title: 'Network Analysis Cheatsheet',
    description: 'A handy cheatsheet for common commands and filters used in network traffic analysis with Wireshark.',
    type: 'PDF',
    icon: <FileText className="h-6 w-6 text-primary" />,
    href: '#',
  },
  {
    title: 'Secure Coding Best Practices',
    description: 'A guide outlining best practices for writing secure code across different programming languages.',
    type: 'PDF',
    icon: <FileText className="h-6 w-6 text-primary" />,
    href: '#',
  },
    {
    title: 'Awesome Hacking Repositories',
    description: 'A curated list of GitHub repositories for hacking, pentesting, and security.',
    type: 'Link',
    icon: <LinkIcon className="h-6 w-6 text-primary" />,
    href: '#',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Resources
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          A curated collection of tools, guides, and links to aid your cybersecurity journey.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20">
             <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-shrink-0">{resource.icon}</div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <Link href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-primary hover:underline">
                {resource.type.includes('Link') ? 'Visit Link' : 'Download'} 
                <Download className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
