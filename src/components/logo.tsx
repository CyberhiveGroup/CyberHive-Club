
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { transformGoogleDriveUrl } from '@/lib/utils';
import { useContent } from '@/hooks/use-content';
import { useSidebar } from '@/components/ui/sidebar';

export function Logo({ className, onClick }: { className?: string, onClick?: () => void }) {
  const { content } = useContent();
  const sidebar = useSidebar();
  
  // Safely determine if the sidebar is collapsed. Default to false if sidebar context is not available.
  const isCollapsed = sidebar?.state === 'collapsed';
  
  const logoUrl = content.images?.logo?.url || "/logo.png";
  const transformedLogoUrl = transformGoogleDriveUrl(logoUrl);

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)} onClick={onClick}>
      {transformedLogoUrl && <Image src={transformedLogoUrl} alt="CyberHive Logo" width={48} height={48} className="transition-all" />}
      <span className={cn(
        "font-headline text-2xl font-bold text-foreground transition-opacity duration-300",
        isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
      )}>
        CyberHive
      </span>
    </Link>
  );
}
