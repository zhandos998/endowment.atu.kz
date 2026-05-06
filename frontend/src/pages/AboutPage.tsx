import { HeartHandshake, Landmark, ShieldCheck, Users } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackTeam, referenceImages } from '../data/fallback';

const values = [
  { title: 'Долгосрочный капитал', text: 'Средства фонда работают не разово: капитал сохраняется, инвестируется и возвращается студентам через программы поддержки.', icon: Landmark },
  { title: 'Прозрачность', text: 'Администрирование строится вокруг понятных программ, отчётности и аккуратной коммуникации с донорами.', icon: ShieldCheck },
  { title: 'Студенческий фокус', text: 'Приоритет фонда — гранты, стипендии, инновации, исследования и возможности для талантливых студентов.', icon: Users },
  { title: 'Сообщество ENU', text: 'Фонд объединяет университет, выпускников, партнёров и меценатов вокруг устойчивого будущего ENU.', icon: HeartHandshake },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="О фонде"
        description="ENU Endowment Fund — фонд долгосрочной поддержки Евразийского национального университета."
      />
      <section className="section-pad bg-warm">
        <div className="container-premium">
          <SectionHeader
            title="Фонд, который работает на будущее университета"
            description="Эндаумент помогает сохранить собранные средства, инвестировать их и направлять доход на развитие студентов, исследований и инициатив ENU."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={index * 0.06} className="premium-card p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/60">{item.text}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      <section id="team" className="section-pad bg-white">
        <div className="container-premium">
          <SectionHeader
            title="Попечительский совет"
            description="Команда фонда формирует стратегию поддержки и помогает привлекать партнёров к развитию университетской среды."
          />
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackTeam.map((member, index) => (
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
    </>
  );
}
