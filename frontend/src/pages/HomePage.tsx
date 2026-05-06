import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Lightbulb, Mail, MapPin, Quote, Trophy } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import Counter from '../components/ui/Counter';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackSettings, referenceImages } from '../data/fallback';
import { useContentStore } from '../store/contentStore';
import { formatCurrency, formatDate } from '../utils/format';

const supportDirections = [
  {
    title: 'Финансовая поддержка студентов университета',
    description: '(гранты на обучение, именные стипендии и т.д.)',
    image: referenceImages.finance,
    icon: GraduationCap,
  },
  {
    title: 'Поддержка инновационной деятельности студентов',
    description: '(стартапы, научные проекты и т.д.)',
    image: referenceImages.innovation,
    icon: Lightbulb,
  },
  {
    title: 'Поддержка талантливых студентов',
    description: '(спортивные соревнования, участие в олимпиадах, конкурсах и др.)',
    image: referenceImages.talent,
    icon: Trophy,
  },
];

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const { home, loadHome } = useContentStore();
  const settings = home.settings ?? fallbackSettings;

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-navy text-white">
        <motion.img
          style={{ y: heroY }}
          src={settings.hero_image_url ?? referenceImages.hero}
          alt="ENU Endowment Fund"
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-navy/20" />
        <div className="absolute inset-x-0 top-28 z-10 text-center text-[clamp(2.2rem,5.4vw,4.25rem)] font-semibold tracking-normal text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.8)]">
          {settings.hero_title}
        </div>

        <div className="container-premium relative z-10 flex min-h-screen items-center pt-28">
          <motion.div
            className="max-w-4xl pt-20"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 inline-flex rounded-full border border-white/25 bg-black/25 px-5 py-2 text-sm font-semibold backdrop-blur">
              Университетский фонд долгосрочного капитала
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.72)] md:text-6xl lg:text-7xl">
              Вместе создаём устойчивую поддержку студентов ENU
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.72)] md:text-2xl">
              {settings.hero_subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-[0_22px_42px_rgba(255,124,59,0.28)] transition hover:-translate-y-1 hover:bg-[#ef6f2d]"
              >
                {settings.hero_cta_primary ?? 'Сделать вклад'}
                <ArrowRight size={19} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition hover:-translate-y-1 hover:border-white hover:bg-white hover:text-navy"
              >
                {settings.hero_cta_secondary ?? 'О фонде'}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="container-premium relative z-10 -mt-28 pb-10">
          <div className="grid gap-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-3">
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

      <section className="section-pad bg-warm">
        <div className="container-premium">
          <SectionHeader
            title="О фонде"
            description="Эндаумент — это фонд, который направлен на поддержку инициатив студентов и достижение стратегических целей Евразийского Национального Университета."
          />
          <AnimatedSection className="mx-auto mt-10 max-w-4xl text-center text-xl font-light leading-9 text-ink/70">
            ENU Endowment Fund ставит целью собрать 500 миллионов тенге в течение года, что обеспечит университет стабильным
            финансированием и укрепит лидирующие позиции на Евразийском пространстве. Формат эндаумента помогает сохранить
            собранные средства, инвестировать и поддерживать студентов за счёт полученного дохода.
          </AnimatedSection>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium">
          <SectionHeader
            title="На что идут собранные средства фонда?"
            description={`Если вам необходима помощь, напишите нам на ${settings.email ?? 'info@endowmentenu.kz'}`}
          />
          <div className="mt-16 grid gap-7 lg:grid-cols-3">
            {supportDirections.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.08} className="group overflow-hidden rounded-xl bg-warm shadow-soft">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
                      <Icon size={23} />
                    </div>
                  </div>
                  <div className="min-h-[210px] p-6">
                    <h3 className="text-xl font-semibold leading-8 text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm font-light leading-6 text-ink/60">{item.description}</p>
                    <Link
                      to="/scholarships"
                      className="mt-7 inline-flex rounded-full border-2 border-accent px-6 py-2.5 text-sm font-bold text-ink transition hover:bg-accent hover:text-white"
                    >
                      Подробнее
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-smoke">
        <div className="container-premium">
          <SectionHeader title="Достижения фонда" />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              ['ENU Endowment Fund провёл', 'Первый', 'в стране форум «Эндаументы Казахстана»'],
              ['За период 2022-2026 уч. года фонд обеспечил стипендиями порядка', '50', 'студентов'],
              ['Было выделено более', '40', 'грантов'],
            ].map(([top, value, bottom], index) => (
              <AnimatedSection key={value} delay={index * 0.08} className="relative px-8 text-center">
                <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-[#0051ff] md:block" />
                <p className="text-sm font-semibold uppercase leading-6 text-ink/70">{top}</p>
                <div className="my-5 text-5xl font-semibold italic text-navy">{Number.isNaN(Number(value)) ? value : <Counter value={Number(value)} />}</div>
                <p className="text-base font-light leading-7 text-ink/70">{bottom}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-premium">
          <div className="border-y border-black py-8 text-center text-3xl font-light leading-tight text-accent md:text-4xl">
            Вместе делаем жизнь студентов счастливее!
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[referenceImages.galleryOne, referenceImages.galleryTwo].map((image) => (
              <img key={image} src={image} alt="ENU Endowment Fund" className="h-[330px] w-full rounded-xl object-cover shadow-soft" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section-pad bg-white">
        <div className="container-premium">
          <SectionHeader title="Попечительский совет ENU Endowment Fund" />
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {home.team_members.slice(0, 6).map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.05} className="text-center">
                <img
                  src={member.photo_url ?? referenceImages.logo}
                  alt={member.name}
                  className="mx-auto h-48 w-48 rounded-full object-cover shadow-soft"
                  loading="lazy"
                />
                <h3 className="mt-6 text-xl font-semibold leading-8 text-ink">{member.name}</h3>
                <p className="mt-1 text-sm text-accent">{member.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeader
              align="left"
              title="Стипендии и грантовые программы"
              description="Фонд помогает студентам получать финансовую поддержку, развивать исследования и участвовать в академических конкурсах."
            />
            <div className="grid gap-5">
              {home.scholarships.slice(0, 3).map((item) => (
                <AnimatedSection key={item.title} className="premium-card p-6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/60">{item.description}</p>
                    </div>
                    <div className="shrink-0 text-left md:text-right">
                      <div className="text-lg font-bold text-navy">{formatCurrency(item.amount)}</div>
                      <div className="mt-1 text-xs text-ink/50">до {formatDate(item.deadline)}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader align="left" title="Новости фонда" description="События, объявления и истории поддержки студентов ENU." className="mx-0" />
            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-navy">
              Все новости <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {home.news.slice(0, 3).map((item, index) => (
              <AnimatedSection key={item.slug} delay={index * 0.08} className="group premium-card overflow-hidden">
                <img src={item.image_url ?? referenceImages.talent} alt={item.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{formatDate(item.published_at)}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-8 text-ink">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/60">{item.excerpt}</p>
                  <Link to={`/news/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-accent">
                    Читать <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-smoke">
        <div className="container-premium">
          <SectionHeader title="Партнёры фонда" description="Сообщество выпускников, партнёров и организаций, которые усиливают возможности студентов." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.partners.map((partner) => (
              <AnimatedSection key={partner.name} className="premium-card flex min-h-36 items-center gap-5 p-6">
                <img src={partner.logo_url ?? referenceImages.logo} alt={partner.name} className="h-16 w-20 object-contain" loading="lazy" />
                <div>
                  <h3 className="font-semibold text-ink">{partner.name}</h3>
                  {partner.website && <a href={partner.website} className="mt-1 block text-sm text-accent" target="_blank" rel="noreferrer">Перейти на сайт</a>}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader align="left" title="FAQ" description="Короткие ответы на вопросы о работе фонда и форматах поддержки." />
            <div className="mt-8 rounded-xl bg-navy p-8 text-white shadow-premium">
              <Quote className="text-accent" size={34} />
              <p className="mt-5 text-xl font-light leading-9">
                Каждый вклад работает дольше одного учебного года: он формирует устойчивую систему поддержки студентов.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {home.faqs.slice(0, 5).map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-black/8 bg-white p-6 shadow-soft">
                <summary className="cursor-pointer list-none text-lg font-semibold text-ink">
                  <span>{faq.question}</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-ink/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent text-white">
        <div className="container-premium grid min-h-[520px] gap-10 py-16 lg:grid-cols-[430px_1fr] lg:items-center">
          <AnimatedSection className="rounded-xl bg-accent p-2">
            <h2 className="text-4xl font-semibold">Контакты</h2>
            <div className="mt-8 grid gap-5 text-lg font-light">
              <a className="flex items-center gap-3 hover:text-navy" href={`mailto:${settings.email ?? 'info@endowmentenu.kz'}`}>
                <Mail size={22} /> {settings.email ?? 'info@endowmentenu.kz'}
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={22} /> {settings.address ?? 'ул. Сатпаева 2'}
              </span>
            </div>
            <Link to="/contacts" className="mt-9 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold text-accent transition hover:bg-navy hover:text-white">
              Обратная связь
            </Link>
          </AnimatedSection>
          <AnimatedSection className="min-h-[360px] rounded-xl bg-white/20 p-4">
            <div className="grid h-full min-h-[360px] place-items-center rounded-lg bg-[#e8e8e8] text-center text-navy">
              <Building2 size={42} className="mx-auto mb-4 text-accent" />
              <div className="text-xl font-semibold">Офис ENU Endowment Fund</div>
              <div className="mt-2 text-sm text-ink/60">3 этаж, ул. Сатпаева 2, Астана</div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
