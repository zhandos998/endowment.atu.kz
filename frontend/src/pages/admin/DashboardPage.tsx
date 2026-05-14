import { Briefcase, ChartNoAxesCombined, GraduationCap, HandCoins, Mail, Newspaper, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { formatCurrency } from '../../utils/format';

type DashboardPayload = {
  cards: {
    news: number;
    scholarships: number;
    scholarship_applications: number;
    contact_messages: number;
    donations: number;
    donation_details: number;
    fund_portfolios: number;
    fund_achievements: number;
    partners: number;
    team_members: number;
    faqs: number;
  };
};

const empty: DashboardPayload = {
  cards: {
    news: 0,
    scholarships: 0,
    scholarship_applications: 0,
    contact_messages: 0,
    donations: 0,
    donation_details: 0,
    fund_portfolios: 0,
    fund_achievements: 0,
    partners: 0,
    team_members: 0,
    faqs: 0,
  },
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(empty);

  useEffect(() => {
    api
      .get<DashboardPayload>('/admin/dashboard')
      .then(({ data }) => setDashboard(data))
      .catch(() => setDashboard(empty));
  }, []);

  const cards = [
    { label: 'Целевые капиталы', value: dashboard.cards.fund_portfolios, icon: Briefcase },
    { label: 'Достижения фонда', value: dashboard.cards.fund_achievements, icon: ChartNoAxesCombined },
    { label: 'Сумма пожертвований', value: formatCurrency(dashboard.cards.donations), icon: HandCoins },
    { label: 'Совет и команда', value: dashboard.cards.team_members, icon: Users },
    { label: 'Новости', value: dashboard.cards.news, icon: Newspaper },
    { label: 'Стипендии', value: dashboard.cards.scholarships, icon: GraduationCap },
    { label: 'Заявки на стипендии', value: dashboard.cards.scholarship_applications, icon: GraduationCap },
    { label: 'Обратная связь', value: dashboard.cards.contact_messages, icon: Mail },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-navy">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">Ключевые показатели и быстрый обзор контента фонда.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl bg-white p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                <Icon size={22} />
              </div>
              <div className="mt-6 text-3xl font-semibold text-navy">{card.value}</div>
              <div className="mt-2 text-sm text-slate-500">{card.label}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-navy">Редактируемые блоки главной</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Главная страница получает данные из настроек сайта, целевых капиталов, достижений, команды и реквизитов вклада. Все эти разделы доступны в боковом меню.
        </p>
      </div>
    </div>
  );
}
