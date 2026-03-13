import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { EACE_LOGO_URL } from '../utils/branding.js';

const particles = [
  { left: '8%', top: '72%', size: 4, dur: '9s', delay: '0s' },
  { left: '15%', top: '40%', size: 5, dur: '8.6s', delay: '1.8s' },
  { left: '24%', top: '64%', size: 3, dur: '9.4s', delay: '0.9s' },
  { left: '34%', top: '36%', size: 4, dur: '8.8s', delay: '2.3s' },
  { left: '44%', top: '70%', size: 3, dur: '9.7s', delay: '1.2s' },
  { left: '55%', top: '38%', size: 5, dur: '8.4s', delay: '0.6s' },
  { left: '63%', top: '67%', size: 3, dur: '9.2s', delay: '2.1s' },
  { left: '72%', top: '32%', size: 4, dur: '8.7s', delay: '1.4s' },
  { left: '81%', top: '58%', size: 3, dur: '9.5s', delay: '0.4s' },
  { left: '90%', top: '34%', size: 5, dur: '8.2s', delay: '1.7s' },
];

const HERO_BG_VIDEO =
  'https://res.cloudinary.com/dt37ji5yp/video/upload/q_auto,f_auto/v1772864727/ease_website_back_vid_1_1_xvxy68.mp4';

const HeroSection = ({ headline, subheading }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current) {
      return;
    }

    gsap.fromTo(textRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-cream/20 px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ opacity: 0.8 }}
      >
        <source src={HERO_BG_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35" />
      <div className="hero-bright-gradient absolute inset-0 opacity-60" />
      <div className="stadium-spotlight absolute inset-0" />
      <div className="stadium-beam beam-1" />
      <div className="stadium-beam beam-2" />
      <div className="stadium-beam beam-3" />
      <div className="pitch-lines" />

      <div className="stadium-particles">
        {particles.map((particle, idx) => (
          <span
            key={idx}
            className="stadium-particle"
            style={{
              left: particle.left,
              top: particle.top,
              height: `${particle.size}px`,
              width: `${particle.size}px`,
              '--dur': particle.dur,
              '--delay': particle.delay,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px] overflow-hidden">
        <div className="gold-accent-line h-full w-1/4" />
      </div>

      <div ref={textRef} className="relative z-20 mx-auto w-full max-w-6xl text-center">
        <img src={EACE_LOGO_URL} alt="EACE Logo" className="mx-auto mb-7 h-32 w-32 object-contain drop-shadow-lg md:h-40 md:w-40 lg:h-48 lg:w-48" fetchpriority="high" />

        <p className="font-subheading text-xs uppercase tracking-[0.4em] text-aqua">Premier Cricket Training Destination</p>

        <h1 className="academy-underline mx-auto mt-4 max-w-5xl text-balance text-5xl font-bold leading-[0.9] text-cream md:text-7xl lg:text-8xl">
          Ekalavya
          <br />
          Academy of Cricket Excellence
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-sm text-cream/85 md:text-lg">{headline}</p>
        <p className="mx-auto mt-2 max-w-3xl text-xs text-cream/80 md:text-base">{subheading}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/918123105849?text=Hello,%20I%20want%20to%20join%20Ekalavya%20Academy%20of%20Cricket%20Excellence."
            target="_blank"
            rel="noreferrer"
            className="btn-gold rounded-full px-9 py-3 text-sm font-semibold uppercase tracking-[0.15em]"
          >
            Join Academy
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            href="/contact"
            className="btn-outline rounded-full px-9 py-3 text-sm font-semibold uppercase tracking-[0.15em]"
          >
            Book Trial Session
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
