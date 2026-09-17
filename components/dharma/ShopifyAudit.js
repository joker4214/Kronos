'use client';

import Link from 'next/link';
import styles from '@/styles/dharma.module.css';
import { AUDITS } from './data';
import Reveal from './Reveal';

export default function ShopifyAudit() {
  return (
    <div className={styles.pkgGrid}>
      {AUDITS.map((audit, index) => (
        <Reveal key={audit.id} delay={index * 0.1} style={{ height: '100%' }}>
          <Link href={`/shopify-audit/${audit.id}`} className={styles.pkgCard}>
            <h3>{audit.name}</h3>
            <div className={styles.pkgTag}>{audit.tag}</div>

            <div className={styles.pkgPrice}>
              <span className={styles.priceValue}>${audit.price}</span>
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
  );
}
