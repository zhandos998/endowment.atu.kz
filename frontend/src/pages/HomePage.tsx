import { motion, type PanInfo, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpenCheck,
  Briefcase,
  Building2,
  ChartNoAxesCombined,
  ExternalLink,
  FileText,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  QrCode,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import Counter from '../components/ui/Counter';
import FaqAccordion from '../components/ui/FaqAccordion';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackDonationDetail, fallbackFounder, fallbackSettings, referenceImages } from '../data/fallback';
import { useContentStore } from '../store/contentStore';
import type { DonationDetail } from '../types';
import { formatDate } from '../utils/format';

const portfolioIcons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  innovation: Lightbulb,
  support: HeartHandshake,
  infrastructure: Building2,
  strategy: Rocket,
};

const achievementIcons: Record<string, LucideIcon> = {
  capital: Landmark,
  income: ChartNoAxesCombined,
  programs: Award,
};

function bankRows(detail: DonationDetail): [string, string][] {
  const rows: [string, string | null | undefined][] = [
    ['Получатель', detail.beneficiary],
    ['Банк', detail.bank_name],
    ['БИН', detail.bin],
    ['IBAN', detail.iban],
    ['БИК', detail.bik],
    ['КБЕ', detail.kbe],
    ['Назначение платежа', detail.payment_purpose],
  ];

  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 720], [0, 120]);
  const home = useContentStore((state) => state.home);
  const settings = home.settings ?? fallbackSettings;
  const donationDetail = home.donation_detail ?? fallbackDonationDetail;
  const publicOfferHref = donationDetail.public_offer_document_url ?? donationDetail.public_offer_url;
  const founder = home.founder ?? fallbackFounder;
  const portfolioCloneCount = home.fund_portfolios.length;
  const portfolioItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [portfolioPosition, setPortfolioPosition] = useState(portfolioCloneCount);
  const [portfolioOffset, setPortfolioOffset] = useState(0);
  const [isPortfolioInstant, setIsPortfolioInstant] = useState(true);
  const [isPortfolioAnimating, setIsPortfolioAnimating] = useState(false);

  const portfolioSlides = useMemo(() => {
    const items = home.fund_portfolios;
    const cloneCount = items.length;

    if (!items.length) {
      return [];
    }

    const head = items.slice(-cloneCount).map((item, index) => ({
      item,
      key: `head-${item.id}-${index}`,
      realIndex: items.length - cloneCount + index,
    }));
    const body = items.map((item, index) => ({
      item,
      key: `body-${item.id}`,
      realIndex: index,
    }));
    const tail = items.slice(0, cloneCount).map((item, index) => ({
      item,
      key: `tail-${item.id}-${index}`,
      realIndex: index,
    }));

    return [...head, ...body, ...tail];
  }, [home.fund_portfolios]);

  useEffect(() => {
    setIsPortfolioInstant(true);
    setIsPortfolioAnimating(false);
    setPortfolioPosition(portfolioCloneCount);
  }, [portfolioCloneCount, home.fund_portfolios.length]);

  useEffect(() => {
    const updateOffset = () => {
      const offset = portfolioItemRefs.current[portfolioPosition]?.offsetLeft ?? 0;
      setPortfolioOffset(offset);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, [portfolioPosition, portfolioSlides.length]);

  function slidePortfolios(direction: 'prev' | 'next') {
    if (home.fund_portfolios.length <= 1) {
      return;
    }

    setIsPortfolioAnimating(true);
    setIsPortfolioInstant(false);
    setPortfolioPosition((value) => {
      const next = value + (direction === 'next' ? 1 : -1);

      if (next < 0 || next >= portfolioSlides.length) {
        return value;
      }

      return next;
    });
  }

  function handlePortfolioDragEnd(info: PanInfo) {
    if (isPortfolioAnimating || home.fund_portfolios.length <= 1) {
      return;
    }

    if (info.offset.x < -70 || info.velocity.x < -450) {
      slidePortfolios('next');
      return;
    }

    if (info.offset.x > 70 || info.velocity.x > 450) {
      slidePortfolios('prev');
    }
  }

  function handlePortfolioAnimationComplete() {
    const total = home.fund_portfolios.length;

    if (!total) {
      setIsPortfolioAnimating(false);
      return;
    }

    if (portfolioPosition >= portfolioCloneCount + total || portfolioPosition < portfolioCloneCount) {
      const realIndex = ((portfolioPosition - portfolioCloneCount) % total + total) % total;
      setIsPortfolioInstant(true);
      setPortfolioPosition(portfolioCloneCount + realIndex);
    }

    setIsPortfolioAnimating(false);
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-navy text-white">
        <motion.img
          style={{ y: heroY }}
          src={settings.hero_image_url ?? referenceImages.hero}
          alt="ATU Endowment Fund"
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,27,0.82)_0%,rgba(7,27,79,0.72)_48%,rgba(2,8,27,0.94)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />

        <div className="container-premium relative z-10 flex min-h-screen items-center pb-32 pt-32">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur">
              <ShieldCheck size={18} className="text-gold" />
              Целевой капитал Алматинского технологического университета
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal drop-shadow-[0_4px_22px_rgba(0,0,0,0.7)] md:text-7xl lg:text-8xl">
              {settings.hero_title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-white/88 md:text-2xl md:leading-10">
              {settings.hero_subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/#donate"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-[0_22px_42px_rgba(255,124,59,0.28)] transition hover:-translate-y-1 hover:bg-[#ef6f2d]"
              >
                Сделать вклад
                <ArrowRight size={19} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="container-premium relative z-10 -mt-28 pb-10">
          <div className="grid gap-4 rounded-xl border border-white/18 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-3">
            {(settings.statistics ?? fallbackSettings.statistics ?? []).map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 p-5">
                <div className="text-4xl font-semibold">
                  <Counter value={stat.value} />
                </div>
                <div className="mt-2 text-sm font-light leading-6 text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <AnimatedSection>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-accent">О фонде</p>
              <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">{settings.fund_summary_title ?? fallbackSettings.fund_summary_title}</h2>
            </AnimatedSection>
            <AnimatedSection className="rounded-xl border border-black/5 bg-warm p-7 shadow-soft md:p-10">
              <p className="text-xl font-light leading-9 text-ink/75">{settings.fund_summary ?? fallbackSettings.fund_summary}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="portfolios" className="section-pad bg-smoke">
        <div className="container-premium">
          <SectionHeader
            eyebrow="5 портфелей"
            title="Целевые капиталы фонда"
            description={
              settings.portfolio_section_description ??
              fallbackSettings.portfolio_section_description ??
              'Каждый портфель отвечает за отдельное направление поддержки АТУ и помогает донорам выбрать понятный фокус вклада.'
            }
          />
          <div className="mx-auto mt-10 flex w-full max-w-[1180px] justify-end gap-3">
            <button
              type="button"
              onClick={() => slidePortfolios('prev')}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-navy shadow-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              aria-label="Предыдущие целевые капиталы"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => slidePortfolios('next')}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-accent"
              aria-label="Следующие целевые капиталы"
            >
              <ArrowRight size={19} />
            </button>
          </div>
          <div className="mx-auto mt-5 w-full max-w-[1180px] overflow-hidden px-3 pb-4">
            <motion.div
              className="flex cursor-grab gap-5 will-change-transform active:cursor-grabbing"
              animate={{ x: -portfolioOffset }}
              transition={isPortfolioInstant ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={handlePortfolioAnimationComplete}
              drag={home.fund_portfolios.length > 1 ? 'x' : false}
              dragElastic={0.08}
              dragMomentum={false}
              onDragStart={() => setIsPortfolioInstant(false)}
              onDragEnd={(_, info) => handlePortfolioDragEnd(info)}
            >
              {portfolioSlides.map(({ item, key, realIndex }, slideIndex) => {
                const Icon = portfolioIcons[item.icon ?? ''] ?? Briefcase;

                return (
                  <motion.div
                    ref={(node) => {
                      portfolioItemRefs.current[slideIndex] = node;
                    }}
                    key={key}
                    className="group flex min-h-[330px] shrink-0 basis-[84%] flex-col rounded-xl border border-black/5 bg-white p-6 shadow-soft transition duration-500 ease-out hover:-translate-y-2 hover:shadow-premium sm:basis-[68%] md:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: realIndex * 0.04 }}
                  >
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-xl text-white shadow-soft" style={{ backgroundColor: item.color ?? '#071b4f' }}>
                      <Icon size={27} />
                    </div>
                    <span className="text-4xl font-semibold text-ink/8">{String(realIndex + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-accent">{item.direction}</p>
                  <p className="mt-5 text-sm font-light leading-7 text-ink/62">{item.description}</p>
                  <div className="mt-auto pt-7">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color ?? '#071b4f' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: realIndex * 0.08 }}
                      />
                    </div>
                  </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-premium">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-accent">Инфографика</p>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              {settings.achievement_section_title ?? fallbackSettings.achievement_section_title ?? 'Достижения фонда'}
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-lg font-light leading-8 text-white/78 md:text-xl">
              {settings.achievement_section_description ??
                fallbackSettings.achievement_section_description ??
                'Ключевые показатели показывают масштаб целевого капитала, инвестиционного дохода и программ поддержки.'}
            </p>
          </div>
          <div className="mt-12">
            <div className="grid gap-6 lg:grid-cols-3">
              {home.achievements.map((achievement, index) => {
                const Icon = achievementIcons[achievement.icon ?? ''] ?? Target;

                return (
                  <AnimatedSection
                    key={achievement.title}
                    delay={index * 0.08}
                    className="min-h-[310px] rounded-xl border border-white/14 bg-white/10 p-8 backdrop-blur transition hover:-translate-y-1 hover:bg-white/14"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-lg bg-white text-navy">
                      <Icon size={26} />
                    </div>
                    <div className="mt-8 text-6xl font-semibold leading-none text-white">
                      <Counter value={achievement.value} />
                    </div>
                    <div className="mt-2 text-lg font-semibold text-gold">{achievement.unit}</div>
                    <h3 className="mt-6 text-xl font-semibold leading-7 text-white">{achievement.title}</h3>
                    <p className="mt-4 text-sm font-light leading-7 text-white/72">{achievement.description}</p>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section-pad bg-white">
        <div className="container-premium">
          <SectionHeader
            eyebrow="Управление"
            title={settings.team_section_title ?? fallbackSettings.team_section_title ?? 'Попечительский совет'}
            description={
              settings.team_section_description ??
              fallbackSettings.team_section_description ??
              'Совет объединяет представителей университета и экспертов, отвечающих за стратегическое развитие фонда.'
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {home.board_members.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.05} className="group text-center">
                <div className="mx-auto h-52 w-full max-w-[240px] overflow-hidden rounded-xl bg-warm shadow-soft">
                  <img
                    src={member.photo_url ?? referenceImages.logo}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 text-ink">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-accent">{member.role}</p>
                <p className="mt-3 text-sm font-light leading-6 text-ink/62">{member.regalia}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-premium">
          <div className="grid overflow-hidden rounded-xl bg-white shadow-premium lg:grid-cols-[0.95fr_1.05fr]">
            <AnimatedSection className="min-h-[440px]">
              <img src={founder.photo_url ?? referenceImages.logo} alt={founder.name} className="h-full min-h-[440px] w-full object-cover" loading="lazy" />
            </AnimatedSection>
            <AnimatedSection className="flex flex-col justify-center p-7 md:p-12">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-accent">Учредитель фонда</p>
              <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">АО «Алматинский технологический университет»</h2>
              <div className="mt-8 rounded-xl border border-black/5 bg-warm p-6">
                <h3 className="text-2xl font-semibold text-navy">{founder.name}</h3>
                <p className="mt-2 text-base font-semibold text-accent">{founder.role}</p>
                <p className="mt-5 text-base font-light leading-8 text-ink/68">{founder.regalia}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="donate" className="section-pad scroll-mt-24 bg-white">
        <div className="mx-auto w-full max-w-[1900px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 rounded-xl bg-navy p-5 text-white shadow-premium md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <AnimatedSection className="rounded-xl bg-white p-6 text-ink md:p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent">
                  <QrCode size={25} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Сделать вклад</p>
                  <h2 className="text-2xl font-semibold text-navy">QR-код и реквизиты</h2>
                </div>
              </div>
              <div className="mt-7 grid gap-7 sm:grid-cols-[240px_1fr] sm:items-start xl:grid-cols-[280px_1fr]">
                <div className="rounded-xl border border-black/8 bg-white p-4 shadow-soft">
                  <img
                    src={donationDetail.qr_image_url ?? fallbackDonationDetail.qr_image_url ?? ''}
                    alt="QR-код для вклада"
                    className="aspect-square w-full rounded-lg object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="grid gap-3 text-sm">
                  {bankRows(donationDetail).map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-slate-50 p-3">
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</div>
                      <div className="mt-1 break-words font-semibold leading-6 text-ink">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex flex-col justify-between rounded-xl border border-white/14 bg-white/10 p-6 backdrop-blur md:p-8">
              <div>
                <HandCoins size={42} className="text-gold" />
                <h2 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">
                  {donationDetail.donation_cta_title ?? fallbackDonationDetail.donation_cta_title ?? 'Ваш вклад становится частью долгосрочного капитала АТУ'}
                </h2>
                <p className="mt-5 text-base font-light leading-8 text-white/74">{donationDetail.public_offer_text}</p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {publicOfferHref && (
                  <a
                    href={publicOfferHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-navy"
                  >
                    <FileText size={18} />
                    {donationDetail.public_offer_title ?? 'Договор публичной оферты'}
                  </a>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-pad bg-smoke">
        <div className="container-premium">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader align="left" title="Новости фонда" description="События и объявления ATU Endowment Fund." className="mx-0" />
            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-navy">
              Все новости <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {home.news.slice(0, 3).map((item, index) => (
              <AnimatedSection key={item.slug} delay={index * 0.07} className="group overflow-hidden rounded-xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
                <img src={item.image_url ?? referenceImages.talent} alt={item.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{formatDate(item.published_at)}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-8 text-ink">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/60">{item.excerpt}</p>
                  <Link to={`/news/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-accent">
                    Читать <ExternalLink size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader align="left" title="Вопросы" description="Короткие ответы о работе фонда и формате вкладов." />
            <div className="mt-8 rounded-xl bg-warm p-7 text-ink shadow-soft">
              <BookOpenCheck className="text-accent" size={34} />
              <p className="mt-5 text-xl font-light leading-9">
                Каждый вклад работает на долгосрочную поддержку студентов, науки, инфраструктуры и стратегических инициатив университета.
              </p>
            </div>
          </div>
          <div>
            <FaqAccordion items={home.faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <section className="bg-accent text-white">
        <div className="container-premium grid gap-8 py-14 md:grid-cols-[1fr_1fr_1fr] md:items-center">
          <div className="flex items-center gap-4">
            <Mail size={24} />
            <a className="font-semibold hover:text-navy" href={`mailto:${settings.email ?? 'info@atu.edu.kz'}`}>
              {settings.email ?? 'info@atu.edu.kz'}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={24} />
            <span className="font-semibold">{settings.address ?? 'г. Алматы, ул. Толе би, 100'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Users size={24} />
            <Link className="font-semibold hover:text-navy" to="/contacts">
              Контактная информация
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
