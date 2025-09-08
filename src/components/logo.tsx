
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image src="/logo.png" alt="CyberHive Logo" width={28} height={28} />
      <span className="font-headline text-xl font-bold text-foreground">CyberHive</span>
    </div>
  );
}
