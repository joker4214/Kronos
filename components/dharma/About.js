import styles from '@/styles/dharma.module.css';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <div className={styles.aboutGrid}>
        <Reveal className={styles.aboutText}>
          <div className={styles.sectionEyebrow}>Who We Are</div>
          <h2>A boutique agency built for online store owners</h2>
          <p>
            Dharma&apos;s Esthetic Design Center is a boutique digital agency built for online
            store owners. We combine AI-powered content creation with real human expertise to
            deliver professional results — fast, affordable, and built around your brand.
          </p>
          <p>
            From TikTok and Facebook ad campaigns to store optimization, GA4 setup, and
            AI-generated video commercials — we handle the work so you can focus on running
            your business.
          </p>
        </Reveal>
        <Reveal className={styles.bento} delay={0.15}>
          <div className={`${styles.bentoCell} ${styles.bentoWide}`}>
            <div className={styles.bentoIcon}>D</div>
            <h4>What we cover</h4>
            <p>Everything below scales with your store — from a single package to full-service.</p>
          </div>
          <div className={styles.bentoCell}>
            <div className={styles.bentoIcon}>&#10003;</div>
            <h4>Social ad copy &amp; strategy</h4>
            <p>TikTok / Facebook</p>
          </div>
          <div className={styles.bentoCell}>
            <div className={styles.bentoIcon}>&#10003;</div>
            <h4>AI video commercials</h4>
            <p>10-sec spots</p>
          </div>
          <div className={styles.bentoCell}>
            <div className={styles.bentoIcon}>&#10003;</div>
            <h4>Store optimization</h4>
            <p>Shopify, Wix, WordPress</p>
          </div>
          <div className={styles.bentoCell}>
            <div className={styles.bentoIcon}>&#10003;</div>
            <h4>Analytics &amp; SEO</h4>
            <p>GA4 + on-page</p>
          </div>
          <div className={`${styles.bentoCell} ${styles.bentoWide}`}>
            <div className={styles.bentoIcon}>&#10003;</div>
            <h4>Branding, email marketing &amp; web design</h4>
            <p>Full setup, plus new custom site builds and maintenance plans</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
