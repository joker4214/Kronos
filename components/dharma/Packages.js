'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';
import { PACKAGES } from './data';
import Reveal from './Reveal';

export default function Packages() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="packages" className={`${styles.section} ${styles.packages}`}>
      <div className={styles.packagesGlow} />
      <div className={styles.packagesContent}>
        <Reveal className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Our Packages</div>
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

        <Reveal className={styles.pricingToggleWrap}>
          <div className={styles.pricingToggle}>
            <button
              className={`${styles.toggleBtn} ${!isYearly ? styles.toggleActive : ''}`}
              onClick={() => setIsYearly(false)}
            >
              <span>Monthly</span>
            </button>
            <button
              className={`${styles.toggleBtn} ${isYearly ? styles.toggleActive : ''}`}
              onClick={() => setIsYearly(true)}
            >
              <span>Yearly</span>
            </button>
          </div>
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
                <span className={styles.priceValue}>
                  ${isYearly ? Math.round(pkg.monthlyPrice * 12 * 0.8) : pkg.monthlyPrice}
                </span>
                <span className={styles.pricePeriod}>/{isYearly ? 'year' : 'month'}</span>
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
