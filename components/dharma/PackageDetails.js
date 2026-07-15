'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';
import { PACKAGE_DETAILS } from './data';
import Reveal from './Reveal';

const TABS = [
  { id: 'starter', label: 'Starter Launch' },
  { id: 'growth', label: 'Growth Bundle' },
  { id: 'agency', label: 'Full Agency' },
];

export default function PackageDetails() {
  const [active, setActive] = useState('starter');
  const detail = PACKAGE_DETAILS[active];

  return (
    <section className={`${styles.section} ${styles.pkgDetail}`}>
      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Package Details</div>
        <h2>Exactly what&apos;s included</h2>
      </Reveal>

      <div className={styles.detailTabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`${styles.detailTab} ${active === tab.id ? styles.detailTabActive : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.detailPanel}>
        <h3>{detail.name}</h3>
        <div className={styles.detailSub}>{detail.priceLine}</div>
        <p>{detail.intro}</p>

        {detail.features.map((feature) => (
          <div key={feature.name} className={styles.featureRow}>
            <div className={styles.check}>&#10003;</div>
            <div>
              <strong>{feature.name}</strong>
              {feature.why && <p className={styles.featureWhy}>{feature.why}</p>}
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}

        {detail.delivery && <div className={styles.deliveryNote}>{detail.delivery}</div>}
      </div>
    </section>
  );
}
