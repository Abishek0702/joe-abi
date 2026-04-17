import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const fromColor = theme.playerBtnFrom || '#ff8fb1';
  const toColor = theme.playerBtnTo || '#ff3d7f';
  const glow = theme.playerBtnShadow || 'rgba(255,107,157,0.5)';

  return (
    <>
      {/* ─── Mobile: Heart-shaped button ─── */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, scale: [1, 1.04, 1] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          x: { delay: 1, duration: 0.5 },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={toggleTheme}
        className="sm:hidden fixed top-2 right-2 z-[100] w-14 h-14 flex items-center justify-center cursor-pointer"
        style={{ filter: `drop-shadow(0 4px 10px ${glow})` }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch theme (${theme.label})`}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="themeHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
          </defs>
          <path
            d="M50 88 C20 65, 8 45, 8 30 C8 17, 20 8, 32 8 C40 8, 46 12, 50 20 C54 12, 60 8, 68 8 C80 8, 92 17, 92 30 C92 45, 80 65, 50 88 Z"
            fill="url(#themeHeartGrad)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
          />
        </svg>
        <AnimatePresence mode="wait">
          <motion.span
            key={theme.name}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-lg leading-none"
            style={{ marginTop: '-4px' }}
          >
            {theme.label.split(' ')[0]}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ─── Desktop: Pill button ─── */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={toggleTheme}
        className="hidden sm:flex fixed top-4 right-4 z-[100] px-4 py-2 rounded-full text-md font-medium backdrop-blur-md border border-white/30 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl items-center justify-center"
        style={{ background: theme.toggleBg }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch theme (${theme.label})`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={theme.name}
            initial={{ opacity: 0, y: -10, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 10, rotate: 20 }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg whitespace-nowrap leading-none"
          >
            {theme.label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
