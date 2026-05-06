import { CheckCircle2, CreditCard, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { publicApi } from '../api/endowment';

const amounts = [10000, 25000, 50000, 100000];
const donationBenefits = [
  { title: 'Прозрачная коммуникация', icon: ShieldCheck },
  { title: 'Поддержка конкретных программ', icon: HeartHandshake },
  { title: 'Удобный формат участия', icon: CreditCard },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(25000);
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await publicApi
      .donate({
        donor_name: donorName || 'Анонимный донор',
        amount,
        message,
      })
      .catch(() => null);
    setIsSent(true);
  }

  return (
    <>
      <PageHero title="Как сделать вклад" description="Выберите комфортный формат участия и направьте вклад на долгосрочную поддержку студентов ENU." />
      <section className="section-pad bg-warm">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              align="left"
              title="Ваш вклад превращается в устойчивую программу поддержки"
              description="Средства фонда формируют капитал, доход от которого направляется на стипендии, гранты, исследования и студенческие инициативы."
            />
            <div className="mt-10 grid gap-5">
              {donationBenefits.map(({ title, icon: Icon }) => (
                <div key={title} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-accent text-white">
                    <Icon size={22} />
                  </div>
                  <span className="font-semibold text-ink">{title}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="premium-card p-7 md:p-9">
            <h2 className="text-3xl font-semibold text-ink">Форма пожертвования</h2>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {amounts.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setAmount(item)}
                  className={`rounded-full border px-4 py-3 text-sm font-bold transition ${
                    amount === item ? 'border-accent bg-accent text-white' : 'border-black/10 bg-white text-ink hover:border-accent'
                  }`}
                >
                  {item.toLocaleString('ru-RU')} ₸
                </button>
              ))}
            </div>
            <label className="mt-6 block text-sm font-semibold text-ink">
              Другая сумма
              <input className="admin-input mt-2" type="number" min={100} value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
            </label>
            <label className="mt-5 block text-sm font-semibold text-ink">
              Имя донора
              <input className="admin-input mt-2" value={donorName} onChange={(event) => setDonorName(event.target.value)} placeholder="Можно оставить пустым" />
            </label>
            <label className="mt-5 block text-sm font-semibold text-ink">
              Сообщение
              <textarea className="admin-input mt-2 min-h-28" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Например, хочу поддержать именные стипендии" />
            </label>
            <button className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#ef6f2d]">
              Отправить заявку <CheckCircle2 size={18} />
            </button>
            {isSent && <p className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">Заявка отправлена. Команда фонда свяжется с вами.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
