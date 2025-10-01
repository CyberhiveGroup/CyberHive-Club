
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { initialContent } from '@/hooks/use-content';
import { getAuth } from '@clerk/nextjs/server';

const ADMIN_USER_IDS = (process.env.NEXT_PUBLIC_ADMIN_USER_ID || '').split(',').filter(Boolean);

const contentDocRef = db.collection('site').doc('content');

export async function GET() {
  try {
    const doc = await contentDocRef.get();
    if (!doc.exists) {
      // If no content, initialize with default and return it
      await contentDocRef.set(initialContent);
      return NextResponse.json(initialContent);
    }
    return NextResponse.json(doc.data());
  } catch (error) {
    console.error('Error getting content:', error);
    return NextResponse.json({ error: 'Failed to retrieve content' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);

    if (!userId || !ADMIN_USER_IDS.includes(userId)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const newContent = await req.json();
    await contentDocRef.set(newContent, { merge: true });
    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
