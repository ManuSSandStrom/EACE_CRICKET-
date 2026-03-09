import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle.jsx';

const timeline = [
  {
    year: 'Stage 1: Ages 12-14',
    text: 'Build technical foundations, movement efficiency, and disciplined routines.',
  },
  {
    year: 'Stage 2: Ages 15-17',
    text: 'Advance tactical awareness, role clarity, and match-pressure decision making.',
  },
  {
    year: 'Stage 3: Ages 18+',
    text: 'High-performance preparation with tournament intensity and competitive benchmarks.',
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>About Sri Sai School & Academy</title>
      </Helmet>

      <SectionTitle
        eyebrow="About"
        title="Sri Sai School Partnership"
        subtitle="A professional school and cricket training environment focused on academic quality, athlete development, and long-term growth."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Vision</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Develop disciplined student-athletes through strong academics, structured training, and a performance-first culture.
          </p>
        </article>
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Mission</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Deliver consistent coaching quality, responsible care, and measurable progress for students aged 12 and above.
          </p>
        </article>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/Sri_sai_school_image_bd7pqw.jpg"
              alt="Sri Sai School Logo"
              className="h-16 w-16 rounded-full border border-sportsBlue/20 object-cover"
              loading="lazy"
            />
            <div>
              <h3 className="text-xl font-semibold text-paper">Sri Sai School</h3>
              <p className="text-sm text-muted">Begur-Koppa Road, Yelenahalli, Bangalore - 560068</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            Sri Sai School supports students with balanced academics, responsible supervision, and a growth-oriented campus culture.
          </p>
        </article>
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-xl font-semibold text-paper">Training Philosophy</h3>
          <p className="mt-3 text-sm text-muted">
            Coaching combines technique, match awareness, strength and conditioning, and mental readiness under structured cycles.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B4192]">
            Eligibility: Age 12 years and above
          </p>
        </article>
      </div>

      <div className="mt-14">
        <SectionTitle eyebrow="Student Pathway" title="From Foundation to Competitive Cricket" />
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
