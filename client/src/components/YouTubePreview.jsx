import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle.jsx';
import { toEmbedUrl } from '../utils/youtube.js';

const YouTubePreview = ({ videos }) => {
  if (!videos.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <SectionTitle
        eyebrow="Video Highlights"
        title="YouTube Highlights"
        subtitle="Training clips, match moments, and progress stories from EACE athletes."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {videos.slice(0, 3).map((video) => (
          <motion.div
            key={video._id || video.youtubeUrl}
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-2xl border border-sportsBlue/20 bg-cream shadow-card"
          >
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={toEmbedUrl(video.youtubeUrl)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-paper">{video.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/youtube"
          className="rounded-full border border-cricketGold/80 px-6 py-2 text-sm font-semibold text-cricketGold transition hover:bg-cricketGold hover:text-ink"
        >
          Explore Full Showcase
        </Link>
      </div>
    </section>
  );
};

export default YouTubePreview;
