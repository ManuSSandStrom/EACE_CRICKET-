import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { pageTransition } from '../utils/motion.js';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="page-shell min-h-screen">
      <Navbar />
      <motion.main
        key={location.pathname}
        variants={pageTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative pt-20"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[2px] overflow-hidden">
          <div className="gold-accent-line h-full w-1/4" />
        </div>
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;
