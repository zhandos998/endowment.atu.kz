import { ArrowRight, BookOpenCheck, Download, FileText, HeartHandshake, Landmark, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackAboutProcessSteps, fallbackSettings } from '../data/fallback';
import { useContentStore } from '../store/contentStore';
import type { AboutDocument } from '../types';
import { formatDate } from '../utils/format';

const processIcons: Record<string, LucideIcon> = {
  capital: Landmark,
  governance: ShieldCheck,
  income: HeartHandshake,
  reporting: BookOpenCheck,
};

function DocumentList({ title, documents }: { title: string; documents: AboutDocument[] }) {
  return (
    <AnimatedSection className="rounded-xl bg-white p-6 shadow-soft md:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/12 text-accent">
          <FileText size={22} />
        </div>
        <h2 className="text-2xl font-semibold text-navy">{title}</h2>
      </div>

      <div className="mt-6 grid gap-3">
        {documents.length ? (
          documents.map((document) => (
            <a
              key={document.id}
              href={document.document_url ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg border border-black/6 bg-slate-50 p-4 transition hover:border-accent/40 hover:bg-white"
            >
              <div>
                <h3 className="font-semibold leading-6 text-ink">{document.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{formatDate(document.published_at)}</p>
              </div>
              <Download className="shrink-0 text-accent transition group-hover:translate-y-0.5" size={20} />
            </a>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-500">
            Документы будут добавлены после утверждения и загрузки в админ-панели.
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function AboutPage() {
  const home = useContentStore((state) => state.home);
  const settings = home.settings ?? fallbackSettings;
  const processSteps = home.about_process_steps?.length ? home.about_process_steps : fallbackAboutProcessSteps;
  const statutoryDocuments = (home.about_documents ?? []).filter((document) => document.category === 'statutory');
  const financialDocuments = (home.about_documents ?? []).filter((document) => document.category === 'financial');
  return (
    <>
      <PageHero
        title={settings.about_hero_title ?? fallbackSettings.about_hero_title ?? 'О фонде'}
        description={
          settings.about_hero_description ??
          fallbackSettings.about_hero_description ??
          'ATU Endowment Fund — фонд долгосрочной поддержки АО «Алматинский технологический университет».'
        }
      />

      <section className="section-pad bg-white">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <AnimatedSection>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">О фонде</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy md:text-5xl">
                {settings.about_history_title ?? fallbackSettings.about_history_title ?? 'История создания фонда'}
              </h2>
            </AnimatedSection>
            <AnimatedSection className="rounded-xl bg-warm p-7 md:p-9">
              <p className="text-xl font-light leading-9 text-ink/72">
                {settings.about_history_text ??
                  fallbackSettings.about_history_text ??
                  'Фонд создан для долгосрочной поддержки студентов, научных инициатив и стратегического развития АТУ через целевой капитал и прозрачные программы финансирования.'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-pad bg-smoke">
        <div className="container-premium">
          <SectionHeader
            title={settings.about_process_title ?? fallbackSettings.about_process_title ?? 'Как работает фонд'}
            description={
              settings.about_process_description ??
              fallbackSettings.about_process_description ??
              'Модель фонда строится на сохранении капитала, профессиональном управлении и направлении инвестиционного дохода на утвержденные программы поддержки.'
            }
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {processSteps.map((item, index) => {
              const Icon = processIcons[item.icon ?? ''] ?? ArrowRight;
              return (
                <AnimatedSection key={item.id} delay={index * 0.06} className="relative rounded-xl bg-white p-6 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-white">
                      <Icon size={22} />
                    </div>
                    <span className="text-4xl font-semibold leading-none text-navy/80">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold leading-7 text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm font-light leading-7 text-ink/62">{item.description}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-premium">
          <div className="grid gap-6 lg:grid-cols-2">
            <DocumentList title={settings.about_documents_title ?? fallbackSettings.about_documents_title ?? 'Уставные документы'} documents={statutoryDocuments} />
            <DocumentList title={settings.about_reports_title ?? fallbackSettings.about_reports_title ?? 'Финансовая отчетность'} documents={financialDocuments} />
          </div>
        </div>
      </section>
    </>
  );
}
