import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getHomeContent } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';

const fallbackCoaches = [
  { name: 'Head Coach', expertise: 'Technical & Tactical Development' },
  { name: 'Batting Coach', expertise: 'Elite Shot Selection & Build-Up' },
  { name: 'Bowling Coach', expertise: 'Pace, Seam, Spin & Execution' },
  { name: 'Fielding Coach', expertise: 'Athletic Fielding & Reflex Systems' },
];

const normalizeCoaches = (coaches, fallback) => {
  const normalized = Array.isArray(coaches)
    ? coaches
        .map((coach) => {
          if (!coach || typeof coach !== 'object') return null;
          const name = typeof coach.name === 'string' ? coach.name.trim() : '';
          const expertise = typeof coach.expertise === 'string' ? coach.expertise.trim() : '';
          if (!name) return null;
          return { name, expertise: expertise || 'Cricket Development Specialist' };
        })
        .filter(Boolean)
    : [];

  return normalized.length ? normalized : fallback;
};

const CoachesPage = () => {
  const [coaches, setCoaches] = useState(fallbackCoaches);

  useEffect(() => {
    const load = async () => {
      try {
        const content = await getHomeContent();
        if (content?.coaches?.length) {
          setCoaches(content.coaches);
        }
      } catch (_error) {
      }
    };

    load();
  }, []);

  const safeCoaches = useMemo(() => normalizeCoaches(coaches, fallbackCoaches), [coaches]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>Professional Coaches | EACE</title>
      </Helmet>

      <SectionTitle
        eyebrow="Coaching Team"
        title="Professional Coaches"
        subtitle="A dedicated coaching panel designed to build complete players with technical depth and match intelligence."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {safeCoaches.map((coach, idx) => (
          <motion.article
            key={`${coach.name}-${idx}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 18px rgba(118, 210, 219, 0.35), 0 24px 42px rgba(54, 6, 77, 0.25)' }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="sports-card rounded-2xl border border-sportsBlue/20 p-5 shadow-sm"
          >
            <div className="mb-4 flex h-52 items-center justify-center rounded-xl border border-dashed border-sportsBlue/25 bg-cream text-center text-xs uppercase tracking-[0.2em] text-muted">
              Coach Image Placeholder
            </div>
            <h3 className="text-lg font-semibold text-paper">{coach.name}</h3>
            <p className="mt-2 text-sm text-muted">{coach.expertise}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CoachesPage;