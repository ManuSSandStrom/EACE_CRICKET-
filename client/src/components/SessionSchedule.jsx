import { motion } from 'framer-motion';
import { FaRegClock } from 'react-icons/fa';
import SectionTitle from './SectionTitle.jsx';
import { staggerContainer, slideInRight } from '../utils/motion.js';

const sessions = [
  { batch: 'Foundation Batch (12-14)', time: 'Morning 6:30 AM', slot: 'Technical Foundation' },
  { batch: 'Performance Batch (15-17)', time: 'Morning 7:30 AM', slot: 'Advanced Development' },
  { batch: 'Elite Batch (18+)', time: 'Evening 4:30 PM', slot: 'Match Simulation' },
  { batch: 'High Performance Batch (18+)', time: 'Evening 6:00 PM', slot: 'Performance Pathway' },
];

const SessionSchedule = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Weekly Schedule"
        title="Training Session Timings"
        subtitle="Structured batch slots designed for progressive athlete development and performance consistency."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2"
      >
        {sessions.map((session) => (
          <motion.article
            key={session.batch}
            variants={slideInRight}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl border border-aqua/30 bg-cream p-6 shadow-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">{session.slot}</p>
                <h3 className="mt-2 text-2xl font-semibold text-paper">{session.batch}</h3>
                <p className="mt-2 text-sm text-muted">{session.time}</p>
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E8EEF8] text-[#0B4192]">
                <FaRegClock />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default SessionSchedule;
