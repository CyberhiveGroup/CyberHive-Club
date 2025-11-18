
// This layout is intentionally simple.
// The root layout handles the Firebase provider.
export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
