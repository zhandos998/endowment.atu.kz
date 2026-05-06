import { CalendarDays, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackScholarships } from '../data/fallback';
import { formatCurrency, formatDate } from '../utils/format';

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        title="Стипендии"
        description="Грантовые и стипендиальные программы для студентов ENU."
      />
      <section className="section-pad bg-warm">
        <div className="container-premium">
          <SectionHeader
            title="Программы поддержки"
            description="Каждая программа ориентирована на конкретный результат: обучение, исследования, участие в конкурсах и развитие инициатив."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {fallbackScholarships.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08} className="premium-card flex min-h-[360px] flex-col p-7">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Программа</div>
                <h3 className="mt-5 text-2xl font-semibold leading-9 text-ink">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink/60">{item.description}</p>
                <div className="mt-7 rounded-lg bg-smoke p-5">
                  <div className="text-2xl font-bold text-navy">{formatCurrency(item.amount)}</div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                    <CalendarDays size={17} /> Дедлайн: {formatDate(item.deadline)}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contacts" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#ef6f2d]">
              Подать заявку <Send size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
