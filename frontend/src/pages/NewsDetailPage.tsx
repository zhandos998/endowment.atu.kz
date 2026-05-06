import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { fallbackNews, referenceImages } from '../data/fallback';
import { formatDate } from '../utils/format';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const news = fallbackNews.find((item) => item.slug === slug) ?? fallbackNews[0];

  return (
    <>
      <PageHero title={news.title} description={news.excerpt} image={news.image_url ?? referenceImages.hero} />
      <article className="section-pad bg-white">
        <div className="container-premium max-w-4xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-navy">
            <ArrowLeft size={16} /> Все новости
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-accent">{formatDate(news.published_at)}</p>
          <div className="prose prose-lg mt-6 max-w-none text-ink/74">
            <p>{news.content}</p>
            <p>
              ENU Endowment Fund продолжает развивать долгосрочные программы поддержки студентов и приглашает выпускников,
              партнёров и меценатов присоединиться к работе фонда.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
