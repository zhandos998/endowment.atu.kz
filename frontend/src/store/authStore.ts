import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../api/client';

type AdminUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

type AuthState = {
  token: string | null;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      async login(email, password) {
        const { data } = await api.post<{ token: string; user: AdminUser }>('/admin/login', { email, password });
        set({ token: data.token, user: data.user });
      },
      async logout() {
        if (get().token) {
          await api.post('/admin/logout').catch(() => null);
        }
        set({ token: null, user: null });
      },
    }),
    {
      name: 'enu-admin-auth',
    },
  ),
);
