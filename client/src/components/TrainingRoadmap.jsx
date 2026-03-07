import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';

const phases = [
  {
    step: '01',
    title: 'Assessment & Placement',
    text: 'Every student begins with baseline technical and physical evaluation for the right training track.',
  },
  {
    step: '02',
    title: 'Skill Engineering',
    text: 'Role-based batting, bowling, fielding and tactical modules with video-backed corrections.',
  },
  {
    step: '03',
    title: 'Performance Conversion',
    text: 'Match simulation blocks convert net practice into reliable match-day execution.',
  },
  {
    step: '04',
    title: 'Competition Readiness',
    text: 'Selection guidance, pressure conditioning and periodic tournament preparation cycles.',
  },
];

const TrainingRoadmap = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Training Framework"
        title="From Entry-Level to Elite Match Readiness"
        subtitle="A professionally structured athlete journey built for consistency, performance, and confidence."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {phases.map((phase, idx) => (
          <motion.article
            key={phase.step}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -36 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="sports-card rounded-2xl p-6"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-cricketGold">STEP {phase.step}</p>
            <h3 className="mt-3 text-2xl font-semibold text-paper">{phase.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{phase.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TrainingRoadmap;
