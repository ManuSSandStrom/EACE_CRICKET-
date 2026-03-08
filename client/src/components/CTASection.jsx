import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-[#B8C9E8] p-8 text-center shadow-[0_16px_34px_rgba(11,65,146,0.12)] md:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(11,65,146,0.1),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(121,0,0,0.1),transparent_35%),linear-gradient(120deg,#FFFFFF,#F0F4FA)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[repeating-linear-gradient(90deg,rgba(11,65,146,0.1)_0px,rgba(11,65,146,0.1)_2px,transparent_2px,transparent_30px)]" />

        <div className="relative z-10">
          <h3 className="text-4xl font-bold text-[#0B4192] md:text-5xl">Start Your Cricket Journey Today</h3>
          <p className="mx-auto mt-4 max-w-2xl text-[#2C3E6B]">
            Book your trial and begin high-performance cricket training with EACE coaches.
          </p>
          <a
            href="https://wa.me/918123105849?text=Hello,%20I%20want%20to%20enroll%20in%20Ekalavya%20Academy%20of%20Cricket%20Excellence."
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-8 inline-block rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em]"
          >
            Join EACE Academy
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;