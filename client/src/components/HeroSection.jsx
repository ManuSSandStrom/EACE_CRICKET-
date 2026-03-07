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
  'https://res.cloudinary.com/dt37ji5yp/video/upload/v1772864727/ease_website_back_vid_1_1_xvxy68.mp4';

const sparkOffsets = [
  { x: -34, y: -28 },
  { x: -22, y: 20 },
  { x: -8, y: -34 },
  { x: 14, y: -24 },
  { x: 24, y: 10 },
  { x: 34, y: -8 },
  { x: 18, y: 26 },
  { x: -16, y: 30 },
];

const HeroSection = ({ headline, subheading }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ballRef = useRef(null);
  const trailRef = useRef(null);
  const batRef = useRef(null);
  const flashRef = useRef(null);
  const sparkRefs = useRef([]);
  const animationRef = useRef(null);


  useEffect(() => {
    if (!heroRef.current || !textRef.current || !ballRef.current || !trailRef.current || !batRef.current || !flashRef.current) {
      return;
    }

    gsap.fromTo(textRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });



    const runHeroAnimation = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set([ballRef.current, trailRef.current, flashRef.current, ...sparkRefs.current], { opacity: 0 });
        return;
      }

      const heroWidth = heroRef.current.offsetWidth;
      const heroHeight = heroRef.current.offsetHeight;

      const startY = heroHeight * (heroWidth < 768 ? 0.56 : 0.54);
      const impactX = heroWidth * 0.5;
      const exitX = heroWidth + 160;
      const batX = impactX + 36;
      const batY = startY - (heroWidth < 768 ? 96 : 120);

      animationRef.current?.kill();

      gsap.set(trailRef.current, { x: -170, y: startY + 11, width: 30, opacity: 0, scaleX: 1 });
      gsap.set(ballRef.current, { x: -170, y: startY, rotation: 0, opacity: 1 });
      gsap.set(batRef.current, { x: batX, y: batY, rotation: -12, transformOrigin: '84% 88%' });
      gsap.set(flashRef.current, { x: impactX + 16, y: startY + 4, opacity: 0, scale: 0.4 });

      sparkRefs.current.forEach((spark) => {
        if (!spark) return;
        gsap.set(spark, { x: impactX + 10, y: startY + 8, opacity: 0, scale: 0.4 });
      });

      const timeline = gsap.timeline({ delay: 0.45 });

      timeline
        .to(trailRef.current, {
          opacity: 0.92,
          width: impactX + 180,
          duration: 1.02,
          ease: 'power2.out',
        })
        .to(
          ballRef.current,
          {
            x: impactX,
            y: startY - 10,
            rotation: 760,
            duration: 1.02,
            ease: 'power3.out',
          },
          '<',
        )
        .to(
          batRef.current,
          {
            rotation: 28,
            duration: 0.1,
            ease: 'power2.out',
          },
          '-=0.06',
        )
        .to(
          flashRef.current,
          {
            opacity: 1,
            scale: 1.45,
            duration: 0.08,
          },
          '<',
        )
        .to(flashRef.current, {
          opacity: 0,
          scale: 2.5,
          duration: 0.2,
        });

      sparkOffsets.forEach((offset, index) => {
        const spark = sparkRefs.current[index];
        if (!spark) return;

        timeline.to(
          spark,
          {
            x: impactX + offset.x,
            y: startY + offset.y,
            opacity: 0,
            scale: 1.25,
            duration: 0.34,
            ease: 'power2.out',
          },
          '<',
        );
      });

      timeline
        .to(
          ballRef.current,
          {
            x: exitX,
            y: startY - (heroWidth < 768 ? 90 : 130),
            rotation: 1340,
            duration: 0.86,
            ease: 'power2.in',
          },
          '-=0.04',
        )
        .to(
          trailRef.current,
          {
            width: 70,
            opacity: 0,
            duration: 0.52,
            ease: 'power2.out',
          },
          '<',
        )
        .to(
          batRef.current,
          {
            rotation: -10,
            duration: 0.22,
            ease: 'power2.inOut',
          },
          '<',
        );

      animationRef.current = timeline;
    };

    runHeroAnimation();

    let resizeTimer;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(runHeroAnimation, 180);
    };

    window.addEventListener('resize', onResize);

    return () => {
      animationRef.current?.kill();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
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
        <img src={EACE_LOGO_URL} alt="EACE Logo" className="mx-auto mb-7 h-28 w-28 object-contain drop-shadow-lg md:h-36 md:w-36 lg:h-40 lg:w-40" loading="eager" />

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
            href="https://wa.me/919515022680?text=Hello,%20I%20want%20to%20join%20Ekalavya%20Academy%20of%20Cricket%20Excellence."
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

      <div className="hero-ball-layer z-30">
        <div ref={trailRef} className="hero-ball-trail" />
        <div ref={ballRef} className="hero-ball" />

        <div ref={batRef} className="hero-bat">
          <div className="hero-bat-handle" />
          <div className="hero-bat-blade" />
        </div>

        <div ref={flashRef} className="impact-flash" />

        {sparkOffsets.map((_, idx) => (
          <span
            key={idx}
            ref={(element) => {
              sparkRefs.current[idx] = element;
            }}
            className="impact-spark"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
