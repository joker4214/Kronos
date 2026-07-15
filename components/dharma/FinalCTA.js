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
            href="mailto:jason@dharmasemporium.com?subject=Let's%20talk%20about%20my%20Shopify%20store"
            className={`${styles.btn} ${styles.btnAccent}`}
          >
            Email Us
          </a>
        </div>
        <div className={styles.contactLinks}>
          <a href="mailto:jason@dharmasemporium.com">jason@dharmasemporium.com</a>
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
          <span>Facebook</span>
        </div>
        <p className={styles.policyNote}>
          We want you to love the final result. Every package includes one round of revisions
          at no extra cost — just let us know what you&apos;d like adjusted within 5 business
          days of delivery, and we&apos;ll make it right. Additional revision rounds beyond the
          first can be added for a small fee. Refunds aren&apos;t available once work has
          started, but our goal is always to get it right together.
        </p>
      </Reveal>
    </section>
  );
}
