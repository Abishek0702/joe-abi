import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bubbleEmojis = ['💖', '💕', '💗', '💝', '🫧', '✨', '💘', '🌸', '💞', '💓'];
const bubbleColors = [
  'rgba(255,182,193,0.4)',
  'rgba(255,105,180,0.3)',
  'rgba(255,192,203,0.35)',
  'rgba(147,112,219,0.25)',
  'rgba(255,160,200,0.3)',
];

export default function LoveBubbles({ active }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    if (!active) return;

    // burst of bubbles
    const newBubbles = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      size: 20 + Math.random() * 40,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 2,
      emoji: bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)],
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      isCircle: Math.random() > 0.5,
    }));
    setBubbles(newBubbles);

    // keep adding bubbles
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const b = {
          id: Date.now(),
          x: Math.random() * 100,
          size: 20 + Math.random() * 40,
          duration: 4 + Math.random() * 5,
          delay: 0,
          emoji: bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)],
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          isCircle: Math.random() > 0.5,
        };
        return [...prev.slice(-30), b];
      });
    }, 400);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{
              x: `${b.x}vw`,
              y: '110vh',
              opacity: 0.8,
              scale: 0.3,
            }}
            animate={{
              y: '-10vh',
              opacity: [0.8, 0.6, 0],
              scale: [0.3, 1, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: 'easeOut',
            }}
            className="absolute"
          >
            {b.isCircle ? (
              <div
                className="rounded-full"
                style={{
                  width: b.size,
                  height: b.size,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${b.color})`,
                  boxShadow: `0 0 ${b.size / 2}px ${b.color}, inset 0 0 ${b.size / 3}px rgba(255,255,255,0.3)`,
                }}
              />
            ) : (
              <span style={{ fontSize: b.size * 0.7 }}>{b.emoji}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
