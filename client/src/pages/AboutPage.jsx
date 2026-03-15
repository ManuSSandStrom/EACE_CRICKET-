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
        <title>About EACE Academy</title>
      </Helmet>

      <SectionTitle
        eyebrow="About Us"
        title="Ekalavya Academy of Cricket Excellence"
        subtitle="Empowering Cricketing Dreams, Bridging Socio-Economic Gaps"
      />

      <div className="mb-10 sports-card rounded-2xl p-7 shadow-sm">
        <p className="text-sm leading-7 text-muted">
          Coming from a middle-class background, our founder understands the challenges of pursuing cricketing dreams with limited resources. With the guidance of a dedicated coach, he overcame obstacles to chase his passion. Now, we're committed to providing opportunities for talented cricketers to thrive, offering affordable access to top-notch facilities, coaching, and support, because cricket should be a game for all, not just the privileged few.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Vision</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            <strong>Transforming Lives Through Cricket</strong><br/><br/>
            To create a platform where cricket is a pathway to success for talented individuals from all walks of life, regardless of financial constraints, and to foster a community that promotes excellence, inclusivity, and social mobility through the spirit of cricket.
          </p>
        </article>
        <article className="sports-card rounded-2xl p-7 shadow-sm">
          <h3 className="text-2xl font-semibold text-sportsBlue">Mission</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            <strong>Empowering Cricketing Dreams, Bridging Socio-Economic Gaps</strong><br/><br/>
            We aim to identify and nurture talented cricketers from middle-class and underprivileged backgrounds, providing them with world-class facilities and support to pursue their cricketing aspirations, making the sport inclusive and accessible to all.
          </p>
        </article>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="sports-card rounded-2xl p-7 shadow-sm md:col-span-2">
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
