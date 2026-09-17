'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';
import { PACKAGES } from './data';
import Reveal from './Reveal';
import ShopifyAudit from './ShopifyAudit';

export default function Packages() {
  return (
    <section id="packages" className={`${styles.section} ${styles.packages}`}>
      <div className={styles.packagesGlow} />
      <div className={styles.packagesContent}>
        <Reveal className={styles.sectionHead} style={{ marginBottom: '32px' }}>
          <div className={`${styles.sectionEyebrow} ${styles.eyebrowScale}`}>Shopify Store Audits</div>
          <h2>Not sure where to start? Get an audit first.</h2>
        </Reveal>

        <div style={{ maxWidth: '1140px', margin: '0 auto 72px' }}>
          <ShopifyAudit />
        </div>

        <Reveal className={styles.sectionHead}>
          <div className={`${styles.sectionEyebrow} ${styles.eyebrowScale}`}>Our Packages</div>
          <h2>Three tiers. One goal — your store grows.</h2>
        </Reveal>

        <div className={styles.pkgGrid}>
          {PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 0.1} style={{ height: '100%' }}>
              <Link
                href={`/packages/${pkg.id}`}
                className={`${styles.pkgCard} ${pkg.featured ? styles.pkgFeatured : ''}`}
              >
                {pkg.featured && <span className={styles.pkgBadge}>Most Popular</span>}

                <h3>{pkg.name}</h3>
                <div className={styles.pkgTag}>{pkg.tag}</div>

                <div className={styles.pkgPrice}>
                  <span className={styles.priceValue}>${pkg.price.toLocaleString('en-US')}</span>
                  <span className={styles.pricePeriod}>one-time</span>
                </div>

                <div className={styles.cardSpacer} />

                <span className={styles.viewDetailsLink}>
                  View details
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
