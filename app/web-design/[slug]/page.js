import { notFound } from 'next/navigation';
import styles from '@/styles/dharma.module.css';
import { WEB_DESIGN_TIERS } from '@/components/dharma/data';
import Navbar from '@/components/dharma/Navbar';
import BackButton from '@/components/dharma/BackButton';

export function generateStaticParams() {
  return WEB_DESIGN_TIERS.map((tier) => ({ slug: tier.id }));
}

export function generateMetadata({ params }) {
  const tier = WEB_DESIGN_TIERS.find((t) => t.id === params.slug);
  if (!tier) return {};
  return {
    title: `${tier.name} | Dharma's Esthetic Design`,
    description: tier.intro,
    alternates: {
      canonical: `/web-design/${params.slug}`,
    },
  };
}

export default function WebDesignDetailPage({ params }) {
  const tier = WEB_DESIGN_TIERS.find((t) => t.id === params.slug);
  if (!tier) notFound();

  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={`${styles.packagesContent} ${styles.detailOnDark}`} style={{ maxWidth: '780px', margin: '0 auto' }}>
          <BackButton href="/#webdesign" label="← Back to Web Design" />

          <div className={styles.detailPanel}>
            <h1>{tier.name}</h1>
            <div className={styles.detailSub}>{tier.priceLine}</div>
            <p>{tier.intro}</p>

            {tier.features.map((feature) => (
              <div key={feature.name} className={styles.featureRow}>
                <div className={styles.check}>&#10003;</div>
                <div>
                  <strong>{feature.name}</strong>
                  {feature.why && <p className={styles.featureWhy}>{feature.why}</p>}
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}

            {tier.delivery && <div className={styles.deliveryNote}>{tier.delivery}</div>}

            <a href="/#contact" className={styles.detailCta}>
              Ready to get started? Contact us
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
