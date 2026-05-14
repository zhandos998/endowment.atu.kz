import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { FaqItem } from '../../types';

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(items[0]?.question ?? null);

  return (
    <div className="grid gap-4">
      {items.map((faq) => {
        const isOpen = openQuestion === faq.question;

        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-soft">
            <button
              type="button"
              onClick={() => setOpenQuestion((value) => (value === faq.question ? null : faq.question))}
              className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold text-ink"
            >
              <span>{faq.question}</span>
              <ChevronDown className={`shrink-0 text-accent transition duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-7 text-ink/60">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
