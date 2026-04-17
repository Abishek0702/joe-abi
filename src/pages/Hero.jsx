import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import DreamyBackground from '../components/DreamyBackground';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1920&q=80)',
            filter: 'blur(2px) brightness(0.5)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />

        {/* Dreamy effects */}
        <DreamyBackground showCupid={true} intensity="high" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-love text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-medium tracking-wide dreamy-glow"
          >
            Joe & Abi
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-16 sm:w-24 h-0.5 bg-white/60 mx-auto my-4 sm:my-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white/80 text-lg sm:text-xl md:text-2xl font-love-body"
          >
            A journey since December 21st, 2025 💕
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.btnGlow}` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/valentine')}
            className={`mt-8 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-base sm:text-lg font-medium tracking-wide transition-all cursor-pointer flex items-center gap-2 mx-auto`}
          >
            Begin our story
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 text-2xl sm:text-3xl"
          >
            ⌄
          </motion.span>
        </motion.div>
      </div>
    </PageTransition>
  );
}
