import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const reasons = [
  {
    title: 'KSCA Aligned Standards',
    text: 'Program structure aligned with competitive pathways and match-readiness outcomes.',
  },
  {
    title: 'Performance Analytics',
    text: 'Video analysis and feedback cycles sharpen technique, decision-making, and consistency.',
  },
  {
    title: 'Elite Coaching Bench',
    text: 'Experienced coaches with specialized domains in batting, bowling, and field intelligence.',
  },
  {
    title: 'Athlete Development',
    text: 'Physical conditioning, mindset coaching, and tactical growth for all-round excellence.',
  },
];

const WhyChoose = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Why EACE"
        title="Why Choose Ekalavya Academy"
        subtitle="World-class cricket training architecture built for disciplined growth and competitive outcomes."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {reasons.map((reason) => (
          <motion.article
            key={reason.title}
            variants={riseIn}
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 0 18px rgba(11, 65, 146, 0.2), 0 24px 42px rgba(11, 65, 146, 0.16)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="sports-card rounded-2xl p-7"
          >
            <h3 className="text-2xl font-semibold text-cricketGold">{reason.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{reason.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChoose;

