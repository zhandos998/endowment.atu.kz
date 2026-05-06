import { AtSign, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackSettings } from '../data/fallback';

export default function ContactsPage() {
  return (
    <>
      <PageHero title="Контакты" description="Свяжитесь с командой фонда, чтобы обсудить вклад, партнёрство или программу поддержки." />
      <section className="bg-accent text-white">
        <div className="container-premium grid min-h-[620px] gap-10 py-16 lg:grid-cols-[430px_1fr] lg:items-center">
          <div>
            <SectionHeader align="left" title="ENU Endowment Fund" description="Мы открыты к партнёрствам, донорским программам и обратной связи." />
            <div className="mt-10 grid gap-5 text-lg font-light">
              <a className="flex items-center gap-3 hover:text-navy" href={`mailto:${fallbackSettings.email}`}>
                <Mail size={22} /> {fallbackSettings.email}
              </a>
              <span className="flex items-center gap-3"><MapPin size={22} /> {fallbackSettings.address}</span>
              <span className="flex items-center gap-3"><Phone size={22} /> {fallbackSettings.phone}</span>
              <a className="flex items-center gap-3 hover:text-navy" href={fallbackSettings.instagram ?? '#'} target="_blank" rel="noreferrer">
                <AtSign size={22} /> endowmentenu.kz
              </a>
            </div>
          </div>
          <div className="min-h-[420px] rounded-xl bg-white/20 p-4">
            <div className="grid h-full min-h-[420px] place-items-center rounded-lg bg-[#e8e8e8] text-center text-navy">
              <MapPin size={46} className="mx-auto mb-4 text-accent" />
              <div className="text-2xl font-semibold">ул. Сатпаева 2</div>
              <div className="mt-2 text-sm text-ink/60">Офис ENU Endowment Fund, 3 этаж</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
