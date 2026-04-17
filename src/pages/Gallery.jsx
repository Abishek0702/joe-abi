import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { galleryQuotes } from '../utils/quotes';
import { useTheme } from '../context/ThemeContext';
import DreamyBackground from '../components/DreamyBackground';

// All 35 real images — no repeats
export const images = [
  { url: '/images/WhatsApp Image 2026-04-16 at 7.26.07 PM.jpeg', tag: '#OurBeginning', caption: 'Where it all started' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.26.15 PM.jpeg', tag: '#ThatSmile', caption: 'The smile that stole my heart' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.26.32 PM.jpeg', tag: '#Together', caption: 'Better together, always' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.27.35 PM.jpeg', tag: '#MyHeart', caption: 'You are my heartbeat' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.27.43 PM.jpeg', tag: '#Forever', caption: 'A promise of forever' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.28.39 PM.jpeg', tag: '#LoveStory', caption: 'Our beautiful love story' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.28.51 PM.jpeg', tag: '#Happiness', caption: 'Pure happiness with you' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.28.58 PM.jpeg', tag: '#Dreamy', caption: 'Living a dream with you' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.29.12 PM.jpeg', tag: '#Precious', caption: 'Every moment is precious' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.29.45 PM.jpeg', tag: '#Soulmate', caption: 'My soulmate, my everything' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.30.05 PM.jpeg', tag: '#Adventure', caption: 'Adventures with you' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.30.12 PM.jpeg', tag: '#OurDay', caption: 'The most special day' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.30.25 PM.jpeg', tag: '#Memories', caption: 'Memories we treasure' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.30.57 PM.jpeg', tag: '#Joy', caption: 'You bring me joy' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.31.11 PM.jpeg', tag: '#MyWorld', caption: 'You are my whole world' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.31.16 PM.jpeg', tag: '#Blessing', caption: 'The greatest blessing' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.31.31 PM.jpeg', tag: '#HoldMyHand', caption: 'Hold my hand, always' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.31.35 PM.jpeg', tag: '#OurMoment', caption: 'A moment frozen in time' },
  { url: '/images/WhatsApp Image 2026-04-16 at 7.32.46 PM.jpeg', tag: '#LoveYou', caption: 'I love you, papu' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM.jpeg', tag: '#BeachNight', caption: 'Night by the sea with you' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (1).jpeg', tag: '#BeachVibes', caption: 'Our beach vibes together' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (2).jpeg', tag: '#TempleDay', caption: 'Blessed moments together' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (3).jpeg', tag: '#CuteUs', caption: 'Just the two of us' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (4).jpeg', tag: '#Style', caption: 'My stylish queen' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (5).jpeg', tag: '#Twinning', caption: 'Matching souls, matching hearts' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (6).jpeg', tag: '#PerfectTwo', caption: 'The perfect two' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.14 PM (7).jpeg', tag: '#ForeverHug', caption: 'Never letting go' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.23 PM.jpeg', tag: '#EyeContact', caption: 'Lost in your eyes' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.42 PM.jpeg', tag: '#FirstKiss', caption: 'The moment time stopped' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.42 PM (1).jpeg', tag: '#TightHug', caption: 'Your hugs heal everything' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.42 PM (2).jpeg', tag: '#Beauty', caption: 'My beautiful angel' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.52.51 PM.jpeg', tag: '#3DLove', caption: 'Our love in every dimension' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.53.17 PM.jpeg', tag: '#Dreamy', caption: 'Dreaming with flowers' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.53.33 PM.jpeg', tag: '#Mood', caption: 'Our mood, our vibe' },
  { url: '/images/WhatsApp Image 2026-04-16 at 9.53.41 PM.jpeg', tag: '#NightOut', caption: 'Late night adventures' },
];

// 35 photo positions for the tree — no repeats needed
const photoPositions = [
  // Row 1 - Top
  { x: 50, y: 6, rot: -2 },
  // Row 2
  { x: 30, y: 13, rot: 8 }, { x: 70, y: 13, rot: -6 },
  // Row 3
  { x: 15, y: 21, rot: -12 }, { x: 40, y: 19, rot: 5 },
  { x: 60, y: 19, rot: -4 }, { x: 85, y: 21, rot: 10 },
  // Row 4
  { x: 8, y: 30, rot: 14 }, { x: 28, y: 28, rot: -8 },
  { x: 45, y: 27, rot: 3 }, { x: 55, y: 27, rot: -5 },
  { x: 72, y: 28, rot: 9 }, { x: 92, y: 30, rot: -11 },
  // Row 5
  { x: 12, y: 40, rot: 12 }, { x: 30, y: 38, rot: -6 },
  { x: 42, y: 36, rot: 7 }, { x: 58, y: 36, rot: -4 },
  { x: 70, y: 38, rot: 8 }, { x: 88, y: 40, rot: -10 },
  // Row 6
  { x: 20, y: 50, rot: 5 }, { x: 36, y: 48, rot: -7 },
  { x: 50, y: 47, rot: 3 }, { x: 64, y: 48, rot: -5 },
  { x: 80, y: 50, rot: 10 },
  // Row 7
  { x: 25, y: 60, rot: -6 }, { x: 40, y: 58, rot: 4 },
  { x: 55, y: 57, rot: -3 }, { x: 75, y: 60, rot: 8 },
  // Row 8
  { x: 32, y: 70, rot: -4 }, { x: 50, y: 68, rot: 5 },
  { x: 68, y: 70, rot: -6 },
  // Row 9
  { x: 38, y: 78, rot: 3 }, { x: 55, y: 77, rot: -4 },
  // Row 10 - Bottom
  { x: 45, y: 85, rot: -2 }, { x: 55, y: 85, rot: 3 },
];

export default function Gallery() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Polaroid size based on screen
  const polaroidWidth = isMobile ? 70 : 100;
  const photoHeight = isMobile ? 50 : 80;
  const treeHeight = isMobile ? 600 : 850;

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden" style={{ background: theme.galleryBg }}>
        <DreamyBackground showCupid={false} intensity="high" />

        {/* ═══ Cartoonish Fantasy Clouds ═══ */}
        {/* Each cloud = 3 overlapping circles for puffy cartoon look */}

        {/* Cloud — Top Left (pushed down on mobile so title is visible) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: isMobile ? '0%' : '1%', left: '-2%', zIndex: 5 }}
          animate={{ x: [0, 40, 0], y: [0, 8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative" style={{ width: isMobile ? 100 : 300, height: isMobile ? 35 : 110 }}>
            <div style={{ position: 'absolute', left: '0%', top: '30%', width: '45%', height: '70%', borderRadius: '50%', background: 'rgba(230,240,255,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '20%', top: '0%', width: '55%', height: '85%', borderRadius: '50%', background: 'rgba(240,248,255,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '45%', top: '25%', width: '50%', height: '75%', borderRadius: '50%', background: 'rgba(225,235,252,1)', boxShadow: 'inset -6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
          </div>
        </motion.div>

        {/* Cloud — Top Left (smaller, lower) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: isMobile ? '5%' : '8%', left: isMobile ? '0%' : '8%', zIndex: 5 }}
          animate={{ x: [0, 30, 0], y: [0, -5, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <div className="relative" style={{ width: isMobile ? 80 : 200, height: isMobile ? 28 : 75 }}>
            <div style={{ position: 'absolute', left: '0%', top: '30%', width: '50%', height: '70%', borderRadius: '50%', background: 'rgba(228,238,254,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '22%', top: '0%', width: '55%', height: '90%', borderRadius: '50%', background: 'rgba(240,248,255,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '48%', top: '25%', width: '48%', height: '72%', borderRadius: '50%', background: 'rgba(222,233,250,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
          </div>
        </motion.div>

        {/* Cloud — Top Right */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: isMobile ? '0%' : '1%', right: '-2%', zIndex: 5 }}
          animate={{ x: [0, -40, 0], y: [0, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <div className="relative" style={{ width: isMobile ? 100 : 280, height: isMobile ? 35 : 100 }}>
            <div style={{ position: 'absolute', left: '5%', top: '28%', width: '48%', height: '72%', borderRadius: '50%', background: 'rgba(230,240,255,1)', boxShadow: 'inset 6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '25%', top: '0%', width: '52%', height: '88%', borderRadius: '50%', background: 'rgba(240,248,255,1)', boxShadow: 'inset 6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '22%', width: '48%', height: '70%', borderRadius: '50%', background: 'rgba(225,235,252,1)', boxShadow: 'inset 6px -6px 14px rgba(150,170,200,0.5), 0 4px 18px rgba(120,140,180,0.35)' }} />
          </div>
        </motion.div>

        {/* Cloud — Top Right (smaller, lower) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: isMobile ? '5%' : '9%', right: isMobile ? '0%' : '6%', zIndex: 5 }}
          animate={{ x: [0, -25, 0], y: [0, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        >
          <div className="relative" style={{ width: isMobile ? 75 : 180, height: isMobile ? 26 : 65 }}>
            <div style={{ position: 'absolute', left: '0%', top: '32%', width: '48%', height: '68%', borderRadius: '50%', background: 'rgba(225,235,252,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '20%', top: '0%', width: '55%', height: '88%', borderRadius: '50%', background: 'rgba(240,248,255,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
            <div style={{ position: 'absolute', left: '48%', top: '28%', width: '48%', height: '68%', borderRadius: '50%', background: 'rgba(220,232,250,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.5), 0 4px 16px rgba(120,140,180,0.35)' }} />
          </div>
        </motion.div>

        {/* Cloud — Left side of tree */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '30%', left: '-3%', zIndex: 4 }}
          animate={{ x: [0, 50, 0], y: [0, 6, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="relative" style={{ width: isMobile ? 130 : 240, height: isMobile ? 48 : 85 }}>
            <div style={{ position: 'absolute', left: '0%', top: '30%', width: '45%', height: '70%', borderRadius: '50%', background: 'rgba(222,232,250,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
            <div style={{ position: 'absolute', left: '20%', top: '0%', width: '55%', height: '85%', borderRadius: '50%', background: 'rgba(236,244,255,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
            <div style={{ position: 'absolute', left: '48%', top: '25%', width: '48%', height: '72%', borderRadius: '50%', background: 'rgba(218,228,248,1)', boxShadow: 'inset -5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
          </div>
        </motion.div>

        {/* Cloud — Right side of tree */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '35%', right: '-3%', zIndex: 4 }}
          animate={{ x: [0, -45, 0], y: [0, 8, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        >
          <div className="relative" style={{ width: isMobile ? 130 : 230, height: isMobile ? 48 : 82 }}>
            <div style={{ position: 'absolute', left: '5%', top: '28%', width: '46%', height: '70%', borderRadius: '50%', background: 'rgba(222,232,250,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
            <div style={{ position: 'absolute', left: '24%', top: '0%', width: '52%', height: '88%', borderRadius: '50%', background: 'rgba(236,244,255,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '24%', width: '46%', height: '70%', borderRadius: '50%', background: 'rgba(218,228,248,1)', boxShadow: 'inset 5px -5px 12px rgba(150,170,200,0.45), 0 4px 16px rgba(120,140,180,0.3)' }} />
          </div>
        </motion.div>

        {/* Cloud — Behind tree (big, soft, low z) */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: '18%', left: '15%', zIndex: 0 }}
          animate={{ x: [0, 60, 0], y: [0, 5, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <div className="relative" style={{ width: isMobile ? 200 : 380, height: isMobile ? 70 : 130 }}>
            <div style={{ position: 'absolute', left: '0%', top: '30%', width: '40%', height: '70%', borderRadius: '50%', background: 'rgba(215,228,250,0.85)', boxShadow: 'inset -4px -4px 12px rgba(150,170,200,0.35), 0 4px 20px rgba(120,140,180,0.25)' }} />
            <div style={{ position: 'absolute', left: '18%', top: '0%', width: '50%', height: '85%', borderRadius: '50%', background: 'rgba(228,238,252,0.88)', boxShadow: 'inset -4px -4px 12px rgba(150,170,200,0.35), 0 4px 20px rgba(120,140,180,0.25)' }} />
            <div style={{ position: 'absolute', left: '42%', top: '20%', width: '45%', height: '75%', borderRadius: '50%', background: 'rgba(210,224,248,0.82)', boxShadow: 'inset -4px -4px 12px rgba(150,170,200,0.35), 0 4px 20px rgba(120,140,180,0.25)' }} />
            <div style={{ position: 'absolute', left: '65%', top: '30%', width: '35%', height: '65%', borderRadius: '50%', background: 'rgba(205,220,245,0.8)', boxShadow: 'inset -4px -4px 12px rgba(150,170,200,0.35), 0 4px 20px rgba(120,140,180,0.25)' }} />
          </div>
        </motion.div>

        {/* Header — always above clouds */}
        <div className="pt-6 sm:pt-8 text-center relative px-4" style={{ zIndex: 40 }}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-love text-4xl sm:text-5xl md:text-7xl text-gray-700"
          >
            Moments We Keep
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 italic mt-2 sm:mt-3 text-lg sm:text-2xl"
          >
            Tap a photo to relive a memory
          </motion.p>
        </div>

        {/* ═══ The Tree & Photos ═══ */}
        <div
          className="relative mx-auto mt-3 sm:mt-5 px-2 sm:px-0"
          style={{ maxWidth: '900px', height: `${treeHeight}px` }}
        >
          {/* SVG Tree — golden branches */}
          <svg
            viewBox="0 0 1000 850"
            className="absolute inset-0 w-full h-full pointer-events-none tree-sway"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#f9e2af" />
              </linearGradient>
            </defs>

            {/* Trunk */}
            <path d="M500 850 Q500 720 498 640 Q496 570 500 480" stroke="#8b6f47" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M500 845 Q499 715 498 635 Q496 568 500 482" stroke="#6b4f2f" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.12" />

            {/* Roots */}
            {[
              'M500 848 Q460 860 420 850', 'M500 848 Q540 860 580 850',
              'M500 846 Q470 862 435 855', 'M500 846 Q530 862 565 855',
            ].map((d, i) => (
              <motion.path key={`root-${i}`} d={d} stroke="#6b4f2f" strokeWidth="5" fill="none"
                strokeLinecap="round" opacity={0.3}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} />
            ))}

            {/* Branches to photos */}
            {photoPositions.map((pos, i) => {
              const ex = pos.x * 10;
              const ey = pos.y * 8.5;
              const mx = (ex + 500) / 2 + (pos.x < 50 ? -40 : 40);
              const my = (ey + 480) / 2;
              return (
                <motion.path
                  key={`branch-${i}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1.8, delay: i * 0.08 }}
                  d={`M500 480 Q${mx} ${my} ${ex} ${ey}`}
                  stroke="url(#goldGrad)"
                  strokeWidth={2.5 - (i % 3) * 0.3}
                  fill="none" strokeLinecap="round"
                />
              );
            })}

            {/* Blue heart-shaped leaves */}
            {[
              { x: 380, y: 160 }, { x: 620, y: 160 }, { x: 300, y: 230 }, { x: 700, y: 230 },
              { x: 250, y: 320 }, { x: 750, y: 320 }, { x: 350, y: 280 }, { x: 650, y: 280 },
              { x: 500, y: 140 }, { x: 420, y: 360 }, { x: 580, y: 360 },
              { x: 320, y: 420 }, { x: 680, y: 420 }, { x: 460, y: 200 }, { x: 540, y: 200 },
              { x: 200, y: 400 }, { x: 800, y: 400 }, { x: 400, y: 480 }, { x: 600, y: 480 },
            ].map((h, i) => (
              <motion.text
                key={`heart-${i}`} x={h.x} y={h.y}
                fontSize={isMobile ? '10' : '14'} textAnchor="middle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0.4, 0.6], scale: 1 }}
                transition={{
                  opacity: { delay: 2 + i * 0.1, duration: 3, repeat: Infinity, repeatType: 'reverse' },
                  scale: { delay: 2 + i * 0.1, duration: 0.4 },
                }}
              >
                💙
              </motion.text>
            ))}
          </svg>

          {/* Polaroid Photos */}
          {photoPositions.map((pos, i) => (
            i < images.length && (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: 10 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1, opacity: 1,
                  y: [0, isMobile ? -6 : -10, 0],
                  rotate: pos.rot,
                }}
                transition={{
                  delay: i * 0.04,
                  y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.25, zIndex: 50, rotate: 0 }}
              >
                {/* String */}
                <div
                  className="absolute left-1/2 bg-gray-400 opacity-40"
                  style={{ top: isMobile ? '-14px' : '-18px', width: '0.5px', height: isMobile ? '16px' : '20px' }}
                />

                {/* Polaroid */}
                <div
                  className="bg-white shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: `${polaroidWidth}px`,
                    padding: isMobile ? '3px' : '6px',
                    paddingBottom: isMobile ? '12px' : '18px',
                  }}
                >
                  <div className="relative bg-gray-200 overflow-hidden" style={{ height: `${photoHeight}px` }}>
                    <img src={images[i].url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-0.5 right-0.5" style={{ fontSize: isMobile ? '7px' : '10px' }}>💙</div>
                  </div>
                  <p
                    className="text-center text-gray-500 font-sans truncate"
                    style={{ fontSize: isMobile ? '5px' : '7px', marginTop: isMobile ? '2px' : '4px' }}
                  >
                    {images[i].tag}
                  </p>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="text-center relative z-20 pb-16 sm:pb-20 px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 italic mb-8 sm:mb-10 text-lg sm:text-2xl"
          >
            The little frames that made us feel everything
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-10 sm:py-14"
            style={{ background: theme.galleryScroll }}
          >
            <h2 className="font-love text-xl sm:text-2xl md:text-4xl text-gray-700 mb-4 sm:mb-6">
              I have something for you...
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${theme.btnGlow}` }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/video')}
              className={`px-8 sm:px-10 py-3 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-md sm:text-xl font-bold shadow-lg cursor-pointer`}
            >
              Open 💌
            </motion.button>
          </motion.div>
        </div>

        {/* ═══ Lightbox ═══ */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              {/* Photo Card */}
              <motion.div
                className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden"
                style={{ maxWidth: isMobile ? '320px' : '400px' }}
                initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gray-100 flex items-center justify-center">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage].url}
                    alt=""
                    className="w-full object-contain"
                    style={{ maxHeight: isMobile ? '60vh' : '70vh', minHeight: isMobile ? '280px' : '380px' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                    <span className="bg-white/80 text-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{images[selectedImage].tag}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <p className="font-love text-lg sm:text-2xl text-gray-800 mb-1 sm:mb-2">{images[selectedImage].caption}</p>
                  <p className="text-gray-500 italic text-sm sm:text-lg font-love-body">
                    &ldquo;{galleryQuotes[selectedImage % galleryQuotes.length]}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3 mb-2 sm:mb-3">
                    <div className="h-px w-8 sm:w-10 bg-gray-200" />
                    <span className="text-sm sm:text-lg">{theme.heartEmoji}</span>
                    <div className="h-px w-8 sm:w-10 bg-gray-200" />
                  </div>
                  <motion.button
                    className={`px-5 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r ${theme.btnPrimary} text-white rounded-full text-sm sm:text-lg font-semibold shadow-md cursor-pointer`}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
