import { AtSign, Banknote, Building2, CreditCard, Globe2, Mail, MapPin, Phone, PlayCircle, Send, UserRound } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { publicApi } from '../api/endowment';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackDonationDetail, fallbackSettings } from '../data/fallback';
import { useContentStore } from '../store/contentStore';

type FeedbackForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FeedbackForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactsPage() {
  const home = useContentStore((state) => state.home);
  const settings = home.settings ?? fallbackSettings;
  const donationDetail = home.donation_detail ?? fallbackDonationDetail;
  const address = settings.address ?? 'г. Алматы, ул. Толе би, 100';
  const mapQuery = `АО Алматинский технологический университет, ${address}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const directorName = settings.executive_director_name ?? fallbackSettings.executive_director_name ?? 'Исполнительный директор фонда';
  const directorPosition =
    settings.executive_director_position ?? fallbackSettings.executive_director_position ?? 'Ответственное лицо по взаимодействию с вкладчиками';
  const directorPhone = settings.executive_director_phone ?? fallbackSettings.executive_director_phone ?? settings.phone;
  const directorEmail = settings.executive_director_email ?? fallbackSettings.executive_director_email ?? settings.email;
  const directorInitials = directorName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const socialLinks = [
    { label: 'Instagram', href: settings.instagram, icon: AtSign },
    { label: 'YouTube', href: settings.youtube, icon: PlayCircle },
    { label: 'Facebook', href: settings.facebook, icon: Globe2 },
  ].filter((item) => Boolean(item.href));

  const bankDetails = [
    { label: 'Получатель', value: donationDetail.beneficiary, icon: Building2 },
    { label: 'Банк', value: donationDetail.bank_name, icon: Banknote },
    { label: 'БИН', value: donationDetail.bin, icon: CreditCard },
    { label: 'IBAN', value: donationDetail.iban, icon: CreditCard },
    { label: 'БИК', value: donationDetail.bik, icon: CreditCard },
    { label: 'КБЕ', value: donationDetail.kbe, icon: CreditCard },
  ].filter((item) => Boolean(item.value));

  function updateForm(field: keyof FeedbackForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      await publicApi.contactMessage(form);
      setForm(initialForm);
      setSubmitStatus('success');
      setSubmitMessage('Сообщение отправлено. Команда фонда свяжется с вами после рассмотрения.');
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Не удалось отправить сообщение. Проверьте поля и попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero title="Контакты" description="Свяжитесь с командой фонда, чтобы обсудить вклад, партнерство или программу поддержки." />

      <section className="section-pad bg-warm">
        <div className="container-premium grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <form onSubmit={submit} className="rounded-xl bg-white p-6 shadow-premium md:p-8">
            <SectionHeader
              align="left"
              title={settings.contact_feedback_title ?? fallbackSettings.contact_feedback_title ?? 'Форма обратной связи'}
              description={
                settings.contact_feedback_description ??
                fallbackSettings.contact_feedback_description ??
                'Отправьте вопрос, предложение о партнерстве или сообщение для команды фонда.'
              }
            />
            <div className="mt-8 grid gap-5">
              <label className="block text-sm font-semibold text-ink">
                ФИО
                <input className="admin-input mt-2" required value={form.name} onChange={(event) => updateForm('name', event.target.value)} />
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-semibold text-ink">
                  Email
                  <input className="admin-input mt-2" type="email" required value={form.email} onChange={(event) => updateForm('email', event.target.value)} />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Телефон
                  <input className="admin-input mt-2" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} />
                </label>
              </div>
              <label className="block text-sm font-semibold text-ink">
                Тема
                <input className="admin-input mt-2" value={form.subject} onChange={(event) => updateForm('subject', event.target.value)} />
              </label>
              <label className="block text-sm font-semibold text-ink">
                Сообщение
                <textarea className="admin-input mt-2 min-h-36" required value={form.message} onChange={(event) => updateForm('message', event.target.value)} />
              </label>
            </div>
            <button disabled={isSubmitting} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#ef6f2d] disabled:opacity-60">
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'} <Send size={18} />
            </button>
            {submitMessage && (
              <p className={`mt-4 rounded-lg p-4 text-sm font-semibold ${submitStatus === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {submitMessage}
              </p>
            )}
          </form>

          <div className="grid gap-6">
            <div className="rounded-xl bg-navy p-6 text-white shadow-premium md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Контактная информация</p>
              <h2 className="mt-4 text-3xl font-semibold">ATU Endowment Fund</h2>
              <div className="mt-8 grid gap-5 text-base font-light">
                <a className="flex items-center gap-3 hover:text-accent" href={`mailto:${settings.email ?? 'info@atu.edu.kz'}`}>
                  <Mail size={21} /> {settings.email ?? 'info@atu.edu.kz'}
                </a>
                <span className="flex items-center gap-3">
                  <MapPin size={21} /> {address}
                </span>
                <span className="flex items-center gap-3">
                  <Phone size={21} /> {settings.phone ?? '+7 727 221-88-08'}
                </span>
              </div>
              {socialLinks.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:border-accent hover:bg-accent"
                        href={item.href ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-xl bg-white p-6 shadow-soft md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Ответственное лицо</p>
              <div className="mt-6 flex gap-5">
                {settings.executive_director_photo_url ? (
                  <img src={settings.executive_director_photo_url} alt={directorName} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                ) : (
                  <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-accent/10 text-2xl font-bold text-accent">
                    {directorInitials || <UserRound size={30} />}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold leading-7 text-navy">{directorName}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/62">{directorPosition}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-ink/70">
                {directorPhone && (
                  <a className="flex items-center gap-3 hover:text-accent" href={`tel:${directorPhone}`}>
                    <Phone size={18} /> {directorPhone}
                  </a>
                )}
                {directorEmail && (
                  <a className="flex items-center gap-3 hover:text-accent" href={`mailto:${directorEmail}`}>
                    <Mail size={18} /> {directorEmail}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-xl bg-smoke p-6 md:p-8">
            <SectionHeader align="left" title="Банковские реквизиты фонда" description="Реквизиты используются для добровольных вкладов в целевой капитал фонда." />
            {donationDetail.qr_image_url && (
              <div className="mt-8 flex flex-col gap-5 rounded-lg bg-white p-5 sm:flex-row sm:items-center">
                <img src={donationDetail.qr_image_url} alt="QR-код для вклада" className="h-36 w-36 shrink-0 rounded-lg bg-white object-contain" />
                <div>
                  <div className="text-xl font-semibold text-navy">QR-код для вклада</div>
                  <p className="mt-2 text-sm leading-7 text-ink/62">
                    Можно использовать для быстрого перехода к актуальному способу внесения вклада.
                  </p>
                </div>
              </div>
            )}
            <div className={`${donationDetail.qr_image_url ? 'mt-5' : 'mt-8'} grid gap-4`}>
              {bankDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex gap-4 rounded-lg bg-white p-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-ink/42">{item.label}</div>
                      <div className="mt-1 break-words text-base font-semibold text-navy">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {donationDetail.payment_purpose && (
              <div className="mt-5 rounded-lg border border-accent/20 bg-white p-5">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-ink/42">Назначение платежа</div>
                <p className="mt-2 text-sm leading-7 text-ink/70">{donationDetail.payment_purpose}</p>
              </div>
            )}
            {(donationDetail.public_offer_document_url || donationDetail.public_offer_url) && (
              <a
                href={donationDetail.public_offer_document_url ?? donationDetail.public_offer_url ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-accent"
              >
                {donationDetail.public_offer_title ?? 'Документ оферты'}
              </a>
            )}
          </div>

          <div className="min-h-[540px] overflow-hidden rounded-xl bg-navy/10 p-4 shadow-premium">
            <iframe
              title="Карта АТУ"
              src={mapUrl}
              className="h-full min-h-[540px] w-full rounded-lg border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="sr-only" href={mapLink} target="_blank" rel="noreferrer">
              Открыть АТУ на карте
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
