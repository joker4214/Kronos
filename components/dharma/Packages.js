import styles from '@/styles/dharma.module.css';
import { PACKAGES } from './data';

export default function Packages() {
  return (
    <section id="packages" className={`${styles.section} ${styles.packages}`}>
      <div className={styles.sectionHead}>
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
      </div>
      <div className={styles.pkgGrid}>
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`${styles.pkgCard} ${pkg.featured ? styles.pkgFeatured : ''}`}
          >
            {pkg.featured && <span className={styles.pkgBadge}>Most Popular</span>}
            <h3>{pkg.name}</h3>
            <div className={styles.pkgTag}>{pkg.tag}</div>
            <div className={styles.pkgPrice}>
              {pkg.price}
              <span>{pkg.priceNote}</span>
            </div>
            <p className={styles.pkgWhy}>{pkg.why}</p>
            <p className={styles.pkgDesc}>{pkg.desc}</p>
            <a
              href={pkg.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pkgCta}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
