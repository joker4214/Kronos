import { notFound } from 'next/navigation';
import styles from '@/styles/dharma.module.css';
import { PACKAGES, PACKAGE_DETAILS } from '@/components/dharma/data';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';

export function generateStaticParams() {
  return Object.keys(PACKAGE_DETAILS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const detail = PACKAGE_DETAILS[params.slug];
  if (!detail) return {};
  return {
    title: `${detail.name} | Dharma's Esthetic Design Center`,
    description: detail.intro,
  };
}

export default function PackageDetailPage({ params }) {
  const detail = PACKAGE_DETAILS[params.slug];
  const pkg = PACKAGES.find((p) => p.id === params.slug);
  if (!detail || !pkg) notFound();

  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={`${styles.packagesContent} ${styles.detailOnDark}`} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <BackButton href="/#packages" label="← Back to Packages" />

          <div className={styles.detailPanel}>
            <h1>{detail.name}</h1>
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

            <a
              href={pkg.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.detailCta}
            >
              Get Started
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
