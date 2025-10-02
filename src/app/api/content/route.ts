
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

async function getContent() {
    try {
        await fs.access(dataFilePath);
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist or is invalid, return a default structure
        const defaultContent = {
            home: {
                heroTitle: "CyberHive",
                heroSubtitle: "Your Gateway to the World of Cybersecurity. Learn, Collaborate, and Conquer.",
                centralTitle: "Explore the Hive",
                centralSubtitle: "Navigate through our core sections. Whether you're here to learn, compete, or connect, you'll find your place in the hive.",
                eventsTitle: "Upcoming Events",
                eventsSubtitle: "Stay ahead of the curve. Join our workshops, talks, and competitions.",
                aboutTitle: "Who We Are",
                aboutParagraph: "CyberHive is a student-run organization dedicated to fostering a vibrant cybersecurity community. We aim to provide a platform for students to learn, share knowledge, and develop practical skills in the ever-evolving field of cybersecurity. Our mission is to bridge the gap between theoretical knowledge and real-world application.",
                cslTitle: "Cyber Siksha Lab (CSL)",
                cslParagraph: "Our Cyber Siksha Lab offers a structured learning path with hands-on classes. From foundational concepts to advanced techniques, CSL is designed to build your skills from the ground up. Join our classes to gain practical experience and prepare for a career in cybersecurity."
            },
            about: {
                title: "About CyberHive",
                subtitle: "We are a passionate community of cybersecurity enthusiasts, dedicated to learning, collaboration, and innovation.",
                missionTitle: "Our Mission",
                missionParagraph: "To cultivate a dynamic and inclusive environment where students can explore the vast field of cybersecurity. We empower our members with hands-on learning, mentorship from peers and professionals, and opportunities to compete and network. We strive to be the central hub for aspiring cybersecurity experts, bridging academic knowledge with practical, real-world skills.",
                teamTitle: "Meet the Hive Mind",
                teamSubtitle: "The dedicated individuals leading the charge and keeping the hive buzzing with activity.",
            },
             aboutImages: {
                missionImageUrl: 'https://picsum.photos/seed/mission/600/400',
                carouselUrls: [
                    { url: 'https://picsum.photos/seed/about1/600/300', alt: 'Team working together', hint: 'collaboration students' },
                    { url: 'https://picsum.photos/seed/about2/600/300', alt: 'Cybersecurity workshop', hint: 'tech workshop' },
                    { url: 'https://picsum.photos/seed/about3/600/300', alt: 'Student presentation', hint: 'student presentation' },
                ],
            },
            contact: {
                title: "Get in Touch",
                subtitle: "Have questions, suggestions, or want to collaborate? We'd love to hear from you. Reach out through any of our channels.",
                email: "cyberhive@ggits.org",
                address: "Gyan Ganga Institute of Technology & Sciences, Jabalpur, Madhya Pradesh, India",
            },
            teams: [],
            cslClasses: [],
            upcomingEvents: [],
            pastEvents: [],
            resources: [],
            footer: {
                tagline: "Building the next generation of cybersecurity experts.",
                copyright: "© {new Date().getFullYear()} CyberHive Hub. All Rights Reserved.",
                quickLinks: [],
                socialLinks: []
            }
        };
        return defaultContent;
    }
}

export async function GET() {
    try {
        const content = await getContent();
        return NextResponse.json(content);
    } catch (error) {
        console.error('API GET Error:', error);
        return NextResponse.json({ message: 'Failed to retrieve content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newContent = await request.json();
        
        await fs.writeFile(dataFilePath, JSON.stringify(newContent, null, 2), 'utf-8');
        
        return NextResponse.json({ message: 'Content saved successfully' });
    } catch (error) {
        console.error('API POST Error:', error);
        return NextResponse.json({ message: 'Failed to save content' }, { status: 500 });
    }
}
