import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(value / (duration / 16)));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      viewport={{ once: true }}
      className="rounded-xl border border-[#B8C9E8] bg-white px-4 py-5 text-center shadow-sm"
    >
      <p className="text-3xl font-bold text-[#0B4192] md:text-4xl">{count}+</p>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#3A5A8C]">{label}</p>
    </motion.div>
  );
};

const StatsCounter = ({ stats }) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <div className="rounded-2xl border border-[#B8C9E8] bg-[linear-gradient(115deg,#FFFFFF_0%,#F0F4FA_100%)] p-4 shadow-[0_14px_28px_rgba(11,65,146,0.08)] md:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;