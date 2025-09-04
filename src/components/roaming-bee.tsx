'use client';

import { cn } from "@/lib/utils";
import React from "react";

export function RoamingBee() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Three different animation paths to make the movement more random
  const animationPaths = ['roam1', 'roam2', 'roam3'];
  const beeCount = 5; // Let's add a few bees!

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
