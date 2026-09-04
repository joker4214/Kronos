import styles from '@/styles/dharma.module.css';
import Reveal from './Reveal';

export default function Testimonials() {
  return (
    <section id="reviews" className={`${styles.section} ${styles.testimonials}`}>
      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Reviews</div>
        <h2>What clients are saying</h2>
        <p>We&apos;re setting up our review pages now — check back soon, or be one of our first.</p>
      </Reveal>

      <div className={styles.testiGrid}>
        <div className={styles.testiEmpty}>Client testimonials will appear here as they come in.</div>
      </div>

      <div className={styles.reviewCtaRow}>
        {/* TODO(Jason): once the Google Business Profile is verified, swap this span for:
            <a href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
               target="_blank" rel="noopener noreferrer" className={styles.btnReview}>
              ★ Leave us a Google review
            </a> */}
        <span className={`${styles.btnReview} ${styles.btnReviewDisabled}`}>
          ★ Leave us a Google review <span className={styles.badgeSoon}>Coming soon</span>
        </span>

        {/* TODO(Jason): once the Trustpilot business page is live, swap this span for:
            <a href="https://www.trustpilot.com/evaluate/YOUR-DOMAIN"
               target="_blank" rel="noopener noreferrer" className={styles.btnReview}>
              ★ Leave us a Trustpilot review
            </a> */}
        <span className={`${styles.btnReview} ${styles.btnReviewDisabled}`}>
          ★ Leave us a Trustpilot review <span className={styles.badgeSoon}>Coming soon</span>
        </span>
      </div>
    </section>
  );
}
