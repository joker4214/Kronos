'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';

export default function GrowthPackagePage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/dharma" className={styles.logo}>
            <span className={styles.logoText}>DHARMA'S <span className={styles.logoAccent}>Esthetic</span></span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/dharma#packages" className={styles.navLink}>All Packages</Link>
            <Link href="/dharma#alacarte" className={styles.navLink}>À La Carte</Link>
            <Link href="/dharma#contact" className={styles.navLink}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Package Header */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.packageBadge} style={{ marginBottom: '1rem' }}>Most Popular</div>
          <div className={styles.packageIcon} style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚡</div>
          <h1 className={styles.heroTitle}>Growth Bundle</h1>
          <p className={styles.heroSubtitle}>Everything to scale your store fast</p>
          <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: '700', marginTop: '1rem' }}>$1,450</div>
        </div>
      </section>

      {/* Package Details */}
      <section style={{ background: 'var(--cream)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '2rem', fontFamily: "'Georgia', serif" }}>
            What's Included
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>🎬 Video + Visual Content</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>2 AI-generated product videos optimized for TikTok and Instagram Reels</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>15 branded product photos with lifestyle context</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>14-day social media content calendar</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>📊 Analytics & Optimization</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Google Analytics 4 setup and UTM tracking configuration</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Product page optimization for conversions</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Basic SEO audit and keyword optimization</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>⭐ Plus Everything in Starter</h3>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <ul style={{ lineHeight: '2', color: 'var(--navy)' }}>
                <li>✓ 7-day ad copy for TikTok and Facebook</li>
                <li>✓ 7 branded product photos</li>
                <li>✓ Hashtag strategy</li>
              </ul>
            </div>
          </div>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Perfect For
            </h2>
            <ul style={{ lineHeight: '2', color: 'var(--navy)', fontSize: '1.05rem' }}>
              <li>✓ Stores with 3-12 months of operating history</li>
              <li>✓ Businesses wanting measurable ROI tracking</li>
              <li>✓ Owners ready to scale social media presence</li>
              <li>✓ Teams wanting data-driven content decisions</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>Ready to grow?</h2>
            <a href="mailto:jason@dharmasemporium.com" className={styles.btnGold}>
              Get Started — $1,450
            </a>
            <p style={{ marginTop: '1rem', color: 'var(--navy)', opacity: '0.7' }}>
              10-day turnaround. Includes full strategy consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Other Packages */}
      <section style={{ background: 'white', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center', fontFamily: "'Georgia', serif" }}>
            Or Explore Other Packages
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <Link href="/dharma/packages/starter" style={{ textDecoration: 'none' }}>
              <div className={styles.packageCard} style={{ cursor: 'pointer' }}>
                <div className={styles.packageIcon}>🚀</div>
                <h3>Starter Launch</h3>
                <p className={styles.packagePrice}>$650</p>
                <p className={styles.packageDesc}>7-day TikTok and Facebook ad copy, 7 branded photos, and hashtag strategy.</p>
                <span className={styles.linkArrow}>Explore →</span>
              </div>
            </Link>

            <Link href="/dharma/packages/agency" style={{ textDecoration: 'none' }}>
              <div className={styles.packageCard} style={{ cursor: 'pointer' }}>
                <div className={styles.packageIcon}>🎯</div>
                <h3>Full Agency</h3>
                <p className={styles.packagePrice}>$2,200</p>
                <p className={styles.packageDesc}>Everything in Growth Bundle plus social setup, brand enhancement, blog post, and email marketing.</p>
                <span className={styles.linkArrow}>Explore →</span>
              </div>
            </Link>
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
