import styles from '@/styles/dharma.module.css';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';
import Reveal from '@/components/dharma/Reveal';
import AnimatedFooter from '@/components/dharma/AnimatedFooter';
import { PORTFOLIO_SITES } from '@/components/dharma/data';

export const metadata = {
  title: "Portfolio | Dharma's Esthetic Design",
  description:
    'Real, fully built demo sites — event planning, weddings, golf, and local service businesses — showing what a custom build actually looks like.',
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={styles.packagesContent}>
          <BackButton href="/" label="← Back to home" />

          <div className={styles.sectionHead}>
            <div className={styles.sectionEyebrow}>Portfolio</div>
            <h2>Real builds, not mockups.</h2>
            <p>
              Every site below is a fully built, live demo — real pages, real navigation, real
              interactive features. This is what a custom build looks like before we ever put your
              name on it.
            </p>
          </div>

          <div className={styles.portfolioGrid}>
            {PORTFOLIO_SITES.map((site, index) => (
              <Reveal key={site.id} delay={index * 0.08} style={{ height: '100%' }}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.portfolioCard}
                >
                  <div className={styles.portfolioCategory}>{site.category}</div>
                  <h3>{site.name}</h3>
                  <p>{site.desc}</p>
                  <span className={styles.portfolioVisit}>
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <AnimatedFooter />
    </>
  );
}
