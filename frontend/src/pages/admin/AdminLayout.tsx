import { LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { referenceImages } from '../../data/fallback';
import { useAuthStore } from '../../store/authStore';
import { entityConfigs } from './entityConfigs';

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200 bg-white">
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
          <img src={referenceImages.logo} alt="ENU" className="h-11 rounded-sm object-contain" />
          <div className="text-sm font-bold leading-5 text-navy">ENU Admin</div>
        </div>
        <nav className="grid gap-1 p-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-accent text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          {entityConfigs.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
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
