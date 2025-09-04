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

export function HexagonLink({ icon, title, href, className }: HexagonLinkProps) {
  return (
    <div
      className={cn(
        'hexagon-border group',
        className
      )}
    >
      <Link
        href={href}
        className="hexagon-interactive relative w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 cursor-pointer text-foreground group-hover:text-primary group-focus:outline-none group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-background bg-card/50 group-hover:bg-card"
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {React.cloneElement(icon as React.ReactElement, {
            className: 'h-10 w-10 mb-2',
          })}
        </div>
        <h3 className="text-sm font-headline font-bold uppercase tracking-wide transition-transform duration-300 group-hover:scale-110">{title}</h3>
      </Link>
    </div>
  );
}
