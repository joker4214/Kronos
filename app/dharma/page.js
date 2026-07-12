'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SpotlightBackground from '@/components/SpotlightBackground';
import styles from '@/styles/dharma.module.css';

export default function DharmaHome() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/dharma" className={styles.logo}>
            <span className={styles.logoText}>DHARMA'S <span className={styles.logoAccent}>Esthetic</span></span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#origin" className={styles.navLink}>Our Story</a>
            <a href="#packages" className={styles.navLink}>Packages</a>
            <a href="#alacarte" className={styles.navLink}>À La Carte</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <SpotlightBackground>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Trusted by e-commerce brands</div>
            <h1 className={styles.heroTitle}>We turn Shopify stores into <em>recognizable brands.</em></h1>
            <p className={styles.heroSubtitle}>AI-powered content creation, real human expertise. Professional results — fast, affordable, and built around your brand.</p>
            <div className={styles.heroCTA}>
              <Link href="#packages" className={styles.btnGold}>View Packages</Link>
              <Link href="/dharma/alacarte" className={styles.btnOutline}>Customize</Link>
            </div>
          </div>
        </SpotlightBackground>
      </section>

      {/* Origin Story */}
      <section id="origin" className={styles.originSection}>
        <div className={styles.originContent}>
          <div className={styles.originText}>
            <h2>Our Story</h2>
            <p>Before Dharma's Esthetic Design Center, Jason was working with a co-founder on a Shopify store. He realized something critical: <strong>ecommerce stores are expensive and time-consuming to run.</strong></p>
            <p>Jason had more money than time — and neither is unlimited. The solution: lease his real ecommerce store to his co-founder and the team they built together. No middlemen. No high-cut agencies. Direct.</p>
            <p>That lease arrangement became the foundation of Dharma's. Today, a team of experts (Mathew, Shuaib, Yusuf) handles execution while Jason ensures quality, strategy, and results.</p>
            <p className={styles.originBold}>The goal is simple: build a business that replaces income and creates stability. One client at a time.</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className={styles.packagesSection}>
        <div className={styles.sectionHead}>
          <h2>Our Packages</h2>
          <p>Three tiers. One goal — your store grows.</p>
        </div>
        <div className={styles.packagesGrid}>
          <Link href="/dharma/packages/starter" className={styles.packageCard}>
            <div className={styles.packageIcon}>🚀</div>
            <h3>Starter Launch</h3>
            <p className={styles.packagePrice}>$650</p>
            <p className={styles.packageDesc}>7-day TikTok and Facebook ad copy, 7 branded photos, and hashtag strategy.</p>
            <span className={styles.linkArrow}>Explore →</span>
          </Link>
          <Link href="/dharma/packages/growth" className={`${styles.packageCard} ${styles.featured}`}>
            <div className={styles.packageBadge}>Most Popular</div>
            <div className={styles.packageIcon}>⚡</div>
            <h3>Growth Bundle</h3>
            <p className={styles.packagePrice}>$1,450</p>
            <p className={styles.packageDesc}>Everything in Starter plus AI video, GA4 setup, product optimization, and SEO.</p>
            <span className={styles.linkArrow}>Explore →</span>
          </Link>
          <Link href="/dharma/packages/agency" className={styles.packageCard}>
            <div className={styles.packageIcon}>🎯</div>
            <h3>Full Agency</h3>
            <p className={styles.packagePrice}>$2,200</p>
            <p className={styles.packageDesc}>Everything in Growth Bundle plus social setup, brand enhancement, blog post, and email marketing.</p>
            <span className={styles.linkArrow}>Explore →</span>
          </Link>
        </div>
      </section>

      {/* À La Carte Section */}
      <section id="alacarte" className={styles.alacarte}>
        <div className={styles.sectionHead}>
          <h2>À La Carte Services</h2>
          <p>Pick only what you need. Or bundle related services for savings.</p>
        </div>
        <div className={styles.alacarteContainer}>
          <Link href="/dharma/alacarte" className={styles.alacarteBtn}>
            Browse & Customize Services
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Your store. Your brand. Done right.</h2>
          <p>Tell us about your store and we'll recommend the right package — or build something custom.</p>
          <div className={styles.ctaButtons}>
            <a href="mailto:jason@dharmasemporium.com" className={styles.btnGold}>Email Us</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Dharma's <span>Esthetic Design Center</span>. All rights reserved.</p>
      </footer>
    </div>
  );
}
