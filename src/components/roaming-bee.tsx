'use client';

import { cn } from "@/lib/utils";
import React from "react";

export function RoamingBee() {
  const [isClient, setIsClient] = React.useState(false);
  const beeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const beeCount = 5;

  React.useEffect(() => {
    setIsClient(true);
    beeRefs.current = beeRefs.current.slice(0, beeCount);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      beeRefs.current.forEach(bee => {
        if (!bee) return;

        const beeRect = bee.getBoundingClientRect();
        const beeCenterX = beeRect.left + beeRect.width / 2;
        const beeCenterY = beeRect.top + beeRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(cursorX - beeCenterX, 2) + Math.pow(cursorY - beeCenterY, 2)
        );

        if (distance < 150) { // scatter radius
          const angle = Math.atan2(cursorY - beeCenterY, cursorX - beeCenterX);
          const moveX = Math.cos(angle) * -70; // scatter distance
          const moveY = Math.sin(angle) * -70;
          bee.style.setProperty('--scatter-x', `${moveX}px`);
          bee.style.setProperty('--scatter-y', `${moveY}px`);
          bee.classList.add('scatter');
        } else {
          bee.classList.remove('scatter');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  // Three different animation paths to make the movement more random
  const animationPaths = ['roam1', 'roam2', 'roam3'];
  
  if (!isClient) {
    return null;
  }

  return (
    <>
      {Array.from({ length: beeCount }).map((_, i) => {
        const animationName = animationPaths[i % animationPaths.length];
        const animationDuration = `${Math.random() * 15 + 15}s`; // 15-30 seconds
        const animationDelay = `${Math.random() * 10}s`; // 0-10 seconds delay
        
        return (
          <div
            key={i}
            ref={el => beeRefs.current[i] = el}
            className="roaming-bee-container"
            style={{
              animationName,
              animationDuration,
              animationDelay,
            }}
          >
            <div className="bee">
              <div className="wing wing-left"></div>
              <div className="wing wing-right"></div>
              <div className="body">
                <div className="stripe"></div>
                <div className="stripe"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
