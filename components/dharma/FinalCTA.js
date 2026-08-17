import styles from '@/styles/dharma.module.css';
import Reveal from './Reveal';

export default function FinalCTA() {
  return (
    <section id="contact" className={styles.ctaFinal}>
      <Reveal className={styles.ctaWrap}>
        <div className={styles.sectionEyebrow}>Ready to Get Started?</div>
        <h2>Your store. Your brand. Done right.</h2>
        <p>
          Tell us about your store and we&apos;ll recommend the right package — or build
          something custom from our à la carte menu.
        </p>
        <div className={styles.btnRow}>
          <a
            href="mailto:Dharma%27s%20Esthetic%20Design%20%3Cjason@dharmasestheticdesign.com%3E?subject=Let's%20talk%20about%20my%20Shopify%20store"
            className={`${styles.btn} ${styles.btnAccent}`}
          >
            Email Us
          </a>
        </div>
        <div className={styles.contactLinks}>
          <a href="mailto:Dharma%27s%20Esthetic%20Design%20%3Cjason@dharmasestheticdesign.com%3E">jason@dharmasestheticdesign.com</a>
          <a
            href="https://www.instagram.com/dharmasestheticdesign/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@dharmasestheticde"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
          <a
            href="https://www.facebook.com/dharmasestheticdesign"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
        <p className={styles.policyNote}>
          Our promise: you&apos;ll love the final result, or we&apos;ll make it right. Every
          package includes one full round of revisions at no extra cost — just tell us what
          to adjust within 5 business days of delivery. Need more than one round? Additional
          revisions are available for a small fee. Refunds aren&apos;t available once work has
          started, since real time goes in right away — but between the revisions and how
          closely we work with you along the way, our goal is that a refund is never the
          thing you need.
        </p>
      </Reveal>
    </section>
  );
}
