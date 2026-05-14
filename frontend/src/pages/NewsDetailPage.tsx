import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicApi } from '../api/endowment';
import PageHero from '../components/ui/PageHero';
import { fallbackNews, referenceImages } from '../data/fallback';
import type { NewsItem } from '../types';
import { formatDate } from '../utils/format';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<NewsItem>(fallbackNews.find((item) => item.slug === slug) ?? fallbackNews[0]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    publicApi
      .newsBySlug(slug)
      .then(setNews)
      .catch(() => setNews(fallbackNews.find((item) => item.slug === slug) ?? fallbackNews[0]));
  }, [slug]);

  return (
    <>
      <PageHero title={news.title} description={news.excerpt} image={news.image_url ?? referenceImages.hero} />
      <article className="section-pad bg-white">
        <div className="container-premium max-w-4xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-navy">
            <ArrowLeft size={16} /> Все новости
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-accent">{formatDate(news.published_at)}</p>
          <div
            className="mt-6 max-w-none text-lg font-light leading-8 text-ink/74 [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:font-semibold [&_figcaption]:text-ink/45 [&_figure]:my-8 [&_h2]:mt-8 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-navy [&_hr]:my-8 [&_hr]:border-black/10 [&_img]:max-h-[560px] [&_img]:rounded-xl [&_img]:object-cover [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </article>
    </>
  );
}
