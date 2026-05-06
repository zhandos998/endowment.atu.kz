import { Navigate, Route, Routes } from 'react-router-dom';
import AdminEntityPage from './pages/admin/AdminEntityPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import DonatePage from './pages/DonatePage';
import FaqPage from './pages/FaqPage';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import NewsPage from './pages/NewsPage';
import PartnersPage from './pages/PartnersPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import PublicLayout from './components/layout/PublicLayout';
import { entityConfigs } from './pages/admin/entityConfigs';
import { useAuthStore } from './store/authStore';
import type { ReactNode } from 'react';

function RequireAdmin({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<DashboardPage />} />
        {entityConfigs.map((config) => (
          <Route
            key={config.path}
            path={config.path}
            element={<AdminEntityPage config={config} />}
          />
        ))}
      </Route>
    </Routes>
  );
}
