import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const defaultPrograms = [
  'Foundation Cricket Program',
  'Advanced Skill Development',
  'Elite Match Simulation',
  'Strength & Conditioning',
];

const normalizePrograms = (programs) => {
  const cleaned = Array.isArray(programs)
    ? programs
        .map((program) => (typeof program === 'string' ? program.replace(/\u200B/g, '').trim() : ''))
        .filter((program) => program.length >= 2)
    : [];

  if (!cleaned.length) return defaultPrograms;

  const filled = [...cleaned];
  defaultPrograms.forEach((item) => {
    if (filled.length < 4 && !filled.includes(item)) {
      filled.push(item);
    }
  });

  return filled;
};

const ProgramsSection = ({ programs = [] }) => {
  const visiblePrograms = normalizePrograms(programs);

  return (
    <section id="programs" className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Programs"
        title="Programs Offered"
        subtitle="Structured pathways tailored to age, skill level, and competitive ambition."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 md:grid-cols-2"
      >
        {visiblePrograms.map((program, idx) => (
          <motion.div
            key={`${program}-${idx}`}
            variants={riseIn}
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 0 18px rgba(11, 65, 146, 0.18), 0 24px 42px rgba(11, 65, 146, 0.12)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="sports-card rounded-2xl border border-[#B8C9E8] bg-white p-6"
          >
            <p className="text-xl font-bold text-[#0B4192]">{program || 'Program Details Coming Soon'}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProgramsSection;