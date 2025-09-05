
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from './logo';
import { motion, AnimatePresence } from 'framer-motion';

export interface HexagonItem {
  icon: React.ReactNode;
  title: string;
  href: string;
}

interface InteractiveHexagonProps {
  items: HexagonItem[];
}

const HEX_SIZE = 144; // Corresponds to w-36 and h-[10.4rem]

export function InteractiveHexagon({ items }: InteractiveHexagonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getHexPosition = (index: number) => {
    const angle = 60 * index - 30; // Start at -30deg to center the top hex
    const angleRad = (Math.PI / 180) * angle;
    const radius = HEX_SIZE * 0.866; // approx (sqrt(3)/2) * size for tight packing
    const x = radius * Math.cos(angleRad);
    const y = radius * Math.sin(angleRad);
    return { x, y };
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: HEX_SIZE * 2.5, width: HEX_SIZE * 2.5 }}>
      {/* Central Hexagon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hexagon-interactive group absolute z-10 flex h-[10.4rem] w-36 flex-col items-center justify-center p-2 text-center transition-all duration-300',
          'cursor-pointer text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
          isOpen ? 'bg-card' : 'bg-card/50 hover:bg-card'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Logo />
      </motion.button>

      {/* Surrounding Hexagons */}
      <AnimatePresence>
        {isOpen &&
          items.map((item, index) => {
            const { x, y } = getHexPosition(index);
            return (
              <motion.div
                key={item.href}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{ scale: 1, x: x, y: y, opacity: 1 }}
                exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.05,
                }}
                className="absolute"
              >
                <Link
                  href={item.href}
                  className="hexagon-interactive group flex h-[10.4rem] w-36 flex-col items-center justify-center bg-card/50 p-2 text-center text-foreground transition-colors duration-300 hover:bg-card hover:text-primary"
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: 'mb-2 h-10 w-10',
                    })}
                  </div>
                  <h3 className="font-headline text-sm font-bold uppercase tracking-wide transition-transform duration-300 group-hover:scale-110">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
