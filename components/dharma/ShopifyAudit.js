'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';
import { AUDITS } from './data';
import Reveal from './Reveal';

export default function ShopifyAudit() {
  return (
    <div className={styles.pkgGrid}>
      {AUDITS.map((audit, index) => (
        <Reveal key={audit.id} delay={index * 0.1} className={styles.pkgCard}>
          <h3>{audit.name}</h3>
          <div className={styles.pkgTag}>{audit.tag}</div>

          <div className={styles.pkgPrice}>
            <span className={styles.priceValue}>${audit.price}</span>
            <span className={styles.pricePeriod}>one-time</span>
          </div>

          <p className={styles.pkgDesc}>{audit.desc}</p>

          <button className={styles.pkgCta}>
            <Link href={`/shopify-audit/${audit.id}`}>View Details</Link>
          </button>
        </Reveal>
      ))}
    </div>
  );
}
