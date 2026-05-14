import { AnimatePresence, motion } from 'framer-motion';
import { AtSign, Globe2, Menu, PlayCircle, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fallbackSettings, referenceImages } from '../../data/fallback';
import { useContentStore } from '../../store/contentStore';

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'О фонде', to: '/about' },
  { label: 'Новости', to: '/news' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Стипендии', to: '/scholarships' },
  { label: 'Контакты', to: '/contacts' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useContentStore((state) => state.home.settings) ?? fallbackSettings;
  const logoUrl = settings.fund_logo_url ?? referenceImages.logo;

  const socialLinks = useMemo(
    () =>
      [
        { label: 'Instagram', href: settings.instagram, icon: AtSign },
        { label: 'YouTube', href: settings.youtube, icon: PlayCircle },
        { label: 'Facebook', href: settings.facebook, icon: Globe2 },
      ].filter((item) => Boolean(item.href)),
    [settings.facebook, settings.instagram, settings.youtube],
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-navy text-white shadow-[0_12px_40px_rgba(7,27,79,0.18)]">
      <div className="container-premium flex h-20 items-center justify-between gap-5">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logoUrl} alt="ATU Endowment Fund" className="h-11 max-w-[150px] shrink-0 rounded-sm object-contain p-1" />
          
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${isActive ? 'text-accent' : 'text-white/90'} whitespace-nowrap text-[14px] font-semibold transition hover:text-accent`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href ?? '#'}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-current/15 transition hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            );
          })}
          <Link
            to="/#donate"
            className="whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(255,124,59,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ef6f2d]"
          >
            Вклад
          </Link>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-current/20 xl:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Меню"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border-t border-black/5 bg-white text-ink xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="container-premium grid gap-2 py-5">
              {navItems.map((item) => (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-warm"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/#donate"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-white"
              >
                Вклад
              </Link>
              <div className="mt-4 flex gap-3 px-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a key={item.label} href={item.href ?? '#'} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-warm text-navy">
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
