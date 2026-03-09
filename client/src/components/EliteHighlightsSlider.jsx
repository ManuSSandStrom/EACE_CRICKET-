import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';

const defaultSlides = [
  {
    title: 'Foundation Program',
    description: 'Build technical fluency, movement quality, and training discipline from day one.',
    badge: 'Age 12-14',
  },
  {
    title: 'Advanced Development',
    description: 'Refine game awareness, pressure response, and match execution under coach supervision.',
    badge: 'Age 15-17',
  },
  {
    title: 'Elite Pathway',
    description: 'Competitive preparation with analytics, tactical planning, and high-intensity simulations.',
    badge: 'Performance',
  },
];

const EliteHighlightsSlider = ({ slides = defaultSlides }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Program Spotlight"
        title="High-Impact Training Tracks"
        subtitle="Slide through the core development blocks used by EACE to build competitive cricketers."
      />

      <div className="sports-card rounded-3xl p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.article
            key={index}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -70 }}
            transition={{ duration: 0.45 }}
            className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-center"
          >
            <div>
              <span className="rounded-full border border-cricketGold/40 bg-cricketGold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cricketGold">
                {slides[index].badge}
              </span>
              <h3 className="mt-4 text-4xl font-bold text-paper">{slides[index].title}</h3>
              <p className="mt-3 max-w-2xl text-muted">{slides[index].description}</p>
            </div>

            <div className="rounded-2xl border border-sportsBlue/20 bg-cream p-5">
              <p className="text-sm font-semibold text-paper">What You Gain</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Structured weekly plans and measurable progression</li>
                <li>Coach review checkpoints and technical correction</li>
                <li>Competition-focused preparation modules</li>
              </ul>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, dot) => (
            <button
              key={dot}
              onClick={() => setIndex(dot)}
              className={`h-2.5 rounded-full transition ${index === dot ? 'w-8 bg-cricketGold' : 'w-2.5 bg-[#D0D8E8]'}`}
              aria-label={`Select program slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteHighlightsSlider;
