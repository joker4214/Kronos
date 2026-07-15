import SpotlightBackground from '@/components/SpotlightBackground';
import styles from '@/styles/dharma.module.css';
import { WEB_DESIGN_TIERS, MAINTENANCE_PLANS } from './data';

export default function WebDesign() {
  return (
    <section id="webdesign" className={`${styles.section} ${styles.webdesign}`}>
      <SpotlightBackground>
        <div className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Web Design</div>
          <h2>A site built to match where your business is today.</h2>
          <p>
            Pricing scales with your business size — pick the tier that fits, not one built
            for a company twice your size.
          </p>
        </div>

        <div className={styles.wdGrid}>
          {WEB_DESIGN_TIERS.map((tier) => (
            <div key={tier.name} className={styles.wdCard}>
              <div className={styles.pkgTag}>{tier.tag}</div>
              <h3>{tier.name}</h3>
              <p className={styles.wdWhy}>{tier.why}</p>
              <div className={styles.wdPrice}>
                {tier.price}
                <span> {tier.priceNote}</span>
              </div>
              <p className={styles.wdDesc}>{tier.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.maintWrap}>
          <div className={styles.maintHead}>
            <div className={styles.sectionEyebrow}>Keep it running</div>
            <h3>Maintenance plans</h3>
            <p>
              Optional monthly care once your site is live — updates, backups, and support so
              nothing breaks quietly.
            </p>
          </div>
          <div className={styles.maintGrid}>
            {MAINTENANCE_PLANS.map((plan) => (
              <div key={plan.name} className={styles.maintCard}>
                <h4>{plan.name}</h4>
                <div className={styles.wdPrice}>
                  {plan.price}
                  <span>{plan.priceNote}</span>
                </div>
                <p>{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SpotlightBackground>
    </section>
  );
}
