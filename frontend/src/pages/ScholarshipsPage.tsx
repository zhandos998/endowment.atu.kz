import { CalendarDays, CheckCircle2, FileUp, Send, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { publicApi } from '../api/endowment';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackScholarships, fallbackSettings } from '../data/fallback';
import { useContentStore } from '../store/contentStore';
import type { Scholarship } from '../types';
import { formatCurrency, formatDate } from '../utils/format';

export default function ScholarshipsPage() {
  const settings = useContentStore((state) => state.home.settings) ?? fallbackSettings;
  const [scholarships, setScholarships] = useState<Scholarship[]>(fallbackScholarships);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship>(fallbackScholarships[0]);
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [message, setMessage] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    publicApi
      .scholarships()
      .then((items) => {
        if (items.length) {
          setScholarships(items);
          setSelectedScholarship(items[0]);
        }
      })
      .catch(() => {
        setScholarships(fallbackScholarships);
        setSelectedScholarship(fallbackScholarships[0]);
      });
  }, []);

  function chooseScholarship(item: Scholarship) {
    setSelectedScholarship(item);
    setSubmitStatus(null);
    setSubmitMessage('');
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  function chooseScholarshipById(id: number) {
    const nextScholarship = scholarships.find((item) => item.id === id);

    if (nextScholarship) {
      setSelectedScholarship(nextScholarship);
      setSubmitStatus(null);
      setSubmitMessage('');
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const payload = new FormData();
      payload.append('scholarship_id', String(selectedScholarship.id));
      payload.append('applicant_name', applicantName);
      payload.append('email', email);
      payload.append('phone', phone);
      payload.append('student_group', studentGroup);
      payload.append('message', message);
      documents.forEach((file) => payload.append('documents[]', file));

      await publicApi.applyScholarship(payload);
      setApplicantName('');
      setEmail('');
      setPhone('');
      setStudentGroup('');
      setMessage('');
      setDocuments([]);
      setFileInputKey((value) => value + 1);
      setSubmitStatus('success');
      setSubmitMessage('Заявка отправлена. Команда фонда свяжется с вами после рассмотрения.');
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Не удалось отправить заявку. Проверьте поля и попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function addDocuments(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setDocuments((currentDocuments) => [...currentDocuments, ...Array.from(files)].slice(0, 8));
    setFileInputKey((value) => value + 1);
  }

  function removeDocument(index: number) {
    setDocuments((currentDocuments) => currentDocuments.filter((_, documentIndex) => documentIndex !== index));
  }

  return (
    <>
      <PageHero
        title={settings.scholarships_hero_title ?? fallbackSettings.scholarships_hero_title ?? 'Стипендии'}
        description={settings.scholarships_hero_description ?? fallbackSettings.scholarships_hero_description ?? 'Грантовые и стипендиальные программы для студентов АТУ.'}
      />
      <section className="section-pad bg-warm">
        <div className="container-premium">
          <SectionHeader
            title={settings.scholarships_section_title ?? fallbackSettings.scholarships_section_title ?? 'Программы поддержки'}
            description={
              settings.scholarships_section_description ??
              fallbackSettings.scholarships_section_description ??
              'Каждая программа ориентирована на конкретный результат: обучение, исследования, участие в конкурсах и развитие инициатив.'
            }
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {scholarships.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08} className="premium-card flex min-h-[360px] flex-col p-7">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Программа</div>
                <h3 className="mt-5 text-2xl font-semibold leading-9 text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/60">{item.description}</p>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-ink/64">
                  {item.conditions && (
                    <div>
                      <div className="font-bold text-navy">Условия участия</div>
                      <p className="whitespace-pre-line">{item.conditions}</p>
                    </div>
                  )}
                  {item.application_steps && (
                    <div>
                      <div className="font-bold text-navy">Порядок подачи заявки</div>
                      <p className="whitespace-pre-line">{item.application_steps}</p>
                    </div>
                  )}
                  {item.required_documents && (
                    <div>
                      <div className="font-bold text-navy">Документы</div>
                      <p className="whitespace-pre-line">{item.required_documents}</p>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-7">
                  <div className="rounded-lg bg-smoke p-5">
                    <div className="text-2xl font-bold text-navy">{formatCurrency(item.amount)}</div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                      <CalendarDays size={17} /> Дедлайн: {formatDate(item.deadline)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => chooseScholarship(item)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#ef6f2d]"
                  >
                    Подать заявку <Send size={17} />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div ref={formRef} className="mt-14 scroll-mt-24 rounded-xl bg-white p-6 shadow-premium md:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Анкета</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy">Подача заявки</h2>
                <p className="mt-4 text-sm leading-7 text-ink/62">
                  Выбранная программа: <span className="font-bold text-ink">{selectedScholarship.title}</span>
                </p>
                <div className="mt-6 rounded-lg bg-warm p-5 text-sm leading-7 text-ink/66">
                  Загрузите документы в формате PDF, DOC, DOCX, JPG или PNG. Максимум 8 файлов, до 10 МБ каждый.
                </div>
                {selectedScholarship.required_documents && (
                  <div className="mt-4 rounded-lg border border-accent/20 bg-white p-5 text-sm leading-7 text-ink/66">
                    <div className="font-bold text-navy">Что приложить</div>
                    <p className="mt-2 whitespace-pre-line">{selectedScholarship.required_documents}</p>
                  </div>
                )}
              </div>

              <form onSubmit={submit} className="grid gap-5">
                <label className="block text-sm font-semibold text-ink">
                  Программа
                  <select
                    className="admin-input mt-2"
                    value={selectedScholarship.id}
                    onChange={(event) => chooseScholarshipById(Number(event.target.value))}
                  >
                    {scholarships.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-ink">
                  ФИО
                  <input className="admin-input mt-2" required value={applicantName} onChange={(event) => setApplicantName(event.target.value)} />
                </label>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-ink">
                    Email
                    <input className="admin-input mt-2" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                  </label>
                  <label className="block text-sm font-semibold text-ink">
                    Телефон
                    <input className="admin-input mt-2" value={phone} onChange={(event) => setPhone(event.target.value)} />
                  </label>
                </div>
                <label className="block text-sm font-semibold text-ink">
                  Группа / курс
                  <input className="admin-input mt-2" value={studentGroup} onChange={(event) => setStudentGroup(event.target.value)} />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Комментарий к заявке
                  <textarea className="admin-input mt-2 min-h-28" value={message} onChange={(event) => setMessage(event.target.value)} />
                </label>
                <label className="block text-sm font-semibold text-ink">
                  Документы
                  <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
                    <FileUp className="text-accent" size={20} />
                    <input
                      key={fileInputKey}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                      onChange={(event) => addDocuments(event.target.files)}
                    />
                  </span>
                  {documents.length > 0 && (
                    <div className="mt-3 grid gap-2">
                      {documents.map((file, index) => (
                        <div key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center justify-between gap-3 rounded-lg bg-smoke px-4 py-3 text-sm text-ink/70">
                          <span className="min-w-0 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-red-600 transition hover:bg-red-50"
                            aria-label="Удалить документ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </label>
                <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-white transition hover:bg-[#ef6f2d] disabled:opacity-60">
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'} <CheckCircle2 size={18} />
                </button>
                {submitMessage && (
                  <p
                    className={`rounded-lg p-4 text-sm font-semibold ${
                      submitStatus === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
