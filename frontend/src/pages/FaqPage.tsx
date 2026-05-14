import PageHero from '../components/ui/PageHero';
import FaqAccordion from '../components/ui/FaqAccordion';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackFaqs, fallbackSettings } from '../data/fallback';
import { useContentStore } from '../store/contentStore';

export default function FaqPage() {
  const settings = useContentStore((state) => state.home.settings) ?? fallbackSettings;

  return (
    <>
      <PageHero
        title={settings.faq_hero_title ?? fallbackSettings.faq_hero_title ?? 'FAQ'}
        description={settings.faq_hero_description ?? fallbackSettings.faq_hero_description ?? 'Ответы на частые вопросы о фонде, пожертвованиях и программах поддержки.'}
      />
      <section className="section-pad bg-white">
        <div className="container-premium max-w-4xl">
          <SectionHeader title={settings.faq_section_title ?? fallbackSettings.faq_section_title ?? 'Частые вопросы'} />
          <div className="mt-12">
            <FaqAccordion items={fallbackFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
