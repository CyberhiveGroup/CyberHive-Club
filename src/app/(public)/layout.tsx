
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { useContent } from '@/hooks/use-content';
import { ContentProvider } from '@/context/ContentContext';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentProvider>
      <div className="relative flex min-h-screen flex-col">
        <MainNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </ContentProvider>
  );
}
