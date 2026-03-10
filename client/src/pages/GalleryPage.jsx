import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { getGallery, getVideos } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { toEmbedUrl } from '../utils/youtube.js';
import { riseIn, staggerContainer } from '../utils/motion.js';
import { optimizeCloudinaryImage } from '../utils/media.js';

const placeholderImages = Array.from({ length: 6 }, (_, idx) => ({ id: `placeholder-${idx + 1}` }));
const placeholderVideos = Array.from({ length: 3 }, (_, idx) => ({ id: `video-placeholder-${idx + 1}` }));

const GalleryPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [preview, setPreview] = useState('');

  const pauseOtherVideos = (activeVideo) => {
    document.querySelectorAll('video').forEach((videoElement) => {
      if (videoElement !== activeVideo) videoElement.pause();
    });
  };

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

  const normalized = useMemo(
    () =>
      allItems.map((item, idx) => {
        const raw = typeof item?.imageUrl === 'string' ? item.imageUrl.trim() : '';
        const hasImage = raw.startsWith('http') || raw.startsWith('/uploads');

        return {
          ...item,
          _id: item?._id || `gallery-${idx}`,
          title: typeof item?.title === 'string' && item.title.trim() ? item.title.trim() : `Training Moment ${idx + 1}`,
          previewUrl: hasImage ? optimizeCloudinaryImage(raw, 1400) : '',
          thumbUrl: hasImage ? optimizeCloudinaryImage(raw, 900) : '',
          imageUrl: hasImage ? raw : '',
          hasImage,
        };
      }),
    [allItems],
  );

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
        subtitle="Explore academy life through our curated photos and video highlights."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        <AnimatePresence mode="popLayout">
          {normalized.length > 0
            ? normalized.map((item, index) =>
                item.hasImage ? (
                  <motion.button
                    layout
                    key={item._id}
                    variants={riseIn}
                    whileHover={{ y: -6, scale: 1.01 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPreview(item.previewUrl || item.imageUrl);
                    }}
                    className="masonry-item mb-4 overflow-hidden rounded-xl border border-sportsBlue/25 bg-cream shadow-sm relative group cursor-pointer w-full text-left"
                  >
                      <img
                        src={item.thumbUrl}
                        alt={item.title || 'EACE Gallery'}
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110 min-h-[220px]"
                      />
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
                    Gallery is empty
                    <br />
                    Add photos from admin panel
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
                        onPlay={(event) => pauseOtherVideos(event.currentTarget)}
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
