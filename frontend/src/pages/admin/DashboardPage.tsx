import { HandCoins, Newspaper, Users, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { formatCurrency } from '../../utils/format';

type DashboardPayload = {
  cards: {
    news: number;
    scholarships: number;
    donations: number;
    partners: number;
    team_members: number;
    faqs: number;
  };
};

const empty: DashboardPayload = {
  cards: {
    news: 0,
    scholarships: 0,
    donations: 0,
    partners: 0,
    team_members: 0,
    faqs: 0,
  },
};

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(empty);

  useEffect(() => {
    api.get<DashboardPayload>('/admin/dashboard').then(({ data }) => setDashboard(data)).catch(() => setDashboard(empty));
  }, []);

  const cards = [
    { label: 'Новости', value: dashboard.cards.news, icon: Newspaper },
    { label: 'Стипендии', value: dashboard.cards.scholarships, icon: GraduationCap },
    { label: 'Сумма пожертвований', value: formatCurrency(dashboard.cards.donations), icon: HandCoins },
    { label: 'Команда и партнёры', value: dashboard.cards.team_members + dashboard.cards.partners, icon: Users },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-navy">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">Ключевые показатели и быстрый обзор контента фонда.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
        <h2 className="text-xl font-semibold text-navy">Рабочий процесс</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          Используйте боковое меню для CRUD-управления страницами. Формы отправляют файлы через multipart-запросы,
          таблицы поддерживают поиск и пагинацию.
        </p>
      </div>
    </div>
  );
}
