export enum Category {
  DESIGN = 'Design',
  TECH = 'Technology',
  CULTURE = 'Culture',
  LIFESTYLE = 'Lifestyle'
}

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  imageUrl?: string;
  createdAt: any;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export type Theme = 'light' | 'dark';
