'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

interface HexagonFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function HexagonFeature({ icon, title, description, className }: HexagonFeatureProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const id = React.useId();

  return (
    <div className={cn('relative w-64 h-72 group my-2 md:my-0', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hexagon-interactive w-full h-full flex flex-col items-center justify-center p-4 text-center transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
          isOpen ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-accent'
        )}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {React.cloneElement(icon as React.ReactElement, {
            className: 'h-12 w-12 mb-2',
          })}
        </div>
        <h3 className="text-xl font-headline font-bold uppercase">{title}</h3>
        <div className="absolute bottom-4">
          {isOpen ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </div>
      </button>
      <div
        id={id}
        className={cn(
          'hexagon-interactive-content absolute top-full left-1/2 -translate-x-1/2 w-[280px] p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg z-10 transition-all duration-500 origin-top',
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        )}
      >
        <p>{description}</p>
      </div>
    </div>
  );
}
