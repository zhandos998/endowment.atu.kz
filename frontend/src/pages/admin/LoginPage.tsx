import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { referenceImages } from '../../data/fallback';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, token } = useAuthStore();
  const [email, setEmail] = useState('admin@endowmentenu.kz');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Не удалось войти. Проверьте backend и данные администратора.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-navy lg:grid-cols-[1fr_520px]">
      <section className="relative hidden overflow-hidden lg:block">
        <img src={referenceImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/50" />
        <div className="absolute bottom-14 left-14 max-w-xl text-white">
          <img src={referenceImages.logo} alt="ENU Endowment Fund" className="mb-8 h-16 rounded-sm bg-white p-1" />
          <h1 className="text-5xl font-semibold leading-tight">Админ-панель фонда</h1>
          <p className="mt-5 text-lg font-light leading-8 text-white/70">Управление новостями, стипендиями, партнёрами, командой и публичным контентом сайта.</p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-white px-6 py-12">
        <form onSubmit={submit} className="w-full max-w-sm">
          <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-accent text-white">
            <LockKeyhole size={24} />
          </div>
          <h2 className="text-3xl font-semibold text-ink">Вход администратора</h2>
          <p className="mt-3 text-sm leading-6 text-ink/60">Используйте учётную запись, созданную сидером.</p>
          <label className="mt-8 block text-sm font-semibold text-ink">
            Email
            <input className="admin-input mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="mt-5 block text-sm font-semibold text-ink">
            Пароль
            <input className="admin-input mt-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
          <button className="mt-7 w-full rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#ef6f2d]" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </section>
    </main>
  );
}
