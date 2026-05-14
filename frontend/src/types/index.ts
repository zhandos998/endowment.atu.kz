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
  executive_director_photo_url?: string | null;
  executive_director_name?: string | null;
  executive_director_position?: string | null;
  executive_director_phone?: string | null;
  executive_director_email?: string | null;
  contact_feedback_title?: string | null;
  contact_feedback_description?: string | null;
  fund_summary_title?: string | null;
  fund_summary?: string | null;
  footer_text?: string | null;
  fund_logo_url?: string | null;
  portfolio_section_description?: string | null;
  achievement_section_title?: string | null;
  achievement_section_description?: string | null;
  team_section_title?: string | null;
  team_section_description?: string | null;
  about_hero_title?: string | null;
  about_hero_description?: string | null;
  about_history_title?: string | null;
  about_history_text?: string | null;
  about_process_title?: string | null;
  about_process_description?: string | null;
  about_documents_title?: string | null;
  about_reports_title?: string | null;
  news_hero_title?: string | null;
  news_hero_description?: string | null;
  news_section_title?: string | null;
  faq_hero_title?: string | null;
  faq_hero_description?: string | null;
  faq_section_title?: string | null;
  scholarships_hero_title?: string | null;
  scholarships_hero_description?: string | null;
  scholarships_section_title?: string | null;
  scholarships_section_description?: string | null;
  hero_title: string;
  hero_subtitle?: string | null;
  hero_image_url?: string | null;
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
  conditions?: string | null;
  application_steps?: string | null;
  required_documents?: string | null;
  amount: number;
  deadline?: string | null;
};

export type ScholarshipApplication = {
  id: number;
  scholarship_id: number;
  applicant_name: string;
  email: string;
  phone?: string | null;
  student_group?: string | null;
  message?: string | null;
  status?: string | null;
  created_at?: string | null;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status?: string | null;
  admin_note?: string | null;
  created_at?: string | null;
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
  regalia?: string | null;
  category?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FundPortfolio = {
  id: number;
  title: string;
  direction?: string | null;
  description: string;
  icon?: string | null;
  color?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type FundAchievement = {
  id: number;
  title: string;
  value: number;
  unit?: string | null;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type AboutProcessStep = {
  id: number;
  title: string;
  description?: string | null;
  icon?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type AboutDocument = {
  id: number;
  title: string;
  category: 'statutory' | 'financial' | string;
  document_url?: string | null;
  published_at?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type DonationDetail = {
  id: number;
  qr_image_url?: string | null;
  bank_name?: string | null;
  beneficiary: string;
  bin?: string | null;
  iban?: string | null;
  bik?: string | null;
  kbe?: string | null;
  payment_purpose?: string | null;
  donation_cta_title?: string | null;
  public_offer_title?: string | null;
  public_offer_url?: string | null;
  public_offer_document_url?: string | null;
  public_offer_text?: string | null;
  is_active?: boolean;
};

export type HomePayload = {
  settings: SiteSetting | null;
  fund_portfolios: FundPortfolio[];
  achievements: FundAchievement[];
  board_members: TeamMember[];
  founder: TeamMember | null;
  donation_detail: DonationDetail | null;
  about_process_steps: AboutProcessStep[];
  about_documents: AboutDocument[];
  scholarships: Scholarship[];
  news: NewsItem[];
  partners: Partner[];
  team_members: TeamMember[];
  faqs: FaqItem[];
};
