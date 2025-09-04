'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HexagonLinkProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  className?: string;
  delay?: string;
}

export function HexagonLink({ icon, title, href, className, delay }: HexagonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'hexagon-interactive relative w-32 h-36 flex flex-col items-center justify-center p-2 text-center transition-all duration-300 cursor-pointer text-foreground hover:text-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background animate-hexagon-float',
        'bg-card/50 hover:bg-card',
        className
      )}
      style={{ animationDelay: delay }}
    >
        <div className="transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            className: 'h-8 w-8 mb-2',
          })}
        </div>
        <h3 className="text-sm font-headline font-bold uppercase">{title}</h3>
    </Link>
  );
}
