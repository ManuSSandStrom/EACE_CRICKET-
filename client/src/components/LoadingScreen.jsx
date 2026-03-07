import { motion } from 'framer-motion';

const LoadingScreen = ({ inline = false }) => {
  const shellClass = inline
    ? 'h-[40vh] rounded-2xl border border-[#E7D9BA] bg-white'
    : 'fixed inset-0 z-[9999]';

  return (
    <div
      className={`${shellClass} flex items-center justify-center bg-[radial-gradient(circle_at_20%_0%,rgba(11,65,146,0.12),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(121,0,0,0.1),transparent_36%),linear-gradient(135deg,#FFFFFF,#F0F4FA)]`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 h-20 w-20 rounded-full border border-[#0B4192] bg-white p-1 shadow-sm">
          <div className="flex h-full items-center justify-center rounded-full bg-[#E8EEF8] text-xl font-semibold text-[#0B4192]">
            E
          </div>
        </div>
        <p className="font-heading text-3xl font-semibold tracking-[0.18em] text-[#0B4192]">EACE</p>
        <motion.div
          className="mx-auto mt-4 h-1.5 w-44 overflow-hidden rounded-full bg-[#D0D8E8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="block h-full bg-gradient-to-r from-[#0B4192] via-[#1A5BC4] to-[#790000]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;