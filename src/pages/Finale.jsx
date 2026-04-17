import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useValentine } from '../context/ValentineContext';
import { useTheme } from '../context/ThemeContext';
import { sendValentineEmail } from '../utils/emailService';

// ─── predefined recipient emails ───
const AUTO_SEND_EMAILS = [
  'abishekkavya0717@gmail.com',
  'joelkavya@gmail.com',
];

/* ─── confetti ─── */
function Confetti({ colors }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    setPieces(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
      }))
    );
  }, [colors]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

/* ─── sparkle burst ─── */
function Sparkles({ emojis }) {
  const sparkles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (360 / 24) * i,
    distance: 50 + Math.random() * 60,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
            y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
          className="absolute"
        >
          <span style={{ fontSize: s.size }}>
            {emojis[s.id % emojis.length]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── floating hearts on success ─── */
function SuccessHearts({ emojis }) {
  const hearts = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 14 + Math.random() * 18,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', x: `${h.x}vw`, opacity: 0.8 }}
          animate={{ y: '-10vh', opacity: [0.8, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut', repeat: Infinity }}
          style={{ position: 'absolute', fontSize: h.size }}
        >
          {emojis[h.id % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── pulsing heart loader ─── */
function HeartLoader() {
  return (
    <motion.div
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="text-5xl sm:text-6xl"
    >
      💌
    </motion.div>
  );
}

/* ═══════════════════════════════════════ */
/*                FINALE                   */
/* ═══════════════════════════════════════ */
export default function Finale() {
  const { lastQuote, selectedImage, setEmailSent } = useValentine();
  const { theme } = useTheme();

  // auto-send state
  const [autoStatus, setAutoStatus] = useState('sending');
  const hasSentRef = useRef(false);

  // send-again state
  const [extraEmail, setExtraEmail] = useState('');
  const [extraStatus, setExtraStatus] = useState('idle');
  const inputRef = useRef(null);

  // pick fallback image / quote
  const image = useMemo(
    () => selectedImage || { url: '/images/WhatsApp Image 2026-04-16 at 7.28.51 PM.jpeg', tag: '#Happiness' },
    [selectedImage]
  );
  const quote = lastQuote || 'Every love story is beautiful, but ours is my favorite.';

  // ─── auto-send on mount ───
  useEffect(() => {
    if (hasSentRef.current) return;
    hasSentRef.current = true;

    const payload = {
      loveQuote: quote,
      imageUrl: image.url,
      imageTag: image.tag,
      message: 'You are my forever valentine. Every YES brought us closer to forever.',
    };

    Promise.all(
      AUTO_SEND_EMAILS.map((email) =>
        sendValentineEmail({ ...payload, toEmail: email })
      )
    )
      .then(() => {
        setAutoStatus('success');
        setEmailSent(true);
      })
      .catch((err) => {
        console.error('Auto-send failed:', err);
        setAutoStatus('error');
      });
  }, [quote, image, setEmailSent]);

  // ─── retry auto-send ───
  const retryAutoSend = () => {
    setAutoStatus('sending');
    hasSentRef.current = false;
    const payload = {
      loveQuote: quote,
      imageUrl: image.url,
      imageTag: image.tag,
      message: 'You are my forever valentine. Every YES brought us closer to forever.',
    };
    Promise.all(
      AUTO_SEND_EMAILS.map((email) =>
        sendValentineEmail({ ...payload, toEmail: email })
      )
    )
      .then(() => {
        setAutoStatus('success');
        setEmailSent(true);
      })
      .catch(() => setAutoStatus('error'));
  };

  // ─── send to another email ───
  const handleSendAnother = async (e) => {
    e.preventDefault();
    if (!extraEmail.trim()) return;
    setExtraStatus('sending');
    try {
      await sendValentineEmail({
        toEmail: extraEmail.trim(),
        loveQuote: quote,
        imageUrl: image.url,
        imageTag: image.tag,
        message: 'You are my forever valentine. Every YES brought us closer to forever.',
      });
      setExtraStatus('success');
    } catch {
      setExtraStatus('error');
    }
  };

  const handleStartOver = () => {
    window.location.href = '/';
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden" style={{ background: theme.finaleBg }}>
        <Confetti colors={theme.confettiColors} />
        {autoStatus === 'success' && <SuccessHearts emojis={theme.heartEmojis} />}

        <div className="relative z-10 text-center w-full max-w-lg">
          {/* ─── sending state ─── */}
          <AnimatePresence mode="wait">
            {autoStatus === 'sending' && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-4 mb-8"
              >
                <HeartLoader />
                <p className="text-white text-2xl sm:text-3xl font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Sending your love story...
                </p>
                <p className="text-white text-lg sm:text-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                  Delivering to {AUTO_SEND_EMAILS.length} hearts
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── error state ─── */}
          <AnimatePresence>
            {autoStatus === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-8 bg-red-500/20 backdrop-blur-sm border border-red-300/40 rounded-2xl p-5 sm:p-6"
              >
                <p className="text-white text-lg mb-2">Oops, something went wrong</p>
                <p className="text-white/70 text-md mb-4">
                  The love letter couldn&apos;t be delivered. Let&apos;s try again.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={retryAutoSend}
                  className="px-6 py-2.5 bg-white/30 hover:bg-white/40 text-white rounded-full border border-white/30 transition-colors cursor-pointer text-md sm:text-base"
                >
                  Retry Sending
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── success content ─── */}
          {autoStatus === 'success' && (
            <>
              {/* heart icon with sparkles */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 1, type: 'spring' }}
                className="text-6xl sm:text-8xl md:text-[120px] mb-3 sm:mb-6 relative inline-block"
              >
                {theme.heartEmoji}
                <Sparkles emojis={theme.sparkleEmojis} />
              </motion.div>

              {/* title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-love text-4xl sm:text-6xl md:text-8xl text-white font-bold drop-shadow-lg mb-3"
              >
                Forever Yours
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/90 text-lg sm:text-2xl md:text-3xl max-w-lg mx-auto leading-relaxed px-2"
              >
                Thank you for being my everything,{' '}
                <motion.span
                  animate={{ color: [theme.textHighlight, theme.textHighlightAlt, theme.textHighlight] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="font-bold text-2xl sm:text-3xl md:text-4xl font-love italic"
                  style={{ textShadow: `0 0 15px ${theme.btnGlow}` }}
                >
                  Papu
                </motion.span>
                .
                <br />
                Every moment with you is a gift I never want to stop unwrapping.
              </motion.p>

              {/* ─── warning: too much love card ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.03, boxShadow: theme.warningHoverShadow }}
                className={`mt-6 relative overflow-hidden rounded-3xl p-5 sm:p-7 ${theme.warningBorder} cursor-default love-warning-card-${theme.name}`}
                style={{
                  background: theme.warningGradient,
                  boxShadow: theme.warningShadow,
                }}
              >
                {/* shimmer overlay */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                    width: '40%',
                  }}
                />

                {/* panda kiss GIF */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-3"
                >
                  <img
                    src="https://i.pinimg.com/originals/18/e9/34/18e934afe314e86a4a646e614febf0f9.gif"
                    alt="Panda kiss"
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover shadow-lg border-2 border-white/50"
                  />
                </motion.div>

                {/* blinking warning emoji */}
                <motion.div
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-3xl sm:text-4xl mb-2"
                >
                  ⚠️
                </motion.div>

                {/* animated warning text */}
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className="font-semibold text-lg sm:text-xl md:text-2xl text-white drop-shadow-md"
                >
                  Warning:{' '}
                  <motion.span
                    animate={{ color: theme.textShimmer }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-bold text-xl sm:text-2xl md:text-3xl"
                    style={{ textShadow: '0 0 12px rgba(255,255,255,0.6)' }}
                  >
                    Too much love
                  </motion.span>{' '}
                  detected 💘
                </motion.p>
              </motion.div>

              {/* ─── send to another email ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-8"
              >
                <AnimatePresence mode="wait">
                  {extraStatus === 'success' ? (
                    <motion.div
                      key="extra-success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-300/40 rounded-2xl p-4 mb-4"
                    >
                      <p className="text-white font-semibold text-lg sm:text-xl">Sent to {extraEmail}!</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setExtraEmail('');
                          setExtraStatus('idle');
                        }}
                        className="mt-3 px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-md border border-white/20 transition-colors cursor-pointer"
                      >
                        Send to Someone Else
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="extra-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSendAnother}
                    >
                      <p className="text-white text-lg sm:text-xl mb-3" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                        Send this memory to another email:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          ref={inputRef}
                          type="email"
                          required
                          value={extraEmail}
                          onChange={(e) => setExtraEmail(e.target.value)}
                          placeholder="their@email.com"
                          className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 ${theme.focusRing} transition-all text-sm sm:text-lg`}
                        />
                        <motion.button
                          type="submit"
                          disabled={extraStatus === 'sending'}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full font-semibold shadow-lg disabled:opacity-60 cursor-pointer transition-all text-sm sm:text-lg whitespace-nowrap`}
                        >
                          {extraStatus === 'sending' ? (
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block"
                            >
                              💌
                            </motion.span>
                          ) : (
                            'Send Again 💌'
                          )}
                        </motion.button>
                      </div>
                      {extraStatus === 'error' && (
                        <p className="text-red-200 text-md mt-2">
                          Failed to send. Please try again.
                        </p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ─── footer ─── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="mt-8 text-white/70 text-sm sm:text-lg"
              >
                Made with {theme.heartEmoji} by Abi for Joe
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartOver}
                className="mt-4 mb-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/30 hover:bg-white/40 text-white rounded-full text-md sm:text-lg backdrop-blur-sm border border-white/30 transition-colors cursor-pointer"
              >
                Start Over 🔄
              </motion.button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
