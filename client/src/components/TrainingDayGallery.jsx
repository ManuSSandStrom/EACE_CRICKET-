import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBaseballBall, FaCrosshairs, FaDumbbell, FaRunning, FaStopwatch, FaTrophy } from 'react-icons/fa';
import SectionTitle from './SectionTitle.jsx';
import { staggerContainer, riseIn } from '../utils/motion.js';

const galleryCards = [
  { title: 'Net Practice', subtitle: 'Technique repetition under coach feedback', icon: FaCrosshairs },
  { title: 'Batting Drills', subtitle: 'Timing, footwork, and shot selection blocks', icon: FaBaseballBall },
  { title: 'Bowling Sessions', subtitle: 'Control, line-length, and pace variations', icon: FaStopwatch },
  { title: 'Fitness Training', subtitle: 'Strength, mobility, and endurance routines', icon: FaDumbbell },
  { title: 'Fielding Modules', subtitle: 'Reflex catches and ground movement drills', icon: FaRunning },
  { title: 'Match Simulation', subtitle: 'Pressure scenarios with tactical execution', icon: FaTrophy },
];

const TrainingDayGallery = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Training Day Gallery"
        title="Inside EACE Practice Sessions"
        subtitle="Net practice, batting drills, bowling modules, fitness routines, and match simulation moments."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {galleryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              variants={riseIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-aqua/35 bg-cream p-5 shadow-sm"
            >
              <div
                className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    idx % 2 === 0
                      ? 'linear-gradient(140deg, rgba(11,65,146,0.15), rgba(121,0,0,0.08))'
                      : 'linear-gradient(140deg, rgba(121,0,0,0.1), rgba(11,65,146,0.1))',
                }}
              />
              <div className="relative z-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EEF8] text-xl text-[#0B4192]">
                  <Icon />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-paper">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.subtitle}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          to="/gallery"
          className="btn-gold inline-flex rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.13em]"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
};

export default TrainingDayGallery;