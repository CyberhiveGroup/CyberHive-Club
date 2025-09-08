
import { Mail, MapPin, Github, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';

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

      <div className="max-w-lg mx-auto bg-card p-8 rounded-lg shadow-lg">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6 text-center">Contact Information</h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">Email</span>
                  <a href="mailto:cyberhive@ggits.org" className="hover:text-primary transition-colors">cyberhive@ggits.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                 <div className="flex flex-col">
                    <span className="font-semibold text-foreground">Address</span>
                    <span>Gyan Ganga Institute of Technology and Sciences, Jabalpur M.P., India</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-headline font-bold mb-6 text-center pt-6 border-t">Follow Us</h2>
            <div className="flex items-center justify-center gap-6">
                <Link href="mailto:cyberhive@ggits.org" aria-label="Email" className="text-muted-foreground transition-colors hover:text-primary">
                    <Mail className="h-8 w-8" />
                </Link>
                <Link href="#" aria-label="WhatsApp" className="text-muted-foreground transition-colors hover:text-primary">
                    <MessageCircle className="h-8 w-8" />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary">
                    <Instagram className="h-8 w-8" />
                </Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground transition-colors hover:text-primary">
                    <Twitter className="h-8 w-8" />
                </Link>
                <Link href="#" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
                    <Github className="h-8 w-8" />
                </Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
                    <Linkedin className="h-8 w-8" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
