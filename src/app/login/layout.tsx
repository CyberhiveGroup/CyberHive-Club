import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FirebaseClientProvider>
        {children}
    </FirebaseClientProvider>
  );
}
