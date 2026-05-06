import { api } from './client';
import type { ApiCollection, Donation, FaqItem, HomePayload, NewsItem, Partner, Scholarship, SiteSetting, TeamMember } from '../types';

export const publicApi = {
  async home() {
    const { data } = await api.get<HomePayload>('/home');
    return data;
  },
  async news() {
    const { data } = await api.get<ApiCollection<NewsItem>>('/news');
    return data.data;
  },
  async newsBySlug(slug: string) {
    const { data } = await api.get<{ data: NewsItem }>(`/news/${slug}`);
    return data.data;
  },
  async scholarships() {
    const { data } = await api.get<ApiCollection<Scholarship>>('/scholarships');
    return data.data;
  },
  async partners() {
    const { data } = await api.get<ApiCollection<Partner>>('/partners');
    return data.data;
  },
  async teamMembers() {
    const { data } = await api.get<ApiCollection<TeamMember>>('/team-members');
    return data.data;
  },
  async faqs() {
    const { data } = await api.get<{ data: FaqItem[] }>('/faqs');
    return data.data;
  },
  async settings() {
    const { data } = await api.get<{ data: SiteSetting }>('/settings');
    return data.data;
  },
  async donate(payload: Omit<Donation, 'id' | 'created_at'>) {
    const { data } = await api.post<{ data: Donation }>('/donations', payload);
    return data.data;
  },
};
