import AnimatedSection from './AnimatedSection';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({ eyebrow, title, description, align = 'center', className = '' }: SectionHeaderProps) {
  return (
    <AnimatedSection className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      {description && <p className="mt-6 text-lg font-light leading-8 text-ink/70 md:text-xl">{description}</p>}
    </AnimatedSection>
  );
}
