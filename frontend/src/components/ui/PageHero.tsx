import { motion } from 'framer-motion';
import { referenceImages } from '../../data/fallback';

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
};

export default function PageHero({ title, description, image = referenceImages.hero }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-navy pt-28 text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/70 to-navy/92" />
      <motion.div
        className="container-premium relative z-10 pb-16 md:pb-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-3xl text-lg font-light leading-8 text-white/80 md:text-xl">{description}</p>}
      </motion.div>
    </section>
  );
}
