import type { TeamMember, CSLClass, Event, Resource } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alex "Hex" Johnson',
    role: 'Club President & Co-Founder',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    imageHint: 'person portrait'
  },
  {
    id: 2,
    name: 'Brenda "Firewall" Smith',
    role: 'Vice President & CTF Captain',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    imageHint: 'person portrait'
  },
  {
    id: 3,
    name: 'Charlie "Root" Brown',
    role: 'Head of CSL Classes',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    imageHint: 'person portrait'
  },
  {
    id: 4,
    name: 'Diana "Phish" Miller',
    role: 'Events Coordinator',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    imageHint: 'person portrait'
  },
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
    imageHint: 'programming screen'
  },
  {
    id: 6,
    title: 'CTF Kick-off Meeting',
    date: 'September 1, 2024',
    description: 'The first meeting of the year to form teams for upcoming CTF competitions and go over the basics of competitive hacking.',
    category: 'Competition',
    imageUrl: 'https://picsum.photos/600/400?random=16',
    imageHint: 'team meeting'
  },
  {
    id: 7,
    title: 'Guest Talk: The Future of AI in Cybersecurity',
    date: 'August 20, 2024',
    description: 'A fascinating talk on how artificial intelligence and machine learning are shaping the future of threat detection and automated defense.',
    category: 'Talk',
    imageUrl: 'https://picsum.photos/600/400?random=17',
    imageHint: 'artificial intelligence'
  },
  {
    id: 8,
    title: 'Summer Social BBQ',
    date: 'July 10, 2024',
    description: 'A fun and informal summer BBQ to bring the club members together before the start of the new academic year.',
    category: 'Social',
    imageUrl: 'https://picsum.photos/600/400?random=18',
    imageHint: 'food grill'
  },
];

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Cybersecurity Starter Guide',
    description: 'A comprehensive PDF guide for beginners covering the fundamental concepts of cybersecurity.',
    type: 'PDF',
    href: '#',
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
