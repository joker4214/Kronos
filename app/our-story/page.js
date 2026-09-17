import styles from '@/styles/dharma.module.css';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';
import AnimatedFooter from '@/components/dharma/AnimatedFooter';

export const metadata = {
  title: "Our Story | Dharma's Esthetic Design",
  description:
    "Why the agency is named Dharma's Esthetic Design — the dog behind the name, and the belief that shapes how we work with every client.",
  alternates: {
    canonical: '/our-story',
  },
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={styles.packagesContent}>
          <BackButton href="/" label="← Back to home" />

          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Our Story</div>
            <h2>Where the name comes from</h2>
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className={styles.aboutMascot} style={{ marginTop: 0 }}>
              <img src="/dharma-dog.jpg" alt="Dharma, an American Bully XXL, sitting in the grass" />
              <p>
                That&apos;s <strong>Dharma</strong> — 150 lbs of American Bully XXL, and the
                reason pet store owners always get first pick of our calendar.
              </p>
            </div>

            <p style={{ marginTop: '24px', lineHeight: 1.7 }}>
              Dharma&apos;s Esthetic Design is named after Jason&apos;s dog, Dharma — an
              American Bully XXL who tips the scale at about 150 pounds. Dharma is the reason
              pet store owners always get first pick of our calendar: helping ecommerce brands
              like the ones he&apos;d shop at himself is personal, not just a market we picked.
            </p>
            <p style={{ lineHeight: 1.7 }}>
              It&apos;s also why we built the business around actually listening to what a
              store owner needs, instead of pushing the same template to everyone who walks in
              the door — one size doesn&apos;t fit every store, and it definitely doesn&apos;t
              fit every dog.
            </p>
          </div>
        </div>
      </main>
      <AnimatedFooter />
    </>
  );
}
