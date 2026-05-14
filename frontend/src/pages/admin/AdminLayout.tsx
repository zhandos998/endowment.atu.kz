import { LayoutDashboard, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { referenceImages } from '../../data/fallback';
import { useAuthStore } from '../../store/authStore';
import { adminSections, siteSettingsAdminItem } from './adminSections';

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  const navItems: { path: string; title: string; icon: LucideIcon; end?: boolean }[] = [
    { path: '', title: 'Dashboard', icon: LayoutDashboard, end: true },
    ...adminSections.map((section) => ({ path: section.path, title: section.title, icon: section.icon })),
    { path: siteSettingsAdminItem.path, title: siteSettingsAdminItem.title, icon: siteSettingsAdminItem.icon },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 lg:grid lg:grid-cols-[300px_1fr]">
      <aside className="border-r border-slate-200 bg-white">
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
          <img src={referenceImages.logo} alt="АТУ" className="h-11 rounded-sm object-contain invert" />
          {/* <div>
            <div className="text-sm font-bold leading-5 text-navy">ATU Admin</div>
            <div className="text-xs text-slate-500">Управление сайтом</div>
          </div> */}
        </div>
        <nav className="grid gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const to = item.path ? `/admin/${item.path}` : '/admin';

            return (
              <NavLink
                key={item.path || 'dashboard'}
                to={to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-accent text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`
                }
              >
                <Icon size={18} /> {item.title}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-red-600">
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </aside>
      <section className="min-w-0">
        <Outlet />
      </section>
    </main>
  );
}
