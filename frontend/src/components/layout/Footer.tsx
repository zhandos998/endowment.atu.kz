import { AtSign, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { referenceImages } from '../../data/fallback';
import { useContentStore } from '../../store/contentStore';

export default function Footer() {
  const settings = useContentStore((state) => state.home.settings);

  return (
    <footer className="bg-navy text-white">
      <div className="container-premium grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src={referenceImages.logo} alt="ENU Endowment Fund" className="h-14 rounded-sm bg-white p-1" />
          <p className="mt-6 max-w-md text-sm font-light leading-7 text-white/70">
            Фонд долгосрочной поддержки ENU: стипендии, гранты, инновации и системное развитие университетской среды.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Навигация</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link to="/about" className="hover:text-accent">О фонде</Link>
            <Link to="/scholarships" className="hover:text-accent">Стипендии</Link>
            <Link to="/news" className="hover:text-accent">Новости</Link>
            <Link to="/donate" className="hover:text-accent">Сделать вклад</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Контакты</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/76">
            <a className="flex items-center gap-3 hover:text-accent" href={`mailto:${settings?.email ?? 'info@endowmentenu.kz'}`}>
              <Mail size={18} /> {settings?.email ?? 'info@endowmentenu.kz'}
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={18} /> {settings?.address ?? 'ул. Сатпаева 2'}
            </span>
            <span className="flex items-center gap-3">
              <Phone size={18} /> {settings?.phone ?? '+7 7172 70 95 00'}
            </span>
            <a className="flex items-center gap-3 hover:text-accent" href={settings?.instagram ?? '#'} target="_blank" rel="noreferrer">
              <AtSign size={18} /> endowmentenu.kz
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 ENU Endowment Fund. Все права защищены.
      </div>
    </footer>
  );
}
