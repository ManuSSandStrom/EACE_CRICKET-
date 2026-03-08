import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { getGallery, getVideos } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { toEmbedUrl } from '../utils/youtube.js';
import { riseIn, staggerContainer } from '../utils/motion.js';

const filters = ['All', 'Matches', 'Practice', 'Events', 'Tournaments', 'School'];
const placeholderImages = Array.from({ length: 6 }, (_, idx) => ({ id: `placeholder-${idx + 1}` }));
const placeholderVideos = Array.from({ length: 3 }, (_, idx) => ({ id: `video-placeholder-${idx + 1}` }));

const normalizeCategory = (rawCategory = '') => {
  const value = String(rawCategory).trim().toLowerCase();

  if (value.startsWith('match')) return 'Matches';
  if (value.startsWith('practice')) return 'Practice';
  if (value.startsWith('event')) return 'Events';
  if (value.startsWith('tournament') || value.startsWith('tournamenst')) return 'Tournaments';
  if (value.startsWith('school')) return 'School';

  return 'Matches';
};

const GalleryPage = () => {
  const [active, setActive] = useState('All');
  const [allItems, setAllItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGallery('All');
        setAllItems(Array.isArray(data) ? data : []);
      } catch (_error) {
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(Array.isArray(data) ? data : []);
      } catch (_error) {
      }
    };

    loadVideos();
  }, []);

  const normalizedAll = useMemo(
    () =>
      allItems.map((item, idx) => {
        const raw = typeof item?.imageUrl === 'string' ? item.imageUrl.trim() : '';
        const hasImage = raw.startsWith('http') || raw.startsWith('/uploads');

        return {
          ...item,
          _id: item?._id || `gallery-${idx}`,
          title: typeof item?.title === 'string' && item.title.trim() ? item.title.trim() : `Training Moment ${idx + 1}`,
          category: normalizeCategory(item?.category),
          imageUrl: hasImage ? raw : '',
          hasImage,
        };
      }),
    [allItems],
  );

  const normalized = useMemo(() => {
    if (active === 'All') return normalizedAll;
    return normalizedAll.filter((item) => item.category === active);
  }, [normalizedAll, active]);

  return (
    <motion.section
      variants={riseIn}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8"
    >
      <Helmet>
        <title>Gallery | EACE</title>
      </Helmet>

      <SectionTitle
        eyebrow="Gallery"
        title="Training & Match Moments"
        subtitle="Explore EACE life through curated photos from matches, practice, events, and tournaments."
      />

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActive(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === filter
                ? 'bg-[#E8EEF8] text-[#0B4192] shadow-lg shadow-[#0B4192]/15'
                : 'border border-sportsBlue/40 bg-cream text-plum hover:border-coral hover:text-coral'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        <AnimatePresence mode="popLayout">
          {normalized.length > 0
            ? normalized.map((item) =>
                item.hasImage ? (
                  <motion.button
                    layout
                    key={item._id}
                    variants={riseIn}
                    whileHover={{ y: -6, scale: 1.01 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPreview(item.imageUrl);
                    }}
                    className="masonry-item mb-4 overflow-hidden rounded-xl border border-sportsBlue/25 bg-cream shadow-sm relative group cursor-pointer w-full text-left"
                  >
                    {item.imageUrl.toLowerCase().endsWith('.mp4') ? (
                      <div className="relative w-full h-full min-h-[220px]">
                        <video
                          src={item.imageUrl}
                          title={item.title}
                          preload="metadata"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 min-h-[220px] pointer-events-none"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                           <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                             <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-t-transparent border-b-transparent border-l-[#0B4192] ml-1"></div>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title || 'EACE Gallery'}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110 min-h-[220px]"
                      />
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    layout
                    key={item._id}
                    variants={riseIn}
                    className="masonry-item mb-4 rounded-xl border border-dashed border-sportsBlue/35 bg-cream p-5"
                  >
                    <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-sportsBlue/35 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(243,231,201,0.65))] text-center text-sm text-muted">
                      {item.title}
                    </div>
                  </motion.div>
                ),
              )
            : placeholderImages.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  variants={riseIn}
                  transition={{ delay: idx * 0.04 }}
                  className="masonry-item mb-4 rounded-xl border border-dashed border-sportsBlue/35 bg-cream p-5"
                >
                  <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-sportsBlue/35 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(243,231,201,0.65))] text-center text-sm text-muted">
                    {active} gallery is empty
                    <br />
                    Add {active === 'All' ? 'gallery' : active.toLowerCase()} photos from admin panel
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>

      <div id="youtube-gallery" className="mt-16 border-t border-cream/25 pt-14">
        <SectionTitle
          eyebrow="YouTube Showcase"
          title="Video Highlights"
          subtitle="Share YouTube links later and videos will appear here automatically."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {videos.length > 0
            ? videos.map((video) => {
                const isDirectVideo = video.youtubeUrl.toLowerCase().endsWith('.mp4');
                return (
                <motion.article
                  key={video._id}
                  variants={riseIn}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="overflow-hidden rounded-2xl border border-sportsBlue/25 bg-cream shadow-sm"
                >
                  <div className="aspect-video bg-black/5">
                    {isDirectVideo ? (
                      <video
                        className="h-full w-full object-cover"
                        src={video.youtubeUrl}
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <iframe
                        className="h-full w-full"
                        loading="lazy"
                        src={toEmbedUrl(video.youtubeUrl)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                  <div className="p-4 text-sm font-semibold text-paper">{video.title}</div>
                </motion.article>
              );
            })
            : placeholderVideos.map((video, idx) => (
                <motion.article
                  key={video.id}
                  variants={riseIn}
                  transition={{ delay: idx * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-dashed border-sportsBlue/35 bg-cream p-4"
                >
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-sportsBlue/35 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(243,231,201,0.65))] text-center text-sm text-muted">
                    YouTube link placeholder {idx + 1}
                  </div>
                  <div className="p-3 text-sm font-semibold text-paper">Video will show here after link is added</div>
                </motion.article>
              ))}
        </motion.div>
      </div>

      <Lightbox image={preview} onClose={() => setPreview('')} />
    </motion.section>
  );
};

export default GalleryPage;