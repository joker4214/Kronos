import styles from '@/styles/dharma.module.css';
import Navbar from '@/components/dharma/Navbar';
import ShopifyAudit from '@/components/dharma/ShopifyAudit';

export const metadata = {
  title: "Shopify Store Audit Packages | Dharma's Esthetic Design Center",
  description:
    'Basic, Standard, and Premium Shopify store audit packages — design, SEO, CRO, and analytics review with actionable recommendations.',
  alternates: {
    canonical: '/shopify-audit',
  },
};

export default function ShopifyAuditPage() {
  return (
    <>
      <Navbar />
      <main className={`${styles.section} ${styles.packages}`}>
        <div className={styles.packagesGlow} />
        <div className={styles.packagesContent}>
          <div className={styles.sectionHead} style={{ marginBottom: '48px' }}>
            <div className={`${styles.sectionEyebrow} ${styles.eyebrowScale}`}>Shopify Store Audits</div>
            <h1>Not sure where to start? Get an audit first.</h1>
          </div>

          <ShopifyAudit />
        </div>
      </main>
    </>
  );
}
