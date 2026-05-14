import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

function readPersistedToken(): string | null {
  try {
    const persisted = localStorage.getItem('atu-admin-auth');
    return persisted ? JSON.parse(persisted)?.state?.token : null;
  } catch {
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = readPersistedToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
