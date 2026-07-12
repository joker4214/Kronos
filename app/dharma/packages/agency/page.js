'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';

export default function AgencyPackagePage() {
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
          <div className={styles.packageIcon} style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎯</div>
          <h1 className={styles.heroTitle}>Full Agency</h1>
          <p className={styles.heroSubtitle}>Complete brand transformation & growth</p>
          <div style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: '700', marginTop: '1rem' }}>$2,200</div>
        </div>
      </section>

      {/* Package Details */}
      <section style={{ background: 'var(--cream)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '2rem', fontFamily: "'Georgia', serif" }}>
            What's Included
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>🎨 Brand Enhancement</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Brand voice and messaging guide</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Visual brand style refresh</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>20 branded product photos + lifestyle shots</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>📱 Social & Content Strategy</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Instagram and TikTok profile optimization</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>30-day social content calendar</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>3 AI-generated product videos</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>✍️ Content Marketing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>2 SEO-optimized blog posts</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Email marketing campaign setup (3 templates)</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Customer nurture sequence strategy</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '1rem' }}>📊 Analytics & Performance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>GA4 setup with advanced tracking</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Monthly performance reports</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <p style={{ color: 'var(--navy)', lineHeight: '1.6' }}>Competitor analysis & recommendations</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Perfect For
            </h2>
            <ul style={{ lineHeight: '2', color: 'var(--navy)', fontSize: '1.05rem' }}>
              <li>✓ Established stores wanting complete brand overhaul</li>
              <li>✓ Businesses serious about scaling to 6-7 figures</li>
              <li>✓ Teams wanting integrated marketing strategy</li>
              <li>✓ Stores with existing audience but underutilized potential</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>Ready to transform?</h2>
            <a href="mailto:jason@dharmasemporium.com" className={styles.btnGold}>
              Get Started — $2,200
            </a>
            <p style={{ marginTop: '1rem', color: 'var(--navy)', opacity: '0.7' }}>
              14-day turnaround. Includes strategy session + ongoing support.
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

            <Link href="/dharma/packages/growth" style={{ textDecoration: 'none' }}>
              <div className={styles.packageCard} style={{ cursor: 'pointer' }}>
                <div className={styles.packageBadge} style={{ marginBottom: '1rem' }}>Most Popular</div>
                <div className={styles.packageIcon}>⚡</div>
                <h3>Growth Bundle</h3>
                <p className={styles.packagePrice}>$1,450</p>
                <p className={styles.packageDesc}>Everything in Starter plus AI video, GA4 setup, product optimization, and SEO.</p>
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
