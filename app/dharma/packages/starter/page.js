'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';

export default function StarterPackagePage() {
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
          <div className={styles.packageIcon} style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚀</div>
          <h1 className={styles.heroTitle}>Starter Launch</h1>
          <p className={styles.heroSubtitle}>Get your store noticed in 7 days</p>
          <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: '700', marginTop: '1rem' }}>$650</div>
        </div>
      </section>

      {/* Package Details */}
      <section style={{ background: 'var(--cream)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '2rem', fontFamily: "'Georgia', serif" }}>
            What's Included
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>📱 Social Media Content</h3>
              <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>7-day custom TikTok and Facebook ad copy designed to capture attention and drive clicks.</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>📸 Branded Photography</h3>
              <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>7 professional product photos styled and edited to match your brand aesthetic.</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>🏷️ Hashtag Strategy</h3>
              <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Researched hashtag sets optimized for discoverability on each platform.</p>
            </div>
          </div>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Perfect For
            </h2>
            <ul style={{ lineHeight: '2', color: 'var(--navy)', fontSize: '1.05rem' }}>
              <li>✓ New Shopify stores launching in the next 30 days</li>
              <li>✓ Stores wanting to test social media without major investment</li>
              <li>✓ Brands with existing products but no marketing presence</li>
              <li>✓ Quick brand awareness campaigns</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>Ready to launch?</h2>
            <a href="mailto:jason@dharmasemporium.com" className={styles.btnGold}>
              Get Started — $650
            </a>
            <p style={{ marginTop: '1rem', color: 'var(--navy)', opacity: '0.7' }}>
              7-day turnaround. Includes 2 rounds of revisions.
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
            <Link href="/dharma/packages/growth" style={{ textDecoration: 'none' }}>
              <div className={styles.packageCard} style={{ cursor: 'pointer' }}>
                <div className={styles.packageIcon}>⚡</div>
                <h3>Growth Bundle</h3>
                <p className={styles.packagePrice}>$1,450</p>
                <p className={styles.packageDesc}>Everything in Starter plus AI video, GA4 setup, product optimization, and SEO.</p>
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
