import { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    setEnabled(isDesktop);

    if (!isDesktop) return;

    let frameId = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frameId = 0;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
      }
    };

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;

      if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  if (!enabled) return null;

  return <div ref={glowRef} className="pointer-events-none fixed z-[70] h-10 w-10 rounded-full border border-gold/50 bg-gold/10 blur-[0.5px]" />;
};

export default CursorGlow;