import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackFaqs } from '../data/fallback';

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQ" description="Ответы на частые вопросы о фонде, пожертвованиях и программах поддержки." />
      <section className="section-pad bg-white">
        <div className="container-premium max-w-4xl">
          <SectionHeader title="Частые вопросы" />
          <div className="mt-12 grid gap-4">
            {fallbackFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-black/8 bg-white p-6 shadow-soft">
                <summary className="cursor-pointer list-none text-lg font-semibold text-ink">{faq.question}</summary>
                <p className="mt-4 text-sm leading-7 text-ink/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
