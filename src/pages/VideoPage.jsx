import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';

const formatTime = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

export default function VideoPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, pct)) * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden video-page-bg">

        {/* ═══ Cartoonish Clouds ═══ */}
        {[
          { top: '2%', left: '-3%', w: 280, h: 100, dur: 22, delay: 0 },
          { top: '6%', left: '20%', w: 180, h: 65, dur: 18, delay: 3 },
          { top: '3%', right: '-2%', w: 260, h: 95, dur: 24, delay: 2 },
          { top: '8%', right: '18%', w: 160, h: 58, dur: 20, delay: 5 },
          { top: '32%', left: '-4%', w: 220, h: 80, dur: 26, delay: 1 },
          { top: '38%', right: '-3%', w: 210, h: 78, dur: 25, delay: 4 },
          { top: '62%', left: '2%', w: 190, h: 70, dur: 28, delay: 6 },
          { top: '68%', right: '4%', w: 200, h: 72, dur: 27, delay: 2.5 },
        ].map((c, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute pointer-events-none"
            style={{ top: c.top, left: c.left, right: c.right, zIndex: 1 }}
            animate={{ x: [0, c.right ? -40 : 40, 0], y: [0, 8, 0] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          >
            <div className="relative" style={{ width: c.w, height: c.h }}>
              <div style={{ position: 'absolute', left: '0%', top: '30%', width: '45%', height: '70%', borderRadius: '50%', background: 'rgba(230,240,255,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.3)' }} />
              <div style={{ position: 'absolute', left: '20%', top: '0%', width: '55%', height: '85%', borderRadius: '50%', background: 'rgba(240,248,255,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.3)' }} />
              <div style={{ position: 'absolute', left: '45%', top: '25%', width: '50%', height: '75%', borderRadius: '50%', background: 'rgba(225,235,252,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.3)' }} />
            </div>
          </motion.div>
        ))}

        {/* ═══ Water bubble hearts jumping slowly ═══ */}
        {Array.from({ length: 14 }).map((_, i) => {
          const size = 22 + (i % 4) * 10;
          const left = 5 + (i * 7) % 90;
          const dur = 6 + (i % 5);
          const delay = (i * 0.7) % 5;
          return (
            <motion.div
              key={`bubble-${i}`}
              className="absolute pointer-events-none"
              style={{ left: `${left}%`, bottom: '-40px', zIndex: 2 }}
              animate={{
                y: [0, -200, -400, -600, -800],
                x: [0, 10, -10, 15, 0],
                opacity: [0, 0.8, 0.9, 0.6, 0],
                scale: [0.6, 1, 0.95, 1.05, 0.8],
              }}
              transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeOut' }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(186,222,255,0.5) 50%, rgba(147,197,253,0.25) 100%)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  boxShadow: 'inset -3px -3px 8px rgba(147,197,253,0.3), 0 2px 10px rgba(100,150,220,0.25)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span style={{ fontSize: size * 0.5, filter: 'drop-shadow(0 1px 2px rgba(255,107,157,0.3))' }}>
                  💗
                </span>
                {/* Bubble shine */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15%',
                    left: '20%',
                    width: '25%',
                    height: '25%',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.7)',
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-10 sm:py-14 max-w-4xl mx-auto">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-10"
          >
            <h1 className="font-love text-4xl sm:text-5xl md:text-7xl text-gray-800 mb-3">
              A Song For You 🎶
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg sm:text-xl md:text-2xl italic font-love-body"
            >
              Every moment with you feels like this song... {theme.heartEmoji}
            </motion.p>
          </motion.div>

          {/* Cute Audio Player */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
            className="w-full mb-6 sm:mb-8"
          >
            <div
              className="rounded-3xl shadow-2xl video-card p-6 sm:p-10 relative overflow-hidden transition-all duration-700"
              style={{
                background: theme.playerBg,
                border: theme.playerBorder,
              }}
            >
              {/* Floating background hearts inside player */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={`bg-h-${i}`}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    fontSize: `${14 + (i % 3) * 6}px`,
                    opacity: 0.25,
                  }}
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  {theme.heartEmoji}
                </motion.span>
              ))}

              <audio ref={audioRef} src="/images/Snehidhane.mp3" preload="metadata" />

              {/* Spinning disc + title */}
              <div className="flex flex-col items-center gap-4 sm:gap-5 relative z-10">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-2xl relative"
                  style={{ background: theme.playerDisc }}
                >
                  <div className="absolute inset-3 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-6 rounded-full border border-white/10" />
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/80 shadow-inner flex items-center justify-center">
                    <span className="text-xs">{theme.heartEmoji}</span>
                  </div>
                </motion.div>

                <div className="text-center">
                  <h3 className="font-love text-2xl sm:text-3xl text-gray-800">Snehidhane</h3>
                  <p className="text-gray-500 italic text-sm sm:text-base font-love-body">Our Song 🎶</p>
                </div>

                {/* Progress bar with moving heart */}
                <div className="w-full max-w-md mt-2">
                  <div
                    className="relative h-3 rounded-full cursor-pointer"
                    style={{ background: theme.playerProgressBg }}
                    onClick={handleSeek}
                  >
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${theme.playerProgressFrom}, ${theme.playerProgressTo})`,
                        boxShadow: `0 0 10px ${theme.playerProgressGlow}`,
                      }}
                    />
                    {/* Moving heart */}
                    <motion.div
                      className="absolute -top-4 pointer-events-none select-none"
                      style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                      animate={isPlaying ? { scale: [1, 1.25, 1], y: [0, -3, 0] } : { scale: 1 }}
                      transition={{ duration: 0.8, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
                    >
                      <span style={{ fontSize: '22px', filter: `drop-shadow(0 2px 4px ${theme.playerProgressGlow})` }}>
                        {theme.heartEmoji}
                      </span>
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500 font-love-body">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Cute Play/Pause button — heart shaped */}
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isPlaying ? { scale: [1, 1.08, 1] } : {}}
                  transition={isPlaying ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : {}}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer"
                  style={{ filter: `drop-shadow(0 6px 16px ${theme.playerBtnShadow})` }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {/* Heart background */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="heartBtn" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={theme.playerBtnFrom} />
                        <stop offset="100%" stopColor={theme.playerBtnTo} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 88 C20 65, 8 45, 8 30 C8 17, 20 8, 32 8 C40 8, 46 12, 50 20 C54 12, 60 8, 68 8 C80 8, 92 17, 92 30 C92 45, 80 65, 50 88 Z"
                      fill="url(#heartBtn)"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  </svg>
                  {/* Play/Pause icon */}
                  <span className="relative z-10 text-white" style={{ fontSize: '28px', marginTop: '-6px' }}>
                    {isPlaying ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" rx="1.5" />
                        <rect x="14" y="5" width="4" height="14" rx="1.5" />
                      </svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 5 L19 12 L7 19 Z" />
                      </svg>
                    )}
                  </span>
                </motion.button>

                {/* Music bars — animate when playing */}
                <div className="flex items-end gap-1 h-6">
                  {[0, 0.15, 0.08, 0.25, 0.12].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${theme.playerProgressFrom}, ${theme.playerProgressTo})` }}
                      animate={isPlaying ? { height: ['5px', '22px', '8px', '18px', '5px'] } : { height: '5px' }}
                      transition={isPlaying ? { duration: 1, repeat: Infinity, delay, ease: 'easeInOut' } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 mb-6 sm:mb-8 w-full max-w-md mx-auto"
          >
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-lg sm:text-xl font-love">Our Moments 💕</span>
            <div className="flex-1 h-px bg-gray-300" />
          </motion.div>

          {/* Memory Videos — Side by Side, full width */}
          <div className="w-full flex flex-col md:flex-row gap-5 sm:gap-6 mb-8 sm:mb-10">
            {/* Video 1 — Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
              className="w-full md:w-1/2"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative video-card h-full">
                <video
                  autoPlay muted loop playsInline controls
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                  style={{ minHeight: '280px' }}
                  src="/images/WhatsApp Video 2026-04-16 at 7.26.57 PM.mp4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-5 pointer-events-none rounded-b-2xl sm:rounded-b-3xl">
                  <p className="text-white font-love text-lg sm:text-xl drop-shadow-lg">
                    Our first laugh together 💫
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Video 2 — Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, type: 'spring', stiffness: 120 }}
              className="w-full md:w-1/2"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative video-card h-full">
                <video
                  autoPlay muted loop playsInline controls
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                  style={{ minHeight: '280px' }}
                  src="/images/WhatsApp Video 2026-04-16 at 7.27.17 PM.mp4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-5 pointer-events-none rounded-b-2xl sm:rounded-b-3xl">
                  <p className="text-white font-love text-lg sm:text-xl drop-shadow-lg">
                    The moment I knew it was you 💖
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.08, boxShadow: `0 8px 30px ${theme.btnGlow}` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/questions/1')}
            className={`px-10 sm:px-14 py-3.5 sm:py-4 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-lg sm:text-xl font-semibold shadow-xl cursor-pointer mb-8`}
          >
            Next {theme.heartEmoji}
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}
