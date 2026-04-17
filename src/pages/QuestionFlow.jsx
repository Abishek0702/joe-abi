import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { romanticQuestions } from '../utils/quotes';
import { useValentine } from '../context/ValentineContext';
import { useTheme } from '../context/ThemeContext';
import DreamyBackground from '../components/DreamyBackground';

const DREAM_QUESTION_INDEX = romanticQuestions.length - 1; // last question

/* ═══════════════════════════════════════════════ */
/*                 LOVE PROGRESS BAR                */
/* ═══════════════════════════════════════════════ */
function LoveBar({ progress, total, theme, isBursting }) {
  const percent = isBursting ? 100 : Math.min(100, (progress / total) * 100);
  const fromColor = theme.playerProgressFrom || '#ff6b9d';
  const toColor = theme.playerProgressTo || '#ff4785';
  const glow = theme.playerProgressGlow || 'rgba(255,107,157,0.6)';

  return (
    <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 w-[88%] sm:w-[70%] max-w-md pointer-events-none">
      <div className="flex items-center gap-2 mb-1">
        <motion.span
          animate={{ scale: percent < 20 ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-base sm:text-lg select-none"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))' }}
        >
          💔
        </motion.span>

        <div
          className="flex-1 h-3 sm:h-3.5 rounded-full border border-white/40 relative overflow-visible backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: isBursting ? 0.6 : 1, ease: 'easeOut' }}
            className="h-full rounded-full relative"
            style={{
              background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
              boxShadow: `0 0 12px ${glow}, inset 0 1px 2px rgba(255,255,255,0.5)`,
            }}
          >
            {/* Moving cupid at tip */}
            <motion.img
              src="https://media.tenor.com/DB2Vd6YBbQAAAAAi/cupid.gif"
              alt="Cupid"
              animate={isBursting ? { scale: [1, 2, 0.5], opacity: [1, 1, 0] } : { scale: [1, 1.15, 1], y: [0, -3, 0] }}
              transition={isBursting ? { duration: 0.8, ease: 'easeOut' } : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute pointer-events-none select-none"
              style={{
                right: '-24px',
                top: '-22px',
                width: '44px',
                height: '44px',
                filter: `drop-shadow(0 2px 6px ${glow})`,
                transform: 'scaleX(-1)',
              }}
              draggable={false}
            />
          </motion.div>

          {/* Burst explosion — hearts flying out */}
          <AnimatePresence>
            {isBursting && Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2;
              const dist = 80 + Math.random() * 60;
              return (
                <motion.span
                  key={`burst-${i}`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: [0, 1, 0],
                    scale: [0, 1.4, 0.5],
                  }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.04, ease: 'easeOut' }}
                  className="absolute select-none"
                  style={{
                    right: '-10px',
                    top: '-4px',
                    fontSize: '22px',
                    filter: `drop-shadow(0 2px 4px ${glow})`,
                  }}
                >
                  {theme.heartEmoji}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.span
          animate={{ scale: percent >= 80 ? [1, 1.25, 1] : 1, rotate: percent >= 80 ? [0, -8, 8, 0] : 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-base sm:text-lg select-none"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))' }}
        >
          {theme.heartEmoji}
        </motion.span>
      </div>
      <motion.p
        animate={isBursting ? { scale: [1, 1.3, 1], opacity: [1, 1, 0.8] } : {}}
        transition={{ duration: 0.8 }}
        className="text-center text-xs sm:text-sm font-love italic"
        style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
      >
        {isBursting ? 'Love overflowing... 💥💖' : `Love Level — ${Math.round(percent)}%`}
      </motion.p>
    </div>
  );
}

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
  'Nope! 😜',
  "Can't escape love! 💘",
  'Wrong button da 😂',
  'Really?! 🥺',
];

/* ═══════════════════════════════════════════════ */
/*         DREAM MODE (special last question)      */
/* ═══════════════════════════════════════════════ */
function DreamMode({ onYes, onNo, noCount, gifIndex, quote, showSadCard, theme, teaseMsg, loveProgress, loveTotal, isBursting }) {
  const yesScale = 1 + noCount * 0.2;
  const noBtnRef = useRef(null);
  const [noFixed, setNoFixed] = useState(false);
  const [noLeft, setNoLeft] = useState(0);
  const [noTop, setNoTop] = useState(0);

  const moveNo = useCallback(() => {
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
  }, []);

  const handleNoClick = () => {
    onNo();
    moveNo();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ─── Background Video ─── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://cdn.pixabay.com/video/2024/02/14/200543-912652498_large.mp4"
      />
      <div className="absolute inset-0 z-[1]" style={{
        background: theme.dreamOverlay,
        backdropFilter: 'blur(2px)',
      }} />

      {/* ─── Floating hearts ─── */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${8 + Math.random() * 84}vw`, opacity: 0.5 }}
          animate={{ y: '-10vh', opacity: [0.5, 0.8, 0] }}
          transition={{ duration: 6 + Math.random() * 5, delay: Math.random() * 4, repeat: Infinity, ease: 'easeOut' }}
          className="fixed pointer-events-none z-[2] text-xl sm:text-2xl"
        >
          {[...theme.floatingEmojis, '👶', '🏠', '💍', '✨'][i % 10]}
        </motion.div>
      ))}

      {/* ─── Love Progress Bar ─── */}
      <LoveBar progress={loveProgress} total={loveTotal} theme={theme} isBursting={isBursting} />

      {/* ─── Main split layout ─── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-3 sm:px-6 lg:px-12 py-8 sm:py-16 gap-5 sm:gap-8 lg:gap-14">

        {/* LEFT: Romantic image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring' }}
          className="w-full max-w-[260px] sm:max-w-sm lg:max-w-md flex-shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white/20"
            style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${theme.btnGlow}` }}
          >
            <img
              src="/images/WhatsApp Image 2026-04-16 at 7.29.45 PM.jpeg"
              alt="Our love"
              className="w-full h-[220px] sm:h-[350px] lg:h-[450px] object-cover"
            />
            {/* Glow border animation */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 40px ${theme.btnGlow}` }}
            />
            {/* Bottom quote */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-5">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-white/90 font-love text-xl sm:text-2xl md:text-3xl italic"
              >
                &ldquo;Nee irundha podhum, en ulagam nee podhum papu enna...&rdquo; 💍
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Question + Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-lg"
        >
          {/* Special emoji */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="text-5xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4"
          >
            💍
          </motion.div>

          {/* Typewriter-style question — line by line */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="font-love text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed mb-3"
            style={{ color: theme.textHeading }}
          >
            Namma <motion.span
              animate={{ color: [theme.textHighlight, theme.textHighlightAlt, theme.textHighlight] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-bold"
            >life</motion.span> ah serndhu build pannalama?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-2"
            style={{ color: theme.textBody }}
          >
            <motion.span
              animate={{ color: [theme.textHighlightAlt, '#fbbf24', theme.textHighlightAlt] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-bold text-xl sm:text-2xl"
            >Nee naan</motion.span>, namakku nu oru veedu, adhula{' '}
            <motion.span
              animate={{ color: [theme.textHighlight, theme.textHighlightAlt, theme.textHighlight] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="font-bold"
            >love</motion.span> niraya irukkum...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8"
            style={{ color: theme.textBody }}
          >
            apram nammaloda oru cute{' '}
            <motion.span
              animate={{ scale: [1, 1.05, 1], color: [theme.textHighlight, theme.textHighlightAlt, theme.textHighlight] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-bold text-xl sm:text-2xl inline-block"
            >little princess</motion.span>{' '}
            <span style={{ color: theme.textHighlightAlt }}>(kutty papu)</span> oda innum azhagana vaazhkai? 👶💖
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ delay: 2, duration: 3, repeat: Infinity }}
            className="text-xl sm:text-2xl mb-6 italic"
            style={{ color: theme.textMuted }}
          >
            This is the most important question... 💍
          </motion.p>

          {/* Question counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="text-base sm:text-lg mb-5"
            style={{ color: theme.textMuted }}
          >
            Question {DREAM_QUESTION_INDEX + 1} of {romanticQuestions.length}
          </motion.p>

          {/* ─── Buttons ─── */}
          <div className="flex flex-row items-center gap-3 sm:gap-5">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: yesScale }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              whileHover={{ scale: yesScale * 1.08 }}
              whileTap={{ scale: yesScale * 0.92 }}
              onClick={onYes}
              className={`px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-lg cursor-pointer pulse-glow-${theme.name}`}
              style={{ boxShadow: `0 0 30px ${theme.btnGlow}` }}
            >
              YES 💍
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
              onHoverStart={moveNo}
              onTouchStart={(e) => { e.preventDefault(); handleNoClick(); }}
              onClick={handleNoClick}
              style={noFixed ? { position: 'fixed', zIndex: 50 } : {}}
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-md backdrop-blur-sm cursor-pointer transition-colors select-none touch-none"
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
                className="mt-4 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 shadow-md border border-white/20"
              >
                <p className="text-white/90 text-md font-medium">{teaseMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── Sad GIF Card (bottom center) ─── */}
      <AnimatePresence mode="wait">
        {showSadCard && (
          <motion.div
            key={`sad-${noCount}`}
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="fixed bottom-3 left-2 right-2 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 sm:w-[92%] sm:max-w-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20"
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
                <p className="text-white/90 text-sm sm:text-lg italic leading-snug">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-white/50 mt-1 text-xs sm:text-sm">
                  Attempt {noCount} {noCount > 3 ? '😭' : '🙈'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*         NORMAL MODE (questions 1-4)             */
/* ═══════════════════════════════════════════════ */
// Per-screen unique romantic elements
const screenEffects = [
  // Screen 1: Soft minimal — subtle floating hearts
  { emoji: '🤝', hearts: 6, sparkles: false, petals: false, glow: false, intensity: 'low' },
  // Screen 2: Heart pulse + sparkles
  { emoji: '☀️', hearts: 8, sparkles: true, petals: false, glow: false, intensity: 'medium' },
  // Screen 3: Romantic GIF / rotating heart + stronger effects
  { emoji: '⭐', hearts: 10, sparkles: true, petals: false, glow: true, intensity: 'medium' },
  // Screen 4: Falling rose petals + strong glow
  { emoji: '😂', hearts: 12, sparkles: true, petals: true, glow: true, intensity: 'high' },
];

function NormalMode({ questionIndex, question, onYes, onNo, noCount, gifIndex, quote, showSadCard, theme, loveProgress, loveTotal }) {
  const fx = screenEffects[questionIndex % screenEffects.length];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{ background: theme.questionBgs[questionIndex % theme.questionBgs.length] }}
    >

      <DreamyBackground showCupid={false} intensity={fx.intensity} />

      {/* ═══ Water Bubble Heart — Big, right side ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ right: '10%', top: '12%', zIndex: 2, opacity: 0.35 }}
        animate={{
          y: [0, -20, 0, -12, 0],
          x: [0, 5, -3, 6, 0],
          scale: [1, 1.02, 0.98, 1.01, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" width="420" height="420">
          <defs>
            <radialGradient id={`qBubbleGrad-${questionIndex}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="35%" stopColor="rgba(200,220,255,0.22)" />
              <stop offset="60%" stopColor="rgba(180,210,255,0.12)" />
              <stop offset="100%" stopColor="rgba(160,200,255,0.04)" />
            </radialGradient>
            <radialGradient id={`qBubbleShine-${questionIndex}`} cx="30%" cy="25%" r="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <path
            d="M50 90 C50 90 8 58 8 32 C8 16 18 6 34 6 C42 6 48 12 50 18 C52 12 58 6 66 6 C82 6 92 16 92 32 C92 58 50 90 50 90Z"
            fill={`url(#qBubbleGrad-${questionIndex})`}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.8"
          />
          <ellipse cx="34" cy="26" rx="14" ry="9" fill={`url(#qBubbleShine-${questionIndex})`} transform="rotate(-20, 34, 26)" />
          <circle cx="62" cy="38" r="4" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="50" cy="72" rx="18" ry="6" fill="rgba(255,255,255,0.08)" />
        </svg>
      </motion.div>

      {/* ═══ Water Bubble Heart — Smaller, left side ═══ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: '6%', top: '35%', zIndex: 2, opacity: 0.3 }}
        animate={{
          y: [0, -14, 0, -8, 0],
          x: [0, -3, 2, -4, 0],
          scale: [1, 1.03, 0.97, 1.02, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg viewBox="0 0 100 100" width="280" height="280">
          <defs>
            <radialGradient id={`qBubbleGrad2-${questionIndex}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="35%" stopColor="rgba(200,220,255,0.22)" />
              <stop offset="60%" stopColor="rgba(180,210,255,0.12)" />
              <stop offset="100%" stopColor="rgba(160,200,255,0.04)" />
            </radialGradient>
            <radialGradient id={`qBubbleShine2-${questionIndex}`} cx="30%" cy="25%" r="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <path
            d="M50 90 C50 90 8 58 8 32 C8 16 18 6 34 6 C42 6 48 12 50 18 C52 12 58 6 66 6 C82 6 92 16 92 32 C92 58 50 90 50 90Z"
            fill={`url(#qBubbleGrad2-${questionIndex})`}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.8"
          />
          <ellipse cx="34" cy="26" rx="14" ry="9" fill={`url(#qBubbleShine2-${questionIndex})`} transform="rotate(-20, 34, 26)" />
          <circle cx="62" cy="38" r="4" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="50" cy="72" rx="18" ry="6" fill="rgba(255,255,255,0.08)" />
        </svg>
      </motion.div>

      {/* ═══ Floating Hearts (amount increases per screen) ═══ */}
      {Array.from({ length: fx.hearts }).map((_, i) => (
        <motion.div
          key={`fh-${i}`}
          className="absolute pointer-events-none"
          style={{ left: `${5 + Math.random() * 90}%`, bottom: '-20px', zIndex: 1 }}
          animate={{ y: [0, -window.innerHeight - 50], opacity: [0.5, 0.8, 0] }}
          transition={{
            duration: 5 + Math.random() * 4,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <span style={{ fontSize: `${14 + Math.random() * 12}px` }}>
            {theme.heartEmojis[i % theme.heartEmojis.length]}
          </span>
        </motion.div>
      ))}

      {/* ═══ Screen 2+: Sparkles ═══ */}
      {fx.sparkles && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, zIndex: 1 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: Math.random() * 4,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 3,
          }}
        >
          <span style={{ fontSize: `${10 + Math.random() * 10}px` }}>✨</span>
        </motion.div>
      ))}

      {/* ═══ Screen 3+: Background glow pulse ═══ */}
      {fx.glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{
            width: '100%', height: '100%',
            background: `radial-gradient(circle at 50% 50%, ${theme.btnGlow} 0%, transparent 60%)`,
          }} />
        </motion.div>
      )}

      {/* ═══ Screen 4: Falling rose petals ═══ */}
      {fx.petals && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: '-30px', zIndex: 1 }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span style={{ fontSize: `${12 + Math.random() * 10}px`, opacity: 0.5 + Math.random() * 0.3 }}>🌹</span>
        </motion.div>
      ))}

      {/* Love Progress Bar */}
      <LoveBar progress={loveProgress} total={loveTotal} theme={theme} isBursting={false} />

      {/* Main emoji — with heartbeat on screen 2+ */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={
          questionIndex >= 1
            ? { scale: [1, 1.15, 1, 1.1, 1], rotate: 0 }
            : { scale: 1, rotate: 0 }
        }
        transition={
          questionIndex >= 1
            ? { scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { type: 'spring', stiffness: 200 } }
            : { type: 'spring', stiffness: 200 }
        }
        className="text-4xl sm:text-6xl md:text-8xl mb-3 sm:mb-6"
        style={fx.glow ? { filter: `drop-shadow(0 0 15px ${theme.btnGlow})` } : {}}
      >
        {fx.emoji}
      </motion.div>

      {/* Question text — different animation per screen */}
      <motion.h1
        key={question}
        initial={
          questionIndex === 0 ? { opacity: 0, y: 30 } :
          questionIndex === 1 ? { opacity: 0, x: 50 } :
          questionIndex === 2 ? { opacity: 0, scale: 0.8 } :
          { opacity: 0, y: -30, scale: 0.9 }
        }
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
        className="font-love text-xl sm:text-3xl md:text-5xl text-center mb-3 max-w-xl px-2"
        style={{ color: '#ffffff', textShadow: '0 2px 15px rgba(0,0,0,0.3)' }}
      >
        {question}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8 sm:mb-10 text-md"
        style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
      >
        Question {questionIndex + 1} of {romanticQuestions.length}
      </motion.p>

      <div className="flex flex-row gap-3 sm:gap-6 relative z-10">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${theme.btnGlow}` }}
          whileTap={{ scale: 0.9 }}
          onClick={onYes}
          className={`px-6 sm:px-10 py-2.5 sm:py-4 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-base sm:text-xl font-semibold shadow-lg cursor-pointer pulse-glow-${theme.name}`}
        >
          YES {theme.heartEmoji}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 0.95 }}
          whileTap={{
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.4 },
          }}
          onClick={onNo}
          className="px-6 sm:px-10 py-2.5 sm:py-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full text-base sm:text-xl font-semibold shadow-md backdrop-blur-sm cursor-pointer transition-colors"
        >
          NO 💔
        </motion.button>
      </div>

      {/* Sad GIF + Quote Card */}
      <AnimatePresence mode="wait">
        {showSadCard && (
          <motion.div
            key={`sad-${noCount}`}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="mt-8 sm:mt-10 w-full max-w-sm rounded-3xl p-5 sm:p-6 shadow-xl border border-white/20"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-center mb-4"
            >
              <img
                src={sadGifs[gifIndex]}
                alt="Sad reaction"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover shadow-lg border-2 border-white/40"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg italic text-center"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              &ldquo;{quote}&rdquo;
            </motion.p>
            <p className="mt-3 text-sm sm:text-lg text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Attempts: {noCount} {noCount > 3 ? '😭' : '🙈'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*        "SHE SAID YES" PROPOSAL SCENE            */
/* ═══════════════════════════════════════════════ */
const floatingMemories = [
  'Our first chat 💬', 'Our memories 📸', 'Our future 💍',
  'First smile 😊', 'Every hug 🤗', 'Our dreams 🌙',
  'Always together 💑', 'Our home 🏠',
];

function ProposalScene({ theme, onReplay, onContinue }) {
  const [phase, setPhase] = useState('buildup'); // buildup | reveal
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 7000);
    return () => clearTimeout(timer);
  }, []);

  // confetti — burst from center + fall
  const confetti = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 70;
      const speed = 150 + Math.random() * 200;
      return {
        id: i,
        startX: Math.cos(angle) * speed,
        startY: Math.sin(angle) * speed,
        color: theme.confettiColors[Math.floor(Math.random() * theme.confettiColors.length)],
        size: Math.random() * 10 + 4,
        duration: Math.random() * 2 + 2,
        isHeart: i % 5 === 0,
      };
    }),
  [theme.confettiColors]);

  // floating hearts
  const hearts = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 22,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      emoji: theme.heartEmojis[i % theme.heartEmojis.length],
    })),
  [theme.heartEmojis]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
    >
      {/* ─── PHASE 1: Build-up (dark screen + text) ─── */}
      <AnimatePresence>
        {phase === 'buildup' && (
          <motion.div
            key="buildup"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black"
          >
            <div className="absolute inset-0 heartbeat" style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            }} />

            <div className="text-center px-8">
              {[
                { text: 'From this moment...', delay: 0.5 },
                { text: 'You & Me...', delay: 2.5 },
                { text: 'Forever ❤️', delay: 4.5 },
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [30, 0, 0, -20] }}
                  transition={{ delay: line.delay, duration: 2, times: [0, 0.2, 0.7, 1] }}
                  className="font-love text-xl sm:text-3xl md:text-5xl text-white/90 font-light mb-3 sm:mb-4"
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: Main reveal ─── */}
      {phase === 'reveal' && (
        <>
          {/* Background gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{ background: theme.finaleBg }}
          />

          {/* Cupid shooting arrow — top right, aiming at YES */}
          <motion.img
            src="https://media.tenor.com/DB2Vd6YBbQAAAAAi/cupid.gif"
            alt="Cupid"
            className="absolute pointer-events-none"
            style={{ top: '2%', right: '2%', width: '180px', height: '180px', zIndex: 5, transform: 'scaleX(-1)' }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.8, duration: 0.5 },
              x: { delay: 0.8, duration: 0.6, type: 'spring' },
              y: { delay: 1.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Heartbeat pulse on background */}
          <div
            className="absolute inset-0 heartbeat"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
          />

          {/* Confetti burst from center */}
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: '50vw', y: '50vh', opacity: 1, scale: 0 }}
              animate={{
                x: `calc(50vw + ${p.startX}px)`,
                y: `calc(50vh + ${p.startY}px + 100vh)`,
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0.5],
                rotate: Math.random() * 720,
              }}
              transition={{ duration: p.duration + 1, delay: Math.random() * 0.5, ease: 'easeOut' }}
              className="absolute pointer-events-none"
              style={{ zIndex: 2 }}
            >
              {p.isHeart ? (
                <span style={{ fontSize: p.size + 6 }}>
                  {theme.heartEmojis[p.id % theme.heartEmojis.length]}
                </span>
              ) : (
                <div style={{
                  width: p.size, height: p.size,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  backgroundColor: p.color,
                }} />
              )}
            </motion.div>
          ))}

          {/* Floating hearts */}
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: '110vh', x: `${h.x}vw`, opacity: 0.6 }}
              animate={{ y: '-10vh', opacity: [0.6, 1, 0] }}
              transition={{ duration: h.duration, delay: h.delay + 1, ease: 'easeOut', repeat: Infinity }}
              style={{ position: 'absolute', fontSize: h.size, zIndex: 1 }}
            >
              {h.emoji}
            </motion.div>
          ))}

          {/* Floating memory texts */}
          {floatingMemories.map((mem, i) => (
            <motion.div
              key={i}
              initial={{ y: '110vh', x: `${10 + (i * 10) % 80}vw`, opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 10 + Math.random() * 5, delay: 3 + i * 1.5, ease: 'linear', repeat: Infinity }}
              className="absolute pointer-events-none z-[1]"
            >
              <span className="text-white/25 text-md sm:text-base font-light italic whitespace-nowrap">
                {mem}
              </span>
            </motion.div>
          ))}

          {/* ─── Main content ─── */}
          <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-lg py-6 sm:py-10" style={{ maxHeight: '100vh' }}>
            {/* Ring emoji burst */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: [0, 1.8, 1], rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 120 }}
              className="text-6xl sm:text-8xl md:text-[120px] mb-3 sm:mb-4"
            >
              💍
            </motion.div>

            {/* She said YES */}
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
              className="font-love text-5xl sm:text-7xl md:text-9xl font-bold mb-3 whitespace-nowrap"
              style={{ color: theme.textHeadingLight, textShadow: '0 2px 20px rgba(255,255,255,0.5)' }}
            >
              She said{' '}
              <motion.span
                animate={{ scale: [1, 1.15, 1], color: [theme.textHighlight, theme.textHighlightAlt, theme.textHighlight] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
                style={{ textShadow: `0 0 30px ${theme.btnGlow}` }}
              >
                YES
              </motion.span>{' '}
              {theme.heartEmoji}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-xl sm:text-3xl md:text-4xl font-semibold mb-3"
              style={{ color: theme.textBodyLight, textShadow: '0 1px 10px rgba(255,255,255,0.4)' }}
            >
              Our forever starts now 💍
            </motion.p>

            {/* Final romantic line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 1] }}
              transition={{ delay: 2 }}
              className="text-lg sm:text-xl md:text-2xl italic mb-6 font-medium"
              style={{ color: '#ffffff', textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}
            >
              Now say it to me in real life... I&apos;m waiting 💖
            </motion.p>

            {/* Photo card with floating + glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, type: 'spring', stiffness: 120 }}
              className="mx-auto mb-5 sm:mb-6 relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
            >
              {/* Glow ring */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: `0 0 50px ${theme.btnGlow}, 0 0 100px ${theme.btnGlow}` }}
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-white/40 shadow-2xl relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80"
                  alt="Us"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Read my heart button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: `0 0 25px ${theme.btnGlow}` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLetter(true)}
                className={`px-8 py-3 bg-white/30 hover:bg-white/40 rounded-full text-lg sm:text-xl font-medium backdrop-blur-sm border border-white/40 cursor-pointer transition-all mb-6 shadow-md`}
                style={{ color: theme.textHeadingLight }}
              >
                Read my heart 💌
              </motion.button>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
              className="flex flex-col sm:flex-row gap-3 items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className={`px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-lg sm:text-xl font-semibold shadow-lg cursor-pointer`}
              >
                Continue Our Story 💕
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                className="px-8 sm:px-10 py-3 sm:py-4 bg-white/30 hover:bg-white/40 rounded-full text-lg sm:text-xl font-medium backdrop-blur-sm border border-white/40 cursor-pointer transition-colors shadow-md"
                style={{ color: theme.textHeadingLight }}
              >
                Replay Our Story 🔄
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2 }}
              className="mt-6 text-base sm:text-xl font-medium"
              style={{ color: theme.textMutedLight }}
            >
              Made with {theme.heartEmoji} by Abi for Joe
            </motion.p>
          </div>

          {/* ─── Love Letter Modal ─── */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[98] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                onClick={() => setShowLetter(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 0 40px ${theme.btnGlow}`,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl text-center mb-4"
                  >
                    💌
                  </motion.div>
                  <p className="font-love text-xl sm:text-2xl md:text-3xl italic leading-relaxed text-center mb-3" style={{ color: theme.textBody }}>
                    Un kooda life share panna chance kidaichadhu na romba lucky ah feel panre...Enna epovum vitratha papu....
                  </p>
                  <p className="text-center text-lg sm:text-xl md:text-2xl mb-4" style={{ color: theme.textBody }}>
                    Nee en valentine ah irukkura varaikkum, en ulagam azhaga irukkum. I love you, papu. 💖
                  </p>
                  <p className="text-center text-base sm:text-lg italic" style={{ color: theme.textMuted }}>
                    - with all my love, Abi 💍
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLetter(false)}
                    className="mt-5 mx-auto block px-6 py-2 bg-white/15 hover:bg-white/25 text-white rounded-full text-md border border-white/30 cursor-pointer transition-colors"
                  >
                    Close 💕
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════ */
/*              MAIN COMPONENT                     */
/* ═══════════════════════════════════════════════ */
export default function QuestionFlow() {
  const { id } = useParams();
  const questionIndex = parseInt(id, 10) - 1;
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [quote, setQuote] = useState('');
  const [noCount, setNoCount] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const [showSadCard, setShowSadCard] = useState(false);
  const [teaseMsg, setTeaseMsg] = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const [isBursting, setIsBursting] = useState(false);
  const { setLastQuote } = useValentine();

  const question = romanticQuestions[questionIndex];
  const isLast = questionIndex >= romanticQuestions.length - 1;
  const isDreamMode = questionIndex === DREAM_QUESTION_INDEX;
  const loveTotal = romanticQuestions.length;
  const loveProgress = questionIndex + 1;

  const handleYes = () => {
    setLastQuote(quote || question);
    if (isLast) {
      // Fill bar to 100% + burst, then show proposal scene
      setIsBursting(true);
      setTimeout(() => setShowProposal(true), 1500);
    } else {
      navigate(`/questions/${questionIndex + 2}`);
    }
  };

  const handleNo = () => {
    setNoCount((c) => c + 1);
    setGifIndex((prev) => (prev + 1) % sadGifs.length);
    const newQuote = sadQuotes[Math.floor(Math.random() * sadQuotes.length)];
    setQuote(newQuote);
    setLastQuote(newQuote);
    setShowSadCard(true);
    setTeaseMsg(teaseMessages[Math.floor(Math.random() * teaseMessages.length)]);
  };

  return (
    <PageTransition>
      <AnimatePresence mode="wait">
        {showProposal ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProposalScene
              theme={theme}
              onContinue={() => navigate('/finale')}
              onReplay={() => { window.location.href = '/'; }}
            />
          </motion.div>
        ) : isDreamMode ? (
          <motion.div
            key="dream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <DreamMode
              onYes={handleYes}
              onNo={handleNo}
              noCount={noCount}
              gifIndex={gifIndex}
              quote={quote}
              showSadCard={showSadCard}
              theme={theme}
              teaseMsg={teaseMsg}
              loveProgress={loveProgress}
              loveTotal={loveTotal}
              isBursting={isBursting}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`q-${questionIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NormalMode
              questionIndex={questionIndex}
              question={question}
              onYes={handleYes}
              onNo={handleNo}
              noCount={noCount}
              gifIndex={gifIndex}
              quote={quote}
              showSadCard={showSadCard}
              theme={theme}
              loveProgress={loveProgress}
              loveTotal={loveTotal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
