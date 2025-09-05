'use client';
import React from 'react';

export function HoneycombBackground() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
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
      className="absolute inset-0 bg-background overflow-hidden"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 bg-primary/5 opacity-50"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          background:
            'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.2), transparent 75%)',
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
