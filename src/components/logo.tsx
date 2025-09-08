
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image src="/logo.png" alt="CyberHive Logo" width={48} height={48} />
      <span className="font-headline text-2xl font-bold text-foreground">CyberHive</span>
    </div>
  );
}
