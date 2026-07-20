'use client';

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

        <div style={{ maxWidth: '860px', margin: '0 auto 72px' }}>
          <ShopifyAudit variant="dark" />
        </div>

        <Reveal className={styles.sectionHead}>
          <div className={`${styles.sectionEyebrow} ${styles.eyebrowScale}`}>Our Packages</div>
          <h2>
            <a
              href="https://www.ecombuildshub.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pkgLink}
            >
              Three tiers. One goal — your store grows.
            </a>
          </h2>
        </Reveal>

        <div className={styles.pkgGrid}>
          {PACKAGES.map((pkg, index) => (
            <Reveal
              key={pkg.id}
              delay={index * 0.1}
              className={`${styles.pkgCard} ${pkg.featured ? styles.pkgFeatured : ''}`}
            >
              {pkg.featured && <span className={styles.pkgBadge}>Most Popular</span>}

              <h3>{pkg.name}</h3>
              <div className={styles.pkgTag}>{pkg.tag}</div>

              <div className={styles.pkgPrice}>
                <span className={styles.priceValue}>${pkg.monthlyPrice}</span>
                <span className={styles.pricePeriod}>/month</span>
              </div>

              <p className={styles.pkgDesc}>{pkg.desc}</p>

              <button className={styles.pkgCta}>
                <a
                  href={pkg.stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </button>

              <div className={styles.pkgFeatures}>
                <div className={styles.featureHeader}>{pkg.why}</div>
                <ul className={styles.featureList}>
                  {pkg.features?.map((feature, i) => (
                    <li key={i}>
                      <span className={styles.featureDot} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
