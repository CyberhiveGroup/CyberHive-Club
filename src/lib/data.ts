
import type { Team, CSLClass, Event, Resource, FooterContent } from './types';

export const teamData: Team[] = [
    {
        id: 1,
        name: 'Leadership',
        description: 'The core team leading the CyberHive community.',
        members: [
            {
                id: 1,
                name: 'Alex "Hex" Johnson',
                role: 'Club President & Co-Founder',
                imageUrl: 'https://picsum.photos/400/400?random=1',
                imageHint: 'person portrait',
                bio: 'Alex is a cybersecurity enthusiast with a passion for offensive security and building secure systems. As the co-founder of CyberHive, his goal is to create a community where students can learn, collaborate, and push the boundaries of their knowledge. He specializes in network penetration testing and red team operations.',
                contact: {
                    email: 'alex.hex@example.com',
                    linkedin: 'https://www.linkedin.com/in/alex-hex-johnson',
                    github: 'https://github.com/alex-hex-johnson',
                    instagram: 'https://instagram.com/alex-hex-johnson',
                    phone: '123-456-7890'
                }
            },
            {
                id: 2,
                name: 'Brenda "Firewall" Smith',
                role: 'Vice President & CTF Captain',
                imageUrl: 'https://picsum.photos/400/400?random=2',
                imageHint: 'person portrait',
                bio: 'Brenda is the strategic mind behind our competitive CTF team. With a knack for defensive security and cryptography, she leads our members in national competitions. Her focus is on security architecture and ensuring digital fortresses are impenetrable. She also mentors new members in the art of puzzle-solving.',
                contact: {
                    email: 'brenda.firewall@example.com',
                    linkedin: 'https://www.linkedin.com/in/brenda-firewall-smith',
                    github: 'https://github.com/brenda-firewall-smith',
                    instagram: 'https://instagram.com/brenda-firewall-smith',
                    phone: '123-456-7891'
                }
            },
        ]
    },
    {
        id: 2,
        name: 'Technical Team',
        description: 'The brains behind the tech.',
        members: [
            {
                id: 3,
                name: 'Charlie "Root" Brown',
                role: 'Head of CSL Classes',
                imageUrl: 'https://picsum.photos/400/400?random=3',
                imageHint: 'person portrait',
                bio: 'Charlie is the educational backbone of CyberHive. He designs and leads the Cyber Siksha Lab (CSL) curriculum, making complex topics like malware analysis and reverse engineering accessible to all skill levels. His mission is to empower every member with practical, hands-on cybersecurity skills.',
                contact: {
                    email: 'charlie.root@example.com',
                    linkedin: 'https://www.linkedin.com/in/charlie-root-brown',
                    github: 'https://github.com/charlie-root-brown',
                    instagram: 'https://instagram.com/charlie-root-brown',
                    phone: '123-456-7892'
                }
            },
        ]
    },
    {
        id: 3,
        name: 'Events Team',
        description: 'Organizing our awesome events.',
        members: [
             {
                id: 4,
                name: 'Diana "Phish" Miller',
                role: 'Events Coordinator',
                imageUrl: 'https://picsum.photos/400/400?random=4',
                imageHint: 'person portrait',
                bio: 'Diana is the social engineer of the group, but in a good way! She organizes all of CyberHive\'s events, from technical workshops and guest speaker sessions to social nights and networking events. Her expertise in social engineering and human-factor security makes our events both educational and engaging.',
                contact: {
                    email: 'diana.phish@example.com',
                    linkedin: 'https://www.linkedin.com/in/diana-phish-miller',
                    github: 'https://github.com/diana-phish-miller',
                    instagram: 'https://instagram.com/diana-phish-miller',
                    phone: '123-456-7893'
                }
            },
        ]
    },
    {
        id: 4,
        name: 'Media Team',
        description: 'Creating our media content.',
        members: [
            {
                id: 5,
                name: 'Eve "Data" Williams',
                role: 'Treasurer',
                imageUrl: 'https://picsum.photos/400/400?random=5',
                imageHint: 'person portrait',
                bio: 'Eve keeps the hive\'s finances in order, managing budgets for events, hardware, and software. She has a keen interest in financial technologies and blockchain security.',
                contact: {
                    email: 'eve.data@example.com',
                    linkedin: 'https://linkedin.com/in/eve-data-williams',
                    github: 'https://github.com/eve-data-williams',
                    instagram: 'https://instagram.com/eve-data-williams',
                    phone: '123-456-7894'
                }
            }
        ]
    }
];

export const cslClasses: CSLClass[] = [
  {
    id: 1,
    title: 'CSL 101: Intro to Cybersecurity',
    description: 'A foundational course covering the basic principles of cybersecurity, common threats, and defensive strategies. Perfect for beginners.',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    imageHint: 'computer code'
  },
  {
    id: 2,
    title: 'CSL 201: Ethical Hacking & Pentesting',
    description: 'Learn the tools and techniques of ethical hackers. This hands-on class will guide you through penetration testing methodologies in a controlled environment.',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    imageHint: 'network server'
  },
  {
    id: 3,
    title: 'CSL 301: Network Security & Defense',
    description: 'Dive deep into network protocols, firewall configurations, and intrusion detection systems. Learn to secure and monitor network traffic effectively.',
    imageUrl: 'https://picsum.photos/600/400?random=7',
    imageHint: 'data analytics'
  },
  {
    id: 4,
    title: 'CSL 305: Malware Analysis',
    description: 'Explore the world of malicious software. Learn to safely analyze, reverse-engineer, and understand the behavior of different types of malware.',
    imageUrl: 'https://picsum.photos/600/400?random=8',
    imageHint: 'circuit board'
  },
  {
    id: 5,
    title: 'CSL 401: Advanced Cryptography',
    description: 'Uncover the mathematics behind modern encryption. This class covers symmetric/asymmetric algorithms, hash functions, and their real-world applications.',
    imageUrl: 'https://picsum.photos/600/400?random=9',
    imageHint: 'abstract shapes'
  },
  {
    id: 6,
    title: 'CSL 410: Web Application Security',
    description: 'Focus on securing web applications by learning to identify and mitigate common vulnerabilities like SQL injection, XSS, and CSRF.',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    imageHint: 'web design'
  },
];

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'CTF Competition: Hack the Hive',
    date: 'October 26, 2024',
    description: 'Join our flagship Capture The Flag competition. Test your skills in cryptography, forensics, web exploits, and more. Prizes for the top teams!',
    category: 'Competition',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    imageHint: 'digital art'
  },
  {
    id: 2,
    title: 'Workshop: Intro to Wireshark',
    date: 'November 5, 2024',
    description: 'A hands-on workshop where you\'ll learn how to capture and analyze network traffic using Wireshark, a powerful network protocol analyzer.',
    category: 'Workshop',
    imageUrl: 'https://picsum.photos/600/400?random=12',
    imageHint: 'data flow'
  },
  {
    id: 3,
    title: 'Guest Talk: A Day in the Life of a SOC Analyst',
    date: 'November 18, 2024',
    description: 'Hear from an industry professional about what it\'s like to work in a Security Operations Center (SOC), the daily challenges, and career path.',
    category: 'Talk',
    imageUrl: 'https://picsum.photos/600/400?random=13',
    imageHint: 'office presentation'
  },
  {
    id: 4,
    title: 'CyberHive Social & Networking Night',
    date: 'December 2, 2024',
    description: 'Meet fellow members, club leaders, and alumni in a relaxed social setting. A great opportunity to network and discuss all things cyber.',
    category: 'Social',
    imageUrl: 'https://picsum.photos/600/400?random=14',
    imageHint: 'people talking'
  },
];

export const pastEvents: Event[] = [
  {
    id: 5,
    title: 'Workshop: Secure Coding Practices',
    date: 'September 15, 2024',
    description: 'This workshop covered fundamental secure coding principles to help developers write more robust and less vulnerable applications.',
    category: 'Workshop',
    imageUrl: 'https://picsum.photos/600/400?random=15',
    imageHint: 'programming screen',
    gallery: [
        { url: 'https://picsum.photos/seed/event5-1/800/600', alt: 'Presenter at workshop', hint: 'speaker presentation' },
        { url: 'https://picsum.photos/seed/event5-2/800/600', alt: 'Attendees collaborating', hint: 'students working' },
        { url: 'https://picsum.photos/seed/event5-3/800/600', alt: 'Code on a screen', hint: 'security code' },
    ]
  },
  {
    id: 6,
    title: 'CTF Kick-off Meeting',
    date: 'September 1, 2024',
    description: 'The first meeting of the year to form teams for upcoming CTF competitions and go over the basics of competitive hacking.',
    category: 'Competition',
    imageUrl: 'https://picsum.photos/600/400?random=16',
    imageHint: 'team meeting',
    gallery: [
        { url: 'https://picsum.photos/seed/event6-1/800/600', alt: 'Team planning on whiteboard', hint: 'strategy session' },
        { url: 'https://picsum.photos/seed/event6-2/800/600', alt: 'Students on laptops', hint: 'hacking competition' },
    ]
  },
  {
    id: 7,
    title: 'Guest Talk: The Future of AI in Cybersecurity',
    date: 'August 20, 2024',
    description: 'A fascinating talk on how artificial intelligence and machine learning are shaping the future of threat detection and automated defense.',
    category: 'Talk',
    imageUrl: 'https://picsum.photos/600/400?random=17',
    imageHint: 'artificial intelligence',
    gallery: [
        { url: 'https://picsum.photos/seed/event7-1/800/600', alt: 'Guest speaker on stage', hint: 'conference speaker' },
    ]
  },
  {
    id: 8,
    title: 'Summer Social BBQ',
    date: 'July 10, 2024',
    description: 'A fun and informal summer BBQ to bring the club members together before the start of the new academic year.',
    category: 'Social',
    imageUrl: 'https://picsum.photos/600/400?random=18',
    imageHint: 'food grill',
    gallery: [
        { url: 'https://picsum.photos/seed/event8-1/800/600', alt: 'People mingling at a BBQ', hint: 'outdoor party' },
        { url: 'https://picsum.photos/seed/event8-2/800/600', alt: 'Grilling food', hint: 'barbecue food' },
        { url: 'https://picsum.photos/seed/event8-3/800/600', alt: 'Group photo of members', hint: 'friends group' },
    ]
  },
];

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Cybersecurity Starter Guide',
    description: 'A comprehensive PDF guide for beginners covering the fundamental concepts of cybersecurity.',
    type: 'PDF',
    href: '/resources/cybersecurity-starter-guide.pdf',
  },
  {
    id: 2,
    title: 'Top 10 Pentesting Tools',
    description: 'A curated list of the most essential tools for penetration testing and ethical hacking.',
    type: 'Link',
    href: '#',
  },
  {
    id: 3,
    title: 'CTF Practice Arena',
    description: 'An external platform with a wide range of challenges to practice your Capture The Flag skills.',
    type: 'External Link',
    href: '#',
  },
  {
    id: 4,
    title: 'Network Analysis Cheatsheet',
    description: 'A handy cheatsheet for common commands and filters used in network traffic analysis with Wireshark.',
    type: 'PDF',
    href: '#',
  },
  {
    id: 5,
    title: 'Secure Coding Best Practices',
    description: 'A guide outlining best practices for writing secure code across different programming languages.',
    type: 'PDF',
    href: '#',
  },
    {
    id: 6,
    title: 'Awesome Hacking Repositories',
    description: 'A curated list of GitHub repositories for hacking, pentesting, and security.',
    type: 'Link',
    href: '#',
  },
];

export const footerContent: FooterContent = {
    tagline: "Building the next generation of cybersecurity experts.",
    copyright: "© {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.",
    quickLinks: [
        { id: 1, label: 'CSL', href: '/csl-classes' },
        { id: 2, label: 'Resources', href: '/resources' },
        { id: 3, label: 'Events', href: '/events' },
        { id: 4, label: 'About Us', href: '/about' },
        { id: 5, label: 'Contact', href: '/contact' },
    ],
    socialLinks: [
        { id: 1, platform: 'email', href: 'mailto:cyberhive@ggits.org' },
        { id: 2, platform: 'whatsapp', href: '#' },
        { id: 3, platform: 'instagram', href: '#' },
        { id: 4, platform: 'twitter', href: '#' },
        { id: 5, platform: 'github', href: '#' },
        { id: 6, platform: 'linkedin', href: '#' },
    ]
};
