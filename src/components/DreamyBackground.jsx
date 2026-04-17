import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Sparkle particle ─── */
function Sparkle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.6, 0],
        scale: [0, 1, 0.8, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,182,193,0.4) 50%, transparent 70%)',
          borderRadius: '50%',
          boxShadow: `0 0 ${size * 2}px rgba(255,215,0,0.3)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Floating cloud ─── */
function Cloud({ top, startX, size, duration, delay, opacity }) {
  return (
    <motion.div
      initial={{ x: `${startX}vw`, opacity: 0 }}
      animate={{ x: [`${startX}vw`, `${startX + 20}vw`, `${startX}vw`], opacity }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute pointer-events-none"
      style={{ top }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size * 0.4,
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, rgba(255,200,220,0.06) 60%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );
}

/* ─── Love bubble ─── */
function Bubble({ x, size, delay, duration }) {
  return (
    <motion.div
      initial={{ y: '105vh', x: `${x}vw`, opacity: 0 }}
      animate={{
        y: '-5vh',
        opacity: [0, 0.3, 0.25, 0],
        x: [`${x}vw`, `${x + (Math.random() - 0.5) * 10}vw`],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
      className="absolute pointer-events-none"
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,182,193,0.15) 60%, transparent)`,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `inset 0 0 ${size / 3}px rgba(255,255,255,0.15), 0 0 ${size / 2}px rgba(255,105,180,0.08)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Sparkling heart ─── */
function SparkleHeart({ x, y, delay, duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        scale: [0, 1.2, 0.8, 0],
        y: [0, -20],
      }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 5 }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className="text-md sm:text-base"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255,105,180,0.5))' }}
      >
        💖
      </span>
    </motion.div>
  );
}

/* ─── Cupid (floating with bow) ─── */
function Cupid({ position = 'right' }) {
  const isRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      animate={{
        opacity: [0, 0.7, 0.7, 0.6],
        x: 0,
        y: [0, -15, 0, -10, 0],
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{
        opacity: { duration: 2, delay: 1.5 },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`absolute ${isRight ? 'top-[12%] right-[5%] sm:right-[8%]' : 'bottom-[15%] left-[5%] sm:left-[8%]'} pointer-events-none z-[3]`}
    >
      {/* Cupid body with golden glow */}
      <div className="relative">
        {/* Golden aura */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Cupid emoji */}
        <span
          className="text-3xl sm:text-4xl md:text-5xl block"
          style={{
            filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.4)) drop-shadow(0 0 25px rgba(255,105,180,0.2))',
          }}
        >
          💘
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Angel wing shimmer ─── */
function AngelWing({ side }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.08, 0.12, 0.08, 0],
        scale: [0.9, 1, 1.05, 1, 0.9],
      }}
      transition={{ duration: 8, delay: isLeft ? 0 : 4, repeat: Infinity }}
      className={`absolute ${isLeft ? 'left-0 top-1/4' : 'right-0 top-1/3'} pointer-events-none`}
    >
      <div
        style={{
          width: '25vw',
          maxWidth: 200,
          height: '30vh',
          maxHeight: 250,
          background: isLeft
            ? 'radial-gradient(ellipse at right, rgba(255,215,0,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at left, rgba(255,215,0,0.12) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}

/* ─── Light rays ─── */
function LightRays() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.06, 0.04, 0.06, 0] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'conic-gradient(from 0deg at 50% 0%, transparent 0deg, rgba(255,215,0,0.04) 30deg, transparent 60deg, rgba(255,182,193,0.03) 120deg, transparent 150deg, rgba(255,215,0,0.04) 210deg, transparent 240deg)',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════ */
/*          MAIN DREAMY BACKGROUND                 */
/* ═══════════════════════════════════════════════ */
export default function DreamyBackground({ showCupid = false, intensity = 'medium' }) {
  const [sparkles] = useState(() =>
    Array.from({ length: intensity === 'high' ? 18 : 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  );

  const [bubbles] = useState(() =>
    Array.from({ length: intensity === 'high' ? 8 : 5 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      size: 20 + Math.random() * 30,
      delay: i * 2 + Math.random() * 3,
      duration: 10 + Math.random() * 8,
    }))
  );

  const [sparkleHearts] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 2,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* Soft pink-golden ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(255,182,193,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,215,0,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Light rays from top */}
      <LightRays />

      {/* Angel wing shimmers */}
      <AngelWing side="left" />
      <AngelWing side="right" />

      {/* Clouds */}
      <Cloud top="10%" startX={5} size={120} duration={15} delay={0} opacity={0.1} />
      <Cloud top="25%" startX={60} size={90} duration={18} delay={3} opacity={0.08} />
      <Cloud top="60%" startX={20} size={100} duration={20} delay={6} opacity={0.07} />
      <Cloud top="75%" startX={70} size={80} duration={16} delay={2} opacity={0.09} />

      {/* Golden sparkles */}
      {sparkles.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}

      {/* Floating bubbles */}
      {bubbles.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}

      {/* Sparkling hearts */}
      {sparkleHearts.map((h) => (
        <SparkleHeart key={h.id} {...h} />
      ))}

      {/* Cupid — only when requested */}
      {showCupid && (
        <>
          <Cupid position="right" />
        </>
      )}
    </div>
  );
}
