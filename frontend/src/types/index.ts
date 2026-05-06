export type ApiCollection<T> = {
  data: T[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type SiteSetting = {
  id?: number;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  hero_title: string;
  hero_subtitle?: string | null;
  hero_image_url?: string | null;
  hero_cta_primary?: string | null;
  hero_cta_secondary?: string | null;
  statistics?: { label: string; value: number }[];
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string | null;
  published_at?: string | null;
};

export type Scholarship = {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline?: string | null;
};

export type Donation = {
  id: number;
  donor_name?: string | null;
  amount: number;
  message?: string | null;
  created_at?: string | null;
};

export type Partner = {
  id: number;
  name: string;
  logo_url?: string | null;
  website?: string | null;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  photo_url?: string | null;
  bio?: string | null;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type HomePayload = {
  settings: SiteSetting | null;
  scholarships: Scholarship[];
  news: NewsItem[];
  partners: Partner[];
  team_members: TeamMember[];
  faqs: FaqItem[];
};
