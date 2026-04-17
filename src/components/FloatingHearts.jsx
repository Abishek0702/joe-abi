import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function FloatingHearts() {
  const { theme } = useTheme();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const emojis = theme.floatingEmojis;
      const heart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
        symbol: emojis[Math.floor(Math.random() * emojis.length)],
      };
      setHearts((prev) => [...prev.slice(-15), heart]);
    }, 800);

    return () => clearInterval(interval);
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart absolute opacity-40"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
}
