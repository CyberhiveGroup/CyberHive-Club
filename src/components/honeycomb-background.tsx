
'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export function HoneycombBackground({ isRevealed }: { isRevealed: boolean }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        containerRef.current.style.setProperty('--local-mouse-x', `${localX}px`);
        containerRef.current.style.setProperty('--local-mouse-y', `${localY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 bg-background overflow-hidden",
        isRevealed ? 'revealed' : ''
      )}
      style={
        {
          '--local-mouse-x': '50%',
          '--local-mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      <div
        className="spotlight-effect absolute inset-0 bg-primary/5"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          background:
            'radial-gradient(350px circle at var(--local-mouse-x) var(--local-mouse-y), hsl(var(--primary) / 0.2), transparent 75%)',
        }}
      ></div>
      <div className="honeycomb-container">
        {Array.from({ length: 150 }).map((_, i) => (
          <div key={i} className="honeycomb-cell"></div>
        ))}
      </div>
    </div>
  );
}
