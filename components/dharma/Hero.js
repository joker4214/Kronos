'use client';

import { motion } from 'framer-motion';
import GradientDots from './GradientDots';
import BlobBackground from './BlobBackground';
import styles from '@/styles/dharma.module.css';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <BlobBackground />
      <GradientDots backgroundColor="transparent" />
      <motion.div
        className={styles.heroInner}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className={styles.eyebrow}>
          Digital Content, Web Design &amp; Store Growth
        </motion.div>
        <motion.h1 variants={item} className={styles.heroTitle}>
          We turn Shopify stores into{' '}
          <span className={styles.accentWord}>recognizable brands.</span>
        </motion.h1>
        <motion.p variants={item} className={styles.lead}>
          AI-powered content creation, real human expertise. Professional results — fast,
          affordable, and built around your brand. Powered by AI. Delivered by professionals.
        </motion.p>
        <motion.div variants={item} className={styles.btnRow}>
          <a href="#packages" className={`${styles.btn} ${styles.btnAccent}`}>
            View Packages
          </a>
          <a href="#webdesign" className={`${styles.btn} ${styles.btnOutline}`}>
            Web Design
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
