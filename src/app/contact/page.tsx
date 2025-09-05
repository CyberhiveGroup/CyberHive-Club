
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from './contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          Get In Touch
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          Have a question, suggestion, or want to partner with us? We'd love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-bold mb-4">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span>cyberhive@ggits.org</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span>Gyan Ganga Institute of Technology and Sciences, Jabalpur M.P., India</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-headline font-bold mb-4">Follow Us</h2>
            <div className="flex items-center gap-6">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-7 w-7" />
              </Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-7 w-7" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-7 w-7" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">Send Us a Message</h2>
          <p className="text-muted-foreground mb-6">Your message will be automatically routed to the correct department by our AI assistant.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
