import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const CoachesSection = ({ coaches = [] }) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Coaching Unit"
        title="Professional Coaches"
        subtitle="Mentorship from dedicated specialists focused on technical mastery and game intelligence."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {coaches.map((coach, idx) => (
          <motion.article
            key={`${coach.name}-${idx}`}
            variants={riseIn}
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 0 18px rgba(11, 65, 146, 0.2), 0 24px 42px rgba(11, 65, 146, 0.16)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="sports-card rounded-2xl p-6"
          >
            <div className="mb-4 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-sportsBlue/20 bg-cream text-center text-xs uppercase tracking-[0.16em] text-muted">
              {coach.imageUrl ? (
                <img
                  src={coach.imageUrl}
                  alt={coach.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                'Coach Profile'
              )}
            </div>
            <h3 className="text-xl font-semibold text-paper">{coach.name}</h3>
            <p className="mt-2 text-sm text-muted">{coach.expertise}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default CoachesSection;
