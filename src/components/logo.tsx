
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { transformGoogleDriveUrl } from '@/lib/utils';
import { useContent } from '@/hooks/use-content';

export function Logo({ className, onClick }: { className?: string, onClick?: () => void }) {
  const { content } = useContent();
  const logoUrl = content.images?.logo?.url || "/logo.png";

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)} onClick={onClick}>
      <Image src={transformGoogleDriveUrl(logoUrl)} alt="CyberHive Logo" width={80} height={80} />
      <span className="font-headline text-3xl font-bold text-foreground">CyberHive</span>
    </Link>
  );
}
