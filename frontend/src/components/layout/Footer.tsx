import { AtSign, Globe2, Mail, MapPin, Phone, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fallbackSettings, referenceImages } from '../../data/fallback';
import { useContentStore } from '../../store/contentStore';

export default function Footer() {
  const settings = useContentStore((state) => state.home.settings) ?? fallbackSettings;
  const logoUrl = settings.fund_logo_url ?? referenceImages.logo;

  const socialLinks = [
    { label: 'Instagram', href: settings.instagram, icon: AtSign },
    { label: 'YouTube', href: settings.youtube, icon: PlayCircle },
    { label: 'Facebook', href: settings.facebook, icon: Globe2 },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="bg-navy text-white">
      <div className="container-premium grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="ATU Endowment Fund" className="h-14 max-w-[180px] rounded-sm object-contain p-1" />
          </div>
          <p className="mt-6 max-w-md text-sm font-light leading-7 text-white/70">{settings.footer_text ?? fallbackSettings.footer_text}</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/76 transition hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Навигация</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link to="/about" className="hover:text-accent">
              О фонде
            </Link>
            <Link to="/scholarships" className="hover:text-accent">
              Стипендии
            </Link>
            <Link to="/news" className="hover:text-accent">
              Новости
            </Link>
            <Link to="/#donate" className="hover:text-accent">
              Сделать вклад
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Контакты</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/76">
            <a className="flex items-center gap-3 hover:text-accent" href={`mailto:${settings.email ?? 'info@atu.edu.kz'}`}>
              <Mail size={18} /> {settings.email ?? 'info@atu.edu.kz'}
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={18} /> {settings.address ?? 'г. Алматы, ул. Толе би, 100'}
            </span>
            <span className="flex items-center gap-3">
              <Phone size={18} /> {settings.phone ?? '+7 727 221-88-08'}
            </span>
            <a className="flex items-center gap-3 hover:text-accent" href={settings.instagram ?? '#'} target="_blank" rel="noreferrer">
              <AtSign size={18} /> atu_university
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© 2026 ATU Endowment Fund. Все права защищены.</div>
    </footer>
  );
}
