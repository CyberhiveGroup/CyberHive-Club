
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

const contentFilePath = path.join(process.cwd(), 'src', 'lib', 'content.json');
const ADMIN_USER_ID = process.env.ADMIN_USER_ID || '';

// Helper function to get admin user from Clerk
const getIsAdmin = async (userId: string | null): Promise<boolean> => {
    if (!userId) {
        return false;
    }
    // In a real-world scenario, you might check for a role in user metadata
    // For this setup, we trust the ADMIN_USER_ID from environment variables
    return userId === ADMIN_USER_ID;
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(contentFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading content file:', error);
    return NextResponse.json({ message: 'Error reading content file.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();
  
  const isAdmin = await getIsAdmin(userId);

  if (!isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const newContent = await request.json();
    await fs.writeFile(contentFilePath, JSON.stringify(newContent, null, 4));
    return NextResponse.json({ message: 'Content saved successfully.' });
  } catch (error) {
    console.error('Error writing content file:', error);
    return NextResponse.json({ message: 'Error writing content file.' }, { status: 500 });
  }
}
