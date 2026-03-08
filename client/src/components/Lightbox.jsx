import { AnimatePresence, motion } from 'framer-motion';

const Lightbox = ({ image, onClose }) => {
  const isVideo = image?.toLowerCase().endsWith('.mp4');

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {isVideo ? (
            <motion.video
              src={image}
              controls
              autoPlay
              playsInline
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[90vh] max-w-4xl rounded-xl border border-white/20 outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <motion.img
              src={image}
              alt="Gallery preview"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[90vh] max-w-4xl rounded-xl border border-white/20 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Lightbox;
