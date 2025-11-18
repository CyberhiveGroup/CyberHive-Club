

export type ImageAsset = {
  url: string;
  alt: string;
  hint: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
  bio: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    instagram?: string;
    phone?: string;
  }
};

export type Team = {
    id: number;
    name: string;
    description: string;
    members: TeamMember[];
}

export type CSLLink = {
    id: number;
    title: string;
    href: string;
}

export type CSLClass = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  imageHint: string;
  gallery?: ImageAsset[];
  links?: CSLLink[];
};

export type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: 'Workshop' | 'Competition' | 'Talk' | 'Social';
  imageUrl: string;
  imageHint: string;
  gallery?: { url: string; alt: string; hint: string; }[];
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
