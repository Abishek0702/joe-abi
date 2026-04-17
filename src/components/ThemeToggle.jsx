import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[100] px-4 py-2 rounded-full text-md font-medium backdrop-blur-md border border-white/30 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
      style={{ background: theme.toggleBg }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme.name}
          initial={{ opacity: 0, y: -10, rotate: -20 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: 10, rotate: 20 }}
          transition={{ duration: 0.3 }}
          className="text-white text-sm sm:text-lg whitespace-nowrap"
        >
          {theme.label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
