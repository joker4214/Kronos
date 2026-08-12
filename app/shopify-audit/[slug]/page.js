import { notFound } from 'next/navigation';
import styles from '@/styles/dharma.module.css';
import { AUDITS } from '@/components/dharma/data';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';

export function generateStaticParams() {
  return AUDITS.map((audit) => ({ slug: audit.id }));
}

export function generateMetadata({ params }) {
  const audit = AUDITS.find((a) => a.id === params.slug);
  if (!audit) return {};
  return {
    title: `${audit.name} | Dharma's Esthetic Design Center`,
    description: audit.intro,
    alternates: {
      canonical: `/shopify-audit/${params.slug}`,
    },
  };
}

export default function AuditDetailPage({ params }) {
  const audit = AUDITS.find((a) => a.id === params.slug);
  if (!audit) notFound();

  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={`${styles.packagesContent} ${styles.detailOnDark}`} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <BackButton href="/shopify-audit" label="← Back to Audits" />

          <div className={styles.detailPanel}>
            <h1>{audit.name}</h1>
            <div className={styles.detailSub}>{audit.priceLine}</div>
            <p>{audit.intro}</p>

            {audit.features.map((feature) => (
              <div key={feature.name} className={styles.featureRow}>
                <div className={styles.check}>&#10003;</div>
                <div>
                  <strong>{feature.name}</strong>
                  {feature.why && <p className={styles.featureWhy}>{feature.why}</p>}
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}

            {audit.delivery && <div className={styles.deliveryNote}>{audit.delivery}</div>}

            <a href="/#contact" className={styles.detailCta}>
              Ready to get started? Contact us
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
