import { AnimatePresence, motion } from 'framer-motion';
import { AtSign, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { referenceImages } from '../../data/fallback';

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'О фонде', to: '/about' },
  { label: 'Новости', to: '/news' },
  { label: 'Как сделать вклад', to: '/donate' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Стипендии', to: '/scholarships' },
  { label: 'Контакты', to: '/contacts' },
];

const dropdownItems = [
  { label: 'Попечительский совет', to: '/about#team' },
  { label: 'Партнёры', to: '/partners' },
  { label: 'Обратная связь', to: '/contacts' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = isScrolled || isOpen
    ? 'bg-white/96 text-ink shadow-[0_12px_40px_rgba(7,27,79,0.08)] backdrop-blur-xl'
    : 'bg-white/7 text-white backdrop-blur-sm';

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container-premium flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={referenceImages.logo} alt="ENU Endowment Fund" className="h-12 w-auto rounded-sm bg-white object-contain p-1" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${isActive ? 'text-accent' : isScrolled ? 'text-ink/80' : 'text-white/90'} whitespace-nowrap text-[14px] font-semibold transition hover:text-accent`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center gap-1 whitespace-nowrap text-[14px] font-semibold transition hover:text-accent">
              Ещё
              <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-4 w-56 rounded-xl border border-black/5 bg-white p-2 text-ink shadow-premium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {dropdownItems.map((item) => (
                    <Link key={item.to} to={item.to} className="block rounded-lg px-4 py-3 text-sm font-semibold hover:bg-warm">
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="https://www.instagram.com/endowmentenu.kz/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full border border-current/15 transition hover:border-accent hover:text-accent"
          >
            <AtSign size={18} />
          </a>
          <Link
            to="/donate"
            className="whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(255,124,59,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ef6f2d]"
          >
            Внести вклад
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
              {navItems.concat(dropdownItems).map((item) => (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-warm"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
