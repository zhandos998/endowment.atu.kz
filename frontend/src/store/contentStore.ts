import { create } from 'zustand';
import { publicApi } from '../api/endowment';
import { fallbackHome } from '../data/fallback';
import type { HomePayload } from '../types';

type ContentState = {
  home: HomePayload;
  isLoading: boolean;
  loadHome: () => Promise<void>;
};

export const useContentStore = create<ContentState>((set) => ({
  home: fallbackHome,
  isLoading: false,
  async loadHome() {
    set({ isLoading: true });
    try {
      const home = await publicApi.home();
      set({
        home: {
          settings: home.settings ?? fallbackHome.settings,
          scholarships: home.scholarships?.length ? home.scholarships : fallbackHome.scholarships,
          news: home.news?.length ? home.news : fallbackHome.news,
          partners: home.partners?.length ? home.partners : fallbackHome.partners,
          team_members: home.team_members?.length ? home.team_members : fallbackHome.team_members,
          faqs: home.faqs?.length ? home.faqs : fallbackHome.faqs,
        },
      });
    } catch {
      set({ home: fallbackHome });
    } finally {
      set({ isLoading: false });
    }
  },
}));
