
'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '@/hooks/use-content';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types';

interface TeamCardProps {
  member: TeamMember;
  index: number;
  total: number;
  progress: any;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index, total, progress }) => {
    const scaleInputRange = [0, (index / total) * 0.5, 1];
    const scale = useTransform(progress, scaleInputRange, [1, 1, 0.8]);
    
    const opacityInputRange = [
        (index / total) * 0.75,
        (index + 0.9) / total
    ];
    const opacity = useTransform(progress, opacityInputRange, [1, 0]);

    const y = useTransform(progress, opacityInputRange, ['0%', '-200%']);


  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        zIndex: total - index,
      }}
      className="absolute top-0 flex h-full w-full items-center justify-center"
    >
      <Card className="team-stack-card w-[300px] h-[450px] md:w-[400px] md:h-[550px] shadow-2xl">
        <div className="relative w-full h-full">
            <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                data-ai-hint={member.imageHint}
                className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-headline text-3xl font-bold uppercase">{member.name}</h3>
                <p className="text-primary text-lg">{member.role}</p>
            </div>
        </div>
      </Card>
    </motion.div>
  );
};


export function TeamCluster() {
    const { content, isLoading } = useContent();
    const container = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    if (isLoading) {
        return <div className="text-center">Loading team...</div>;
    }
    
    const { teamMembers } = content;

    return (
        <div ref={container} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen">
                {teamMembers.map((member, i) => (
                    <TeamCard 
                        key={member.id} 
                        member={member} 
                        index={i} 
                        total={teamMembers.length}
                        progress={scrollYProgress} 
                    />
                ))}
            </div>
        </div>
    )
}
