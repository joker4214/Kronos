'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';

// Curated, real videos (spot-checked live before shipping) grouped by the
// exact expertise areas we sell. Each one ties back to an actual DED
// service so this reads as proof of capability, not a random embed.
const CATEGORIES = [
  {
    id: 'seo',
    label: 'SEO',
    videos: [
      {
        id: 'spETjuNirqg',
        title: 'Shopify SEO Optimization Guide for Beginners (2026)',
        tieIn: 'This is the SEO work baked into every package we build — not an add-on.',
      },
      {
        id: '3aiSdesH4n0',
        title: 'Shopify SEO Optimization Guide: What Matters Most for 2026 Rankings',
        tieIn: 'The exact ranking factors we check first in every Shopify Store Audit.',
      },
    ],
  },
  {
    id: 'optimization',
    label: 'Store Optimization',
    videos: [
      {
        id: 'slwJDfpTaco',
        title: 'High-Converting Shopify Product Page Optimization (Master Class)',
        tieIn: 'The same product-page framework we apply in our Growth and Full Agency builds.',
      },
      {
        id: 'nxtoIvuba-Y',
        title: 'The Secret to Increasing Conversion Rates on Shopify',
        tieIn: 'Small conversion fixes like these are exactly what our Store Performance Audit catches.',
      },
    ],
  },
  {
    id: 'placement',
    label: 'Product Placement',
    videos: [
      {
        id: 'FxlxmUZYXwU',
        title: 'I Studied 100+ Shopify Product Pages — Here’s What Actually Converts',
        tieIn: 'Data-backed patterns — the same research we bring to every product page we touch.',
      },
      {
        id: 'mf20MLXB_dg',
        title: 'How To Design High-Converting Product Pages (Shopify)',
        tieIn: 'This is the layout thinking behind our product optimization service.',
      },
    ],
  },
  {
    id: 'design',
    label: 'Store Design',
    videos: [
      {
        id: 'pS5vvYoly5E',
        title: 'How to Brand Your Shopify Store Like a Pro',
        tieIn: 'Branding fundamentals — the foundation of every store we design.',
      },
      {
        id: 'TfZoruE3Xfo',
        title: 'How To Design a Branded Shopify Store, Step by Step',
        tieIn: 'The same process behind our Full Agency package.',
      },
    ],
  },
];

export default function LearnLibrary() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [playingId, setPlayingId] = useState(null);

  const category = CATEGORIES.find((c) => c.id === activeCategory);
  const playingVideo = category?.videos.find((v) => v.id === playingId);

  const selectCategory = (id) => {
    setActiveCategory(id);
    setPlayingId(null);
  };

  return (
    <div className={styles.learnLibrary}>
      <div className={styles.learnHead}>
        <div className={styles.sectionEyebrow}>See Our Expertise In Action</div>
        <h3>Learn from us — right here, no detour required.</h3>
        <p>
          Real strategy on SEO, store optimization, product placement, and design — the same
          thinking behind every build we ship.
        </p>
      </div>

      <div className={styles.learnTabs}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => selectCategory(c.id)}
            className={`${styles.learnTab} ${activeCategory === c.id ? styles.learnTabActive : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {playingVideo ? (
        <div className={styles.learnPlayerWrap}>
          <div className={styles.learnPlayerFrame}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${playingVideo.id}?autoplay=1&rel=0`}
              title={playingVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className={styles.learnPlayerMeta}>
            <p>{playingVideo.tieIn}</p>
            <button type="button" className={styles.learnBack} onClick={() => setPlayingId(null)}>
              ← Back to videos
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.learnGrid}>
          {category.videos.map((v) => (
            <button
              key={v.id}
              type="button"
              className={styles.learnCard}
              onClick={() => setPlayingId(v.id)}
            >
              <div className={styles.learnThumbWrap}>
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                <span className={styles.learnPlayBtn}>▶</span>
              </div>
              <div className={styles.learnCardTitle}>{v.title}</div>
              <div className={styles.learnCardTieIn}>{v.tieIn}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
