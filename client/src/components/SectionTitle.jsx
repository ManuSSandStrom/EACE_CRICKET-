import { motion } from 'framer-motion';

const SectionTitle = ({ eyebrow, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className="mx-auto mb-12 max-w-4xl text-center"
    >
      {eyebrow ? (
        <p className="font-subheading mb-3 text-xs uppercase tracking-[0.34em] text-[#790000]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-bold uppercase tracking-[0.1em] text-[#0B4192] md:text-6xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-sm text-[#2C3E6B] md:text-base">{subtitle}</p> : null}
      <div className="mx-auto mt-6 h-[2px] w-28 overflow-hidden rounded-full bg-[#D0D8E8]">
        <div className="gold-accent-line h-full w-full" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;