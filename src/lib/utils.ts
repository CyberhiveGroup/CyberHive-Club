import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const urlObject = new URL(url);
    if (urlObject.hostname === 'drive.google.com' && urlObject.pathname.includes('/file/d/')) {
      const fileId = url.split('/d/')[1].split('/')[0];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
  } catch (error) {
    // Invalid URL, just return the original string
    return url;
  }
  
  return url;
}
