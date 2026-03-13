import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaCheck, FaWhatsapp, FaChild, FaGraduationCap, FaStar, FaQuoteLeft, FaTrophy } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const plans = [
  {
    id: 'yearly-pro',
    name: 'Pro Annual Plan',
    duration: '6 Days a Week',
    price: 'Rs 45,000',
    period: '/year',
    popular: true,
    savings: 'Summer Camp Included',
    features: [
      'Full training access, 6 days a week',
      'Professional coaching for all skills',
      'Advanced fitness & conditioning',
      'Video analysis and performance tracking',
      'Tournament participation support',
    ],
  },
  {
    id: 'yearly-standard',
    name: 'Standard Annual Plan',
    duration: '3-4 Days a Week',
    price: 'Rs 38,000',
    period: '/year',
    popular: false,
    savings: 'Summer Camp Included',
    features: [
      'Flexible training, 3-4 days a week',
      'Core skill development sessions',
      'Weekly progress review',
      'Access to academy ground and nets',
      'Ideal for balanced development',
    ],
  },
  {
    id: 'yearly-weekend',
    name: 'Weekend Annual Plan',
    duration: '2 Days a Week',
    price: 'Rs 30,000',
    period: '/year',
    popular: false,
    savings: 'Summer Camp Included',
    features: [
      'Weekend-focused training, 2 days a week',
      'Concentrated coaching sessions',
      'Ideal for balancing school/work',
      'Fundamental skill enhancement',
      'Introduction to structured training',
    ],
  },
];

const matchPackages = [
  { name: 'Starter Match Pack', matches: 20, price: 'Rs 13,500', desc: 'Ideal for gaining initial match exposure.' },
  {
    name: 'Advanced Match Pack',
    matches: 40,
    price: 'Rs 27,000',
    desc: 'For players seeking regular competitive action.',
  },
  { name: 'Elite Match Pack', matches: 60, price: 'Rs 40,500', desc: 'Comprehensive match play for serious athletes.' },
];

const schoolBundle = {
  scholarship: '75%',
  features: [
    'Daily 5hours of practice, mastering the art of Batting, bowling, keeping and fielding overall with experts',
    ' Integrated Schooling (Balance sports & academics)',
    ' Dormitory Stay (Safe & comfortable on-campus living)',
    ' Hygiene-First Nutrition (homely food)',
    '️ Match Experience (Regular practice matches & tournaments, open nets)',
    '️ Elite Fitness Sessions & Nutrition Consultancy',
    '️ Annual Domestic Tour (Exposure to different conditions)',
    'Video analysis',
    'Physiotherapy',
    'Mental balancing',
  ],
};

const ageBatches = [
  { range: '5-11 years', label: 'Junior Foundation', desc: 'Introduction to cricket, fun drills, and basic motor skills' },
  { range: '12-14 years', label: 'Foundation Batch', desc: 'Technical basics, athletic movement, and game understanding' },
  { range: '15-18 years', label: 'Performance Batch', desc: 'Advanced skill-building, tactical awareness, and match execution' },
  { range: '19+ years', label: 'Elite Batch', desc: 'High-intensity training, competitive readiness, and professional guidance' },
];

const PlansPage = () => {
  const whatsAppUrl =
    'https://wa.me/918123105849?text=Hello%2C%20I%20am%20interested%20in%20joining%20EACE.%20Please%20share%20details%20about%20plans%20and%20pricing.';
  const trialUrl =
    'https://wa.me/918123105849?text=Hello%2C%20I%20want%20to%20book%202%20free%20trial%20classes%20at%20EACE.';

  return (
    <motion.section variants={riseIn} initial="hidden" animate="show" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>Plans & Pricing | EACE Cricket Academy</title>
        <meta
          name="description"
          content="Explore EACE cricket academy plans with monthly, 6-month, and annual packages for students aged 12 and above."
        />
      </Helmet>

      <SectionTitle
        eyebrow="Plans & Pricing"
        title="Invest in Your Cricket Future"
        subtitle="Structured training packages for students aged 5 and above. All plans include professional coaching, ground access, and fitness sessions."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-3xl overflow-hidden rounded-2xl border border-[#B8C9E8] bg-gradient-to-r from-[#0B4192] to-[#1A5BC4] p-6 text-center text-white shadow-lg md:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Limited Offer</p>
        <h3 className="mt-2 text-2xl font-bold md:text-3xl">2 Free Trial Classes</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/90">
          Experience our training before enrollment. Attend 2 free sessions and connect on WhatsApp for schedule confirmation.
        </p>
        <a
          href={trialUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B4192] transition hover:scale-105 hover:shadow-lg"
        >
          <FaWhatsapp className="text-lg text-green-600" />
          Book Free Trial on WhatsApp
        </a>
      </motion.div>

      <div className="mb-14">
        <h3 className="mb-6 text-center text-lg font-semibold text-[#0B4192]">Training Batches by Age Group</h3>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ageBatches.map((batch) => (
            <motion.div
              key={batch.range}
              variants={riseIn}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-xl border border-[#B8C9E8] bg-white p-5 text-center shadow-sm"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EEF8] text-[#0B4192]">
                <FaChild />
              </div>
              <p className="mt-3 text-lg font-bold text-[#0B4192]">{batch.range}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#790000]">{batch.label}</p>
              <p className="mt-2 text-xs text-[#3A5A8C]">{batch.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <motion.article
            key={plan.id}
            variants={riseIn}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 20px rgba(11,65,146,0.18), 0 24px 42px rgba(11,65,146,0.12)' }}
            className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm ${
              plan.popular
                ? 'border-[#0B4192] bg-gradient-to-b from-white to-[#F0F4FA] ring-2 ring-[#0B4192]/20'
                : 'border-[#B8C9E8] bg-white'
            }`}
          >
            {plan.popular ? (
              <div className="absolute right-0 top-0 rounded-bl-xl bg-[#0B4192] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                Most Popular
              </div>
            ) : null}
            {plan.savings ? (
              <span className="inline-block rounded-full bg-[#E8EEF8] px-3 py-1 text-[10px] font-semibold text-[#0B4192]">{plan.savings}</span>
            ) : null}
            <h3 className="mt-3 text-xl font-bold text-[#0B4192]">{plan.name}</h3>
            <p className="text-xs text-[#3A5A8C]">{plan.duration}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[#0B4192]">{plan.price}</span>
              <span className="text-sm text-[#3A5A8C]">{plan.period}</span>
            </div>
            <ul className="mt-5 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[#2C3E6B]">
                  <FaCheck className="mt-0.5 shrink-0 text-xs text-[#0B4192]" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition hover:scale-[1.03] ${
                plan.popular ? 'bg-[#0B4192] text-white' : 'border border-[#0B4192] text-[#0B4192] hover:bg-[#0B4192] hover:text-white'
              }`}
            >
              <FaWhatsapp className="text-lg" />
              Enroll via WhatsApp
            </a>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-14">
        <h3 className="mb-4 text-center text-lg font-semibold text-[#0B4192]">Annual Match Packages</h3>
        <p className="mb-8 text-center text-sm text-muted">
          Get real match experience with our discounted packages. A <span className="font-bold">25% discount</span> is
          included in the prices below.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {matchPackages.map((pack) => (
            <motion.div
              key={pack.name}
              variants={riseIn}
              className="rounded-xl border border-[#B8C9E8] bg-white p-5 text-center shadow-sm"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EEF8] text-[#0B4192]">
                <FaTrophy />
              </div>
              <p className="mt-3 text-lg font-bold text-[#0B4192]">{pack.name}</p>
              <p className="text-sm font-semibold text-[#790000]">{pack.matches} Matches / Year</p>
              <p className="mt-2 text-2xl font-bold text-[#0B4192]">{pack.price}</p>
              <p className="mt-2 text-xs text-[#3A5A8C]">{pack.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-14 max-w-4xl"
      >
        <div className="overflow-hidden rounded-3xl border-2 border-[#790000]/30 bg-gradient-to-br from-white via-[#FDF5F5] to-[#F0F4FA] shadow-lg">
          <div className="bg-gradient-to-r from-[#790000] to-[#0B4192] px-6 py-4 text-center text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">Premium Bundle</p>
            <h3 className="mt-1 text-2xl font-bold md:text-3xl">School + Hostel + Cricket</h3>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="flex-1">
                <div className="flex flex-col items-center gap-4 rounded-xl border border-[#B8C9E8] bg-white p-5 sm:flex-row sm:items-start">
                  <img
                    src="https://res.cloudinary.com/dt37ji5yp/image/upload/q_auto,f_auto/v1772983586/Sri_sai_school_image_bd7pqw.jpg"
                    alt="Sri Sai School Logo"
                    className="h-14 w-14 rounded-full object-cover shadow-sm sm:h-16 sm:w-16"
                    loading="lazy"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-bold text-[#790000]">Sri Sai School</h4>
                    <p className="mt-1 text-sm text-[#3A5A8C]">Phone: 8123149416</p>
                    <p className="mt-1 text-sm text-[#3A5A8C]">Begur-Koppa Road, Yelenahalli, Bangalore - 560068</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {schoolBundle.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#2C3E6B]">
                      <FaCheck className="mt-0.5 shrink-0 text-xs text-[#790000]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-[220px] rounded-2xl border-2 border-[#790000]/20 bg-gradient-to-b from-white to-[#FDF5F5] p-6 text-center shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#790000]/10 text-[#790000]">
                  <FaGraduationCap className="text-xl" />
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#790000]/70">Exclusive Early Bird Offer</p>
                <p className="mt-2 text-5xl font-extrabold text-[#790000]">{schoolBundle.scholarship}</p>
                <p className="mt-1 px-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#790000]">
                  Scholarship for the first 20 enrollments
                </p>
                <div className="mb-1 mt-3 flex w-full flex-col gap-2">
                  <div className="flex items-center justify-center gap-1.5 rounded-full bg-[#0B4192]/10 px-3 py-1.5">
                    <FaStar className="text-xs text-[#0B4192]" />
                    <p className="text-xs font-semibold text-[#0B4192]">Eligibility: Age 12 years and above</p>
                  </div>
                  <div className="rounded-lg border border-[#B8C9E8] bg-[#E8EEF8] py-2">
                    <p className="text-xs font-bold text-[#0B4192]">Status: Enrollment Open</p>
                  </div>
                </div>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#790000] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
                >
                  <FaWhatsapp className="text-lg" />
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 border-t border-[#790000]/10 bg-gradient-to-r from-[#FDF5F5] to-[#F0F4FA] px-6 py-5 md:px-8">
          <div className="flex items-start gap-3">
            <FaQuoteLeft className="mt-1 shrink-0 text-lg text-[#790000]/30" />
            <div>
              <p className="text-sm font-medium italic leading-relaxed text-[#2C3E6B]">
                "Champions are built through discipline, consistency, and the right guidance."
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-[#790000]/60">Build the player you aim to become</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PlansPage;
