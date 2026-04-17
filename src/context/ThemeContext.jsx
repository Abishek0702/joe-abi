import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeContext = createContext();

const themes = {
  green: {
    name: 'green',
    label: '💙 Blue',
    toggleBg: 'rgba(22,163,74,0.25)',
    // gradients
    heroOverlay: 'linear-gradient(180deg, rgba(20,83,45,0.4) 0%, rgba(6,95,70,0.25) 50%, rgba(20,83,45,0.5) 100%)',
    pageBg: 'linear-gradient(-45deg, rgba(187,247,208,0.6), rgba(209,250,229,0.5), rgba(255,255,255,0.55), rgba(167,243,208,0.4), rgba(220,252,231,0.5))',
    pageBgAlt: 'linear-gradient(-45deg, rgba(209,250,229,0.5), rgba(255,255,255,0.55), rgba(187,247,208,0.5), rgba(167,243,208,0.4))',
    reactionBg: 'linear-gradient(135deg, #059669 0%, #10b981 40%, #34d399 70%, #6ee7b7 100%)',
    finaleBg: 'linear-gradient(135deg, #047857 0%, #059669 35%, #10b981 65%, #34d399 100%)',
    galleryBg: 'linear-gradient(-45deg, rgba(187,247,208,0.5), rgba(209,250,229,0.45), rgba(255,255,255,0.55), rgba(167,243,208,0.35), rgba(220,252,231,0.45))',
    galleryScroll: 'linear-gradient(-45deg, rgba(187,247,208,0.45), rgba(255,255,255,0.55), rgba(209,250,229,0.4))',
    dreamOverlay: 'linear-gradient(135deg, rgba(20,83,45,0.45) 0%, rgba(6,95,70,0.5) 40%, rgba(4,120,87,0.45) 100%)',
    // song player
    playerBg: 'linear-gradient(135deg, #f0fff4 0%, #dcfce7 50%, #bbf7d0 100%)',
    playerBorder: '2px solid rgba(134,239,172,0.6)',
    playerDisc: 'radial-gradient(circle at 30% 30%, #34d399, #059669 60%, #064e3b)',
    playerBtnFrom: '#6ee7b7',
    playerBtnTo: '#059669',
    playerProgressBg: 'rgba(134,239,172,0.4)',
    playerProgressFrom: '#34d399',
    playerProgressTo: '#10b981',
    playerProgressGlow: 'rgba(16,185,129,0.6)',
    playerBtnShadow: 'rgba(16,185,129,0.5)',
    // buttons
    btnPrimary: 'from-green-500 to-emerald-600',
    btnPrimaryHover: 'from-green-600 to-emerald-700',
    btnGlow: 'rgba(22,163,74,0.5)',
    // cards
    cardBorder: 'border-green-200/50',
    cardOverlay: 'bg-green-900/60',
    cardShadow: '0 8px 32px rgba(22,163,74,0.15)',
    // accents
    accent: 'text-green-500',
    accentLight: 'text-green-400',
    accentBg: 'bg-green-400',
    dotActive: 'bg-green-500',
    dotInactive: 'bg-green-200',
    focusRing: 'focus:ring-green-300',
    // text colors (dark bg pages: valentine, dream, finale)
    textHeading: '#ffffff',
    textBody: 'rgba(255,255,255,0.85)',
    textMuted: 'rgba(255,255,255,0.5)',
    textHighlight: '#bbf7d0',    // light green
    textHighlightAlt: '#fde68a', // gold
    // text colors (light bg pages: questions, gallery, video)
    textHeadingLight: '#14532d',
    textBodyLight: '#166534',
    textMutedLight: '#4ade80',
    // warning card
    warningGradient: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #34d399 100%)',
    warningShadow: '0 0 30px rgba(22,163,74,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
    warningHoverShadow: '0 0 50px rgba(22,163,74,0.6)',
    warningBorder: 'border-green-300/40',
    textShimmer: ['#fff', '#bbf7d0', '#dcfce7', '#fff'],
    // emojis
    heartEmoji: '💚',
    heartEmojis: ['💚', '🌿', '🍀', '✨'],
    floatingEmojis: ['💚', '🌿', '🍀', '✨', '🦋', '💎'],
    confettiColors: ['#16a34a', '#22c55e', '#34d399', '#6ee7b7', '#bbf7d0', '#fbbf24', '#a78bfa'],
    sparkleEmojis: ['✨', '💚', '🌿', '⭐'],
    // quote card
    quoteCardBg: 'rgba(255,255,255,0.6)',
    quoteCardShadow: '0 8px 32px rgba(22,163,74,0.1)',
    // question flow bgs
    questionBgs: [
      'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 50%, #6ee7b7 100%)',
      'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)',
      'linear-gradient(135deg, #059669 0%, #34d399 50%, #10b981 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    ],
    questionEmojis: ['💚', '🌿', '🍀', '💎', '✨'],
    // theme transition color
    transitionColor: 'rgba(22,163,74,0.25)',
    transitionColors: ['rgba(22,163,74,0.6)', 'rgba(52,211,153,0.4)', 'rgba(110,231,183,0.3)'],
  },
  blue: {
    name: 'blue',
    label: '🌹 Rose',
    toggleBg: 'rgba(59,130,246,0.25)',
    // gradients
    heroOverlay: 'linear-gradient(180deg, rgba(30,64,175,0.4) 0%, rgba(14,116,144,0.25) 50%, rgba(30,64,175,0.5) 100%)',
    pageBg: 'linear-gradient(-45deg, rgba(186,230,253,0.6), rgba(147,197,253,0.45), rgba(255,255,255,0.55), rgba(96,165,250,0.3), rgba(219,234,254,0.5))',
    pageBgAlt: 'linear-gradient(-45deg, rgba(147,197,253,0.5), rgba(255,255,255,0.55), rgba(186,230,253,0.5), rgba(219,234,254,0.4))',
    reactionBg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 40%, #60a5fa 70%, #93c5fd 100%)',
    finaleBg: 'linear-gradient(135deg, #1e40af 0%, #2563eb 35%, #3b82f6 65%, #60a5fa 100%)',
    galleryBg: 'linear-gradient(-45deg, rgba(186,230,253,0.5), rgba(147,197,253,0.4), rgba(255,255,255,0.55), rgba(219,234,254,0.35), rgba(96,165,250,0.25))',
    galleryScroll: 'linear-gradient(-45deg, rgba(186,230,253,0.45), rgba(255,255,255,0.55), rgba(147,197,253,0.4))',
    dreamOverlay: 'linear-gradient(135deg, rgba(30,64,175,0.45) 0%, rgba(14,116,144,0.5) 40%, rgba(6,95,70,0.45) 100%)',
    // song player
    playerBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
    playerBorder: '2px solid rgba(147,197,253,0.6)',
    playerDisc: 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb 60%, #1e3a8a)',
    playerBtnFrom: '#93c5fd',
    playerBtnTo: '#2563eb',
    playerProgressBg: 'rgba(147,197,253,0.4)',
    playerProgressFrom: '#60a5fa',
    playerProgressTo: '#3b82f6',
    playerProgressGlow: 'rgba(59,130,246,0.6)',
    playerBtnShadow: 'rgba(59,130,246,0.5)',
    // buttons
    btnPrimary: 'from-blue-400 to-teal-400',
    btnPrimaryHover: 'from-blue-500 to-teal-500',
    btnGlow: 'rgba(59,130,246,0.5)',
    // cards
    cardBorder: 'border-blue-200/50',
    cardOverlay: 'bg-blue-900/60',
    cardShadow: '0 8px 32px rgba(59,130,246,0.15)',
    // accents
    accent: 'text-blue-500',
    accentLight: 'text-blue-400',
    accentBg: 'bg-blue-400',
    dotActive: 'bg-blue-400',
    dotInactive: 'bg-blue-200',
    focusRing: 'focus:ring-teal-300',
    // text colors (dark bg)
    textHeading: '#ffffff',
    textBody: 'rgba(255,255,255,0.85)',
    textMuted: 'rgba(255,255,255,0.5)',
    textHighlight: '#a5f3fc',    // light cyan
    textHighlightAlt: '#fde68a', // gold
    // text colors (light bg)
    textHeadingLight: '#1e3a5f',
    textBodyLight: '#1e40af',
    textMutedLight: '#60a5fa',
    // warning card
    warningGradient: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 50%, #10b981 100%)',
    warningShadow: '0 0 30px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
    warningHoverShadow: '0 0 50px rgba(59,130,246,0.5)',
    warningBorder: 'border-blue-300/40',
    textShimmer: ['#fff', '#bbf7d0', '#a5f3fc', '#fff'],
    // emojis
    heartEmoji: '💙',
    heartEmojis: ['💙', '💚', '🦋', '✨'],
    floatingEmojis: ['💙', '💚', '🦋', '✨', '💎', '⭐'],
    confettiColors: ['#60a5fa', '#34d399', '#2dd4bf', '#93c5fd', '#6ee7b7', '#a78bfa', '#fbbf24'],
    sparkleEmojis: ['✨', '💙', '💫', '⭐'],
    // quote card
    quoteCardBg: 'rgba(255,255,255,0.6)',
    quoteCardShadow: '0 8px 32px rgba(59,130,246,0.1)',
    // question flow bgs
    questionBgs: [
      'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #93c5fd 100%)',
      'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)',
      'linear-gradient(135deg, #2563eb 0%, #60a5fa 50%, #3b82f6 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
    ],
    questionEmojis: ['💙', '💚', '🦋', '💎', '✨'],
    transitionColor: 'rgba(59,130,246,0.25)',
    transitionColors: ['rgba(59,130,246,0.6)', 'rgba(96,165,250,0.4)', 'rgba(147,197,253,0.3)'],
  },
  rose: {
    name: 'rose',
    label: '🌿 Green',
    toggleBg: 'rgba(244,63,94,0.25)',
    // gradients
    heroOverlay: 'linear-gradient(180deg, rgba(136,19,55,0.4) 0%, rgba(190,18,60,0.25) 50%, rgba(136,19,55,0.5) 100%)',
    pageBg: 'linear-gradient(-45deg, rgba(254,205,211,0.6), rgba(253,164,175,0.4), rgba(255,255,255,0.55), rgba(251,113,133,0.25), rgba(255,228,225,0.5))',
    pageBgAlt: 'linear-gradient(-45deg, rgba(253,164,175,0.45), rgba(255,255,255,0.55), rgba(254,205,211,0.5), rgba(255,228,225,0.4))',
    reactionBg: 'linear-gradient(135deg, #be123c 0%, #e11d48 40%, #f43f5e 70%, #fb7185 100%)',
    finaleBg: 'linear-gradient(135deg, #9f1239 0%, #be123c 35%, #e11d48 65%, #f43f5e 100%)',
    galleryBg: 'linear-gradient(-45deg, rgba(254,205,211,0.5), rgba(253,164,175,0.35), rgba(255,255,255,0.55), rgba(255,228,225,0.4), rgba(251,113,133,0.2))',
    galleryScroll: 'linear-gradient(-45deg, rgba(254,205,211,0.45), rgba(255,255,255,0.55), rgba(255,228,225,0.4))',
    dreamOverlay: 'linear-gradient(135deg, rgba(190,18,60,0.45) 0%, rgba(136,19,55,0.5) 40%, rgba(88,28,135,0.4) 100%)',
    // song player
    playerBg: 'linear-gradient(135deg, #fff0f5 0%, #ffe4ec 50%, #ffd6e4 100%)',
    playerBorder: '2px solid rgba(255,182,193,0.6)',
    playerDisc: 'radial-gradient(circle at 30% 30%, #ff6b9d, #c2185b 60%, #1a1a2e)',
    playerBtnFrom: '#ff8fb1',
    playerBtnTo: '#ff3d7f',
    playerProgressBg: 'rgba(255,182,193,0.4)',
    playerProgressFrom: '#ff6b9d',
    playerProgressTo: '#ff4785',
    playerProgressGlow: 'rgba(255,107,157,0.6)',
    playerBtnShadow: 'rgba(255,107,157,0.5)',
    // buttons
    btnPrimary: 'from-rose-400 to-pink-500',
    btnPrimaryHover: 'from-rose-500 to-pink-600',
    btnGlow: 'rgba(244,63,94,0.5)',
    // cards
    cardBorder: 'border-rose-200/50',
    cardOverlay: 'bg-rose-900/60',
    cardShadow: '0 8px 32px rgba(244,63,94,0.15)',
    // accents
    accent: 'text-rose-500',
    accentLight: 'text-rose-400',
    accentBg: 'bg-rose-400',
    dotActive: 'bg-rose-500',
    dotInactive: 'bg-rose-200',
    focusRing: 'focus:ring-rose-300',
    // text colors (dark bg)
    textHeading: '#ffffff',
    textBody: 'rgba(255,255,255,0.85)',
    textMuted: 'rgba(255,255,255,0.5)',
    textHighlight: '#fecdd3',    // light pink
    textHighlightAlt: '#fde68a', // gold
    // text colors (light bg)
    textHeadingLight: '#881337',
    textBodyLight: '#9f1239',
    textMutedLight: '#fb7185',
    // warning card
    warningGradient: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)',
    warningShadow: '0 0 30px rgba(244,63,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
    warningHoverShadow: '0 0 50px rgba(244,63,94,0.6)',
    warningBorder: 'border-rose-300/40',
    textShimmer: ['#fff', '#fecdd3', '#ffe4e6', '#fff'],
    // emojis
    heartEmoji: '💖',
    heartEmojis: ['💖', '💗', '💕', '✨'],
    floatingEmojis: ['💖', '💗', '💕', '🌸', '✨', '🦋'],
    confettiColors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#f472b6', '#fbbf24', '#a78bfa'],
    sparkleEmojis: ['✨', '💖', '💫', '🌸'],
    // quote card
    quoteCardBg: 'rgba(255,255,255,0.6)',
    quoteCardShadow: '0 8px 32px rgba(244,63,94,0.1)',
    // question flow bgs
    questionBgs: [
      'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
      'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #fb7185 100%)',
      'linear-gradient(135deg, #9f1239 0%, #e11d48 50%, #f43f5e 100%)',
      'linear-gradient(135deg, #be123c 0%, #f43f5e 50%, #e11d48 100%)',
      'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)',
    ],
    questionEmojis: ['💖', '🌸', '💗', '💎', '✨'],
    transitionColor: 'rgba(244,63,94,0.25)',
    transitionColors: ['rgba(244,63,94,0.6)', 'rgba(251,113,133,0.4)', 'rgba(253,164,175,0.3)'],
  },
};

const themeOrder = ['green', 'blue', 'rose'];

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    try {
      return localStorage.getItem('valentine-theme') || 'green';
    } catch {
      return 'green';
    }
  });

  const [transitionPhase, setTransitionPhase] = useState(null); // null | 'burst' | 'glow'
  const [nextThemeName, setNextThemeName] = useState(null);

  const theme = themes[themeName];

  useEffect(() => {
    try {
      localStorage.setItem('valentine-theme', themeName);
    } catch {
      // ignore
    }
  }, [themeName]);

  const toggleTheme = () => {
    if (transitionPhase) return; // prevent double-click

    // Figure out next theme
    const currentIndex = themeOrder.indexOf(themeName);
    const next = themeOrder[(currentIndex + 1) % themeOrder.length];
    setNextThemeName(next);

    // Phase 1: burst from center
    setTransitionPhase('burst');

    // Phase 2: switch theme at peak
    setTimeout(() => {
      setThemeName(next);
      setTransitionPhase('glow');
    }, 400);

    // Phase 3: clear
    setTimeout(() => {
      setTransitionPhase(null);
      setNextThemeName(null);
    }, 1200);
  };

  // Get the transition colors of the NEXT theme for the burst
  const burstTheme = nextThemeName ? themes[nextThemeName] : theme;

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      <div className="theme-transition relative">
        {children}

        {/* ═══ Cinematic Center Bloom Transition ═══ */}
        <AnimatePresence>
          {transitionPhase && (
            <motion.div
              className="fixed inset-0 pointer-events-none"
              style={{ zIndex: 9999 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Main bloom burst — expands from center */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${burstTheme.transitionColors[0]} 0%, ${burstTheme.transitionColors[1]} 30%, ${burstTheme.transitionColors[2]} 55%, transparent 80%)`,
                  filter: 'blur(20px)',
                }}
                initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 0.9 }}
                animate={{ width: '300vmax', height: '300vmax', x: '-50%', y: '-50%', opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
              />

              {/* Inner bright core */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(255,255,255,0.6) 0%, ${burstTheme.transitionColors[0]} 30%, transparent 60%)`,
                  filter: 'blur(8px)',
                }}
                initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 1 }}
                animate={{ width: '120vmax', height: '120vmax', x: '-50%', y: '-50%', opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />

              {/* Floating hearts during transition */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dist = 120 + Math.random() * 80;
                return (
                  <motion.div
                    key={`t-heart-${i}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      fontSize: '18px',
                      pointerEvents: 'none',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.2, 0.5],
                    }}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                  >
                    {burstTheme.heartEmoji}
                  </motion.div>
                );
              })}

              {/* Soft screen flash */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at center, ${burstTheme.transitionColors[2]} 0%, transparent 60%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
