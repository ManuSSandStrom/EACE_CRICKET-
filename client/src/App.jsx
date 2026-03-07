import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import FloatingAssistant from './components/FloatingAssistant.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CoachesPage = lazy(() => import('./pages/CoachesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const PlansPage = lazy(() => import('./pages/PlansPage.jsx'));
const CalendarPage = lazy(() => import('./pages/CalendarPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage.jsx'));

const RouteShell = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen inline />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/coaches" element={<CoachesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  const [showEnhancements, setShowEnhancements] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    let idleId = null;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setShowEnhancements(true), { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => setShowEnhancements(true), 280);
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <FloatingWhatsApp />
      {showEnhancements ? <CursorGlow /> : null}
      {showEnhancements ? <FloatingAssistant /> : null}
      <RouteShell />
    </>
  );
};

export default App;