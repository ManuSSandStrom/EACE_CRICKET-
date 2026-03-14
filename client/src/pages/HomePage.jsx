import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaArrowRight, FaGraduationCap, FaStar, FaCheck } from 'react-icons/fa';
import { createLead, getHomeContent, getTestimonials } from '../api/contentApi.js';
import HeroSection from '../components/HeroSection.jsx';
import StatsCounter from '../components/StatsCounter.jsx';
import TrainingRoadmap from '../components/TrainingRoadmap.jsx';
import CoachesSection from '../components/CoachesSection.jsx';
import TestimonialsSlider from '../components/TestimonialsSlider.jsx';
import CTASection from '../components/CTASection.jsx';
import LeadModal from '../components/LeadModal.jsx';
import { buildLeadMessage, openWhatsApp } from '../utils/lead.js';

const fallbackContent = {
  heroHeadline: 'Transforming Lives Through Cricket',
  heroSubheading: 'Empowering Cricketing Dreams, Bridging Socio-Economic Gaps',
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
    role: 'Mother of U12 Student',
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

const normalizeCoaches = (list, fallback) => {
  const normalized = Array.isArray(list)
    ? list
        .map((coach) => {
          if (!coach || typeof coach !== 'object') return null;
          const name = typeof coach.name === 'string' ? coach.name.trim() : '';
          const expertise = typeof coach.expertise === 'string' ? coach.expertise.trim() : '';
          const imageUrl = typeof coach.imageUrl === 'string' ? coach.imageUrl.trim() : '';
          if (!name) return null;
          return { name, expertise: expertise || 'Cricket Development Specialist', imageUrl };
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

const schoolFeatures = [
  'Daily 5-hour practice sessions with expert coaches covering batting, bowling, keeping, and fielding.',
  'Integrated Schooling (Balance sports & academics)',
  'Dormitory Stay (Safe & comfortable on-campus living)',
  'Hygiene-First Nutrition (homely food)',
  'Match Experience (Regular practice matches & tournaments, open nets)',
  'Elite Fitness Sessions & Nutrition Consultancy',
  'Annual Domestic Tour (Exposure to different conditions)',
  'Video analysis',
  'Physiotherapy',
  'Mental balancing',
];

const SchoolHighlight = () => {
  const [leadOpen, setLeadOpen] = useState(false);

  const handleSubmit = async (payload) => {
    await createLead({
      ...payload,
      type: 'school',
      source: 'home_school_highlight',
    });
    const text = buildLeadMessage({ ...payload, type: 'school', planName: 'School + Hostel + Cricket' });
    openWhatsApp(text);
    setLeadOpen(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8"
    >
      <div className="overflow-hidden rounded-3xl border-2 border-[#790000]/25 shadow-lg">
        <div className="bg-gradient-to-r from-[#790000] to-[#0B4192] px-6 py-5 text-white md:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">Affiliated School Partner</p>
              <div className="mt-2 flex items-center justify-center gap-3 md:justify-start">
                <img
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/q_auto,f_auto/v1772983586/Sri_sai_school_image_bd7pqw.jpg"
                  alt="Sri Sai School Logo"
                  className="h-10 w-10 rounded-full border border-white/50 bg-white object-cover shadow-sm sm:h-12 sm:w-12"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="font-heading text-2xl font-bold md:text-3xl">Sri Sai School</h3>
              </div>
              <p className="mt-1 text-sm text-white/90">Quality academic education with elite cricket training</p>
            </div>
            <div className="flex flex-col gap-1 text-center text-sm md:text-right">
              <span className="flex items-center justify-center gap-2 md:justify-end">
                <FaPhone className="text-xs" /> 8123149416
              </span>
              <span className="flex items-center justify-center gap-2 text-xs text-white/80 md:justify-end">
                <FaMapMarkerAlt className="text-xs" /> Begur-Koppa Road, Yelenahalli, Bangalore - 560068
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-[#FDF5F5] to-[#F0F4FA] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#0B4192]">Residential Cricket Academy</h4>
              <p className="mt-2 text-sm text-[#3A5A8C]">
                A complete pathway that combines academics, hostel support, and structured cricket development for serious students.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {schoolFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#2C3E6B]">
                    <FaCheck className="mt-0.5 shrink-0 text-xs text-[#790000]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl border-2 border-[#790000]/20 bg-gradient-to-b from-white to-[#FDF5F5] p-6 text-center shadow-md lg:min-w-[260px]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#790000]/10 text-[#790000]">
                <FaGraduationCap className="text-xl" />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#790000]/70">Exclusive Early Bird Offer</p>
              <p className="mt-2 text-5xl font-extrabold text-[#790000]">75%</p>
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
              <button
                type="button"
                onClick={() => setLeadOpen(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#790000] px-5 py-3 text-sm font-semibold text-white transition hover:scale-105"
              >
                <FaWhatsapp className="text-lg" />
                Enquire Now
              </button>
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

      <LeadModal
        open={leadOpen}
        title="School + Hostel Enquiry"
        subtitle="Share your details and we will confirm on WhatsApp."
        contextLabel="School + Hostel + Cricket"
        ctaLabel="Send Details"
        onSubmit={handleSubmit}
        onClose={() => setLeadOpen(false)}
      />
    </motion.section>
  );
};

const QuickLinks = () => (
  <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
    <div className="grid gap-4 sm:grid-cols-2">
      <Link to="/plans" className="group">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="flex items-center gap-5 rounded-2xl border border-[#B8C9E8] bg-white p-5 shadow-sm transition group-hover:shadow-md"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF8] text-xl font-bold text-[#0B4192]">
            P
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0B4192]">Plans & Pricing</h4>
            <p className="text-xs text-[#3A5A8C]">Monthly, 6-month and yearly packages with trial sessions</p>
          </div>
          <FaArrowRight className="ml-auto shrink-0 text-[#0B4192] opacity-0 transition group-hover:opacity-100" />
        </motion.div>
      </Link>
      <Link to="/calendar" className="group">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="flex items-center gap-5 rounded-2xl border border-[#B8C9E8] bg-white p-5 shadow-sm transition group-hover:shadow-md"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF8] text-xl font-bold text-[#0B4192]">
            C
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#0B4192]">Cricket Calendar</h4>
            <p className="text-xs text-[#3A5A8C]">Training schedule, holidays and academy events for age 12 and above</p>
          </div>
          <FaArrowRight className="ml-auto shrink-0 text-[#0B4192] opacity-0 transition group-hover:opacity-100" />
        </motion.div>
      </Link>
    </div>
  </section>
);

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

      <SchoolHighlight />

      <StatsCounter stats={safeStats} />
      <QuickLinks />

      <TrainingRoadmap />
      <CoachesSection coaches={safeCoaches} />
      <TestimonialsSlider testimonials={safeTestimonials} />
      <CTASection />
    </>
  );
};

export default HomePage;


