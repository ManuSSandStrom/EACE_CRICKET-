import { motion } from 'framer-motion';
import { FaRegImage } from 'react-icons/fa';
import SectionTitle from './SectionTitle.jsx';
import { staggerContainer, zoomIn } from '../utils/motion.js';

const stories = [
  {
    name: 'Rohit S',
    achievement: 'Selected for Karnataka U16',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/q_auto,f_auto/v1772983584/20250620_170147_o4x6hf.jpg'
  },
  {
    name: 'Ananya R',
    achievement: 'District Level Champion',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/q_auto,f_auto/v1772983574/20241122_175017.jpg_nvelni.jpg'
  },
  {
    name: 'Aditya K',
    achievement: 'KSCA League Player',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/q_auto,f_auto/v1772983571/20241214_112403.jpg_s5opyo.jpg'
  },
];

const PlayerSuccessStories = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <div className="rounded-3xl border border-[#D0D8E8] bg-white p-6 md:p-8">
        <SectionTitle
          eyebrow="Success Stories"
          title="Player Success Stories"
          subtitle="Our athletes are consistently progressing into district, state, and league-level cricket pathways."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.article
              key={story.name}
              variants={zoomIn}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 0 16px rgba(11, 65, 146, 0.18), 0 20px 34px rgba(11, 65, 146, 0.1)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="overflow-hidden rounded-2xl border border-[#D0D8E8] bg-white shadow-sm"
            >
              <div className="flex h-56 w-full flex-col items-center justify-center border-b border-dashed border-[#B8C9E8] bg-[linear-gradient(135deg,#FFFFFF,#F0F4FA)] text-[#0B4192]">
                {story.image ? (
                  <img src={story.image} alt={story.name} className="h-full w-full object-cover" />
                ) : (
                  <>
                    <FaRegImage className="text-3xl" />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em]">Image Space</p>
                  </>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-[#0B4192]">{story.name}</h3>
                <p className="mt-2 text-sm font-medium text-[#3A5A8C]">{story.achievement}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlayerSuccessStories;