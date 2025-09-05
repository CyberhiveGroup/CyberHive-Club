
'use client';

import { cn } from "@/lib/utils";
import React from "react";

export function RoamingBee() {
  const [isClient, setIsClient] = React.useState(false);
  const beeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const followerBeeRef = React.useRef<HTMLDivElement | null>(null);
  const beeCount = 4; // 4 roaming + 1 follower

  React.useEffect(() => {
    setIsClient(true);
    beeRefs.current = beeRefs.current.slice(0, beeCount);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    // Get the hero text element
    const heroText = document.querySelector('h1');

    const handleMouseMove = (e: MouseEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Follower bee
      if (followerBeeRef.current) {
        followerBeeRef.current.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px) rotate(0deg)`;
        followerBeeRef.current.style.transition = 'transform 0.2s ease-out';
      }
      
      // Scattering bees
      beeRefs.current.forEach(bee => {
        if (!bee) return;

        const beeRect = bee.getBoundingClientRect();
        const beeCenterX = beeRect.left + beeRect.width / 2;
        const beeCenterY = beeRect.top + beeRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(cursorX - beeCenterX, 2) + Math.pow(cursorY - beeCenterY, 2)
        );

        // Check for collision with hero text
        if (heroText) {
          const heroRect = heroText.getBoundingClientRect();
          if (
            beeCenterX > heroRect.left &&
            beeCenterX < heroRect.right &&
            beeCenterY > heroRect.top &&
            beeCenterY < heroRect.bottom
          ) {
            // scatter if colliding with hero text
            const angle = Math.atan2(beeCenterY - (heroRect.top + heroRect.height / 2), beeCenterX - (heroRect.left + heroRect.width / 2));
            const moveX = Math.cos(angle) * 100;
            const moveY = Math.sin(angle) * 100;
            bee.style.setProperty('--scatter-x', `${moveX}px`);
            bee.style.setProperty('--scatter-y', `${moveY}px`);
            bee.classList.add('scatter');
            return;
          }
        }

        if (distance < 150) { // scatter radius from cursor
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

    const intervalId = setInterval(() => handleMouseMove(new MouseEvent("mousemove")), 100);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(intervalId);
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
      {/* Follower Bee */}
      <div
        ref={followerBeeRef}
        className="roaming-bee-container"
        style={{ animation: 'none', position: 'fixed', top: 0, left: 0, zIndex: 30 }}
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

      {/* Scattering Bees */}
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
              zIndex: 30
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
