import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';

const sadGifs = [
  'https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyaGY3ZnYyaWVjaGhheGtqemhrODV5c2Rvc3N0eHFoMmloMm9hMWFyYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y4z9olnoVl5QI/200w.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyeDg0c3I3MmdyeWVibzExNHN1bGxwMXg3aTBtNDd5ZmxiaThxdzZiaSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W4RizlO6qZWQRYw9mb/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyb3N3b2d0dDJicjkyeWZvd3Z1bXo3dTE0dDh5c3V6ZXBiN3M4bnd4ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/w1Ywxx5NYjcAKz7M8j/200.gif',
  'https://i.pinimg.com/originals/f2/a1/0f/f2a10f848eb188c2bb8c7b5ccc886e5a.gif',
];

const sadQuotes = [
  "Please don't break my heart 💔",
  "I'll wait until you say yes... 🥺",
  "Even this panda is sad now 🐼💔",
  "My heart just cracked a little 😢",
  "You really gonna do this to me? 🥹",
  "The stars are crying for us... ✨💧",
  "Love doesn't give up that easily 💙",
  "One more chance? Pretty please? 🙏",
  "My code just threw a HeartbreakError 💔",
  "404: Happiness not found without you 😭",
];

const teaseMessages = [
  'Are you sure? 😏',
  'Think again 💕',
  'Nope, try again! 😜',
  "Can't escape love! 💘",
  'Wrong button da 😂',
  'Really?! 🥺',
];

export default function ValentineQuestion() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [noCount, setNoCount] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const [quote, setQuote] = useState('');
  const [showSadCard, setShowSadCard] = useState(false);
  const [noFixed, setNoFixed] = useState(false);
  const [noLeft, setNoLeft] = useState(0);
  const [noTop, setNoTop] = useState(0);
  const [teaseMsg, setTeaseMsg] = useState('');
  const noBtnRef = useRef(null);

  const yesScale = 1 + noCount * 0.2;

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const btnW = btn.offsetWidth || 140;
    const btnH = btn.offsetHeight || 48;
    const pad = 20;
    const maxX = window.innerWidth - btnW - pad;
    const maxY = window.innerHeight - btnH - pad;
    setNoLeft(pad + Math.random() * Math.max(0, maxX - pad));
    setNoTop(pad + Math.random() * Math.max(0, maxY - pad));
    setNoFixed(true);
    setTeaseMsg(teaseMessages[Math.floor(Math.random() * teaseMessages.length)]);
  }, []);

  const handleNo = useCallback(() => {
    setNoCount((c) => c + 1);
    setGifIndex((prev) => (prev + 1) % sadGifs.length);
    setQuote(sadQuotes[Math.floor(Math.random() * sadQuotes.length)]);
    setShowSadCard(true);
    moveNoButton();
  }, [moveNoButton]);

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        {/* ─── Background Video ─── */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://cdn.pixabay.com/video/2024/02/14/200543-912652498_large.mp4"
        />
        <div className="absolute inset-0 z-[1]" style={{ background: theme.dreamOverlay, backdropFilter: 'blur(2px)' }} />

        {/* ─── Main Content ─── */}
        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-3 sm:px-6 lg:px-12 py-6 sm:py-10 gap-5 sm:gap-8 lg:gap-16">

          {/* ─── LEFT: Romantic Image ─── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.04, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20"
              style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}
            >
              <img
                src="/images/WhatsApp Image 2026-04-16 at 7.26.15 PM.jpeg"
                alt="Our love"
                className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-5">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="font-love text-xl sm:text-2xl md:text-3xl italic"
                  style={{ color: theme.textBody }}
                >
                  &ldquo;Nee irundha podhum papu...&rdquo; 💕
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Question + Buttons ─── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-lg"
          >
           

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-love text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-8"
              style={{ color: theme.textHeading }}
            >
              Out of everyone,
                            <br />
              <span style={{ color: theme.textHighlight }}>I choose you… </span>,
              <br />
              will you choose me papu{' '}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                className="inline-block"
              >
                {theme.heartEmoji}
              </motion.span>
              {' '}?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-base sm:text-xl mb-4 sm:mb-6 italic"
              style={{ color: theme.textMuted }}
            >
              Choose wisely... 🥺
            </motion.p>

            {/* ─── Buttons ─── */}
            <div className="flex flex-row items-center gap-3 sm:gap-5">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: yesScale }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                whileHover={{ scale: yesScale * 1.08 }}
                whileTap={{ scale: yesScale * 0.92 }}
                onClick={() => navigate('/love-reaction')}
                className={`px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl cursor-pointer pulse-glow-${theme.name}`}
              >
                YES {theme.heartEmoji}
              </motion.button>

              <motion.button
                ref={noBtnRef}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  left: noFixed ? noLeft : undefined,
                  top: noFixed ? noTop : undefined,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onHoverStart={moveNoButton}
                onTouchStart={(e) => { e.preventDefault(); handleNo(); }}
                onClick={handleNo}
                style={noFixed ? { position: 'fixed', zIndex: 50 } : {}}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-md backdrop-blur-sm cursor-pointer transition-colors select-none touch-none"
              >
                NO 💔
              </motion.button>
            </div>

            {/* Tease message */}
            <AnimatePresence>
              {teaseMsg && noCount > 0 && (
                <motion.div
                  key={`tease-${noCount}`}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mt-3 sm:mt-4 bg-white/15 backdrop-blur-sm rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-md border border-white/20"
                >
                  <p className="text-sm sm:text-lg font-medium" style={{ color: theme.textBody }}>{teaseMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── Sad GIF Card ─── */}
        <AnimatePresence mode="wait">
          {showSadCard && (
            <motion.div
              key={`sad-${noCount}`}
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="fixed bottom-3 left-2 right-2 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 sm:w-[92%] sm:max-w-sm glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)' }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <img
                    src={sadGifs[gifIndex]}
                    alt="Sad reaction"
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shadow-lg border border-white/30"
                  />
                </motion.div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm sm:text-lg italic leading-snug"
                    style={{ color: theme.textBody }}
                  >
                    &ldquo;{quote}&rdquo;
                  </motion.p>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: theme.textMuted }}>
                    Attempt {noCount} {noCount > 3 ? '😭' : '🙈'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Water Bubble Heart — Background, right side ─── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ right: '18%', top: '15%', zIndex: 2, opacity: 0.4 }}
          animate={{
            y: [0, -20, 0, -12, 0],
            x: [0, 5, -3, 6, 0],
            scale: [1, 1.02, 0.98, 1.01, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 100 100" width="500" height="500">
            <defs>
              <radialGradient id="bubbleGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="35%" stopColor="rgba(200,220,255,0.2)" />
                <stop offset="60%" stopColor="rgba(180,210,255,0.1)" />
                <stop offset="100%" stopColor="rgba(160,200,255,0.03)" />
              </radialGradient>
              <radialGradient id="bubbleShine" cx="30%" cy="25%" r="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <path
              d="M50 90 C50 90 8 58 8 32 C8 16 18 6 34 6 C42 6 48 12 50 18 C52 12 58 6 66 6 C82 6 92 16 92 32 C92 58 50 90 50 90Z"
              fill="url(#bubbleGrad)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />
            <ellipse cx="34" cy="26" rx="14" ry="9" fill="url(#bubbleShine)" transform="rotate(-20, 34, 26)" />
            <circle cx="62" cy="38" r="4" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="50" cy="72" rx="18" ry="6" fill="rgba(255,255,255,0.06)" />
          </svg>
        </motion.div>

        {/* ─── Water Bubble Heart 2 — Smaller, right & below the big one ─── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ right: '10%', top: '38%', zIndex: 2, opacity: 0.4 }}
          animate={{
            y: [0, -12, 0, -8, 0],
            x: [0, -3, 2, -4, 0],
            scale: [1, 1.03, 0.97, 1.02, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <svg viewBox="0 0 100 100" width="380" height="380">
            <defs>
              <radialGradient id="bubbleGrad2" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="35%" stopColor="rgba(200,220,255,0.2)" />
                <stop offset="60%" stopColor="rgba(180,210,255,0.1)" />
                <stop offset="100%" stopColor="rgba(160,200,255,0.03)" />
              </radialGradient>
              <radialGradient id="bubbleShine2" cx="30%" cy="25%" r="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <path
              d="M50 90 C50 90 8 58 8 32 C8 16 18 6 34 6 C42 6 48 12 50 18 C52 12 58 6 66 6 C82 6 92 16 92 32 C92 58 50 90 50 90Z"
              fill="url(#bubbleGrad2)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />
            <ellipse cx="34" cy="26" rx="14" ry="9" fill="url(#bubbleShine2)" transform="rotate(-20, 34, 26)" />
            <circle cx="62" cy="38" r="4" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="50" cy="72" rx="18" ry="6" fill="rgba(255,255,255,0.06)" />
          </svg>
        </motion.div>

        {/* ─── Floating hearts ─── */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110vh', x: `${10 + Math.random() * 80}vw`, opacity: 0.6 }}
            animate={{ y: '-10vh', opacity: [0.6, 0.9, 0] }}
            transition={{ duration: 6 + Math.random() * 4, delay: Math.random() * 5, repeat: Infinity, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[2] text-base sm:text-xl md:text-2xl"
          >
            {['💕', '💖', '✨', '🌸', '💗', '💫', '🦋', '💝'][i]}
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
