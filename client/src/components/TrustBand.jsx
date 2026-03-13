import { motion } from 'framer-motion';
import { FaAward, FaUserCheck, FaVideo } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';
import { riseIn, staggerContainer } from '../utils/motion.js';

const badges = [
  { icon: FaUserCheck, title: 'Certified Coaching Staff', desc: 'Experienced mentors for every skill level' },
  { icon: GiCricketBat, title: 'Professional Turf Wickets', desc: 'Match-standard surfaces and drills' },
  { icon: FaVideo, title: 'Video Analysis Training', desc: 'Performance review with technical feedback' },
];

const TrustBand = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {badges.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              variants={riseIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-xl border border-aqua/35 bg-cream p-5 shadow-sm"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E8EEF8] text-[#0B4192]">
                <Icon />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-paper">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default TrustBand;
