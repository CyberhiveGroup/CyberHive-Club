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
