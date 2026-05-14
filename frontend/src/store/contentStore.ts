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
          fund_portfolios: home.fund_portfolios?.length ? home.fund_portfolios : fallbackHome.fund_portfolios,
          achievements: home.achievements?.length ? home.achievements : fallbackHome.achievements,
          board_members: home.board_members?.length ? home.board_members : fallbackHome.board_members,
          founder: home.founder ?? fallbackHome.founder,
          donation_detail: home.donation_detail ?? fallbackHome.donation_detail,
          about_process_steps: home.about_process_steps?.length ? home.about_process_steps : fallbackHome.about_process_steps,
          about_documents: home.about_documents ?? fallbackHome.about_documents,
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
