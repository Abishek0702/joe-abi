import { motion } from 'framer-motion';

/**
 * Clouds with love arrows/rockets floating through them.
 * Use on specific pages only — not global.
 */
export default function CloudsWithArrows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* ─── Clouds ─── */}
      {[
        { top: '8%', left: '5%', size: 80, delay: 0, opacity: 0.2 },
        { top: '15%', right: '10%', size: 100, delay: 1, opacity: 0.15 },
        { top: '55%', left: '15%', size: 70, delay: 2, opacity: 0.12 },
        { top: '70%', right: '5%', size: 90, delay: 0.5, opacity: 0.18 },
        { top: '35%', left: '60%', size: 60, delay: 1.5, opacity: 0.14 },
      ].map((cloud, i) => (
        <motion.div
          key={`cloud-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: cloud.opacity, x: [0, 15, 0] }}
          transition={{ opacity: { delay: cloud.delay, duration: 2 }, x: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute"
          style={{ top: cloud.top, left: cloud.left, right: cloud.right }}
        >
          <div
            style={{ width: cloud.size, height: cloud.size * 0.5 }}
            className="rounded-full"
          >
            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm" style={{
              boxShadow: `0 0 ${cloud.size / 2}px rgba(255,255,255,0.1)`,
            }} />
          </div>
        </motion.div>
      ))}

      {/* ─── Love arrows flying through clouds ─── */}
      <motion.div
        initial={{ x: '-15vw', y: '20vh', rotate: -20 }}
        animate={{ x: '115vw', y: '15vh' }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut' }}
        className="absolute"
      >
        <span className="text-2xl sm:text-3xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255,105,135,0.5))' }}>💘</span>
      </motion.div>

      <motion.div
        initial={{ x: '115vw', y: '60vh', rotate: 160 }}
        animate={{ x: '-15vw', y: '55vh' }}
        transition={{ duration: 8, delay: 8, repeat: Infinity, repeatDelay: 14, ease: 'easeInOut' }}
        className="absolute"
      >
        <span className="text-xl sm:text-2xl" style={{ filter: 'drop-shadow(0 0 6px rgba(255,105,135,0.4))' }}>🏹</span>
      </motion.div>

      <motion.div
        initial={{ x: '-10vw', y: '40vh', rotate: -10 }}
        animate={{ x: '110vw', y: '35vh' }}
        transition={{ duration: 7, delay: 15, repeat: Infinity, repeatDelay: 18, ease: 'easeInOut' }}
        className="absolute"
      >
        <span className="text-lg sm:text-xl" style={{ filter: 'drop-shadow(0 0 6px rgba(255,105,135,0.4))' }}>💘</span>
      </motion.div>
    </div>
  );
}
