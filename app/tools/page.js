import styles from '@/styles/dharma.module.css';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';
import SeoAnalyzer from '@/components/dharma/SeoAnalyzer';
import AnimatedFooter from '@/components/dharma/AnimatedFooter';

export const metadata = {
  title: "Free Shopify SEO Analyzer | Dharma's Esthetic Design",
  description:
    'Paste in your store URL and get an instant SEO scan — title tags, meta descriptions, mobile-friendliness, alt text, and more, each with a plain-English fix.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={styles.packagesContent}>
          <BackButton href="/" label="← Back to home" />

          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Free tool</div>
            <h2>Your store looks good. Is it actually set up to be found?</h2>
            <p>
              Paste your store&apos;s URL below for an instant SEO scan — the same things we
              check first in every Shopify Store Audit, run free, right now.
            </p>
          </div>

          <SeoAnalyzer />
        </div>
      </main>
      <AnimatedFooter />
    </>
  );
}
