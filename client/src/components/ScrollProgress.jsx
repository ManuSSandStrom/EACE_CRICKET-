import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (top / height) * 100 : 0;
      setWidth(progress);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cricketGold via-energyRed to-sportsBlue transition-[width] duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
