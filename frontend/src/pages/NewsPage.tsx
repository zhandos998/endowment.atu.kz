import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackNews, referenceImages } from '../data/fallback';
import { formatDate } from '../utils/format';

export default function NewsPage() {
  return (
    <>
      <PageHero title="Новости" description="События фонда, объявления и истории поддержки студентов ENU." />
      <section className="section-pad bg-white">
        <div className="container-premium">
          <SectionHeader title="Последние публикации" />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {fallbackNews.map((item, index) => (
              <AnimatedSection key={item.slug} delay={index * 0.08} className="group premium-card overflow-hidden">
                <img src={item.image_url ?? referenceImages.talent} alt={item.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{formatDate(item.published_at)}</p>
                  <h2 className="mt-4 text-xl font-semibold leading-8 text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{item.excerpt}</p>
                  <Link to={`/news/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-accent">
                    Читать полностью <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
