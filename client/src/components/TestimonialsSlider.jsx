import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';

const renderStars = (rating = 5) => {
  const normalized = Math.max(1, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }, (_, idx) => (idx < normalized ? '' : '')).join(' ');
};

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'EA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const Avatar = ({ name, avatarUrl }) => {
  const [errored, setErrored] = useState(false);

  if (avatarUrl && !errored) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
        className="h-16 w-16 rounded-full border border-aqua/30 object-cover shadow-sm"
      />
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-coral/40 bg-coral/10 text-sm font-bold text-coral shadow-sm">
      {getInitials(name)}
    </div>
  );
};

const TestimonialsSlider = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const current = testimonials[index];
  const rating = current.rating || 5;

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Testimonials"
        title="Honest Reviews"
        subtitle="Genuine feedback from parents and players who train with Ekalavya Academy of Cricket Excellence."
      />

      <div className="rounded-2xl border border-aqua/30 bg-cream p-8 shadow-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={current._id || current.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center">
              <Avatar name={current.name} avatarUrl={current.avatarUrl} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Verified Review</p>
            <p className="mt-4 text-lg leading-8 text-paper">"{current.message}"</p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="rounded-full border border-coral/35 bg-coral/10 px-3 py-1 text-xs font-semibold text-paper">
                {rating.toFixed(1)} / 5
              </span>
              <span className="text-sm tracking-[0.1em] text-coral">{renderStars(rating)}</span>
            </div>

            <p className="mt-5 text-sm font-semibold text-paper">{current.name}</p>
            <p className="text-xs text-muted">{current.role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item._id || `${item.name}-${idx}`}
              onClick={() => setIndex(idx)}
              className={`h-2.5 rounded-full transition ${index === idx ? 'w-8 bg-coral' : 'w-2.5 bg-aqua/45'}`}
              aria-label={`Open testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
