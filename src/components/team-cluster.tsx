
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '@/hooks/use-content';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types';

interface TeamCardProps {
  member: TeamMember;
  index: number;
  progress: any; 
  range: [number, number];
  targetScale: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  const positions = [
    // Center
    { top: '35%', left: '40%' }, 
    // Inner Ring
    { top: '10%', left: '30%' },
    { top: '15%', left: '60%' },
    { top: '60%', left: '65%' },
    { top: '55%', left: '15%' },
    // Outer Ring
    { top: '-5%', left: '55%' },
    { top: '30%', left: '85%' },
    { top: '75%', left: '45%' },
    { top: '30%', left: '-5%' },
  ];

  const pos = positions[index % positions.length];
  const zIndex = 10 - index;

  return (
    <motion.div
      style={{
        scale,
        top: pos.top,
        left: pos.left,
        zIndex,
      }}
      className="absolute group"
    >
      <div className="team-cluster-card relative w-[220px] h-[254px] md:w-[280px] md:h-[323px] bg-card shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:z-20">
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={400}
          height={400}
          data-ai-hint={member.imageHint}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <h3 className="font-headline text-2xl font-bold uppercase">{member.name}</h3>
          <p className="text-primary text-md">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};


export function TeamCluster() {
    const { content, isLoading } = useContent();
    const container = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    if (isLoading) {
        return <div className="text-center">Loading team...</div>;
    }
    
    const { teamMembers } = content;

    return (
        <div ref={container} className="relative h-[120vh] md:h-[150vh]">
            {teamMembers.map((member, i) => {
                const targetScale = 1 - ((teamMembers.length - i) * 0.05);
                return (
                    <TeamCard 
                        key={member.id} 
                        member={member} 
                        index={i} 
                        progress={scrollYProgress} 
                        range={[i * 0.1, 1]} 
                        targetScale={targetScale}
                    />
                )
            })}
        </div>
    )
}
