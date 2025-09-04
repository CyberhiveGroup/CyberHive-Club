import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.33a2 2 0 0 0-1 1.73v8.88a2 2 0 0 0 1 1.73l8.57 4.15a2 2 0 0 0 1.66 0l8.57-4.15a2 2 0 0 0 1-1.73V8.06a2 2 0 0 0-1-1.73L12.83 2.18z"></path>
        <path d="m12 8 6 3"></path>
        <path d="m12 8-6 3"></path>
        <path d="m12 8 3 9-3-3-3 3 3-9"></path>
        <path d="m6 11 6 3"></path>
      </svg>
      <span className="font-headline text-xl font-bold text-foreground">CyberHive</span>
    </div>
  );
}
