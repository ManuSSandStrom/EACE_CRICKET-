import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getVideos } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';
import { toEmbedUrl } from '../utils/youtube.js';

const YouTubePage = () => {
  const [videos, setVideos] = useState([]);

  const pauseOtherVideos = (activeVideo) => {
    document.querySelectorAll('video').forEach((videoElement) => {
      if (videoElement !== activeVideo) videoElement.pause();
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (_error) {
      }
    };

    load();
  }, []);

  const featured = useMemo(() => videos.find((video) => video.featured) || videos[0], [videos]);
  const rest = useMemo(
    () => videos.filter((video) => (featured ? video._id !== featured._id : true)),
    [videos, featured],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>YouTube Highlights | EACE</title>
      </Helmet>

      <SectionTitle
        eyebrow="YouTube Showcase"
        title="Video Library"
        subtitle="Featured sessions and clips from our training ecosystem."
      />

      {featured ? (
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-2xl border border-sportsBlue/20 bg-cream shadow-card"
        >
          <div className="aspect-video bg-black/5">
            {featured.youtubeUrl?.toLowerCase().endsWith('.mp4') ? (
              <video
                className="h-full w-full object-cover"
                src={featured.youtubeUrl}
                controls
                playsInline
                preload="metadata"
                onPlay={(event) => pauseOtherVideos(event.currentTarget)}
              />
            ) : (
              <iframe
                className="h-full w-full"
                loading="lazy"
                src={toEmbedUrl(featured.youtubeUrl)}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-cricketGold">Featured</p>
            <h3 className="mt-2 text-xl font-semibold text-paper">{featured.title}</h3>
          </div>
        </motion.article>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((video) => {
          const isDirectVideo = video.youtubeUrl?.toLowerCase().endsWith('.mp4');
          return (
            <motion.article
              key={video._id}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-2xl border border-sportsBlue/20 bg-cream shadow-card"
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
              <div className="p-4 text-sm font-medium text-paper">{video.title}</div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default YouTubePage;
