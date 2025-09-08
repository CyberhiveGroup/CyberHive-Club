export type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
};

export type CSLClass = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: 'Workshop' | 'Competition' | 'Talk' | 'Social';
  imageUrl: string;
  imageHint: string;
};

export type Resource = {
  id: number;
  title: string;
  description: string;
  type: 'PDF' | 'Link' | 'External Link';
  href: string;
};

export type FooterLink = {
    id: number;
    label: string;
    href: string;
}

export type SocialLink = {
    id: number;
    platform: 'email' | 'whatsapp' | 'instagram' | 'twitter' | 'github' | 'linkedin';
    href: string;
}

export type FooterContent = {
    tagline: string;
    quickLinks: FooterLink[];
    socialLinks: SocialLink[];
    copyright: string;
}
