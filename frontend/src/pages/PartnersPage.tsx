import AnimatedSection from '../components/ui/AnimatedSection';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import { fallbackPartners, referenceImages } from '../data/fallback';

export default function PartnersPage() {
  return (
    <>
      <PageHero title="Партнёры" description="Организации и сообщества, которые помогают фонду развивать возможности студентов АТУ." />
      <section className="section-pad bg-smoke">
        <div className="container-premium">
          <SectionHeader title="Партнёрская экосистема" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackPartners.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.08} className="premium-card min-h-48 p-7">
                <img src={partner.logo_url ?? referenceImages.logo} alt={partner.name} className="h-20 max-w-[180px] object-contain" loading="lazy" />
                <h2 className="mt-7 text-xl font-semibold text-ink">{partner.name}</h2>
                {partner.website && <a href={partner.website} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-bold text-accent">Сайт партнёра</a>}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
