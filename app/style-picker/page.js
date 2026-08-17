import styles from '@/styles/dharma.module.css';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';
import ThemeCustomizer from '@/components/dharma/ThemeCustomizer';
import AnimatedFooter from '@/components/dharma/AnimatedFooter';

export const metadata = {
  title: "Style Picker | Dharma's Esthetic Design Center",
  description:
    'Play with color and font packages for your Shopify store — pick a look, see it live, and tell us what you want built.',
  alternates: {
    canonical: '/style-picker',
  },
};

export default function StylePickerPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={styles.packagesContent}>
          <BackButton href="/" label="← Back to home" />

          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Try it yourself</div>
            <h2>Pick a look. See your store come to life.</h2>
            <p>
              Six curated color and font packages — click one to preview it live. Find a
              direction you love, screenshot it, and tell us — it becomes the real starting
              point for your build instead of us guessing at your taste.
            </p>
          </div>

          <ThemeCustomizer />
        </div>
      </main>
      <AnimatedFooter />
    </>
  );
}
