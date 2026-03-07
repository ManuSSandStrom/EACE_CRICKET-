import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const FacilitiesSection = ({ facilities }) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Infrastructure"
        title="High-Performance Facilities"
        subtitle="Purpose-built ecosystem to simulate competitive conditions and accelerate improvement."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {facilities.map((facility) => (
          <motion.div
            key={facility}
            variants={riseIn}
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0 0 18px rgba(11, 65, 146, 0.2), 0 24px 42px rgba(11, 65, 146, 0.16)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="sports-card rounded-xl p-5"
          >
            <p className="text-sm leading-6 text-muted">{facility}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FacilitiesSection;

