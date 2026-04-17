import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import ThemeToggle from './components/ThemeToggle';
import { ValentineProvider } from './context/ValentineContext';
import { ThemeProvider } from './context/ThemeContext';
import Hero from './pages/Hero';
import ValentineQuestion from './pages/ValentineQuestion';
import LoveReaction from './pages/LoveReaction';
import Gallery from './pages/Gallery';
import VideoPage from './pages/VideoPage';
import QuestionFlow from './pages/QuestionFlow';
import Finale from './pages/Finale';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/valentine" element={<ValentineQuestion />} />
        <Route path="/love-reaction" element={<LoveReaction />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/questions/:id" element={<QuestionFlow />} />
        <Route path="/finale" element={<Finale />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <ValentineProvider>
          <ScrollToTop />
          <FloatingHearts />
          <ThemeToggle />
          <AnimatedRoutes />
        </ValentineProvider>
      </ThemeProvider>
    </Router>
  );
}
