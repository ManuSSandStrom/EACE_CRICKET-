import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaSchool, FaCheck, FaArrowRight, FaGraduationCap, FaStar } from 'react-icons/fa';
import { getHomeContent, getTestimonials } from '../api/contentApi.js';
import HeroSection from '../components/HeroSection.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import StatsCounter from '../components/StatsCounter.jsx';
import TrustBand from '../components/TrustBand.jsx';
import TrainingRoadmap from '../components/TrainingRoadmap.jsx';
import CoachesSection from '../components/CoachesSection.jsx';
import TestimonialsSlider from '../components/TestimonialsSlider.jsx';
import CTASection from '../components/CTASection.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const fallbackContent = {
  heroHeadline: 'Train Like a Champion. Perform Like a Legend.',
  heroSubheading: 'Karnataka State Cricket Association Affiliated Academy',
  stats: [
    { label: 'Students Trained', value: 1200 },
    { label: 'State Selections', value: 90 },
    { label: 'Certified Coaches', value: 12 },
    { label: 'Years of Excellence', value: 10 },
  ],
  programs: [
    'Foundation Cricket Program',
    'Advanced Skill Development',
    'Elite Match Simulation',
    'Strength & Conditioning',
  ],
  coaches: [
    { name: 'Coach Arjun Rao', expertise: 'Batting Excellence' },
    { name: 'Coach Vivek Sharma', expertise: 'Fast Bowling Unit' },
    { name: 'Coach Manish R', expertise: 'Spin & Tactical Control' },
  ],
};

const fallbackTestimonials = [
  {
    _id: '1',
    name: 'Sahana Ramesh',
    role: 'Parent of U13 Batter',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/160?img=47',
    message:
      'My son used to avoid match pressure, but after joining EACE he now asks for extra match simulation sessions. The confidence change is real.',
  },
  {
    _id: '2',
    name: 'Nikhil Patil',
    role: 'U16 All-Rounder',
    rating: 4.8,
    avatarUrl: 'https://i.pravatar.cc/160?img=59',
    message:
      'The bowling feedback is very specific here. Small technical corrections from coaches improved my control in two months.',
  },
  {
    _id: '3',
    name: 'Pooja Narayanan',
    role: 'Mother of U11 Student',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/160?img=5',
    message:
      'We were looking for discipline and proper coaching structure. EACE gives both, and the communication with parents is very professional.',
  },
  {
    _id: '4',
    name: 'Rohit Deshmukh',
    role: 'Senior Academy Player',
    rating: 4.9,
    avatarUrl: 'https://i.pravatar.cc/160?img=14',
    message:
      'Fitness and cricket sessions are balanced well. I feel stronger in the final overs compared to my previous season.',
  },
  {
    _id: '5',
    name: 'Deepa Chandrasekar',
    role: 'Parent',
    rating: 4.7,
    avatarUrl: 'https://i.pravatar.cc/160?img=32',
    message:
      'What impressed us most is the seriousness in coaching. Every session has purpose, and my daughter has become mentally tougher.',
  },
];

const normalizeStringList = (list, fallback) => {
  const normalized = Array.isArray(list) ? list.map((item) => (typeof item === 'string' ? item.trim() : '')).filter(Boolean) : [];
  return normalized.length ? normalized : fallback;
};

const normalizeCoaches = (list, fallback) => {
  const normalized = Array.isArray(list)
    ? list
        .map((coach) => {
          if (!coach || typeof coach !== 'object') return null;
          const name = typeof coach.name === 'string' ? coach.name.trim() : '';
          const expertise = typeof coach.expertise === 'string' ? coach.expertise.trim() : '';
          if (!name) return null;
          return { name, expertise: expertise || 'Cricket Development Specialist' };
        })
        .filter(Boolean)
    : [];

  return normalized.length ? normalized : fallback;
};

const normalizeStats = (list, fallback) => {
  const normalized = Array.isArray(list)
    ? list
        .map((item) => {
          if (!item || typeof item !== 'object') return null;
          const label = typeof item.label === 'string' ? item.label.trim() : '';
          const value = Number(item.value);
          if (!label || !Number.isFinite(value) || value <= 0) return null;
          return { label, value: Math.round(value) };
        })
        .filter(Boolean)
    : [];

  return normalized.length ? normalized : fallback;
};

const normalizeTestimonials = (list, fallback) => {
  const normalized = Array.isArray(list)
    ? list
        .map((item, idx) => {
          if (!item || typeof item !== 'object') return null;
          const name = typeof item.name === 'string' ? item.name.trim() : '';
          const message = typeof item.message === 'string' ? item.message.trim() : '';
          if (!name || !message) return null;

          return {
            _id: item._id || `testimonial-${idx}`,
            name,
            role: typeof item.role === 'string' && item.role.trim() ? item.role.trim() : 'EACE Family',
            rating: Number.isFinite(Number(item.rating)) ? Number(item.rating) : 5,
            avatarUrl: typeof item.avatarUrl === 'string' ? item.avatarUrl : '',
            message,
          };
        })
        .filter(Boolean)
    : [];

  return normalized.length ? normalized : fallback;
};

/* ─── School Highlight Component ─── */
const SchoolHighlight = () => {
  const whatsAppUrl =
    'https://wa.me/919515022680?text=Hello%2C%20I%20am%20interested%20in%20the%20School%20%2B%20Hostel%20%2B%20Cricket%20plan.%20Please%20share%20details.';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8"
    >
      <div className="overflow-hidden rounded-3xl border-2 border-[#790000]/25 shadow-lg">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#790000] to-[#0B4192] px-6 py-5 text-white md:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">Affiliated School Partner</p>
              <div className="mt-2 flex items-center justify-center gap-3 md:justify-start">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/Sri_sai_school_image_bd7pqw.jpg" alt="Sri Sai School Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/50 object-cover shadow-sm bg-white" />
                <h3 className="font-heading text-2xl font-bold md:text-3xl">Sri Sai School</h3>
              </div>
              <p className="mt-1 text-sm text-white/90">Quality CISCE education with elite cricket training</p>
            </div>
            <div className="flex flex-col gap-1 text-center text-sm md:text-right">
              <span className="flex items-center justify-center gap-2 md:justify-end">
                <FaPhone className="text-xs" /> 7406656658
              </span>
              <span className="flex items-center justify-center gap-2 text-xs text-white/80 md:justify-end">
                <FaMapMarkerAlt className="text-xs" /> Begur-Koppa Road, Yelenahalli, Bangalore - 560068
              </span>
            </div>
          </div>
        </div>

        {/* Bundle Content */}
        <div className="bg-gradient-to-br from-white via-[#FDF5F5] to-[#F0F4FA] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            {/* Features */}
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#0B4192]">🏫 School + 🏠 Hostel + 🏏 Cricket — All in One</h4>
              <p className="mt-2 text-sm text-[#3A5A8C]">
                A unique opportunity to combine CISCE-standard academics, comfortable hostel living, and world-class cricket training at EACE.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  'CISCE-affiliated quality education',
                  'Full-time hostel accommodation',
                  'Daily cricket training sessions',
                  'Dedicated sports infrastructure & equipment',
                  'Balanced academics & sports',
                  'Nutritional meals provided',
                  'Annual tournament participation',
                  'Medical & fitness monitoring',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#2C3E6B]">
                    <FaCheck className="mt-0.5 shrink-0 text-xs text-[#790000]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* Scholarship & CTA */}
            <div className="flex flex-col items-center rounded-2xl border-2 border-[#790000]/20 bg-gradient-to-b from-white to-[#FDF5F5] p-6 text-center shadow-md lg:min-w-[260px]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#790000]/10 text-[#790000]">
                <FaGraduationCap className="text-xl" />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#790000]/70">Scholarship Based</p>
              <p className="mt-2 text-5xl font-extrabold text-[#790000]">75%</p>
              <p className="text-sm font-semibold text-[#790000]">Scholarship</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-[#0B4192]/10 px-3 py-1.5">
                <FaStar className="text-xs text-[#0B4192]" />
                <p className="text-xs font-semibold text-[#0B4192]">~₹2.5 Lakhs benefit to student</p>
              </div>
              <p className="mt-2 text-[11px] text-[#3A5A8C]">Merit-based scholarship covering tuition, hostel &amp; training</p>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#790000] px-5 py-3 text-sm font-semibold text-white transition hover:scale-105"
              >
                <FaWhatsapp className="text-lg" />
                Enquire Now
              </a>
              <Link
                to="/plans"
                className="mt-3 flex items-center gap-1 text-xs font-medium text-[#0B4192] transition hover:gap-2"
              >
                View all plans <FaArrowRight className="text-[9px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ─── Quick Links to Plans & Calendar ─── */
const QuickLinks = () => (
  <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
    <div className="grid gap-4 sm:grid-cols-2">
      <Link to="/plans" className="group">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="flex items-center gap-5 rounded-2xl border border-[#B8C9E8] bg-white p-5 shadow-sm transition group-hover:shadow-md"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF8] text-xl text-[#0B4192]">
            🏏
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0B4192]">Plans & Pricing</h4>
            <p className="text-xs text-[#3A5A8C]">Monthly, 6-month & yearly packages • 2 free trial classes • Professional coaching</p>
          </div>
          <FaArrowRight className="ml-auto shrink-0 text-[#0B4192] opacity-0 transition group-hover:opacity-100" />
        </motion.div>
      </Link>
      <Link to="/calendar" className="group">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="flex items-center gap-5 rounded-2xl border border-[#B8C9E8] bg-white p-5 shadow-sm transition group-hover:shadow-md"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF8] text-xl text-[#0B4192]">
            📅
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0B4192]">Cricket Calendar</h4>
            <p className="text-xs text-[#3A5A8C]">Training schedule, holidays & academy events • All age groups</p>
          </div>
          <FaArrowRight className="ml-auto shrink-0 text-[#0B4192] opacity-0 transition group-hover:opacity-100" />
        </motion.div>
      </Link>
    </div>
  </section>
);

/* ─── HomePage ─── */
const HomePage = () => {
  const [content, setContent] = useState(fallbackContent);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    const load = async () => {
      try {
        const [homeData, testimonialsData] = await Promise.all([getHomeContent(), getTestimonials()]);

        if (homeData) setContent(homeData);
        if (testimonialsData?.length) setTestimonials(testimonialsData);
      } catch (_error) {
      }
    };

    load();
  }, []);

  const safeStats = useMemo(() => normalizeStats(content.stats, fallbackContent.stats), [content.stats]);
  const safeCoaches = useMemo(() => normalizeCoaches(content.coaches, fallbackContent.coaches), [content.coaches]);
  const safeTestimonials = useMemo(() => normalizeTestimonials(testimonials, fallbackTestimonials), [testimonials]);

  return (
    <>
      <Helmet>
        <title>EACE | Elite Cricket Training Academy</title>
        <meta
          name="description"
          content="EACE is a KSCA-affiliated premium cricket academy in Bengaluru delivering elite coaching, facilities, and performance pathways."
        />
      </Helmet>

      <HeroSection
        headline={content.heroHeadline?.trim() || fallbackContent.heroHeadline}
        subheading={content.heroSubheading?.trim() || fallbackContent.heroSubheading}
      />

      {/* School Highlight — right after hero */}
      <SchoolHighlight />

      <StatsCounter stats={safeStats} />
      <TrustBand />

      <QuickLinks />

      <TrainingRoadmap />
      <CoachesSection coaches={safeCoaches} />
      <TestimonialsSlider testimonials={safeTestimonials} />
      <CTASection />
    </>
  );
};

export default HomePage;