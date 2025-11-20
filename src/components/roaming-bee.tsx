
'use client';

import React from "react";

export function RoamingBee({ isRevealed }: { isRevealed: boolean }) {
  const [isClient, setIsClient] = React.useState(false);
  const beeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const beeCount = 15; // Increased number of bees

  React.useEffect(() => {
    setIsClient(true);
    beeRefs.current = beeRefs.current.slice(0, beeCount);
  }, [beeCount]);

  React.useEffect(() => {
    if (!isClient) return;

    if (isRevealed) {
      // Hide bees when revealed
      beeRefs.current.forEach(bee => {
        if (bee) {
          bee.style.display = 'none';
        }
      });
      return;
    } else {
        // Show bees when not revealed
        beeRefs.current.forEach(bee => {
        if (bee) {
          bee.style.display = 'block';
        }
      });
    }

  }, [isClient, isRevealed, beeCount]);
  
  if (!isClient) {
    return null;
  }

  // Three different animation paths to make the movement more random
  const animationPaths = ['roam1', 'roam2', 'roam3'];

  return (
    <>
      {isRevealed ? null : Array.from({ length: beeCount }).map((_, i) => {
        const animationName = animationPaths[Math.floor(Math.random() * animationPaths.length)];
        const animationDuration = `${Math.random() * 15 + 15}s`; // 15-30 seconds
        const animationDelay = `${Math.random() * 3}s`; // 0-3 seconds delay
        
        return (
          <div
            key={i}
            ref={el => beeRefs.current[i] = el}
            className="roaming-bee-container"
            style={{
              animationName,
              animationDuration,
              animationDelay,
              zIndex: 30,
              animationPlayState: isRevealed ? 'paused' : 'running'
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
