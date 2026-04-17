import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useTheme } from '../context/ThemeContext';

export default function VideoPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden video-page-bg">

        {/* Floating hearts background */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${5 + Math.random() * 90}%`, bottom: '-20px', zIndex: 0 }}
            animate={{ y: [0, -window.innerHeight - 50], opacity: [0.15, 0.3, 0] }}
            transition={{
              duration: 6 + Math.random() * 5,
              delay: Math.random() * 8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <span style={{ fontSize: `${16 + Math.random() * 14}px` }}>
              {theme.heartEmojis[i % theme.heartEmojis.length]}
            </span>
          </motion.div>
        ))}

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

          {/* YouTube — Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
            className="w-full mb-6 sm:mb-8"
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl video-card">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OHu-T6s5_u0?si=YzG_mewB2tliHILY"
                  title="Our Song"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* Song info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-3 mt-3 sm:mt-4"
            >
              {/* Spinning disc */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}
              >
                <div className="w-2 h-2 rounded-full bg-white/70" />
              </motion.div>
              <p className="text-gray-600 text-base sm:text-lg font-love">Now Playing — Our Song 🎵</p>
              {/* Music bars */}
              <div className="flex items-end gap-0.5 h-6 flex-shrink-0">
                {[0, 0.15, 0.08, 0.25, 0.12].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gray-500"
                    animate={{ height: ['5px', '22px', '8px', '18px', '5px'] }}
                    transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </motion.div>
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
