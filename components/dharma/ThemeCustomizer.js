'use client';

import { useState } from 'react';
import { Fraunces, Quicksand, Archivo, Cormorant, Baloo_2 } from 'next/font/google';
import styles from '@/styles/themeCustomizer.module.css';
import { THEME_PACKAGES } from './data';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '700'], variable: '--tc-fraunces', display: 'swap' });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['700'], variable: '--tc-quicksand', display: 'swap' });
const archivo = Archivo({ subsets: ['latin'], weight: ['800'], variable: '--tc-archivo', display: 'swap' });
const cormorant = Cormorant({ subsets: ['latin'], weight: ['600'], variable: '--tc-cormorant', display: 'swap' });
const baloo = Baloo_2({ subsets: ['latin'], weight: ['700'], variable: '--tc-baloo', display: 'swap' });

const FONT_VAR = {
  fraunces: 'var(--tc-fraunces)',
  quicksand: 'var(--tc-quicksand)',
  archivo: 'var(--tc-archivo)',
  cormorant: 'var(--tc-cormorant)',
  baloo: 'var(--tc-baloo)',
};

function ProductIcon({ stroke }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={stroke} strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export default function ThemeCustomizer() {
  const [selected, setSelected] = useState(THEME_PACKAGES[0]);

  const emailHref = `mailto:Dharma%27s%20Esthetic%20Design%20%3Cjason@dharmasestheticdesign.com%3E?subject=${encodeURIComponent(
    `I like the "${selected.name}" look for my store`
  )}&body=${encodeURIComponent(
    `Hi! I played with the style picker on your site and the "${selected.name}" look (${selected.tagline}) is the direction I want for my store. Can we talk about building it?`
  )}`;

  const headingFontStyle = {
    fontFamily: FONT_VAR[selected.font],
    fontWeight: selected.fontWeight,
    textTransform: selected.uppercaseHeading ? 'uppercase' : 'none',
  };

  return (
    <div className={`${styles.wrap} ${fraunces.variable} ${quicksand.variable} ${archivo.variable} ${cormorant.variable} ${baloo.variable}`}>
      <div className={styles.picker}>
        {THEME_PACKAGES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`${styles.chip} ${selected.id === theme.id ? styles.chipActive : ''}`}
            onClick={() => setSelected(theme)}
            aria-pressed={selected.id === theme.id}
          >
            <span className={styles.chipSwatches}>
              <span style={{ background: theme.bg }} />
              <span style={{ background: theme.surface }} />
              <span style={{ background: theme.accent }} />
            </span>
            <span className={styles.chipName}>{theme.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        <div className={styles.mockup} style={{ background: selected.bg }}>
          <div className={styles.mockGlow} style={{ background: selected.accent }} aria-hidden="true" />

          <div className={styles.mockNav} style={{ background: selected.surface }}>
            <span className={styles.mockLogoDot} style={{ background: selected.accent }} />
            <span className={styles.mockNavLabel} style={{ color: selected.text }}>Your Store</span>
            <span className={styles.mockNavLinks} style={{ color: selected.text }}>
              Shop &nbsp;&nbsp; About &nbsp;&nbsp; Cart
            </span>
          </div>

          <div className={styles.mockHero}>
            <span className={styles.mockEyebrow} style={{ color: selected.accent }}>New arrival</span>
            <h2 className={styles.mockHeadline} style={{ ...headingFontStyle, color: selected.accent }}>
              {selected.tagline}
            </h2>
            <p className={styles.mockSub} style={{ color: selected.text }}>{selected.vibe}</p>
            <span className={styles.mockCta} style={{ background: selected.accent, color: selected.bg }}>
              Shop Now
            </span>
          </div>

          <div className={styles.mockProducts}>
            {selected.products.map((productName) => (
              <div key={productName} className={styles.mockProductCard} style={{ background: selected.surface }}>
                <div className={styles.mockProductImg} style={{ background: selected.accent }} aria-hidden="true">
                  <ProductIcon stroke={selected.bg} />
                </div>
                <div className={styles.mockProductName} style={{ color: selected.text }}>{productName}</div>
                <span className={styles.mockProductPrice} style={{ background: selected.tagBg, color: selected.tagText }}>
                  {selected.priceSample}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.metaBar}>
          <div className={styles.metaLeft}>
            <p className={styles.goodFit}>Good fit: {selected.goodFit}</p>
            <div className={styles.hexRow}>
              <span className={styles.hexChip}>{selected.bg}</span>
              <span className={styles.hexChip}>{selected.surface}</span>
              <span className={styles.hexChip}>{selected.accent}</span>
            </div>
          </div>
          <a href={emailHref} className={styles.ctaBtn}>
            Love this look? Tell us →
          </a>
        </div>
      </div>
    </div>
  );
}
