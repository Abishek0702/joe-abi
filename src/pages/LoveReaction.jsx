import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';

const emojiSets = {
  green: ['💚', '🌿', '🍀', '✨', '🦋', '💎', '🥰', '💫', '⭐'],
  blue: ['💙', '💚', '✨', '🦋', '💎', '🌊', '🥰', '💫', '⭐'],
  rose: ['💖', '💗', '💕', '🌸', '✨', '🦋', '🥰', '💫', '💝'],
};

function FallingEmoji({ emoji, delay, left }) {
  return (
    <motion.span
      initial={{ y: -50, opacity: 0, rotate: 0 }}
      animate={{ y: '100vh', opacity: [0, 1, 1, 0], rotate: 360 }}
      transition={{ duration: 3, delay, ease: 'easeIn' }}
      className="absolute text-2xl sm:text-3xl md:text-5xl"
      style={{ left: `${left}%` }}
    >
      {emoji}
    </motion.span>
  );
}

export default function LoveReaction() {
  const navigate = useNavigate();
  const { theme, themeName } = useTheme();
  const [fallingEmojis, setFallingEmojis] = useState([]);

  useEffect(() => {
    const emojis = emojiSets[themeName];
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 3,
      left: Math.random() * 95,
    }));
    setFallingEmojis(items);

    const timer = setTimeout(() => navigate('/gallery'), 5000);
    return () => clearTimeout(timer);
  }, [navigate, themeName]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center overflow-hidden relative" style={{ background: theme.reactionBg }}>
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0,0,0,0.2)' }} />

        {fallingEmojis.map((item) => (
          <FallingEmoji key={item.id} {...item} />
        ))}

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-7xl sm:text-9xl md:text-[140px] mb-4 sm:mb-6"
          >
            {theme.heartEmoji}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-love text-4xl sm:text-6xl md:text-8xl text-white font-bold"
            style={{ textShadow: '0 3px 20px rgba(0,0,0,0.4)' }}
          >
            I Love You Papu {theme.heartEmoji}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            You just made my heart explode!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 sm:mt-8"
          >
            <div className="inline-flex items-center gap-2 text-white text-base sm:text-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/80 border-t-transparent rounded-full"
              />
              Taking you to our memories...
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
