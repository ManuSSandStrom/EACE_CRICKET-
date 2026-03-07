import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle.jsx';

const timeline = [
  {
    year: 'Foundation Stage',
    text: 'Strong technical basics in batting, bowling, fielding, and discipline routines.',
  },
  {
    year: 'Performance Build',
    text: 'Specialized sessions, tactical awareness, match simulation, and assessment loops.',
  },
  {
    year: 'Competitive Pathway',
    text: 'Tournament readiness, selection preparation, and advanced athletic conditioning.',
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>About EACE</title>
      </Helmet>

      <SectionTitle
        eyebrow="About"
        title="Vision, Mission & Training Philosophy"
        subtitle="A high-standard academy system focused on skill depth, discipline, and sustainable growth."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Vision</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            To build internationally competitive cricketers through scientific coaching, ethics, and performance culture.
          </p>
        </article>
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Mission</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Deliver world-class training, athlete monitoring, and development opportunities in a trusted academy environment.
          </p>
        </article>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-xl font-semibold text-paper">Affiliation</h3>
          <p className="mt-3 text-sm text-muted">
            Karnataka State Cricket Association affiliated academy with professional standards in coaching and progression.
          </p>
        </article>
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-xl font-semibold text-paper">Training Philosophy</h3>
          <p className="mt-3 text-sm text-muted">
            Balance technique, match intelligence, physical conditioning, and mindset under structured coaching blocks.
          </p>
        </article>
      </div>

      <div className="mt-14">
        <SectionTitle eyebrow="Student Growth Path" title="From Basics to Competitive Excellence" />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-[15px] top-0 h-full w-px bg-[#0B4192]/30" />
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="relative ml-10 rounded-2xl border border-sportsBlue/20 bg-cream p-5 shadow-sm"
              >
                <span className="absolute -left-[33px] top-5 h-4 w-4 rounded-full border border-[#0B4192] bg-[#4A7FCC]" />
                <h4 className="text-base font-semibold text-sportsBlue">{item.year}</h4>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
