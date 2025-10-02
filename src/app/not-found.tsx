
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Frown } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ContentProvider } from '@/context/ContentContext';

export default function NotFound() {
  return (
    <FirebaseClientProvider>
      <ContentProvider>
        <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1 flex items-center justify-center text-center">
                 <div className="flex flex-col items-center gap-4">
                    <Frown className="h-24 w-24 text-primary" />
                    <h1 className="text-6xl font-headline font-bold text-primary">404</h1>
                    <p className="text-2xl font-semibold text-foreground">Oops! Page Not Found</p>
                    <p className="max-w-md text-muted-foreground">
                        It seems you've wandered into an uncharted area of the hive. The page you are looking for does not exist.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/">Return to the Hive</Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
      </ContentProvider>
    </FirebaseClientProvider>
  );
}
